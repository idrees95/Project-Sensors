"use strict";

//Set port for server to run on
const port = process.env.DBWEBB_PORT || 1337;

const path = require("path");
//Setup express-server
const express = require("express");
const session = require('express-session');
const app = express();

app.use(session({
    name: 'sid',
    secret: '*()*)**(#&$*#&$*(*)$#*',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2, // 2 Hours
        sameSite: true
    }
}))

// Set gloabal variable for all views
app.use(function(req, res, next) {
    app.locals.isLoggedIn = req.session.loggedIn;
    next();
});

const routeSensors = require("./route/sensors.js");
const middleware = require("./middleware/index.js");

app.set("view engine", "ejs");

app.use(middleware.logIncomingToConsole);

app.use(express.static(path.join(__dirname, "public")));

app.use("/sensors", routeSensors);
app.listen(port, logStartUpDetailsToConsole);

// Log app details to console when starting up.
function logStartUpDetailsToConsole() {
    let routes = [];

    // Find what routes are supported
    app._router.stack.forEach((middleware) => {
        if (middleware.route) {
            // Routes registered directly on the app
            routes.push(middleware.route);
        } else if (middleware.name === "router") {
            // Routes added as router middleware
            middleware.handle.stack.forEach((handler) => {
                let route;

                route = handler.route;
                route && routes.push(route);
            });
        }
    });

    console.info(`Server is listening on port ${port}.`);
    console.info("Available routes are:");
    console.info(routes);
}
