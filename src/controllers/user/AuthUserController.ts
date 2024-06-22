import {Request, Response} from "express";
import {AuthUserService} from "../../services/user/AuthUserService";
import { AuthRequest }from "../../models/interfaces/user/auth/AuthRequest";

class AuthUserController {
    async handle(req: Request, res: Response) {
        const {email, password} = req.body;
        const authUserService = new AuthUserService();
        const token = await authUserService.execute({
            email, password
        });
        
        return res.json(token);
    }
}

export {AuthUserController}