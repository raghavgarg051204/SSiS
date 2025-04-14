import express from 'express';
import Review from '../models/Review.js';

const router = express.Router();

// Add a review
router.post('/add', async (req, res) => {
    try {
        const { username, movie, review, rating } = req.body;
        const newReview = new Review({ username, movie, review, rating });
        await newReview.save();
        res.status(201).json({ message: 'Review added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
