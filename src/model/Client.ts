import mongoose, { Document, Model, Schema } from "mongoose";

export class ClientAttributes {
  id?: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  create_at: Date;
  update_at?: Date;
}

export type ClientDocument = Document & ClientAttributes;
type ClientModel = Model<ClientDocument>;

const ClientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  create_at: {
    type: Date,
    required: true,
  },
  update_at: {
    type: Date,
    required: false,
  },
});

export default mongoose.model<ClientDocument, ClientModel>(
  "Client",
  ClientSchema
);
