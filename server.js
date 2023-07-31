const express = require('express');
const bodyParser = require("body-parser");
var cors = require('cors')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// const verfyUser = (req, res, next) => {
//     const token = req.cookies.token;
//     if(!token)
//         // res.redirect('/login');
//         res.json({Error: "You are not authenticated"})
//     else {
//         jwt.verify(token, "secretData", (err, decoded) => {
//             if (err) {
//                 return res.json({Error: "Token is not okey"});

//             } else {
//                 req.id = decoded.id;
//                 next();
//             }
//         })
//     }
        
// }

app.get("/", (req, res) => {
    res.json({ message: "Welcome to test API." })
});

require("./app/routes/users.routes.js")(app);


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});