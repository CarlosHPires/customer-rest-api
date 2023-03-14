import { ClientService } from "../services/ClientService";
import { ClientRepository } from "../repositories/ClientRepository";
import { Request, Response } from "express";

const clientRepository = new ClientRepository();

class ClientController {
  async save(request: Request, response: Response): Promise<Response> {
    const { name, cpf, email, phone } = request.body;

    const clientService = new ClientService(clientRepository);

    const client = await clientService.save({ name, cpf, email, phone });

    return response.status(201).json({
      message: "successfully created",
      client: client,
    });
  }

  async get(request: Request, response: Response): Promise<Response> {
    const clientService = new ClientService(clientRepository);
    const clientList = await clientService.getAll();

    return response.json(clientList);
  }

  async getById(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;

    const clientService = new ClientService(clientRepository);
    const client = await clientService.getById(id as string);

    return response.status(201).json(client);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { name, cpf, email, phone } = request.body;

    const clientService = new ClientService(clientRepository);
    const changedClient = await clientService.update({
      name,
      cpf,
      email,
      phone,
    });

    return response.json({
      message: "successfully changed!",
      client: changedClient,
    });
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;

    const clientService = new ClientService(clientRepository);
    const deletedClient = await clientService.delete(id as string);

    return response.status(200).json({
      message: "successfully deleted!",
      client: deletedClient,
    });
  }
}

export { ClientController };
