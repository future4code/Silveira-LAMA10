import app from "./app";
import { bandRouter } from "./controller/routes/bandRouter";
import { showRouter } from "./controller/routes/showRouter";
import { userRouter } from "./controller/routes/userRouter";



app.use("/user", userRouter);

app.use("/user", userRouter);

app.use("/band", bandRouter);

app.use("/band", bandRouter);

app.use("/show", showRouter);

app.use("/show", showRouter);

