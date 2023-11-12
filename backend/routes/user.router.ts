import express, { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';


const router: Router = express.Router();
const prisma = new PrismaClient();


type UserIdentifier = string | number;
//trova utenti per nome iniziale o id  
router.get('/user/:identifier', async (req: Request, res: Response) => {
    const identifier: UserIdentifier = isNaN(+req.params.identifier)
        ? req.params.identifier
        : +req.params.identifier;
    let users;

    try {
        if (typeof identifier === 'number') {
            const userId = identifier;
            const user = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
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
                },
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
router.get('/users', async (req: Request, res: Response) => {

    const allUsers = await prisma.user.findMany();
    res.json(allUsers)

})


//vabbeh create a new user 
router.post('/user', async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    if (req.body.password.length < 10) {

        res.json('password too short at least 10 char')
    } else {
        try {
            const newUser = await prisma.user.create({
                data: {
                    username,
                    email,
                    password,
                },
            });

            res.json(newUser);
        } catch (error) {
            res.status(500).json({ error: 'cant not create user' });
        }
    }

});

//ediit user 

router.put('/user/:id', async (req, res) => {
    const { username, email, password } = req.body;
    const userId = req.params.id;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(userId),
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
                id: parseInt(userId),
            },
            data: {
                username,
                email,
                password,
            },
        });

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Could not update user' });
    }
});
//delete user by id or exact username
router.delete('/user/:identifier', async (req, res) => {
    const identifier = req.params.identifier;
    let user;

    try {
        if (!isNaN(+identifier)) {
            const userId = parseInt(identifier);
            user = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
        } else {
            user = await prisma.user.findUnique({
                where: {
                    username: identifier,
                },
            });
        }

        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }

        await prisma.user.delete({
            where: {
                id: user.id,
            },
        });

        res.json({ message: 'User deleted ', user });
    } catch (error) {
        res.status(500).json({ error: 'cant delete user' });
    }
});

export default router