import express from 'express'
import multer from 'multer'
import { createItem, getItems, deleteItem } from '../controllers/itemController.js'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const itemRouter = express.Router()

// ensure uploads directory is absolute and exists (backend/uploads)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const uploadDir = path.join(__dirname, '..', 'uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// TYPE HERE MULTER FUNCTION TO STORE IMAGE
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req,file,cb) => cb(null, `${Date.now()}-${file.originalname}`),
})

const upload = multer({ storage });


itemRouter.post('/', upload.single('image'), createItem);
itemRouter.get('/', getItems);
itemRouter.delete('/:id', deleteItem);

export default itemRouter