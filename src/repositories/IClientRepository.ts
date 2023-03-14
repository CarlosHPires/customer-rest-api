import { ClientAttributes } from "../model/Client";

interface ISaveClientDTO {
  name: string;
  cpf: string;
  email: string;
  phone: string;
}
interface IClientRepository {
  save({ name, cpf, email, phone }: ISaveClientDTO): Promise<ClientAttributes>;
  getAll(): Promise<ClientAttributes[]>;
  getById(id: string): Promise<ClientAttributes>;
  getByName(name: string): Promise<Boolean>;
  delete(id: string): Promise<ClientAttributes>;
  update(
    id: string,
    name: string,
    cpf: string,
    email: string,
    phone: string
  ): Promise<ClientAttributes>;
}

export { IClientRepository, ISaveClientDTO };
