import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import "./scss/style.scss";
import { CartProvider } from "./context/CartContex";
import { NotificationProvider } from "./context/NotificationContext";
import DataProvider from "./context/DataProvider";
// import SearchResult from './components/SearchResult/SearchResult'

import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <NotificationProvider>
            <CartProvider>
              <DataProvider>
                <NavBar />
                <Routes>
                  <Route
                    path="/"
                    element={<ItemListContainer greeting={"Lista de libros"} />}
                  />
                  <Route
                    path="/category/:categoryId"
                    element={<ItemListContainer greeting={"Category: "} />}
                  />
                  <Route
                    path="/item/:itemId"
                    element={<ItemDetailContainer />}
                  />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="*" element={<h1>sin pagina</h1>} />
                </Routes>
              </DataProvider>
            </CartProvider>
          </NotificationProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
