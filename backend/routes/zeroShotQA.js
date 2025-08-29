const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const router = express.Router();

// Initialize Gemini with your API key from .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

/**
 * @route   POST /api/zero-shot-qa
 * @desc    Answer a general question using zero-shot prompting
 * @access  Public
 */
router.post('/', async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ error: 'Question is required.' });
        }

        // This is a zero-shot prompt. We are not providing any examples.
        // We are directly asking the model the user's question.
        const prompt = question;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const answer = response.text();

        res.json({ answer });

    } catch (error) {
        console.error('Error in zero-shot QA:', error);
        res.status(500).json({ error: 'Failed to get an answer from the AI.' });
    }
});

module.exports = router;
