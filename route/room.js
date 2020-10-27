//route for sensors/room/

"use strict";

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const express = require("express");
const router = express.Router();

const sensor = require("../src/sensors.js");

router.get("/", async (req, res) => {
    let data = {
        title: "Room | Sensors",
        status: 0
    };

    data.sensors = await sensor.getSensors();

    res.render("room/showRoom", data);
});

router.get("/show/:id", async (req, res) => {
    let id = req.params.id;
    let data = {
        title: `sensor data | Sensors`,
        status: 0
    };

    data.sensor = await sensor.getSensor(id);
    data.sensors = await sensor.showAllSensorvalues(id);
    data.mixMaxData = await sensor.getMinMaxData(id);
    data.id = id;
    res.render("room/showSensor", data);
});

module.exports = router;
