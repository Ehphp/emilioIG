import express, { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';


const tagRouter: Router = express.Router();
const prisma = new PrismaClient();

//getAll
tagRouter.get('/tags', async (req: Request, res: Response) => {
    try {
        const allTags = await prisma.tag.findMany();
        res.json(allTags)
        allTags
    } catch {
        res.status(404).send(console.log('no tag founf')
        )
    }

})
//getByID
tagRouter.get('/tag/:id', async (req: Request, res: Response) => {
    try {
        const tagId = Number(req.params.id);
        const tag = await prisma.tag.findUnique({
            where: { id: tagId },
        });

        if (!tag) {
            res.status(404).json({ message: 'tag not found' });
        } else {
            res.json(tag);
        }
    } catch (error: any) {
        res.status(500).json({ error: 'cannot find tag by id', message: error.message });
    }
});

//get all tag by postId
tagRouter.get('/tag/post/:postId', async (req: Request, res: Response) => {
    try {
        const postId = Number(req.params.postId);

        const postWithTags = await prisma.post.findUnique({
            where: { id: postId },
            include: {
                postTags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });

        if (!postWithTags) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const tags = postWithTags.postTags.map((postTag) => postTag.tag);

        res.status(200).json({ tags });

    } catch (error: any) {
        res.status(500).json({ error: 'Can not find tags by post id', message: error.message });
    }
});

//get all tag by commentId

tagRouter.get('/tag/comment/:commentId', async (req: Request, res: Response) => {
    try {
        const commentId = Number(req.params.commentId);

        const commentWithTags = await prisma.comment.findUnique({
            where: { id: commentId },
            include: {
                commentTags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });

        if (!commentWithTags) {
            return res.status(404).json({ error: 'comment not found' });
        }

        const tags = commentWithTags.commentTags.map((commentTag) => commentTag.tag);

        res.status(200).json({ tags });

    } catch (error: any) {
        res.status(500).json({ error: 'Can not find tags by comment id', message: error.message });
    }
});


//create for postId
tagRouter.post('/tag', async (req: Request, res: Response) => {
    try {
        const { name, postId, } = req.body;

        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Create the tag
        const newTag = await prisma.tag.create({
            data: {
                name,
                posts: {
                    create: {
                        postId: post.id,
                    },
                },
            },
        });

        res.status(201).json({ message: 'Tag created', tag: newTag });
    } catch (error: any) {
        res.status(500).json({ error: 'cant  create tag', message: error.message });
    }
});


//create for commentId
tagRouter.post('/tag/comment', async (req: Request, res: Response) => {
    try {
        const { name, commentId, } = req.body;

        const comment = await prisma.comment.findUnique({
            where: { id: commentId },
        });

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Create the tag
        const newTag = await prisma.tag.create({
            data: {
                name,
                comments: {
                    create: {
                        commentId: comment.id,
                    },
                },
            },
        });

        res.status(201).json({ message: 'Tag created', tag: newTag });
    } catch (error: any) {
        res.status(500).json({ error: 'cant  create tag', message: error.message });
    }
});



tagRouter.delete('/tag/:id', async (req: Request, res: Response) => {
    try {
        const tagId = Number(req.params.id);
        const tag = await prisma.tag.findUnique({
            where: { id: tagId },
        });

        if (!tag) {
            res.status(404).json({ message: 'tag not found' });
        } else {
            await prisma.tag.delete({
                where: { id: tagId },
            });
            res.json({ message: ' deleted successfully', tag });
        }
    } catch (error: any) {
        res.status(500).json({ error: 'cannot delete tag', message: error.message });
    }
});

export default tagRouter