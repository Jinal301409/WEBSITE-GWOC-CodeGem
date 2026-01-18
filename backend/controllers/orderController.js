import Stripe from 'stripe';
import Order from '../modals/orderModal.js';
import 'dotenv/config'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//CREATE ORDER FUNCTION
export const createOrder = async (req, res) => {
    try {
        const {
            firstName, lastName, phone, email, address, city, zipCode, paymentMethod, subtotal, tax, total, items
        } = req.body;

        if(!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Invalid or empty items array" })
        }
        
        const orderItems = items.map(({ item, name, price, imageUrl, quantity }) => {
            const base = item || {};
            return {
                item: {
                    name: base.name || name || 'unknown',
                    price: Number((base.price ?? price ) || 0),
                    imageUrl: base.imageUrl || imageUrl || ''
                },
                quantity: Number(quantity) || 0
            }
        });

        //DEFAULT SHIPPING COST
        const shippingCost = 0;
        let newOrder;

        if (paymentMethod === 'online') {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',

                line_items: orderItems.map(o => ({
                    price_data: {
                        currency: 'inr',
                        product_data: { name: o.item.name },
                        unit_amount: Math.round(o.item.price * 100)
                    },
                    quantity: o.quantity
                })),
                customer_email: email,
                success_url: `${process.env.FRONTEND_URL}/myorder/verify?success=true&session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.FRONTEND_URL}/checkout?payment_status=cancel`,
                metadata: { firstName, lastName, email, phone }
            });

            newOrder = new Order({
                user:req.user?._id,
                firstName, lastName, phone, email, address, city, zipCode, paymentMethod, subtotal,
                tax, total, shipping: shippingCost, items: orderItems,
                paymentIntentId: session.payment_intent || null,
                sessionId: session.id || null,
                paymentStatus: 'pending'
            });

            await newOrder.save();
            return res.status(201).json({ order: newOrder, checkoutUrl: session.url })
        }

        //IF PAYMENT IS COD OR OTHER NON-ONLINE
        newOrder = new Order({
                user: req.user?._id,
                firstName, lastName, phone, email, address, city, zipCode, paymentMethod, subtotal,
                tax, total, shipping: shippingCost, items: orderItems,
                paymentIntentId: null,
                sessionId: null,
                paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending'
        });

        await newOrder.save();
        return res.status(201).json({ order: newOrder, checkoutUrl: null });
    }
    catch (error) {
        console.error('CreateOrder Error:', error );
        res.status(500).json({ message: 'Server Error', error: error.message })
    }
};

// CONFIRM PAYMENT
export const confirmPayment = async (req, res) => {
    try {
        const { session_id } = req.query
        if (!session_id) return res.status(400).json({ message: 'Session_id required' });

        const session = await stripe.checkout.sessions.retrieve(session_id)
        if(session.payment_status === 'paid' ) {
            const order = await Order.findOneAndUpdate(
                { sessionId: session_id },
                {paymentStatus: 'succeeded' },
                { new: true }
            );
            if(!order) return res.status(404).json({ message: 'Order not found' })
            return res.json(order)
        }
        return res.status(400).json({ message: 'payment not completed '})
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', err: error.message })
    }
}

// GET ORDER
export const getOrders = async (req, res) => {
    try {
        const filter = {user: req.user._id}; //order belongs to that particular user
        const rawOrders = await Order.find(filter).sort({createdAt: -1}).lean()

        // FORMAT
        const formatted = rawOrders.map(o => ({
            ...o,
            items: o.items.map(i => ({
                _id: i._id,
                item: i.item,
                quantity: i.quantity
            })),
            createdAt: o.createdAt,
            paymentStatus: o.paymentStatus
        }));
        res.json(formatted)
    }
    catch (error) {
        console.error('getOrders Error:', error );
        res.status(500).json({ message: 'Server Error', error: error.message })
    }
}

// ADMIN ROUTE GET ALL ORDERS
export const getAllOrders = async (req,res) => {
    try {
        const raw = await Order
            .find({})
            .sort({ createdAt: -1 })
            .lean()

            const formatted = raw.map(o => ({
                _id: o._id,
                user: o.user,
                firstName: o.firstName || '',
                lastName: o.lastName || '',
                email: o.email || '',
                phone: o.phone || '',
                address: o.address ?? o.shippingAddress ?? '',
                city: o.city ?? o.shippingAddress?.city ?? '',
                zipCode: o.zipCode ?? o.shippingAddress?.zipCode ?? '',

                paymentMethod: o.paymentMethod || null, 
                paymentStatus: o.paymentStatus || 'pending',
                status: o.status || 'scheduled',
                createdAt: o.createdAt || new Date(),

                items: (o.items || []).map(i => ({
                    _id: i._id,
                    item: i.item || { name: i.item?.name || '', price: i.item?.price || 0, imageUrl: i.item?.imageUrl || '' },
                    quantity: i.quantity || 0
                }))
            }));

            return res.json(formatted || []);
    }
    catch (error) {
            console.error('getAllOrders Error: ', error);
            return res.status(500).json({ message: 'Server Error', error: error.message })
    }
}

// UPDATE ORDER WITHOUT TOKEN FOR ADMIN
export const updateAnyOrder = async (req, res) => {
    try {
        const updated = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Order not found' })
        }
        res.json(updated)
    }
    catch (error) {
        console.error('updateAnyOrder Error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message })
    }
}

// GET ORDER BY ID
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if(!order) return res.status(404).json({ message: 'Order not found' });

        if(!order.user.equals(req.user._id)) {
            return res.status(403).json({ message: 'Access Denied' })
        }

        if(req.query.email && order.email !== req.query.email) {
            return res.status(403).json({  message: 'Access Denied' })
        }
        res.json(order)
    }
    catch (error) {
        console.error('getOrderById Error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message })
    }
}

// UPDATE BY ID
export const updateOrder = async (req, res) => {
     try {
        const order = await Order.findById(req.params.id);
        if(!order) return res.status(404).json({ message: 'Order not found' });

        if(!order.user.equals(req.user._id)) {
            return res.status(403).json({ message: 'Access Denied' })
        }

        if(req.body.email && order.email !== req.body.email) {
            return res.status(403).json({  message: 'Access Denied' })
        }

        const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated)
    }
    catch (error) {
        console.error('getOrderById Error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message })
    }
}