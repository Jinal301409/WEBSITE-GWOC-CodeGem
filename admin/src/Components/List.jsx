import React, { useEffect, useState } from 'react';
import { styles } from '../assets/dummyadmin';
import { FiStar } from 'react-icons/fi';
import axios from 'axios';
const List = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/items');
        setItems(data);
      } catch (err) {
        console.error('Error fetching items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // DELETE ITEMS
  const handleDelete = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      await axios.delete(`http://localhost:4000/api/items/${itemId}`);
      setItems((prev) => prev.filter((item) => item._id !== itemId));
      console.log('Deleted item ID:', itemId);
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <FiStar
        key={i} className={`text-xl ${i < rating ? 'text-blue-400 fill-current' : 'text-amber-100/30'}`} />
    ));
  if (loading) {
    return (
      <div className={styles.pageWrapper.replace(/bg-gradient-to-br.*/, '').concat(' flex items-center justify-center text-white')}>
        Loading Menu...
      </div>
    )
  }

  return (
    <div className={styles.pageWrapper}>
      <div className="max-w-7xl mx-auto">
        <div className={styles.cardContainer}>
          <h2 className={styles.title}>Manage Services</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th className={styles.th}>Image</th>
                  <th className={styles.th}>Name</th>
                  <th className={styles.th}>Category</th>
                  <th className={styles.th}>Price (₹)</th>
                  <th className={styles.th}>Rating</th>
                  <th className={styles.th}>Hearts</th>
                  <th className={styles.thCenter}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item._id} className={styles.tr}>
                    <td className={styles.imgCell}>
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className={styles.img}
                      />
                    </td>
                    <td className={styles.nameCell}>
                      <div className="space-y-1">
                        <p className={styles.nameText}>{item.name}</p>
                        <p className={styles.descText}>{item.description}</p>
                      </div>
                    </td>

                    <td className={styles.categoryCell}>
                      {item.category}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default List;
