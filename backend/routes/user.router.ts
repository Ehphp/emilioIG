import express, { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const userRouter: Router = express.Router();
const prisma = new PrismaClient();


type UserIdentifier = string | number;
//trova utenti per nome iniziale o id  
userRouter.get('/user/:identifier', async (req: Request, res: Response) => {
    const identifier: UserIdentifier = isNaN(+req.params.identifier)
        ? req.params.identifier
        : +req.params.identifier;

    try {
        if (typeof identifier === 'number') {
            const userId = identifier;
            const user = await prisma.user.findUnique({
                where: {
                    id: userId,
                }, include: {
                    followers: true,
                    following: true,

                }
            });
            if (user) {
                res.json(user);
            } else {
                res.status(404).send({ error: 'User not found' });
            }
        } else if (typeof identifier === 'string') {

            let users;
            users = await prisma.user.findMany({
                where: {
                    username: {
                        startsWith: identifier,
                    },
                }, include: {
                    followers: true,
                    following: true,

                }
            });

            if (users && users.length > 0) {
                res.json(users);
            } else {
                res.status(404).send({ error: 'No users found' });
            }

        }
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }

});
// get all 
userRouter.get('/users', async (req: Request, res: Response) => {

    const allUsers = await prisma.user.findMany();
    res.json(allUsers)

})


//vabbeh create a new user 
userRouter.post('/user', async (req: Request, res: Response) => {
    const { username, email, password, imgSrc } = req.body;
    if (req.body.password.length < 10) {

        res.json('password too short at least 10 char')
    } else {
        try {
            const newUser = await prisma.user.create({
                data: {
                    username,
                    email,
                    password,
                    imgSrc,
                },
            });

            res.json(newUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'can not create user' });
        }
    }

});

// Endpoint per il Registazione
userRouter.post('/signup/user', async (req: Request, res: Response) => {
    const { username, email, password, imgSrc } = req.body;

    if (password.length < 10) {
        res.status(400).json('Password too short, at least 10 characters');
    } else {
        try {
            const newUser = await prisma.user.create({
                data: {
                    username,
                    email,
                    password, // Non hashata
                    imgSrc,
                },
            });

            res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Cannot create user' });
        }
    }
});


//LOGIN
userRouter.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
            include: {
                followers: true,
                following: true,
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.password === password) {
            const token = jwt.sign({ id: user.id }, 'segretoSuperSegreto', { expiresIn: '3h' });
            res.json({ token, user });
        } else {
            res.status(401).json({ error: 'Invalid password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//createMany DevTool

userRouter.post('/users', async (req: Request, res: Response) => {
    try {
        const usersToCreate = req.body.users;
        const createdUsers = await prisma.user.createMany({
            data: usersToCreate,
        });

        res.json(createdUsers);
    } catch (error) {
        res.status(500).json({ error: 'Impossibile creare gli utenti' });
    }
});

//ediit user 

userRouter.put('/user/:id', async (req, res) => {
    const { username, email, password, imgSrc } = req.body;
    const userId = req.params.id;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(userId),
            },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (password && password.length < 10) {
            return res.json('Password too short, it should be at least 10 characters');
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: Number(userId),
            },
            data: {
                username,
                email,
                password,
                imgSrc,
            },
        });

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Could not update user' });
    }
});

// Delete byID
userRouter.delete('/user/:id', async (req: Request, res: Response) => {
    const userId = Number(req.params.id);

    try {
        const user = await prisma.user.delete({
            where: { id: userId },
        });

        res.json({ message: 'User deleted successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete user' });
    }
});





//addFollower

userRouter.put('/follow', async (req, res) => {
    const { userId, followerId } = req.body;

    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                followers: {
                    connect: { id: followerId }
                }
            }
        });


        res.status(200).send(`Follower aggiunto con successo`)
    } catch (error) {
        console.error(error);
        res.status(500).send("Errore nell'aggiungere il follower");
    }
});



userRouter.delete('/unfollow', async (req, res) => {
    const { userId, followerId } = req.body;

    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                followers: {
                    disconnect: { id: followerId }
                }
            }
        });


        res.status(200).send("Follower rimosso con successo");
    } catch (error) {
        console.error(error);
        res.status(500).send("Errore nella rimozione del follower");
    }
});

export default userRouter