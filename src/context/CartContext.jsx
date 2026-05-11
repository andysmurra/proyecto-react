import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, cantidad: (item.cantidad || 1) + 1 } 
            : item
        );
      }
      return [...prevCart, { ...product, cantidad: 1 }];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalQuantity = cart.reduce((acc, item) => acc + (item.cantidad || 1), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, totalQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};