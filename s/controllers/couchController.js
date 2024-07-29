const Couch = require("../models/couch");

const createNewCouch = async (req, res) => {
    try {
        const { name, description, price, color, high, length, deep, images } = req.body;

        if (!name || !description || !price || !high || !length || !deep || !images) {
            return res.status(400).json({ message: 'All required fields must be filled out.' });
        }

        const couch = await Couch.create({
            name,description,price,color,high, length, deep,images: images || []
        });

        if (couch) {
            return res.status(201).json({ message: 'New couch created', couch });
        } else {
            return res.status(500).json({ message: 'Failed to create new couch' });
        }
    } catch (error) {
        console.error('Error creating new couch:', error);
        return res.status(500).json({ message: 'An error occurred while creating the couch.', error: error.message });
    }
};


const getAllCouches = async (req, res) => {
    try {
        const couches = await Couch.find().lean();
        res.status(200).json(couches);
    } catch (error) {
        console.error('Error fetching all couches:', error);
        res.status(500).json({ message: 'An error occurred while fetching couches.', error: error.message });
    }
};

const updateCouch = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, color, high, length, deep } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    try {
        const couch = await Couch.findById(id).exec();
        if (!couch) {
            return res.status(404).json({ message: 'Couch not found' });
        }

        // עדכון השדות
        couch.name = name;
        couch.description = description;
        couch.price = price;
        couch.color = color;
        couch.high = high;
        couch.length = length;
        couch.deep = deep;

        const updatedCouch = await couch.save();
        res.status(200).json({ message: `'${updatedCouch.name}' updated`, updatedCouch });
    } catch (error) {
        console.error('Error updating couch:', error);
        res.status(500).json({ message: 'An error occurred while updating the couch.', error: error.message });
    }
};

const deleteCouch = async (req, res) => {
    const { id } = req.params; // קבל את ה-ID מהנתיב
    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }
    try {
        const result = await Couch.findByIdAndDelete(id).exec();
        if (!result) {
            return res.status(404).json({ message: 'Couch not found' });
        }
        const reply = `Couch '${result.name}' ID ${result._id} deleted`;
        res.status(200).json({ message: reply });
    } catch (error) {
        console.error('Error deleting couch:', error);
        res.status(500).json({ message: 'An error occurred while deleting the couch.', error: error.message });
    }
};

const getCouchById = async (req, res) => {
    const { id } = req.params;
    try {
        const couch = await Couch.findById(id).lean();
        if (!couch) {
            return res.status(404).json({ message: 'No couch found' });
        }
        res.status(200).json(couch);
    } catch (error) {
        console.error('Error fetching couch by ID:', error);
        res.status(500).json({ message: 'An error occurred while fetching the couch.', error: error.message });
    }
};

module.exports = {
    createNewCouch,
    getAllCouches,
    getCouchById,
    deleteCouch,
    updateCouch
};
