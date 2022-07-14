import { application } from "express";
import app from "./app";
import { bandRouter } from "./controller/routes/bandRouter";
import { userRouter } from "./controller/routes/userRouter";



app.use("/user", userRouter);

app.use("/user", userRouter);

app.use("/band", bandRouter);

app.use("/band", bandRouter);

