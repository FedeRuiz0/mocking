import express from "express";
import { listFakeProducts } from "../controllers/mocking.controller.js";

const mockingRouter = express.Router();

mockingRouter.get("/", async (req, res) => {
  listFakeProducts;
});

export default mockingRouter;