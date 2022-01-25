import { Router } from "express";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman";
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/userCases/createClient/CreateClientController";
import { FindAllDeliveriesController } from "./modules/clients/userCases/deliveries/FindAllDeliveriesController";
import { CreateDeliveryController } from "./modules/deliveries/userCases/createDelivery/CreateDeliveryController";
import { FindAllWithoutEndDateController } from "./modules/deliveries/userCases/findAllWithoutEndDate/FindAllWithoutEndDateController";
import { UpdateDeliverymanController } from "./modules/deliveries/userCases/updateDelivery/useCases/UpdateDeliverymanController";
import { UpdateEndDateController } from "./modules/deliveries/userCases/updateEndDate/UpdateEndDateController";
import { UpdateEndDateUseCase } from "./modules/deliveries/userCases/updateEndDate/UpdateEndDateUseCase";
import { CreateDeliverymanController } from "./modules/deliveryman/createDeliveryman/CreateDeliverymanController";
import { FinFindAllDeliveriesDeliverymanController } from "./modules/deliveryman/userCases/findAllDeliveries/FindAllDeliveriesDeliverymanController";
const routes = Router();

//////////////////////// Chamada //////////////////////////

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
// Atualizando entregador
const updateDeliverymanController = new UpdateDeliverymanController();
const findAllDeliveriesController = new FindAllDeliveriesController();
const finFindAllDeliveriesDeliverymanController = new FinFindAllDeliveriesDeliverymanController()
// Atualizando chegada do delivery (end_date)
const updateEndDateController = new UpdateEndDateController();
////////////////////////////////////////////////////////////////

//////////////////////POST GET PUT DELETE ///////////////////////

routes.post("/authenticate/client", authenticateClientController.handle);
routes.post("/authenticate/deliveryman", authenticateDeliverymanController.handle);

routes.post("/client/", createClientController.handle);
routes.post("/deliveryman", createDeliverymanController.handle);
// seleção de item do cliente( Salvando entrega)
routes.post("/delivery", ensureAuthenticateClient, createDeliveryController.handle)
// Listando pedidos sem um deliveryman
routes.get("/delivery/available", ensureAuthenticateDeliveryman, findAllWithoutEndDateController.handle)
// update
routes.put("/delivery/updateDeliveryman/:id", ensureAuthenticateDeliveryman,updateDeliverymanController.handle)
// Listando para clientes pedidos já feitos 
routes.get("/client/deliveries",ensureAuthenticateClient, findAllDeliveriesController.handle)
// Buscando entregas do entregador
routes.get("/deliveryman/deliveries", ensureAuthenticateDeliveryman, finFindAllDeliveriesDeliverymanController.handle)
// Atualizando chegada do pedido
routes.put("/delivery/updateEndDate/:id", ensureAuthenticateDeliveryman, updateEndDateController.handle)
//////////////////////////////////////////////////////////////////////////

export { routes };