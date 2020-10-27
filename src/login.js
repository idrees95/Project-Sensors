"use strict";


module.exports = {
    showAllUsers: showAllUsers,
    setUsers: setUsers,
    getUsers: getUsers
};


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

async function getUsers(name, pass) {
    let sql = `Update users set status = 1 WHERE name = ? and password = ?`;
    let sql1 = `SELECT status FROM users AS v WHERE v.name = ? and v.password = ?`;
    let sql2 = `Update users set status = 0`;
    let res;

    await db.query(sql, [name, pass]);
    res = await db.query(sql1, [name, pass]);
    if(res.toString() == ''){
     await db.query(sql2);
     return 0;
    }
    return 1;
}

async function setUsers(nr) {
    let str = "("
    for(var i = 1; i <= nr; i++) {
        if(i != 1)
            str += "("
        str += i + ")"
        if(i != nr)
            str += ","
    }

    let sql1 = "DELETE FROM users";
    let sql2 = "INSERT INTO users VALUES " + str;

    await db.query(sql1);
    await db.query(sql2);
}

async function showAllUsers() {
    let sql = `SELECT * FROM users`;
    let res;

    res = await db.query(sql);
    return res;
}
