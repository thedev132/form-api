const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

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
