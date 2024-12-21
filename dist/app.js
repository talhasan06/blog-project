import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/routes/index.js";
import globalErrorHandler from "./app/middlewares/globalErrorHandler.js";
import notFound from "./app/middlewares/notFound.js";
const app = express();
//parser
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"] }));
// api/v1/students/create-student
//application routes
app.use("/api", router);
app.get("/", (req, res) => {
    res.send("Hello, world!");
});
// Error handling
app.use(globalErrorHandler);
// Not found route
app.use("*", notFound);
export default app;
