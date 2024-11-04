import "reflect-metadata";
import Express from "express";
import path from 'path';
import { APP } from "./config/env.config";
import { HttpHandler } from "./utils";
import passport from "passport";
import { jwtMiddleware } from "./middlewares";
import Routes from "./routes";
import cookieParser from 'cookie-parser';
import connectDB from "./config/db.config";
import { log } from "./services";

// Connect Database
connectDB();

const server = Express();

// Middleware
server.use(Express.json());
server.use(Express.urlencoded({ extended: true }));
server.use(HttpHandler);
server.use(cookieParser());
server.use(passport.initialize());
jwtMiddleware(passport);

// Routes
if (APP.ENV === 'production') {
    const __dirname = path.resolve();
    server.use(Express.static(path.join(__dirname, '/frontend/dist')));
  
    server.get('*', (_, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    );
  } else {
    server.get("/", (_, res) => {
        res.status(200).json("Server is running 🚀")
    });
  }

// Server Status and Healthcheck
server.get("/ping", (_, res) => {
    res.status(200).json({ message: "ok" })
});

server.get("/status", (_, res) => {
    res.status(200).json({ message: "ok" })
});

// Mount other routes
Routes(server);

// server.use(NotFound);
// server.use(ErrorHandler);

// Run server
const port = APP.PORT;
server.listen(port, () => {
    log.info(`🚀 Server is running on port ${port}`);
});