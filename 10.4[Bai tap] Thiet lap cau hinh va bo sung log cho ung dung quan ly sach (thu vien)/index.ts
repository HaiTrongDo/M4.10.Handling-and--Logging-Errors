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

app.post('/', (req, res, next) => {
    try {
        if (!req.body.username || !req.body.password){
        throw new Error("invalid value");
        } else {
            res.status(200).send({message: "you are authorized"})
        }
    } catch (err) {
        console.log(err.message)
        next(err)
    }
})

app.use(errorToSlack({ webhookUri: 'https://hooks.slack.com/services/https://hooks.slack.com/services/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' }))

// app.use((err,req,res,next)=>{
//     res.status(500).send(err.message)
//     throw new Error(err)
// })



app.listen(PORT, () => {
    console.log("App running on port: " + PORT)
})