import express from "express";
import customer from "./customer";
import auth from "./auth";

const routes = new express.Router();

routes.use("/api/auth", auth);
routes.use("/api/customer", customer);
routes.get("/", (req, res) => res.sendStatus(200));

export default routes;