import express from "express";
import cors from "cors";
import { routes } from "./routes";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "*",
  preflightContinue: false,
};

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors(options));
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(routes);

app.listen(PORT, () => console.log("Servidor iniciado na porta " + PORT));
