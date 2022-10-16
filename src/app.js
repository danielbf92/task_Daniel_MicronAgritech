import express from 'express';
import morgan from 'morgan';

//routers
import usersRoutes from "./routes/users_routes";

const app=express();

//settings
app.set('port', 4000);

//Middlewares : small intermediate functions between a request and a response
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use("/api/users", usersRoutes);

export default app;