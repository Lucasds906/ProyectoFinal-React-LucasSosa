import { createContext, useContext, useState } from "react";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (productToAdd) => {
    if (!isInCart(productToAdd.id)) {
      setCart((prev) => [...prev, productToAdd]);
    } else {
      console.error("Producto ya en el carrito");
    }
  };
  const isInCart = (id) => {
    return cart.some((prod) => prod.id === id);
  };

  const removeItem = (id) => {
    const cartUpdate = cart.filter((prod) => prod.id !== id);
    setCart(cartUpdate);
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalQuantity = () => {
    let accu = 0;
    cart.forEach((prod) => {
      accu += prod.quantity;
    });
    return accu;
  };

  const getTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total;
  };
  const totalQuantity = getTotalQuantity();

  // const getAuthor = () => {
  //   const authorUpdate = cart.filter((prod) => prod.id !== id);
  //   setCart(cartUpdate);
  // }

  return (
    <CartContext.Provider
      value={{
        cart,
        isInCart,
        addItem,
        removeItem,
        clearCart,
        totalQuantity,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
