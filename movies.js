import express from 'express';
import Movie from '../models/Movie.js';

const router = express.Router();

// Fetch all movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
