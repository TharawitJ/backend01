import type { RequestHandler,ErrorRequestHandler } from "express";

export const NotFound: RequestHandler = (req, res) => {
  res.status(404);
  res.json("have no service in this path");
};


// error middleware
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

  res.status(err.status || 500);
//   err.status = 444 --> show error code 444
  res.json({ err: err.message });

    /* throw custom error
         const customErr = new Error("warning this is Custom Error!!")
        //  customErr.message = "warning this is Custom Error!!"
         console.log(customErr) 
         throw(customErr) */
};