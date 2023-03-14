import { AppError } from "../errors/AppError";
import { ClientAttributes } from "../model/Client";
import { IClientRepository } from "../repositories/IClientRepository";

interface IRequest {
  id?: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
}

class ClientService {
  constructor(private clientsRepository: IClientRepository) {}
  async save({ name, cpf, email, phone }: IRequest): Promise<ClientAttributes> {
    const clientExists = await this.clientsRepository.getByName(name);

    if (clientExists) {
      throw new AppError("client already exists!");
    }
    return await this.clientsRepository.save({ name, cpf, email, phone });
  }

  async getAll(): Promise<ClientAttributes[]> {
    return await this.clientsRepository.getAll();
  }

  async getById(id: string): Promise<ClientAttributes> {
    return await this.clientsRepository.getById(id);
  }

  async update({
    id,
    name,
    cpf,
    email,
    phone,
  }: IRequest): Promise<ClientAttributes> {
    return await this.clientsRepository.update(id, name, cpf, email, phone);
  }

  async delete(id: string): Promise<ClientAttributes> {
    const deletedClient = await this.clientsRepository.delete(id);

    if (!deletedClient) {
      throw new AppError("client not found!");
    }

    return deletedClient;
  }
}

export { ClientService };
