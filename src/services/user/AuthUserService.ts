import { compare } from "bcrypt";
import {sign} from "jsonwebtoken";
import prismaClient from "../../prisma/index";
import {AuthRequest} from "../../models/interfaces/user/auth/AuthRequest";

class AuthUserService {
    async execute({email, password}: AuthRequest){
        if (!email) {
            throw new Error("Email is required");
        }

        if (!password) {
            throw new Error("Password is required");
        }

        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if (!user) {
            throw new Error("Wrong username or password")
        }

        const passwordMatch = await compare(password, user?.password);

        if (!passwordMatch) {
            throw new Error("Wrong password")
        }	

        const token = sign(
            {
                name: user?.name,
                email: user?.email
            },
            process.env.JWT_SECRET as string,
            {
                subject: user?.id,
                expiresIn: "1d"
            }
        );

        return {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            token: token
        }
    }
}

export {AuthUserService}