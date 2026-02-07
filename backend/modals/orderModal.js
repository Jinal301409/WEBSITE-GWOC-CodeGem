import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    item: {
        name: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        imageUrl: { type: String, required: true },
    },
    quantity: { type: Number, required: true, min: 1 },
}, { _id: true });

const orderSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    email: { type: String, required: true, index: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },

    address: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },

    items: [orderItemSchema],

    paymentMethod: {
        type: String,
        required: true,
        enum: ['cod', 'online', 'card', 'upi'],
        index: true
    },
    paymentIntentId: { type: String, index: true },
    sessionId: { type: String, index: true },
    transactionId: { type: String },

    paymentStatus: {
        type: String,
        enum: ['pending', 'succeeded', 'failed'],
        default: 'pending',
        index: true
    },

    subtotal: { type: Number, required: true, min: 0 },
    tax: { type: Number, required: true, min: 0 },
    shipping: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 0 },

    status: {
        type: String,
        // booking lifecycle statuses
        enum: ['scheduled', 'checkedIn', 'completed', 'cancelled'],
        default: 'scheduled',
        index: true
    },
    expectedDelivery: Date,
    delivered: Date
},
{ timestamps: true }
);

orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1, paymentStatus: -1 });

const Order = mongoose.model('Order', orderSchema);
export default Order;