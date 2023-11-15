import express, { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';


const likeRouter: Router = express.Router();
const prisma = new PrismaClient();


//getAll
likeRouter.get('/likes', async (req: Request, res: Response) => {
    try {
        const allLikes = await prisma.like.findMany();
        res.json(allLikes)
        allLikes
    } catch {
        res.status(404).send(console.log('no like foud')
        )
    }

})


//get all like and liker(userId) by postId
likeRouter.get('/like/post/:postId', async (req: Request, res: Response) => {
    try {
        const postId = Number(req.params.postId);

        const postWithlikes = await prisma.post.findUnique({
            where: { id: postId },
            include: {
                likes: true
            },
        },
        );

        if (!postWithlikes) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const likes = postWithlikes.likes.map((postlike) => postlike.userId);
        const numLike = likes.length
        res.status(200).json({ likes, numLike });

    } catch (error: any) {
        res.status(500).json({ error: 'Can not find likes by post id', message: error.message });
    }
});


//create for postId
likeRouter.post('/like/:postId/:userId', async (req: Request, res: Response) => {
    try {
        const postId = Number(req.params.postId);
        const userId = Number(req.params.userId);

        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        // Create the like
        const newlike = await prisma.like.create({
            data: {
                postId: postId,
                userId: userId
            },
        });

        res.status(201).json({ message: 'like created', like: newlike });
    } catch (error: any) {
        res.status(500).json({ error: 'cant  create like', message: error.message });
    }
});


likeRouter.delete('/like/:id', async (req: Request, res: Response) => {
    try {
        const likeId = Number(req.params.id);
        const like = await prisma.like.findUnique({
            where: { id: likeId },
        });

        if (!like) {
            res.status(404).json({ message: 'like not found' });
        } else {
            await prisma.like.delete({
                where: { id: likeId },
            });
            res.json({ message: ' deleted successfully', like });
        }
    } catch (error: any) {
        res.status(500).json({ error: 'cannot delete like', message: error.message });
    }
});
export default likeRouter 