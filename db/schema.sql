DROP DATABASE if exists flavorlog_db; 
CREATE DATABASE flavorlog_db;

use flavorlog_db;

CREATE TABLE flavorlogs (
	id int NOT NULL AUTO_INCREMENT,
    rm_name varchar(100) NOT NULL,
    rm_na varchar(50) NOT NULL,
    rm_dosage_number float(5) NOT NULL,
    rm_dosage_unit varchar(5) NOT NULL,
    rm_description varchar(250) NOT NULL,
    PRIMARY KEY(id)
)