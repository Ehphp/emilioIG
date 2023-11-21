import express, { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import authenticateToken from './middelwareverificaToken';
import upload from '../middleware/multerConfig';




const postRouter: Router = express.Router();
const prisma = new PrismaClient();

postRouter.get('/posts', async (req: Request, res: Response) => {
    try {
        const allPosts = await prisma.post.findMany({

            orderBy: {
                createdAt: 'desc',
            },
            include: {
                likes: true,
                comments: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        const postsWithImageUrls = allPosts.map(post => {
            if (post.imgSrc) {
                if (post.imgSrc.startsWith('http://') || post.imgSrc.startsWith('https://')) {
                    return post;
                } else {

                    return {
                        ...post,
                        imgSrc: `http://localhost:4000/${post.imgSrc}`
                    };
                }
            }
            return post;
        });

        res.json(postsWithImageUrls);
    } catch (error: any) {
        res.status(404).send('No posts found');
    }
});


//getUnique

postRouter.get('/post/:id', async (req: Request, res: Response) => {
    try {
        const postId = Number(req.params.id);
        const post = await prisma.post.findUnique({
            where: { id: postId }, include: {
                likes: true,
            },
        });

        if (!post) {
            res.status(404).json({ message: 'Post not found' });
        } else {
            res.json(post);
        }
    } catch (error: any) {
        res.status(500).json({ error: 'Impossible find post', message: error.message });
    }
});

//getALllpostsByUserId
postRouter.get('/user/:userId/posts', async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);

    try {
        const userPosts = await prisma.post.findMany({
            where: {
                authorId: userId,
            }, include: {
                likes: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        const postsWithImageUrls = userPosts.map(post => {
            if (post.imgSrc) {
                if (post.imgSrc.startsWith('http://') || post.imgSrc.startsWith('https://')) {
                    return post;
                } else {

                    return {
                        ...post,
                        imgSrc: `http://localhost:4000/${post.imgSrc}`
                    };
                }
            }
            return post;
        });

        res.json(postsWithImageUrls);
    } catch (error: any) {
        res.status(500).send({ error: 'Internal server error' });
    }
});


//get tag by name
postRouter.get('/posts/:tagName', async (req, res) => {
    const tagName = req.params.tagName;

    try {
        const posts = await prisma.post.findMany({
            where: {
                postTags: {
                    some: {
                        tag: {
                            name: tagName,
                        },
                    },
                },
            },
            include: {
                postTags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });

        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts by tag name:', error);
        res.status(500).send('Internal Server Error');
    }
});


//create

postRouter.post('/post', authenticateToken, upload.single('image'), async (req: Request, res: Response) => {
    try {
        const { title, description, authorId } = req.body;
        const numericAuthorId = Number(authorId);

        if (isNaN(numericAuthorId)) {
            return res.status(400).json({ error: 'Invalid authorId not a number' });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        const imgSrc = req.file.path;

        const newPost = await prisma.post.create({
            data: {
                title,
                description,
                authorId: numericAuthorId,
                imgSrc,
            },
        });

        res.status(201).json({ message: 'Post created', post: newPost });
    } catch (error: any) {
        res.status(500).json({ error: 'Impossible create post', message: error.message });
    }
});



//createMany DevTool
postRouter.post('/posts', async (req, res) => {
    try {
        const postsData = req.body.posts;

        const newPosts = await prisma.post.createMany({
            data: postsData,
        });

        res.status(201).json({ message: 'Posts created', posts: newPosts });
    } catch (error: any) {
        res.status(500).json({ error: 'Unable to create posts', message: error.message });
    }
});


// update
postRouter.put('/post/:id', async (req: Request, res: Response) => {
    try {
        const postId = Number(req.params.id);
        const { title, description, authorId, imgSrc } = req.body;

        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: {
                title,
                imgSrc,
                description,
                authorId,
            },
        });

        res.json({ message: 'Post aggiornato successfully', post: updatedPost });
    } catch (error: any) {
        res.status(500).json({ error: 'Impossible update post', message: error.message });
    }
});

// delete
postRouter.delete('/post/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
        const postId = Number(req.params.id);
        console.log(postId);

        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            res.status(404).json({ message: 'Post non found' });
        } else {
            await prisma.post.delete({
                where: { id: postId },
            });
            res.json({ message: 'Post eliminato con successo', post });
        }
    } catch (error: any) {
        res.status(500).json({ error: 'Impossibile eliminare il post', message: error.message });
    }
});

//get all tagFot postsID
postRouter.get('/posts/:postId/tags', async (req, res) => {
    try {
        const postId = Number(req.params.postId);

        const tags = await prisma.postTag.findMany({
            where: { postId },
            include: {
                tag: true,
            },
        });

        const tagNames = tags.map((postTag) => postTag.tag.name);

        res.json({ tags: tagNames });
    } catch (error: any) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
export default postRouter