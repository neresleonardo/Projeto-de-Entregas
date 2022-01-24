import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken";

interface IAuthenticateDeliveryman {
    username: string;
    password: string;
};

 export class AuthenticateDeliverymanUseCase{
     async execute({username, password} : IAuthenticateDeliveryman){
        const deliveryman = await prisma.deliveryman.findFirst({
            where: {
                username
            }
        })

        if(!deliveryman){
            throw new Error("Usuário não existe");
        };

        const passwordMatch = await compare(password, deliveryman.password)

        if(!passwordMatch){
            throw new Error("Usuário não existe");
        };

        const token = sign({username}, "2556f99570e59c0418d6137b848e4238", {
            subject: deliveryman.id,
            expiresIn: "1d",
        });
        return token;
     }
 }