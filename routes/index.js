import express from "express";
import customer from "./customer";
import auth from "./auth";
import upload from './upload';
import exportData from './export';

const routes = new express.Router();

routes.use("/api/auth", auth);
routes.use("/api/customer", customer);
routes.use("/api/upload", upload);
routes.use("/api/export", exportData);
routes.get("/", (req, res) => res.sendStatus(200));

export default routes;