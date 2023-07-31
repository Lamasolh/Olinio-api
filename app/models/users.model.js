const pool = require("./db.js");

const Users = function (users) {
    this.first_Name = users.first_Name;
    this.last_Name = users.last_Name;
    this.username = users.username;
    this.email = users.email;
    this.password = users.password;
    this.phone_Number = users.phone_Number;
    this.country = users.country;
}

Users.create = (newUser, results) => {
    pool.query(`
    INSERT INTO users_data.users
     (first_Name, last_Name, username, email, password, phone_Number, country) 
    VALUES 
    ('${newUser.first_Name}', 
    '${newUser.last_Name}',
    '${newUser.username}',
    '${newUser.email}',
    '${newUser.password}',
    '${newUser.phone_Number}',
    '${newUser.country}'
    )
    `, (err, res) => {
        if (err) {
            results(err, null);
            return;
        }

        results(null, { ...newUser });
    });
};

Users.login = (newUser, results) => {
    console.log(newUser)
    pool.query(`
    SELECT * FROM users_data.users WHERE email = '${newUser.email}' 
    `, (err, res) => {
        if (err) {
            results(err, null);
            return;
        }

        results(null, res);
    });
};


Users.editById = (id, users_data, result) => {
    pool.query(
        `UPDATE users_data.users SET
        first_Name = '${users_data.first_Name}', 
        last_Name = '${users_data.last_Name}', 
        username = '${users_data.username}', 
        email = '${users_data.email}', 
        password = '${users_data.password}', 
        phone_Number = '${users_data.phone_Number}', 
        country = '${users_data.country}'
      WHERE id = ${id}`,
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, {
                id: id,
                ...users_data,
            });
        }
    );
};

Users.remove = (id, result) => {
    pool.query(`DELETE FROM users_data.users WHERE id = '${id}'`, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        if (res.rowCount == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

Users.getAll = (results) => {
    pool.query(`
    SELECT * FROM users_data.users
    `, (err, res) => {
        if (err) {
            results(err, null);
            return;
        }
        console.log(res);
        results(null, res);
    });
};

module.exports = Users;