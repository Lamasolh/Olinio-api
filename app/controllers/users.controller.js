// const { validationResult } = require('express-validator');
const { response } = require("express");
const Users = require("../models/users.model");
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const salt = 10;



exports.login = (req, res) => {
    // const error = validationResult(req);
    // if (!errors.isEmpty()) {
    // return res.json(errors);
    // }
    // bcrypt.hash(req.body.Password.toString(), salt, (err, hash) => {
    // if (err)
    // return res.json({ Error: "Error for hassing password" });

    const users = new Users({
        email: req.body.email,
        password: req.body.password
    });

    Users.login(users, (err, data) => {
        console.log(users);
        if (err)
            res.status(500).send(err.message);
        else if (data.length > 0) {
            // bcrypt.compare(req.body.Password.toString(), data[0].Password, (err, response) => {
            if (err)
                return res.json({ Error: "Password compair error " });

            if (req.body.password === data[0].password) {

                // const id = data[0].id;
                // const token = jwt.sign({ id }, "secretData", {
                //     expiresIn: '1d'
                // });
                // res.cookie('token', token);

                return res.json({ Status: "Success" })
            }
            else
                return res.json({ Error: "Password not matched" });
            // })
        } else
            return res.json({ Error: "Email Not found" })

    })

    // })
}

exports.getAll = (req, res) => {
    Users.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

exports.editOne = (req, res) => {
    if (!req.body) {
        res.status(400).send('not found');
    }

    Users.editById(
        req.params.id,
        new Users(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send(err);
                } else {
                    res.status(500).send(err);
                }
            } else res.send('updated Successfully');
        }
    );
};

exports.delete = (req, res) => {
    Users.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send('not found');
            } else {
                res.status(500).send('error');
            }
        } else res.send('deleted successfully');
    });
};

exports.create = (req, res) => {
    const users = new Users({
        first_Name: req.body.first_Name,
        last_Name: req.body.last_Name,
        username: req.body.username,
        email: req.body.email,
        phone_Number: req.body.phone_Number,
        country: req.body.country,
        password: req.body.password,
    });

    Users.create(users, (err, data) => {
        if (err)
            res.status(500).send(err.message);
        else res.send('success');
    })
}