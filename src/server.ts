import "dotenv/config";
// sometime dotenv.config()
import express from "express";
import type {ErrorRequestHandler} from "express";
import AuthRoute from "./routes/auth.routes.js";

const app = express();
// use express.json() to help app to read json
app.use(express.json());

// use PORT from dotenv if fail use 5000
const PORT = process.env.PORT || 5000;

app.use("/api/auth", AuthRoute);

app.get("/", (req, res) => {
  res.send("backed api status: running");
});

// use((req,res))--> no path will be like *
app.use((req, res) => {
  res.send("No Service");
});
// error middleware
const errorHandler:ErrorRequestHandler=(err,req,res,next)=>{
    console.log('ERROR')
    res.json({err:err.message})
}
app.use(errorHandler)

// app listen PORT and do the function
app.listen(PORT, () => {
  console.log(`This server running at PORT:${PORT}`);
});
