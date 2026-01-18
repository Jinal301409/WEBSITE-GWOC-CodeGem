import React, { useEffect, useState } from 'react';
import { layoutClasses, tableClasses, statusStyles, paymentMethodDetails, iconMap } from '../assets/dummyadmin';
import { FiBox, FiUser } from 'react-icons/fi';
import axios from 'axios';

const Order = () => {

  const [orders, setOrders] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)

useEffect(() => {
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        'http://localhost:4000/api/orders/getall',
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        } //optional
      );

      const formatted = response.data.map(order => ({
        ...order,
        address: order.address ?? order.shippingAddress?.address ?? '',
        city: order.city ?? order.shippingAddress?.city ?? '',
        zipCode: order.zipCode ?? order.shippingAddress?.zipCode ?? '',
        phone: order.phone ?? '',
        items: order.items?.map(e => ({ _id: e._id, item: e.item, quantity: e.quantity })) || [],
        createdAt: new Date(order.createdAt).toLocaleDateString('en-IN', {
          year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
        }),
      }));

      setOrders(formatted);
      setError(null);
    } 
    catch (err) {
      setError(err.response?.data?.message || 'Failed to load orders.');
    } 
    finally {
      setLoading(false);
    }
  };
  fetchOrders();
}, []);
const handleStatusChange = async (orderId, newStatus) => {
  try {
    await axios.put(
      `http://localhost:4000/api/orders/getall/${orderId}`,
      { status: newStatus });

    setOrders(
      orders.map(o =>
        o._id === orderId ? { ...o, status: newStatus } : o));
  } catch (err) {
    alert(
      err.response?.data?.message || 'Failed to update order status'
    );
  }
};
if (loading) return (
<div className={layoutClasses.page + ' flex items-center justify-center'}>
<div className=' text-blue-400 text-xl'>Loading orders ... </div>
</div>
)
if (error) return (
<div className={layoutClasses.page + ' flex items-center justify-center'}>
<div className=' text-red-400 text-xl'>{error}</div>
</div>
)
  return (
    <div className={layoutClasses.page}>
      <div className="mx-auto max-w-7xl">
        <div className={layoutClasses.card}>
          <h2 className={layoutClasses.heading}>Order Management</h2>

          <div className={tableClasses.wrapper}>
            <table className={tableClasses.table}>
              <thead className={tableClasses.headerRow}>
                  <tr>
                    {['Customer ID','Customer', 'Address', 'Services', 'Total Services', 'Price', 'Payment', 'Status'].map(h => (
                      <th key={h} className={tableClasses.headerCell + (h === 'Total Services' ? ' text-center' : '')}>{h}</th>
                    ))}
                  </tr>
              </thead>
              <tbody>
                {orders.map(order =>{
                  // Sum up the quantities of all items in the order
const totalItems = order.items.reduce((s, i) => s + i.quantity, 0);
// Use the precomputed total if available; otherwise calculate price × quantity for each item
const totalPrice = order.total ?? order.items.reduce((s, i) => s + i.item.price * i.quantity, 0);
// Look up the display details for the payment method (lowercased), defaulting if not found
const payMethod = paymentMethodDetails[order.paymentMethod?.toLowerCase()] || paymentMethodDetails.default;

// Choose safe fallbacks for status and paymentStatus
const payStatusKey = order.paymentStatus || 'pending';
const payStatusStyle = statusStyles[payStatusKey] || { color: 'text-amber-400', icon: 'FiClock', label: payStatusKey };

const orderStatusKey = order.status || 'scheduled';
const stat = statusStyles[orderStatusKey] || { color: 'text-amber-400', icon: 'FiCalendar', label: orderStatusKey };
return (
<tr key={order._id} className={tableClasses.row}>
  <td
    className={tableClasses.cellBase +' font-mono text-sm text-white'}>
    #{order._id.slice(-8)}
  </td>

  <td className={tableClasses.cellBase}>
    <div className="flex items-center gap-2">
      <FiUser className="text-blue-400" />
{/*user data info*/}
      <div>
        <p className="text-white">
          {order.user?.name ||
            order.firstName + ' ' + order.lastName}
        </p>

        <p className="text-sm text-blue-400/60">
          {order.user?.phone || order.phone}
        </p>

        <p className="text-sm text-blue-400/60">
          {order.user?.email || order.email}
        </p>
      </div>
    </div>
  </td>
  {/* Address Section */}
<td className={tableClasses.cellBase}>
  <div className=' text-white text-sm max-w-[200px]'>
    {order.address}, {order.city} - {order.zipCode}
  </div>
</td>

<td className={tableClasses.cellBase}>
  <div className=' space-y-1 max-h-52 overflow-auto'>
    {order.items.map((itm, idx) => (
      <div
        key={idx}
        className="flex items-center gap-3 p-2 rounded-lg text-amber-100/80 text-sm max-w-[200px]">
        <img src={itm.item?.imageUrl ? `http://localhost:4000${itm.item.imageUrl}` : ''} alt={itm.item.name} 
        className=' w-10 h-10 object-cover rounded-lg' />
        <div className=' flex-1'>
<span className=' text-white text-sm block
truncate'>
{itm.item.name}
</span>
<div className=' flex items-center gap-2 text-xs text-blue-400/60' >
<span>₹{itm.item.price.toFixed(2)}</span>
<span>&dot;</span>
<span>x{itm.quantity}</span>
</div>
</div>
      </div>
    ))}
  </div>
</td>
<td className={tableClasses.cellBase + ' text-center'}>
<div className=' flex items-center justify-center gap-1'>
<FiBox className='text-blue-400' />
<span className=' text-blue-300 text-lg'>{totalItems}</span>
</div>
</td>
<td className={tableClasses.cellBase + ' text-blue-300 text-lg'}>
₹{totalPrice.toFixed(2)}
</td>
<td className={tableClasses.cellBase}>
  <div className="flex flex-col gap-2">
    <div
      className={`${payMethod.class} px-3 py-1.5 rounded-lg border text-sm`}>
      {payMethod.label}
    </div>

    <div
      className={`${payStatusStyle.color} flex items-center gap-2 text-sm`}>
      {iconMap[payStatusStyle.icon]}
      <span>{payStatusStyle.label}</span>
    </div>
  </div>
</td>
<td className={tableClasses.cellBase}>
  <div className="flex items-center gap-2">
    <span className={`${stat.color} text-xl`}>
      {iconMap[stat.icon]}
    </span>

    <select
      value={order.status}
      onChange={(e) => handleStatusChange(order._id, e.target.value)}
      className={`
        px-4 py-2 rounded-lg
        bg-blue-900/30 text-blue-300
        border border-blue-500/30
        text-sm cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-blue-500/40`}>
      {Object.entries(statusStyles)
        .filter(([key]) => key !== 'succeeded')
        .map(([key, sty]) => (
          <option
            key={key}
            value={key}
            className={`${sty.bg} ${sty.color}`}>
            {sty.label}
          </option>
        ))}
    </select>
  </div>
</td>

</tr>
)
                })}
              </tbody>

            </table>
          </div>
          {orders.length === 0 && <div className=' text-center py-12 text-amber-100/60 text-xl'>
No orders found 
</div>}
        </div>
      </div>
    </div>
  );
};

export default Order;

