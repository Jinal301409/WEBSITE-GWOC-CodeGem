import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
} from 'react';
import axios from 'axios';

const CartContext = createContext();

// Helper to get consistent item ID (MongoDB _id or frontend id)
const getItemId = (item) => item?._id || item?.id;

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'HYDRATE_CART':
      return action.payload.map((ci) => ({
        cartId: ci._id,
        item: ci.item,
        quantity: ci.quantity,
      }));

    case 'ADD_ITEM': {
      const { item, quantity } = action.payload;
      const newItemId = getItemId(item);
      const exists = state.find((ci) => getItemId(ci.item) === newItemId);

      if (exists) {
        return state.map((ci) =>
          getItemId(ci.item) === newItemId
            ? { ...ci, quantity: ci.quantity + quantity }
            : ci
        );
      }

      return [
        ...state,
        {
          cartId: null,
          item,
          quantity,
        },
      ];
    }

    case 'REMOVE_ITEM':
      return state.filter((ci) => (ci.cartId || getItemId(ci.item)) !== action.payload);

    case 'UPDATE_ITEM':
      return state.map((ci) =>
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

// Initialize cart from localStorage
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

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Hydrate cart from backend (only if logged in)
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    axios
      .get('https://website-gwoc-codegem-backend.onrender.com/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch({
          type: 'HYDRATE_CART',
          payload: Array.isArray(res.data) ? res.data : [],
        });
      })
      .catch(() => {});
  }, []);

  // Totals
  const totalItems = cartItems.reduce((sum, ci) => sum + (ci.quantity || 0), 0);
  const totalAmount = cartItems.reduce((sum, ci) => {
    const price = ci?.item?.price ?? 0;
    const qty = ci?.quantity ?? 0;
    return sum + price * qty;
  }, 0);

  // Actions
  const addToCart = useCallback(async (item, qty) => {
    if (!item || (!item._id && !item.id)) return;

    // Optional backend call if logged-in
    const token = localStorage.getItem('authToken');
    if (token && item._id) {
      try {
        await axios.post(
          'https://website-gwoc-codegem-backend.onrender.com/api/cart',
          { itemId: item._id, quantity: qty },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch {}
    }

    dispatch({ type: 'ADD_ITEM', payload: { item, quantity: qty } });
  }, []);

  const removeFromCart = useCallback(async (id) => {
    const token = localStorage.getItem('authToken');

    if (token && typeof id === 'string' && id.length === 24) {
      try {
        await axios.delete(
          `https://website-gwoc-codegem-backend.onrender.com/api/cart/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch {}
    }

    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, []);

  const updateQuantity = useCallback(async (id, qty) => {
    const token = localStorage.getItem('authToken');

    if (token && typeof id === 'string' && id.length === 24) {
      try {
        await axios.put(
          `https://website-gwoc-codegem-backend.onrender.com/api/cart/${id}`,
          { quantity: qty },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch {}
    }

    dispatch({ type: 'UPDATE_ITEM', payload: { cartId: id, quantity: qty } });
  }, []);

  // ✅ Frontend-only clearCart (no backend call)
  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
    localStorage.removeItem('cart');
  }, []);

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalAmount,
    }),
    [cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalAmount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
