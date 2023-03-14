import { Router } from "express";
import { ClientController } from "../controllers/ClientController";

const clientsRoutes = Router();

const clientController = new ClientController();
clientsRoutes.post("/clients", clientController.save);

clientsRoutes.get("/clients", clientController.get);

clientsRoutes.get("/clientsbyid", clientController.getById);

clientsRoutes.put("/clients", clientController.update);

clientsRoutes.delete("/clients", clientController.delete);

export { clientsRoutes };
