import { prisma } from "../../../../../database/prismaClient";

interface IUpdate {
    id_delivery: string,
    id_deliveryman: string,
}

export class UpdateDeliverymanUseCase {
    async execute({id_delivery,id_deliveryman }:IUpdate ) {
        const result = await prisma.deliveries.update({
            where: {
                id: id_delivery
            },
            data: {
                id_deliveryman
            }
        });

        return result
    }
}