import asyncHandler from 'express-async-handler'
import { packageItem } from '../modals/packageModal.js'

//GET PACKAGE
export const getPackage = asyncHandler( async (req, res) => {
    const items = await packageItem.find({ user: req.user._id }).populate('item');

    const formatted = items.map(ci => ({
        _id: ci._id.toString(),
        item: ci.item,
        quantity: ci.quantity
    }))
    res.json(formatted)
})

//ADD PACKAGE ITEM
export const addPackageItem = asyncHandler( async (req, res) => {
    const { itemId, quantity } = req.body;
    if(!itemId || typeof quantity !== 'number') {
        res.status(400);
        throw new Error('itemId and quantity are required')
    }

    let packageItem = await packageItem.findOne({ user: req.user._id, item: itemId })

    if(packageItem) {
        packageItem.quantity = Math.max(1, packageItem.quantity + quantity)

        if(packageItem.quantity < 1) {
            await packageItem.remove();
            return res.json({ _id: packageItem._id.toString(), item: packageItem.item, quantity: 0 })
        }
        await packageItem.save();
        await packageItem.populate('item');
        return res.json({ 
            _id: packageItem._id.toString(),
            item: packageItem.item,
            quantity: packageItem.quantity 
        })    
    }

    packageItem = await packageItem.create({
        user: req.user._id,
        item: itemId,
        quantity,
    })
    await packageItem.populate('item');
    res.status(201).json({ 
        _id: packageItem._id.toString(),
        item: packageItem.item,
        quantity: packageItem.quantity,
    })
})

//LETS CREATE A METHOD TO UPDATE THE PACKAGE ITEM QUANTITY
export const updatePackageItem = asyncHandler( async (req, res) => {
    const { quantity } = req.body;

    const packageItem = await packageItem.findOne({_id: req.params.id, user: req.user._id })
    if(!packageItem) {
        res.status(404);
        throw new Error("Package Item Not Found")
    }
    packageItem.quantity = Math.max(1, quantity);
    await packageItem.save();
    await packageItem.populate('item');
    res.json({ 
        _id: packageItem._id.toString(),
        item: packageItem.item,
        quantity: packageItem.quantity,
     })
})

//DELETE FUNCTION
export const deletePackageItem = asyncHandler( async (req, res) => {
    const packageItem = await packageItem.findOne({_id: req.params.id, user: req.user._id })
    if(!packageItem) {
        res.status(404);
        throw new Error("Package Item Not Found")
    }
    await packageItem.remove();
    res.json({ _id: req.params.id })
})

//ClEAR PACKAGE
export const clearPackage = asyncHandler( async (req, res) => {
    await packageItem.deleteMany({ user: req.user._id })
    res.json({ message: "Package Cleared" })
})
