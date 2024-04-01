import { useCart } from "../../context/CartContex";

const CartItem = ({ id, name, quantity, price, author }) => {
  const { removeItem } = useCart();
  const handleRemove = (id) => {
    removeItem(id);
  };

  return (
    <article className="cardCartItem">
      <header className="headerCartItem">
        <h3>{name}</h3>
        <h3>{author}</h3>
      </header>
      <section className="containerCartItem">
        <p>Cantidad: {quantity}</p>
        <p>Precio x unidad: $ {price}</p>
      </section>
      <footer className="FooterCartItem">
        <p>Subtotal: $ {price * quantity}</p>
        <button onClick={() => handleRemove(id)}>X</button>
      </footer>
    </article>
  );
};
export default CartItem;
