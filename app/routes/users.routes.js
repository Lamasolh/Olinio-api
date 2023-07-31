const { check } = require('express-validator');

module.exports = app => {
    const users = require('../controllers/users.controller');

    app.post('/register', users.create);

    app.post('/login', users.login );

    app.get('/users', users.getAll );

    app.delete("/delete/:id", users.delete);

    app.put("/update/:id", users.editOne);

}

