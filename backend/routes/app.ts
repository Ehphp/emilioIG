import express, { Request, Response } from 'express';
import userRouter from './user.router';
import postRouter from './post.router'
import commentRouter from './comment.router';
import tagRouter from './tag.router';
import likeRouter from './like.router'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(cors({
    origin: 'http://localhost:3000'
}));


app.use(userRouter, postRouter, commentRouter, tagRouter, likeRouter)




app.listen(4000, () => {
    console.log('Server is running on port 400000000☄️🚀😒');
}).on('error', (err) => {
    console.error(' server connection error:', err);
});

