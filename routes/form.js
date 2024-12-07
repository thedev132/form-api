const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/forms:
 *   get:
 *     summary: Get all forms
 *     description: Retrieve a list of all submitted forms.
 *     responses:
 *       200:
 *         description: A list of forms.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   message:
 *                     type: string
 */

router.get('/', async (req, res) => {
    try {
        const forms = await prisma.form.findMany({
            include: { replies: true },
        });
        res.json(forms);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching forms' });
    }
});


/**
 * @swagger
 * /api/forms:
 *   post:
 *     summary: Submit a new form
 *     description: Submit a new form with title, name, email, and message.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - name
 *               - email
 *               - message
 *             properties:
 *               title:
 *                 type: string
 *                 example: Feedback Form
 *               name:
 *                 type: string
 *                 example: Jane Doe
 *               email:
 *                 type: string
 *                 example: jane.doe@example.com
 *               message:
 *                 type: string
 *                 example: This is my feedback.
 *     responses:
 *       201:
 *         description: Form submitted successfully.
 */
router.post('/', async (req, res) => {
    const { title, name, email, message } = req.body;

    if (!title || !name || !email || !message) {
        return res.status(400).json({ error: 'Title, name, email, and message are required.' });
    }

    try {
        const newForm = await prisma.form.create({
            data: { title, name, email, message },
        });
        res.status(201).json({ success: true, form: newForm });
    } catch (error) {
        res.status(500).json({ error: 'Error creating form' });
    }
});

module.exports = router;
