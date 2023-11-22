import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Nessun token, accesso non autorizzato
    }

    jwt.verify(token, 'segretoSuperSegreto', (err, decoded) => {
        if (err) {
            return res.sendStatus(403); // Token non valido o scaduto
        }

        next();
    });
};

export default authenticateToken;
