import express from "express";
import ShowBusiness from "../../business/ShowBusiness";
import { ShowDatabase } from "../../data/ShowDatabase";
import Authenticator from "../../services/Authenticator";
import IdGenerator from "../../services/IdGenerator";
import { ShowController } from "../ShowController";

export const showRouter = express.Router();

const showBusiness = new ShowBusiness(
    new ShowDatabase(),
    new Authenticator(),    
    new IdGenerator()
)
const showController = new ShowController(
    showBusiness
);

showRouter.post("/addshow", showController.registerShow);

showRouter.get("/getshow", showController.getAllShowsOfDay)