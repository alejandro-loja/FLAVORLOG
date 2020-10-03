var orm = require("../config/orm.js");


// flavors is the name of the table
var flavorlog = {
    all: function (cb) {
        orm.selectAll("flavors", function (res) {
            cb(res);
        })
    },
    // The variables cols and vals are arrays.
    create: function (cols, vals, cb) {
        orm.insertOne("flavors", cols, vals, function (res) {
            cb(res);
        });
    },
    update: function (objColVals, condition, cb) {
        orm.updateOne("flavors", objColVals, condition, function (res) {
            cb(res);
        });
    },
    delete: function (condition, cb) {
        orm.delete("flavors", condition, function (res) {
            cb(res);
        });
    }
}; // end of flavorlog


module.exports = flavorlog;