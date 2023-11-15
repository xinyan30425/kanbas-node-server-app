import express from 'express';
import Hello from "./hello.js"
import Lab5 from "./lab5.js";
import cors from "cors";
import CourseRoutes from "./courses/routes.js"
import ModuleRoutes from "./modules/routes.js";
import "dotenv/config";
import session from "express-session";

// const express = require('express')
const app = express()
// app.get('/hello', (req, res) => {res.send('Life is good!')})
// app.get('/', (req, res) => {res.send('Welcome to Full Stack Development!')})

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}
));

app.use(express.json());
ModuleRoutes(app);
CourseRoutes(app)
Lab5(app);
Hello(app)
app.listen(4000)
app.listen(process.env.PORT || 4000);