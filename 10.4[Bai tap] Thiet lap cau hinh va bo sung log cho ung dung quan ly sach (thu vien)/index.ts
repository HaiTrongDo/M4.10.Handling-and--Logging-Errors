import express from "express";
import bodyParser from "body-parser";
import { logger } from "./src/logger/winston";

import errorToSlack from 'express-error-slack'

const PORT = 3000;
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    try {
        res.end("<h1>Hello winston!</h1>")
        throw new Error("Error test winston");
    } catch (err) {
        logger.error(err)
        res.redirect('/error')
    }
})


app.use((err, req,res, next)=>{
    res.status(err.status)
})


// Route that triggers a error
app.get('/error', function (req, res, next) {
    const err = new Error('Internal Server Error')
    err["status"] = 500
    next(err)
})


app.listen(PORT, () => {
    console.log("App running on port: " + PORT)
})