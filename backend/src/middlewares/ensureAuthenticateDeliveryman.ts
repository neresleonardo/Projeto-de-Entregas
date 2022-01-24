import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string,
}

export async function ensureAuthenticateDeliveryman(
    request: Request,
    response: Response,
    next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({ // Erro de não autorização

            message: "Token Missing",
        })
    }
    // Bearer 4563256345-45234654b43
    const [, token] = authHeader.split(" ")

    try {
        const { sub } = verify(
            token, "2556f99570e59c0418d6137b848e4238") as IPayload;

        request.id_deliveryman = sub;
        return next();
    }
    catch (err) {
        return response.status(401).json({
            message: "Ivalid Token!"
        })
    }

}