const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/forms/{id}/replies:
 *   post:
 *     summary: Reply to a form
 *     description: Submit a reply to a specific form by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the form to reply to.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - reply
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               reply:
 *                 type: string
 *                 example: Thank you for your feedback!
 *     responses:
 *       201:
 *         description: Reply submitted successfully.
 *       404:
 *         description: Form not found.
 */

router.post('/:id/replies', async (req, res) => {
    const { id } = req.params;
    const { name, reply } = req.body;

    if (!name || !reply) {
        return res.status(400).json({ error: 'Name and reply are required.' });
    }

    try {
        const form = await prisma.form.findUnique({ where: { id: parseInt(id, 10) } });
        if (!form) {
            return res.status(404).json({ error: 'Form not found.' });
        }

        const newReply = await prisma.reply.create({
            data: { name, reply, formId: form.id },
        });

        res.status(201).json({ success: true, reply: newReply });
    } catch (error) {
        res.status(500).json({ error: 'Error creating reply' });
    }
});


/**
 * @swagger
 * /api/forms/{id}/replies:
 *   get:
 *     summary: Get all replies for a specific form
 *     description: Retrieve a list of all replies for a form identified by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the form to get replies for.
 *     responses:
 *       200:
 *         description: A list of replies for the form.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   formId:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   reply:
 *                     type: string
 *       404:
 *         description: Form not found.
 */

router.get('/:id/replies', async (req, res) => {
    const { id } = req.params;

    try {
        const replies = await prisma.reply.findMany({
            where: { formId: parseInt(id, 10) },
        });
        res.json(replies);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching replies' });
    }
});

module.exports = router;
