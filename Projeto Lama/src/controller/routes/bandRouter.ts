import express from "express";
import bandController from "../BandController";



export const bandRouter = express.Router();


bandRouter.post("/register", bandController.bandRegister);

bandRouter.get("/getband", bandController.getBand)