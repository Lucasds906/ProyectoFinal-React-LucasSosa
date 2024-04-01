import { Link, useLocation, useSearchParams } from "react-router-dom";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import { useData } from "../../context/DataProvider";
import { useEffect, useState } from "react";

const ItemListContainer = ({ greeting }) => {
  const { data, error, loading } = useData();
  const [booksData, setBooksData] = useState(null);

  const { categoryId } = useParams();

  const { pathname, search } = useLocation();
  const path = pathname.replace("/", "").split("/");

useEffect(() => {
  if (path.length > 1) {
    if (search) {
      let searchValue = decodeURIComponent(search.replace("?search=", "").replace(/\+/g, ' ')).toLowerCase();
      searchValue = searchValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      setBooksData(
        data
          ?.filter((book) => book[path[0]] === path[1])
          .filter((book) =>
            book.author.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchValue) ||
            book.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchValue)
          )
      );
    } else {
      setBooksData(data?.filter((book) => book[path[0]] === path[1]));
    }
  } else {
    if (search) {
      let searchValue = decodeURIComponent(search.replace("?search=", "").replace(/\+/g, ' ')).toLowerCase();
      searchValue = searchValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      setBooksData(
        data?.filter((book) =>
          book.author.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchValue) ||
          book.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchValue)
        )
      );
    } else {
      setBooksData(data);
    }
  }
}, [data, pathname, search]);

  if (loading) {
    return <span>Cargando libros...</span>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  if (data?.length === 0) {
    return categoryId ? (
      <h1>No hay productos en la categoría {categoryId}</h1>
    ) : (
      <h1>No hay productos disponibles</h1>
    );
  }

  if (!data?.length) return <h1>No hay productos disponibles</h1>;

  return (
    <section>
      <section className="backgroundImg">
        <div className="categoryLinks">
          <Link to={"/category/distopic"} className={"sideBarButtons"}>
            Distopic
          </Link>
          <Link to={"/category/fantasy"} className={"sideBarButtons"}>
            Fantasy
          </Link>
          <Link to={"/category/adventure"} className={"sideBarButtons"}>
            Adventure
          </Link>
        </div>
        <div>
          <h1>
            {greeting} {`${categoryId || ""}`}
          </h1>
          <ItemList books={booksData} />
        </div>
      </section>
    </section>
  );
};
export default ItemListContainer;
