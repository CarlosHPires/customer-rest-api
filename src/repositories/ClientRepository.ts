import Client, { ClientAttributes } from "../model/Client";
import { IClientRepository, ISaveClientDTO } from "./IClientRepository";

class ClientRepository implements IClientRepository {
  constructor() {}

  async save({
    name,
    cpf,
    email,
    phone,
  }: ISaveClientDTO): Promise<ClientAttributes> {
    const client: ClientAttributes = {
      create_at: new Date(),
      name: name,
      cpf: cpf,
      email: email,
      phone: phone,
      update_at: null,
    };
    return await Client.create(client);
  }

  async getAll(): Promise<ClientAttributes[]> {
    return await Client.find({});
  }

  async getById(id: string): Promise<ClientAttributes> {
    return await Client.findById(id);
  }

  async getByName(name: string): Promise<Boolean> {
    const client = await Client.findOne({ name: name });

    return client != null;
  }

  async delete(id: string): Promise<ClientAttributes> {
    return await Client.findByIdAndDelete(id);
  }

  async update(
    id: string,
    name: string,
    cpf: string,
    email: string,
    phone: string
  ): Promise<ClientAttributes> {
    return await Client.findOneAndUpdate(
      { id },
      {
        name: name,
        cpf: cpf,
        email: email,
        phone: phone,
        update_at: new Date(),
      },
      { new: true }
    );
  }
}

export { ClientRepository };
