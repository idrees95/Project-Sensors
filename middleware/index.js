// General middleware.
"use strict";

// Log incoming requests to console to see who accesses the server on what route.
// req: The incoming request.
// res: The outgoing response.

function logIncomingToConsole(req, res, next) {
    console.info(`Got request on ${req.path} (${req.method}).`);
    next();
}

module.exports = {
    logIncomingToConsole: logIncomingToConsole
};
