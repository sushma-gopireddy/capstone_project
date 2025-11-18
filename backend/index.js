import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './db.js';
const app = express()

const port = 8080;
app.use(cors())

 app.get('/',(req, res) =>{
    res.json('Hello world! (from server)')
 })

 app.listen(port,() =>{
    console.log('Listening on port:' +port)
    connectDB()
 })