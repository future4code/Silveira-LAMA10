import express from "express"
import showController from "../ShowController";


export const showRouter = express.Router();


showRouter.post("/register", showController.registerShow);

showRouter.get("/getshow", showController.getAllShowsOfDay)