import "dotenv/config";
import cors from "cors";
import express from "express";

import bodyParser from "body-parser";
import morgan from "morgan";
import morganBody from "morgan-body";

import models from './models';
import routes from "./routes";

import passport from './service/passport';

const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'))
morganBody(app);

app.use(passport.initialize());

app.get("/", (req, res) => {
    res.send("¡Hola Mundo!");
});


app.use((req, res, next) => {
  // Para cualquier petición, añadimos en su contexto
  req.context = {
    models
  };
  next();
});


app.use('/user', routes.user);
app.use('/auth', routes.auth);


app.listen(process.env.PORT, () =>
  console.log(
    `¡Aplicación de ejemplo escuchando en el puerto ${process.env.PORT}!`
  )
);