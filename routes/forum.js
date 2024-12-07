const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    try {
        const forums = await prisma.form.findMany({
            include: { replies: true },
        });
        res.json(forums);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching forums' });
    }
});

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

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const form = await prisma.form.findUnique({
            where: { id: parseInt(id, 10) },
            include: { replies: true },
        });
        if (!form) {
            return res.status(404).json({ error: 'Form not found.' });
        }
        res.json(form);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching form' });
    }
});
module.exports = router;
