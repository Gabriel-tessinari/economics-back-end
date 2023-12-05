import express from "express";
import cors from "cors";
import routes from "./routes";
import dotenv from "dotenv";

const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
    "Authorization"
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "*",
  preflightContinue: false,
};

dotenv.config();
const PORT = process.env.PORT || 3018;
const app = express();

app.use(cors(options));
app.use(express.json());
app.use(routes);

app.listen(PORT, () => console.log("Servidor iniciado na porta " + PORT));