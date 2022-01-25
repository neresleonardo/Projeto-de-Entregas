import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt"

// Inteface com os types
interface ICreateClient {
    username: string;
    password: string;
}
// xlass que vai ser exportada 
export class CreateClientUseCase {

    async execute({ password, username}: ICreateClient) {
        // Validar se o usuário existe
        const ClienExist = await prisma.clients.findFirst({
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
       const client = await prisma.clients.create({
            data: {
                username,
                password: hashpassword // passando a criptográfia
            },
        })
        //retornando client
        return client // retornando os dados
    }
}