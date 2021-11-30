import loginRouter from "./routes/login";
import swDocument from "./swagger.def";
import { Request, Response } from "express";

const { sequelize, Flowers } = require("./models");

const express = require("express"),
  http = require("http"),
  swaggerUI = require("swagger-ui-express");
const app = express();
const bodyParser = require("body-parser").json();

const server = http.createServer(app);
const hostname = "0.0.0.0";
const port = 3001;

app.use(express.json());
app.use(bodyParser);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swDocument));
app.use("/login", loginRouter);

server.listen(port, hostname, async () => {
  console.log(`Server running at http://${hostname}:${port}`);
  await sequelize.authenticate();
  console.log("Database connected");
});

app.post("/flowers", async (req: Request, res: Response) => {
  const { name, quantity, type } = req.body;

  try {
    const flower = await Flowers.create({ name, quantity, type });

    return res.json(flower);
  } catch (err) {
    return res.json(err);
  }
});

app.get("/flowers", async (_: Request, res: Response) => {
  try {
    const flowers = await Flowers.find();

    return res.json(flowers);
  } catch (err) {
    return res.json(err);
  }
});

app.get("/flowers/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const flower = await Flowers.findOne({
      where: { id },
    });

    return res.json(flower);
  } catch (err) {
    return res.json(err);
  }
});

app.put("/flowers/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, quantity, type } = req.body;

  try {
    const flower = await Flowers.findOne({
      where: { id },
    });

    flower.name = name;
    flower.quantity = quantity;
    flower.type = type;

    await flower.save();

    return res.json(flower);
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
});

app.delete("/flowers/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const flower = await Flowers.findOne({
      where: { id },
    });

    await flower.destroy();
    return res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
});
