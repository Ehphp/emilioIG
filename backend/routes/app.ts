import express, { Request, Response } from 'express';
import userRouter from './user.router';
const app = express()


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use(express.json());
app.use(userRouter)




app.listen(4000, () => {
    console.log('Server is running on port 300000000☄️🚀😒');
}).on('error', (err) => {
    console.error(' server connection error:', err);
});

