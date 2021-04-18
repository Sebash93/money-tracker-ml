import { Router } from "express";
import { trainController } from "./train.controller";

const router = Router();

router.post("/", trainController);

export { router as trainRouter };