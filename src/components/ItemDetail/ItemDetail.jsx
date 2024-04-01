import ItemCount from "../ItemCount/ItemCount";

import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContex";
import { useNotification } from "../../context/NotificationContext";
import { useState } from "react";

const ItemDetail = ({
  id,
  name,
  price,
  img,
  stock,
  author,
  description,
  language,
}) => {
  const { addItem, isInCart } = useCart();
  const { setNotification } = useNotification();

  const [info, setInfo] = useState("");

  const handleAdd = (count) => {
    console.log("Agregar al carrito");
    const productObj = { id, name, price, quantity: count };
    if (count == 0) {
      setNotification("error", `Seleccione al menos un producto`);
    } else {
      addItem(productObj);
      setNotification("succes", `Se agregaron ${count} de ${name}`);
    }
  };

  return (
    <article className="cardDetail">
      <section className="cardDiv">
        <div
          className="cardDetailSelector"
          onMouseOver={() => setInfo("Información para botón 1")}
          onMouseOut={() => setInfo("")}
        >
          <h3>BG</h3>
        </div>
        <div
          className="cardDetailSelector"
          onMouseOver={() => setInfo("Info para botón 2")}
          onMouseOut={() => setInfo("")}
        >
          <h3>BG</h3>
        </div>
        <div
          className="cardDetailSelector"
          onMouseOver={() => setInfo("Información botón 3")}
          onMouseOut={() => setInfo("")}
        >
          <h3>BG</h3>
        </div>
      </section>
      <section className="cardInfo">
        <h2>{name}</h2>
        <span>{author}</span>
        <span>{language}</span>
        <p>{description}</p>
        <div className="counter">
          <span>$ {price}</span>
          {isInCart(id) ? (
            <Link to="/cart">Ir al carrito</Link>
          ) : (
            <ItemCount initialValue={0} stock={stock} onAdd={handleAdd} />
          )}
        </div>
        <div>{info}</div>
      </section>
      <div className="detailImg">
        <img src={img} alt={name} />
      </div>
    </article>
  );
};

export default ItemDetail;
