import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export const CartContext = createContext([[], () => {}]);

const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  const addToCart = useCallback(
    (item) => {
      const existingItem = cartItems.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.size === item.sizev &&
          cartItem.color === item.color,
      );

      const newCartItems = existingItem
        ? cartItems.map((cartItem) =>
            cartItem.id === item.id &&
            cartItem.size === item.sizev &&
            cartItem.color === item.color
              ? { ...cartItem, quantity: item.quantity }
              : cartItem,
          )
        : [...cartItems, item];

      setCartItems(newCartItems);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    },
    [cartItems],
  );

  const value = useMemo(() => {
    return [cartItems, addToCart];
  }, [cartItems, addToCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
