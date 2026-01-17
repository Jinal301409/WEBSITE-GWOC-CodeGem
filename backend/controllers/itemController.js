import itemModal from "../modals/itemModal.js";

export const createItem = async (req, res, next)=>{
    try {
        const { name, description, category, price, rating, hearts }=req.body;
        const imageUrl = req.file ?'/uploads/' + (req.file.filename): null;

        const total = Number(price)*1;
        const newItem = new itemModal({

            name,
            description,
            category,
            price, 
            rating,
            hearts,
            imageUrl, 
            total
        });

        const saved = await newItem.save();
        res.status(201).json(saved)
    }
    catch (err) {
        console.error(err);

        if(err.code == 11000) {
            return
        res.status(400).json({ message: "Item name already exists" });
        }
        res.status(500).json({
            message: "Failed to create item",
            error: err.message
        });
        }
    }


//GET FUNCTION TO GET ALL ITEMS
export const getItems = async (req, res, next) => {
  try {
    const items = await itemModal.find().sort({ createdAt: -1 });

    const host = `${req.protocol}://${req.get('host')}`;

    const withFullUrl = itemModel.applyTimestamps(i => ({
      ...i.toObject(),
      imageUrl: i.imageUrl ? host + i.imageUrl : '',
    }))

    res.json(withFullUrl)

  } catch (err) {
    next(err);
  }
}


// DELETE FUNCTION TO DELETE ITEMS
export const deleteItem = async (req, res, next) => {
    try {
        const removed = await itemModal.findByIdAndDelete(req.params.id);
        if(!removed) return res.status(404).json({ message: "Item not found" })
        res.status(204).end()
    } catch (err) {
        next(err);
    }
}