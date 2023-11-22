import express, { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';



const commentRouter: Router = express.Router();
const prisma = new PrismaClient();
//getByID
commentRouter.get('/comment/:id', async (req: Request, res: Response) => {
    try {
        const commentId = Number(req.params.id);
        const comment = await prisma.comment.findUnique({
            where: { id: commentId },
        });

        if (!comment) {
            res.status(404).json({ message: 'Comment not found' });
        } else {
            res.json(comment);
        }
    } catch (error: any) {
        res.status(500).json({ error: 'Unable to find comment by id', message: error.message });
    }
});

//getALll
commentRouter.get('/comments', async (req: Request, res: Response) => {
    try {
        const allComments = await prisma.comment.findMany();
        res.json(allComments)
        allComments
    } catch {
        res.status(404).send(console.log('no comment founf')
        )
    }

})
//getALllcomment for post
commentRouter.get('/post/comments/:postId', async (req: Request, res: Response) => {
    try {
        const postId = Number(req.params.postId);

        const comments = await prisma.comment.findMany({
            where: { postId },
            include: {
                user: true,
            },

        });

        res.json(comments);
    } catch (error: any) {
        res.status(500).json({ error: 'Unable to found comments for the post', message: error.message });
    }
});


// get all TAg for comment
commentRouter.get('/comment/:commentId/tags', async (req, res) => {
    try {
        const commentId = Number(req.params.commentId);

        const tags = await prisma.commentTag.findMany({
            where: { commentId },
            include: {
                tag: true,
            },
        });

        const tagNames = tags.map((commentTag) => commentTag.tag.name);

        res.json({ tags: tagNames });
    } catch (error: any) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//createOne
commentRouter.post('/comment', async (req: Request, res: Response) => {
    try {
        const { content, postId, userId } = req.body;

        const newComment = await prisma.comment.create({
            data: {
                content,
                postId,
                userId,


            }, include: {
                user: true,

            }
        });

        res.status(201).json({ message: 'Comment created', comment: newComment });
    } catch (error: any) {
        res.status(500).json({ error: 'cant  create comment', message: error.message });
    }
});

//delete
commentRouter.delete('/comment/:id', async (req: Request, res: Response) => {
    try {
        const commentId = Number(req.params.id);
        const comment = await prisma.comment.findUnique({
            where: { id: commentId },
        });

        if (!comment) {
            res.status(404).json({ message: 'Comment not found' });
        } else {
            await prisma.comment.delete({
                where: { id: commentId },
            });
            res.json({ message: ' deleted successfully', comment });
        }
    } catch (error: any) {
        res.status(500).json({ error: 'can not delete comment', message: error.message });
    }
});


export default commentRouter