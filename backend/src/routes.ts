import { Router } from "express";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/userCases/createClient/CreateClientController";
import { CreateDeliveryController } from "./modules/deliveries/userCases/createDelivery/CreateDeliveryController";
import { FindAllWithoutEndDateController } from "./modules/deliveries/userCases/findAllWithoutEndDate/FindAllWithoutEndDateController";
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
// Procurando entregas sem deliverman
const findAllWithoutEndDateController = new FindAllWithoutEndDateController();

routes.post("/authenticate/client", authenticateClientController.handle);
routes.post("/authenticate/deliveryman", authenticateDeliverymanController.handle);

routes.post("/client/", createClientController.handle);
routes.post("/deliveryman", createDeliverymanController.handle );
// seleção de item do cliente( Salvando entrega)
routes.post("/delivery", ensureAuthenticateClient, createDeliveryController.handle)
// Listando pedidos sem um deliveryman
routes.get("/delivery/available", findAllWithoutEndDateController.handle)


export {routes};