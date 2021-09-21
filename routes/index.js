import express from "express";
import customer from "./customer";

const routes = new express.Router();

routes.use("/api/customers", customer);
routes.get("/", (req, res) => res.sendStatus(200));

export default routes;