// route for sensors/

"use strict";

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const express = require("express");
const router = express.Router();

const routeRoom = require("./room.js");
const sensor = require("../src/sensors.js");
const user = require("../src/login.js");

const config = require("../config/db/sensors.json");

router.use("/room", routeRoom);

router.get("/addsensors", (req, res) => {
    let data = {
        title: "Home | Sensors",
    };

    res.render("addsensors", data);
});

router.post("/addsensors", urlencodedParser, async (req, res) => {
    let sensorIds;
    let sensorNames;

    if (typeof req.body.ids == 'object') {
        sensorIds = req.body.ids;
        sensorNames = req.body.names;
    } else {
        sensorIds = [req.body.ids]
        sensorNames = [req.body.names]
    }

    let sensors = [];
    sensorIds.forEach((sensorId, index) => {
        let sensor = {}
        sensor.customId = sensorId
        sensor.name = sensorNames[index]
        sensors.push(sensor)
    });

    await sensor.setSensors(sensors);
    res.redirect("/sensors/room");
});

router.get("/login", (req, res) => {
    if (req.session.loggedIn == 1) {
        return res.redirect("/sensors/admin");
    }

    let data = {
        title: "Home | Sensors",
    };

    res.render("login", data);
});

router.post("/login", urlencodedParser, async (req, res) => {
    if (req.body.name == config.admin_username && req.body.password == config.admin_password) {
        req.session.loggedIn = 1;
        res.redirect("/sensors/admin")
    } else {
        res.redirect("/sensors/login");
    }
});

router.get("/logout", async (req, res) => {
    delete req.session.loggedIn;
    res.redirect("/sensors/room");
});

router.get("/admin", urlencodedParser, async (req, res) => {
    if (req.session.loggedIn != 1) {
        res.redirect("/sensors/login");
    }

    let date = req.query.date
    if (!date) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        date = yyyy + '-' + mm + '-' + dd;
    }

    let data = {
        title: "Admin | Sensors",
        date: date
    };
    data.sensors = await sensor.readingsForAdmin(date);
    res.render("admin", data);
});

router.get("/index", (req, res) => {
    let data = {
        title: "About | Sensors"
    };

    res.render("index", data);
});

module.exports = router;
