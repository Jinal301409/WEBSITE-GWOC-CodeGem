import mongoose from 'mongoose';

const packageItemSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1
    }
}, {timestamps: true}
);

export const packageItem = mongoose.model('PackageItem', packageItemSchema);