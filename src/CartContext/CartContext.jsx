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

// Helper to get a consistent ID from an item (handles both MongoDB _id and frontend id)
const getItemId = (item) => item?._id || item?.id;

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'HYDRATE_CART':
  return action.payload.map(ci => ({
    cartId: ci._id,          // backend cart item id
    item: ci.item,           // actual service
    quantity: ci.quantity
  }));


    case 'ADD_ITEM': {
  const { item, quantity } = action.payload;

  const newItemId = getItemId(item);
  const exists = newItemId && state.find(ci => getItemId(ci.item) === newItemId);

  if (exists) {
    return state.map(ci =>
      getItemId(ci.item) === newItemId
        ? { ...ci, quantity: ci.quantity + quantity }
        : ci
    );
  }

  return [...state, {
    cartId: null,   // will be filled by backend later
    item,
    quantity
  }];
}


    case 'REMOVE_ITEM':
      // Remove by cartId (if exists) OR by item ID
      return state.filter(ci => (ci.cartId || getItemId(ci.item)) !== action.payload);

    case 'UPDATE_ITEM':
  return state.map(ci =>
    // Match by cartId (if exists) OR by item ID
    (ci.cartId || getItemId(ci.item)) === action.payload.cartId
      ? { ...ci, quantity: action.payload.quantity }
      : ci
  );

 

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
};

const initializer = () => {
  try {
    const raw = localStorage.getItem('cart');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, [], initializer);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ HYDRATE FROM SERVER (ONLY IF LOGGED IN)
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    axios
      .get('https://website-gwoc-codegem-backend.onrender.com/api/cart', {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        dispatch({
          type: 'HYDRATE_CART',
          payload: Array.isArray(res.data) ? res.data : []
        });
      })
      .catch(() => {
        // silently ignore
      });
  }, []);

  const totalItems = (cartItems || []).reduce(
    (sum, ci) => sum + (ci.quantity || 0),
    0
  );

  const totalAmount = (cartItems || []).reduce((sum, ci) => {
    const price = ci?.item?.price ?? 0;
    const qty = ci?.quantity ?? 0;
    return sum + price * qty;
  }, 0);

  const addToCart = useCallback(async (item, qty) => {
    if (!item || (!item._id && !item.id)) {
      console.error('Invalid item passed to addToCart');
      return;
    }

    const token = localStorage.getItem('authToken');

    try {
      if (item._id) {
        await axios.post(
          'https://website-gwoc-codegem-backend.onrender.com/api/cart',
          { itemId: item._id, quantity: qty },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` }
          }
        );
      }
    } catch {}

    dispatch({
      type: 'ADD_ITEM',
      payload: { item, quantity: qty }
    });
  }, []);

  const removeFromCart = useCallback(async (id) => {
    const token = localStorage.getItem('authToken');

    try {
      // Only call API if it looks like a MongoDB ID (usually 24 hex chars) or if we know it's a backend item
      if (typeof id === 'string' && id.length === 24) {
        await axios.delete(`https://website-gwoc-codegem-backend.onrender.com/api/cart/${id}`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch {}

    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, []);

  const updateQuantity = useCallback(async (id, qty) => {
    const token = localStorage.getItem('authToken');

    try {
      if (typeof id === 'string' && id.length === 24) {
        await axios.put(
          `https://website-gwoc-codegem-backend.onrender.com/api/cart/${id}`,
          { quantity: qty },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` }
          }
        );
      }
    } catch {}

    dispatch({ type: 'UPDATE_ITEM', payload: { cartId: id, quantity: qty } });
  }, []);

  const clearCart = useCallback(async () => {
    const token = localStorage.getItem('authToken');

    try {
      await axios.post(
        `https://website-gwoc-codegem-backend.onrender.com/api/cart/clear`,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` }
        }
      );
    } catch {}

    dispatch({ type: 'CLEAR_CART' });
  }, []);

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
