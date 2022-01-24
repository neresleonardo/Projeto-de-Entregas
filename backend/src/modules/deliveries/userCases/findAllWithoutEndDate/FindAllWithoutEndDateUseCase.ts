import { prisma } from "../../../../database/prismaClient"


export class FindAllWithoutEndDateUseCase{
    async execute(){

        // |Procurando se existe um end_at iguall a Null
        const deliveries = await prisma.deliveries.findMany({
            where: {
                end_at: null
            }
        })

        return deliveries;
    }
}