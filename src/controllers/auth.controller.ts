import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/auth.service';
import { IUsers } from '../db/entites/users';
export class AuthController {

    public static async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const { name = null, email = null, password = null, is_active = true } = req.body;
            const user: IUsers = { email, name, password, is_active };
            const userCreated = await AuthService.signup(user);
            delete userCreated.password;
            res.status(200).json({
                message: "success",
                data: userCreated
            })
        } catch (e: any) {
            res.status(400).json({
                message: "fail",
                data: e.message
            })
        }
    }
    public static async signin(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (e) {
            throw e;
        }
    }
}