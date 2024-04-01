import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContex";
import CartItem from "../CartItem/CartItem";

const Cart = () => {
  const { cart, clearCart, getTotal, totalQuantity } = useCart();
  const total = getTotal();

  if (totalQuantity === 0) {
    return <h2>No hay items en el carito</h2>;
  }
  return (
    <section className="cartContainer">
      <h1>Cart</h1>
      {cart.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
      <h3>Total ${total}</h3>
      <div>
        <button className="Btn" onClick={() => clearCart()}>
          Limpiar Carrito
        </button>
      </div>
      <Link to="/checkout" className="Btn">
        Checkout
      </Link>
    </section>
  );
};

export default Cart;
