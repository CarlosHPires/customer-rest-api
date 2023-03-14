import express from 'express';
import 'express-async-errors';
import * as database from "./database";
import { AppError } from './errors/AppError';

import { clientsRoutes } from "./routes/clients.routes";

database.connect();

const app = express();

app.use(express.json());

app.use(clientsRoutes);

app.use((err, request, response, next) => {
    if (err instanceof AppError) {
      return response
        .status(err.statusCode)
        .json({ status: "error", message: err.message });
    }
  
    return response
      .status(500)
      .json({ status: "error", message: "internal server error" });
  });

app.listen(7000, () => console.log("server up"));
