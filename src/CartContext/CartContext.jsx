import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
  useMemo
} from 'react';
import axios from 'axios';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'HYDRATE_CART':
      return Array.isArray(action.payload) ? action.payload : [];

    case 'ADD_ITEM': {
      const { _id, item, quantity } = action.payload;
      const exists = state.find(ci => ci._id === _id);

      if (exists) {
        return state.map(ci =>
          ci._id === _id
            ? { ...ci, quantity: (ci.quantity || 0) + (quantity || 0) }
            : ci
        );
      }
      return [...state, { _id, item, quantity }];
    }

    case 'REMOVE_ITEM':
      return state.filter(ci => ci._id !== action.payload);

    case 'UPDATE_ITEM': {
      const { _id, quantity } = action.payload;
      return state.map(ci =>
        ci._id === _id
          ? { ...ci, quantity }
          : ci
      );
    }
    case 'CLEAR_CART':
        return [];

    default:
      return state;
  }
};

const initializer = () => {
    try{
      const raw = localStorage.getItem('cart');
      return raw ? JSON.parse(raw) : [];
    }
    catch {
      return [];
    }
}

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, [], initializer);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  //HYDRATE FROM SERVER API
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    axios.get('/api/cart', {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => dispatch({ type: 'HYDRATE_CART', payload: Array.isArray(res.data) ? res.data : [] }))
      .catch(err => {if (err.response?.status !== 401) console.error(err) })
  }, [])

  const totalItems = (cartItems || []).reduce((sum, ci) => sum + (ci.quantity || 0), 0);
  const totalAmount = (cartItems || []).reduce((sum, ci) => {
    const price = ci?.item?.price ?? 0;
    const qty = ci?.quantity ?? 0;
    return sum + price * qty
  }, 0)

//DISPATCH WRAPPED WITH useCALLBACK FOR PERFORMANCE
  const addToCart = useCallback(async (item, qty) => {
    const token = localStorage.getItem('authToken')
    await axios.post(
      '/api/cart',
      { itemId: item._id, quantity: qty },
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    dispatch({ type: 'ADD_ITEM', payload: { _id: item._id, item, quantity: qty } });
  }, []);

  const removeFromCart = useCallback(async _id => {
    const token = localStorage.getItem('authToken')
    await axios.delete(
      `/api/cart/${_id}`,
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    dispatch({ type: 'REMOVE_ITEM', payload: _id });
  }, []);

  const updateQuantity = useCallback(async (_id, qty) => {
    const token = localStorage.getItem('authToken')
    const res = await axios.put(
      `/api/cart/${_id}`,
      { quantity: qty },
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    // expect res.data to contain updated item {_id, item, quantity}
    dispatch({ type: 'UPDATE_ITEM', payload: { _id, quantity: qty } });
  }, []);

  const clearCart = useCallback(async () => {
    const token = localStorage.getItem('authToken')
    await axios.post(
      `/api/cart/clear`,
      {},
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    dispatch({ type: 'CLEAR_CART'})
  }, [])

  const value = useMemo(() => ({
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalAmount,
  }), [cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalAmount]);

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
