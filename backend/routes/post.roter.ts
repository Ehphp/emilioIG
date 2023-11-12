import express, { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';



const router: Router = express.Router();
const prisma = new PrismaClient();


router.get('/posts', async (req: Request, res: Response) => {
    try {
        const allPosts = await prisma.post.findMany();
        res.json(allPosts)

    } catch {
        res.status(404).send(console.log('no post founf');
        )
    }

})



const createPost = async (req: Request, res: Response) => {
    try {
        const { title, content, authorId } = req.body; // Assicurati di passare questi dati nel body della richiesta

        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                authorId,
            },
        });

        res.status(201).json({ message: 'Post creato con successo', post: newPost });
    } catch (error) {
        res.status(500).json({ error: 'Impossibile creare il post', message: error.message });
    }
};