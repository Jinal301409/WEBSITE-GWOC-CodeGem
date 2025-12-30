import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
  useMemo
} from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {

    case 'ADD_ITEM': {
      const { item, quantity } = action.payload;
      const existingItem = state.find(i => i.id === item.id);

      if (existingItem) {
        return state.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...state, { ...item, quantity }];
    }

    case 'REMOVE_ITEM':
      return state.filter(i => i.id !== action.payload.itemId);

    case 'UPDATE_QUANTITY': {
      const { itemId, newQuantity } = action.payload;
      return state.map(i =>
        i.id === itemId
          ? { ...i, quantity: Math.max(1, newQuantity) }
          : i
      );
    }

    default:
      return state;
  }
};

const initializer = () => {
  if (typeof window !== 'undefined') {
    const localCart = localStorage.getItem('cart');
    return localCart ? JSON.parse(localCart) : [];
  }
  return [];
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, [], initializer);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const addToCart = useCallback((item, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { item, quantity } });
  }, []);

  const removeFromCart = useCallback((itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { itemId } });
  }, []);

  const updateQuantity = useCallback((itemId, newQuantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, newQuantity } });
  }, []);

  const value = useMemo(() => ({
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    totalItems: totalItemsCount,
  }), [cartItems, cartTotal, totalItemsCount]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
