import { createContext, useContext } from "react";
import { getBooks } from "../services/firebase/firebase";
import { useAsync } from "../hooks/useAsync";

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);

  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }

  return context;
};

const DataProvider = ({ children }) => {
  const getBooksFromFirestore = () => getBooks();

  const { data, error, loading } = useAsync(getBooksFromFirestore);

  return (
    <DataContext.Provider value={{ data, error, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
