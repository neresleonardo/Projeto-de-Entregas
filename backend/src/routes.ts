import { Router } from "express";
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/userCases/createClient/CreateClientController";
import { CreateDeliveryController } from "./modules/deliveries/userCases/createDelivery/CreateDeliveryController";
import { CreateDeliverymanController } from "./modules/deliveryman/createDeliveryman/CreateDeliverymanController";

const routes = Router();
//Criando um Cliente
const createClientController = new CreateClientController();
// Criando um deliveryman
const createDeliverymanController = new CreateDeliverymanController();
// Autenticando o cliente
const authenticateClientController = new AuthenticateClientController();
// Autenticando o deliveryman
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
// Cliente selecionando um item
const createDeliveryController = new CreateDeliveryController();

routes.post("/authenticate/client", authenticateClientController.handle);
routes.post("/authenticate/deliveryman", authenticateDeliverymanController.handle);

routes.post("/client/", createClientController.handle);
routes.post("/deliveryman", createDeliverymanController.handle );
// seleção de item do cliente( Salvando entrega)
routes.post("/delivery", createDeliveryController.handle)



export {routes};