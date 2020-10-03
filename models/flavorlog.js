var orm = require("../config/orm.js");


// flavorlogs is the name of the sql table
var flavorlog = {
    all: function (cb) {
        orm.selectAll("flavorlogs", function (res) {
            cb(res);
        })
    },
    // The variables cols and vals are arrays.
    create: function (cols, vals, cb) {
        orm.insertOne("flavorlogs", cols, vals, function (res) {
            cb(res);
        });
    },
    update: function (objColVals, condition, cb) {
        orm.updateOne("flavorlogs", objColVals, condition, function (res) {
            cb(res);
        });
    },
    delete: function (condition, cb) {
        orm.delete("flavorlogs", condition, function (res) {
            cb(res);
        });
    }
}; // end of flavorlog


module.exports = flavorlog;