import { ClientAttributes, ClientDocument } from "../../model/Client";
import { IClientRepository, ISaveClientDTO } from "../IClientRepository";

class ClientRepositoryInMemory implements IClientRepository {
  clients: ClientAttributes[] = [];
  async save({
    name,
    cpf,
    email,
    phone,
  }: ISaveClientDTO): Promise<ClientAttributes> {
    const client = new ClientAttributes();

    Object.assign(client, {
      name,
      cpf,
      email,
      phone,
      id: "kf9owmsjfie2",
    });

    this.clients.push(client);

    return client;
  }

  async getAll(): Promise<ClientAttributes[]> {
    return this.clients;
  }

  async getById(id: string): Promise<ClientAttributes> {
    return this.clients.find((client) => client.id === id);
  }

  async getByName(name: string): Promise<Boolean> {
    const client = this.clients.find((client) => client.name === name);
    return client != null;
  }

  async delete(id: string): Promise<ClientAttributes> {
    const client = this.clients.find((client) => client.id === id);
    this.clients.splice(this.clients.indexOf(client), 1);

    return client;
  }

  async update(
    id: string,
    name: string,
    cpf: string,
    email: string,
    phone: string
  ): Promise<ClientAttributes> {
    const client = this.clients.find((client) => client.id === id);

    Object.assign(client, {
      name,
      cpf,
      email,
      phone,
      id: "kf9owmsjfie2",
    });

    return client;
  }
}

export { ClientRepositoryInMemory };
