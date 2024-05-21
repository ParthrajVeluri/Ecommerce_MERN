import express from 'express';
import {random} from '../utils/auth';

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { name, email, password, address, phone } = req.body;
        if (!name || !email || !password || !address || phone){
            return res.sendStatus(400);
        }

        const salt = random();

    } catch (error) {
        console.log(error)
        return res.sendStatus(400);
    }

}