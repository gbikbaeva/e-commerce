import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getStockChangedData,
  mergeSampleAndStorageCartItems,
} from "../pages/ShoppingCart/utils";

export const CartContext = createContext([[], () => {}]);

const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [stockChangedData, setStockChangedData] = useState([]);
  const [checkingStock, setCheckingStock] = useState(false);
  const [discount, setDiscount] = useState(null);
  const [showStockChangedModal, setShowStockChangedModal] = useState(false);

  const updateCartItems = (items) => {
    setCartItems(items);
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  const checkForStockChanged = useCallback(async (items) => {
    setCheckingStock(true);
    const data = await getStockChangedData(items);
    setStockChangedData(data);
    setShowStockChangedModal(data.length > 0);
    setCheckingStock(false);
    return data;
  }, []);

  const getCartItems = useCallback(async () => {
    setIsFetching(true);
    const result = await fetch("/cart-items.json");
    const response = await result.json();
    setCartItems(response.items);
    if (!response.error) {
      const cartItems = mergeSampleAndStorageCartItems(response.items);
      updateCartItems(cartItems);
      checkForStockChanged(cartItems);
    }
    setIsFetching(false);
  }, [checkForStockChanged]);

  const addToCart = useCallback(
    (item) => {
      const existingItem = cartItems.find(
        (cartItem) =>
          cartItem.product.product_id === item.product.product_id &&
          cartItem.unit.sku === item.unit.sku,
      );

      const newCartItems = existingItem
        ? cartItems.map((cartItem) =>
            cartItem.product.product_id === item.product.product_id &&
            cartItem.unit.sku === item.unit.sku
              ? { ...cartItem, quantity: item.quantity }
              : cartItem,
          )
        : [...cartItems, item];

      setCartItems(newCartItems);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    },
    [cartItems],
  );

  const removeFromCart = useCallback(
    (item) => {
      const updatedCart = cartItems.filter(
        (cartItem) =>
          !(
            cartItem.product.product_id === item.product.product_id &&
            cartItem.unit.sku === item.unit.sku
          ),
      );
      updateCartItems(updatedCart);
    },
    [cartItems],
  );

  const changeQuantity = useCallback(
    (item, increment = true) => {
      let updatedCart;

      updatedCart = cartItems.map((cartItem) => {
        if (
          cartItem.product.product_id === item.product.product_id &&
          cartItem.unit.sku === item.unit.sku
        ) {
          const finalQuantity = increment
            ? item.quantity + 1
            : item.quantity - 1;

          return {
            ...cartItem,
            quantity: finalQuantity,
            total_list_price: finalQuantity * cartItem.unit.list_price,
            total_sale_price: finalQuantity * cartItem.unit.sale_price,
          };
        }
        return cartItem;
      });

      updateCartItems(updatedCart);
    },
    [cartItems],
  );

  const acknowledgeStockChanged = useCallback(
    (cartItems, currentStockItems) => {
      const updatedCartItems = cartItems.reduce((acc, item) => {
        const product = currentStockItems.find(
          (cartItem) =>
            cartItem.product.product_id === item.product.product_id &&
            cartItem.unit.sku === item.unit.sku,
        );
        if (product) {
          acc.push(
            product.stock > 0 ? { ...item, quantity: product.stock } : item,
          );
        }

        setShowStockChangedModal(false);

        return acc;
      }, []);

      updateCartItems(updatedCartItems);
    },
    [],
  );

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  const value = useMemo(() => {
    return {
      cartItems,
      isFetching,
      addToCart,
      incrementQuantity: (item) => changeQuantity(item, true),
      decrementQuantity: (item) => changeQuantity(item, false),
      removeFromCart,
      discount,
      setDiscount,
      checkingStock,
      stockChangedData,
      showStockChangedModal,
      checkForStockChanged,
      acknowledgeStockChanged,
    };
  }, [
    cartItems,
    isFetching,
    addToCart,
    changeQuantity,
    removeFromCart,
    discount,
    setDiscount,
    checkingStock,
    stockChangedData,
    showStockChangedModal,
    checkForStockChanged,
    acknowledgeStockChanged,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
