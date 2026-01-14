import express from 'express'
import { addPackageItem, clearPackage, deletePackageItem, getPackage, updatePackageItem } from '../controllers/packageController.js'

import authMiddleWare from '../middleware/auth.js'

const router = express.Router();

router.route('/')
    .get(authMiddleWare, getPackage)
    .post(authMiddleWare, addPackageItem)

    router.route('/:id')
    .put(authMiddleWare, updatePackageItem)
    .delete(authMiddleWare, deletePackageItem)

export default router;