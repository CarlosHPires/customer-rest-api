import { AppError } from "../errors/AppError";
import { ClientRepositoryInMemory } from "../repositories/memory-repository/ClientRepositoryInMemory";
import { ClientService } from "../services/ClientService";

let clientRepository: ClientRepositoryInMemory;
let clientService: ClientService;

describe("Client service tests", () => {
  beforeEach(() => {
    clientRepository = new ClientRepositoryInMemory();
    clientService = new ClientService(clientRepository);
  });

  it("Must save the client", async () => {
    const client = {
      name: "Carlos",
      cpf: "123.123.123-13",
      email: "carlospires.dev@gmail.com",
      phone: "(47) 991334755",
    };

    const inputedClient = await clientService.save({
      name: client.name,
      cpf: client.cpf,
      email: client.email,
      phone: client.phone,
    });

    expect(inputedClient).toHaveProperty("name", "Carlos");
    expect(inputedClient).toHaveProperty("cpf", "123.123.123-13");
    expect(inputedClient).toHaveProperty("email", "carlospires.dev@gmail.com");
    expect(inputedClient).toHaveProperty("phone", "(47) 991334755");
  });

  it("Must get by id the client", async () => {
    const clientToInsert = {
      name: "Carlos",
      cpf: "123.123.123-13",
      email: "carlospires.dev@gmail.com",
      phone: "(47) 991334755",
    };

    await clientService.save({
      name: clientToInsert.name,
      cpf: clientToInsert.cpf,
      email: clientToInsert.email,
      phone: clientToInsert.phone,
    });

    const client = await clientService.getById("kf9owmsjfie2");

    expect(client).toHaveProperty("id", "kf9owmsjfie2");
  });

  it("Must get all the clients", async () => {
    const clientToInsert1 = {
      name: "Carlos",
      cpf: "123.123.123-13",
      email: "carlospires.dev@gmail.com",
      phone: "(47) 991334755",
    };

    const clientToInsert2 = {
      name: "Beatriz",
      cpf: "321.321.321-31",
      email: "beatriz.dev@gmail.com",
      phone: "(45) 991334755",
    };

    await clientService.save({
      name: clientToInsert1.name,
      cpf: clientToInsert1.cpf,
      email: clientToInsert1.email,
      phone: clientToInsert1.phone,
    });

    await clientService.save({
      name: clientToInsert2.name,
      cpf: clientToInsert2.cpf,
      email: clientToInsert2.email,
      phone: clientToInsert2.phone,
    });

    const clientList = await clientService.getAll();

    expect(clientList.length).toBe(2);
  });

  it("Must return true if the client exists", async () => {
    const clientToInsert = {
      name: "Carlos",
      cpf: "123.123.123-13",
      email: "carlospires.dev@gmail.com",
      phone: "(47) 991334755",
    };

    await clientService.save({
      name: clientToInsert.name,
      cpf: clientToInsert.cpf,
      email: clientToInsert.email,
      phone: clientToInsert.phone,
    });

    const clientExist = await clientRepository.getByName(clientToInsert.name);

    expect(clientExist).toBeTruthy();
  });

  it("Must return false if the client don't exists", async () => {
    const clientToInsert = {
      name: "Carlos",
      cpf: "123.123.123-13",
      email: "carlospires.dev@gmail.com",
      phone: "(47) 991334755",
    };

    await clientService.save({
      name: clientToInsert.name,
      cpf: clientToInsert.cpf,
      email: clientToInsert.email,
      phone: clientToInsert.phone,
    });

    const clientExist = await clientRepository.getByName("random");

    expect(clientExist).toBeFalsy();
  });

  it("Must return the error 'client already exists!'", async () => {
    const clientToInsert = {
      name: "Carlos",
      cpf: "123.123.123-13",
      email: "carlospires.dev@gmail.com",
      phone: "(47) 991334755",
    };

    await clientService.save({
      name: clientToInsert.name,
      cpf: clientToInsert.cpf,
      email: clientToInsert.email,
      phone: clientToInsert.phone,
    });

    await expect(
      clientService.save({
        name: clientToInsert.name,
        cpf: clientToInsert.cpf,
        email: clientToInsert.email,
        phone: clientToInsert.phone,
      })
    ).rejects.toEqual(new AppError("client already exists!"));
  });

  it("Must update the client ", async () => {
    const client = {
      name: "Carlos",
      cpf: "123.123.123-13",
      email: "carlospires.dev@gmail.com",
      phone: "(47) 991334755",
    };

    await clientService.save({
      name: client.name,
      cpf: client.cpf,
      email: client.email,
      phone: client.phone,
    });

    const updatedClient = await clientService.update({
      id: "kf9owmsjfie2",
      name: "Carlos novo",
      cpf: "444.444.444-44",
      email: "carlosoliveira@gmail.com",
      phone: "(47) 991334755",
    });

    expect(updatedClient).toHaveProperty("name", "Carlos novo");
    expect(updatedClient).toHaveProperty("cpf", "444.444.444-44");
    expect(updatedClient).toHaveProperty("email", "carlosoliveira@gmail.com");
    expect(updatedClient).toHaveProperty("phone", "(47) 991334755");
  });

  it("Must delete the client ", async () => {
    const client = {
      name: "Carlos",
      cpf: "123.123.123-13",
      email: "carlospires.dev@gmail.com",
      phone: "(47) 991334755",
    };

    await clientService.save({
      name: client.name,
      cpf: client.cpf,
      email: client.email,
      phone: client.phone,
    });

    const deletedClient = await clientService.delete("kf9owmsjfie2");
    const clientList = await clientService.getAll();

    expect(deletedClient).toHaveProperty("id", "kf9owmsjfie2");
    expect(clientList.length).toBe(0);
  });
});
