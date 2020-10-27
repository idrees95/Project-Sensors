"use strict";

const mysql  = require("promise-mysql");
const config = require("../config/db/sensors.json");
let db;

// Main function.
(async function() {
    db = await mysql.createConnection(config);

    process.on("exit", () => {
        db.end();
    });
})();

async function showAllSensorvalues(id) {
    let sql = `SELECT * FROM valuess AS v WHERE v.sensorId = ? AND archived = 0`;
    let res;

    res = await db.query(sql, [id]);
    return res;
}

async function readingsForAdmin(date) {
    let sql = `SELECT valuess.*, sensor.customId, sensor.name \
                FROM valuess \            
                JOIN sensor \
                ON sensor.sensorId = valuess.sensorId
                WHERE DATE_FORMAT(dateAndTime, '%Y-%m-%d') = ?`;
    let res = await db.query(sql, [date]);
    return res;
}

async function setSensors(sensors) {
    await db.query('UPDATE sensor SET archived = 1 where 1');
    await db.query('UPDATE valuess SET archived = 1 where 1');

    sensors.forEach(async (sensorData) => {
        let sql2 = "INSERT INTO sensor (customId, name) values (? , ?)";
        await db.query(sql2, [sensorData.customId, sensorData.name]);
    })
}

async function getSensors() {
    let sql = `SELECT * FROM sensor WHERE archived = 0`;
    let res;

    res = await db.query(sql);
    return res;
}

async function getSensor(id) {
    let sql = `SELECT * FROM sensor WHERE sensorId = ?`;
    let res = await db.query(sql, [id]);
    let result = JSON.parse(JSON.stringify(res))[0]
    return result;
}

async function getMinMaxData(sensorId) {
    let sql = "SELECT  \
                MIN(temperature) as min_temperature, \
                MAX(temperature) as max_temperature, \
                MIN(lightcondition) as min_lightcondition, \
                MAX(lightcondition) as max_lightcondition, \
                DATE_FORMAT(dateAndTime, '%Y-%m-%d') as date\
                FROM valuess \
                WHERE sensorId = ? \
                AND archived = 0 \
                GROUP BY date \
                ORDER BY date DESC \
                LIMIT 1";
    let res = await db.query(sql, [sensorId]);
    let result = JSON.parse(JSON.stringify(res))
    if (result.length > 0) {
        let data = result[0]
        data.date = new Date(data.date + ' 00:00:00').toDateString().substr(4)
        return data
    } else {
        return null;
    }
}

module.exports = {
    showAllSensorvalues: showAllSensorvalues,
    setSensors: setSensors,
    getSensors: getSensors,
    getSensor: getSensor,
    getMinMaxData: getMinMaxData,
    readingsForAdmin: readingsForAdmin
};