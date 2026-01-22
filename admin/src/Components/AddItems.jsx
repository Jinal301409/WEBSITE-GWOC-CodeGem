import React, { useState } from 'react'
import { styles } from '../assets/dummyadmin'
import { FiUpload, FiStar, FiHeart } from 'react-icons/fi'
import { FaRupeeSign } from 'react-icons/fa'
import axios from 'axios'

const AddItems = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    rating: 0,
    hearts: 0,
    total: 0,
    image: null,
    preview: ''
  })
   const handleHearts = () => 
     setFormData(prev => ({
       ...prev,
       hearts: prev.hearts + 1
     }))
   


  const [hoverRating, setHoverRating] = useState(0);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file)
      }))
    }
  }

  const handleRating = rating =>
    setFormData(prev => ({ ...prev, rating }))

  const handleSubmit = async e => {
  e.preventDefault();

  try {
    const payload = new FormData();
    // append fields explicitly so file is sent as file
    payload.append('name', formData.name);
    payload.append('description', formData.description);
    payload.append('category', formData.category);
    payload.append('price', formData.price);
    payload.append('rating', formData.rating);
    payload.append('hearts', formData.hearts);
    if (formData.image) payload.append('image', formData.image);

    const res = await axios.post(
      "http://localhost:4000/api/items",
      payload
    );

    setFormData({
      name: '',
      description: '',
      category: '',
      price: '',
      rating: 0,
      hearts: 0,
      total: 0,
      image: null,
      preview: ''
    });

  } catch (err) {
    console.error('Error uploading item:', err.response || err.message)
  }
}
  const [categories] = useState([
    'Ice Bath Therapy',
    'Jacuzzi Therapy',
    'Steam Therapy',
    'Combo Packages'
  ]);

  return (
    <div className={styles.formWrapper}>
      <div className=' max-w-4xl mx-auto'>
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>Add New Service</h2>

          <form className=' space-y-6 sm:space-y-8' onSubmit={handleSubmit}>
            <div className={styles.uploadWrapper}>
              <label className={styles.uploadLabel}>
                {formData.preview ? (
                  <img
                    src={formData.preview}
                    alt="Preview"
                    className={styles.previewImage}
                  />
                ) : (
                  <div className=' text-center p-4'>
                    <FiUpload className={styles.uploadIcon} />
                    <p className={styles.uploadText}>
                      Click to upload product image
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  required
                />
              </label>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-base sm:text-lg text-white">
                  Service Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder="Enter Product Name"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-base sm:text-lg text-white">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter Product Description"
                  className={styles.inputField + ' h-32 sm:h-40'}
                  required
                />
              </div>

              <div className={styles.gridTwoCols}>
                <div>
                  <label className="block mb-2 text-base sm:text-lg text-blue-500">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`${styles.inputField} bg-blue-900 text-white`}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(c => (
                      <option key={c} value={c} className="bg-blue-500 text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-base sm:text-lg text-blue-500">
                    Price (₹)
                  </label>
                  <div className={styles.relativeInput}>
                    <FaRupeeSign className={`${styles.rupeeIcon} text-blue-500`} />
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className={styles.inputField + ' pl-10 sm:pl-12 bg-blue-900 text-white'}
                      placeholder="Enter Price"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className={styles.gridTwoCols}>
                <div>
                <label className="block mb-2 text-base sm:text-lg text-blue-400">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="text-2xl sm:text-3xl transition-transform hover:scale-110"
                    >
                      <FiStar
                        className={
                          star <= (hoverRating || formData.rating)
                            ? 'text-blue-400 fill-current'
                            : 'text-amber-100/30'
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className='block mb-2 text-base sm:text-lg text-blue-500'>
                  Popularity
                </label>

                <div className='flex items-center gap-3 sm:gap-4'>
                  <button
                    type='button'
                    onClick={handleHearts}
                    className='text-2xl sm:text-3xl text-blue-500 hover:text-blue-400 transition-colors animate-pulse'
                  >
                    <FiHeart />
                  </button>
                  <input type="number" name='hearts'
value={formData.hearts} onChange={handleInputChange}
className={styles.inputField + 'pl-10 sm:pl-12'}
placeholder='Enter Likes'
min='0' required />
                </div>
              </div>
              </div>
              <button type='submit' className={styles.actionBtn}>
Add To Services
</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddItems
