import { prisma } from "../../../database/prismaClient";
import { hash } from "bcrypt"

// Inteface com os types
interface ICreateDeliveryman {
    username: string;
    password: string;
}
// xlass que vai ser exportada 
export class CreateDeliverymanUseCase {

    async execute({ password, username}: ICreateDeliveryman) {
        // Validar se o usuário existe
        const ClienExist = await prisma.deliveryman.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive"
                }
            }
        })
        // Caso ele exista retornando o erro
        if(ClienExist) {
           throw new Error("Deliveryman already exists") 
        }
        //Criptografar a senha com bcrypt
        const hashpassword = await hash(password, 10);

        //Salvar o Client
       const deliveryman = await prisma.deliveryman.create({
            data: {
                username,
                password: hashpassword // passando a criptográfia
            },
        })
        //retornando client
        return deliveryman // retornando os dados
    }
}