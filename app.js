import express from 'express';
import Hello from "./hello.js"
import Lab5 from "./lab5.js";
import cors from "cors";
import CourseRoutes from "./courses/routes.js"
import ModuleRoutes from "./modules/routes.js";
import AssignmentRoutes from './assignments/routes.js';
import "dotenv/config";

const app = express()
// app.get('/hello', (req, res) => {res.send('Life is good!')})
// app.get('/', (req, res) => {res.send('Welcome to Full Stack Development!')})

app.use(
    cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    // origin:"http://localhost:3000"
}
));
// app.listen(process.env.PORT || 4000, () => {
//     console.log(`Server is running on port ${process.env.PORT || 4000}`);
//   });
  

app.use(express.json());

ModuleRoutes(app);

CourseRoutes(app);
AssignmentRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);