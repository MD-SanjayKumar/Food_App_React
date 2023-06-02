const http = require('http');
const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const app = express();
const port = 9000;
const Crypto = require("crypto-js");
var nodemailer = require('nodemailer');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());
const session = require("express-session");

app.use(session({
    secret: 'conda',
    resave: false,
    saveUninitialized: false,
    // cookie: { maxAge: null }
}));

// app.use(session({
//     secret: 'conda',
//     resave: true,
//     saveUninitialized: false,
//     cookie: {
//       path: '/',
//       maxAge: null,
//       httpOnly: true,
//     }
//   }))

const conn = mongoose.connect('mongodb://127.0.0.1:27017/myfood');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true,
        },
        name: {
            type: String,
            require: true,
        },
        phone: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    }
);
const user_model = mongoose.model('user_credentails', userSchema)

const restaurantSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true,
        },
        name: {
            type: String,
            require: true,
        },
        image_url: {
            type: String,
            require: true,
        },
        phone: {
            type: String,
            require: true,
        },
        address: {
            type: String,
            require: true,
        },
        gst_in: {
            type: String,
            require: true,
        },
        pan_no: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    }
);
const restaurant_model = mongoose.model('restaurent_data', restaurantSchema)

const menuSchema = new mongoose.Schema(
    {
        rid: {
            type: String,
            require: true,
        },
        food_name: {
            type: String,
            require: true,
        },
        food_category: {
            type: String,
            require: true,
        },
        food_price: {
            type: String,
            require: true,
        },
        food_image: {
            type: String,
            require: true,
        },
        food_availability: {
            type: Boolean,
            require: true,
        },
        is_veg: {
            type: Boolean,
            require: true,
        },
    },
    {
        timestamps: true,
    }
);
const menu_model = mongoose.model('menu_data', menuSchema)

const server = http.createServer(app)
app.use(cors())

app.get("/api/", (req, res) => {
    res.send("server running...");
})

const io = new socketIO.Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    }
})

io.on('connection', (socket) => {
    console.log(`new connection ${socket.id}`);
});

server.listen(port, () => {
    console.log(`Listening to port ${port}`)
})

const GLOBAL_PASS = "sudo-pt"

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "sp2042001@gmail.com",
        pass: "mfifwvezlvzjhurb",
    },
});

let mailid, encryptedpass, uname, uphone;

app.post("/api/user_reg", async (req, res) => {
    var { email, password, cpassword, name, phone } = req.body;
    var encryptedPwd = Crypto.AES.encrypt(password, GLOBAL_PASS).toString();
    mailid = email;
    uname = name;
    uphone = phone;
    encryptedpass = encryptedPwd;
    // name = name;
    if (password == cpassword) {
        let query = user_model.where({ email: `${mailid}` });
        let value = await query.findOne();
        if (value) {
            if (value.email == mailid) {
                res.status(401).json({ message: "User already exists." });
            }
        } else {
            var _otp = Math.random();
            _otp = _otp * 1000000;
            req.session.OTP = parseInt(_otp);
            var mailOptions = {
                to: mailid,
                subject: "OTP FOR SIGNUP",
                html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + req.session.OTP + "</h1>" // html body
            };
        
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    res.status(403).json({ message: error });
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    } else {
        res.status(402).json({ message: "Wrong Credentials." });
    }
})

app.post("/api/user_lg", async (req, res) => {
    console.log(req.session)
    let { email, password } = req.body;
    let usr_pwd = password;
    var encryptedPass = Crypto.AES.encrypt(usr_pwd, GLOBAL_PASS).toString();
    var decryptedPass = Crypto.AES.decrypt(encryptedPass, GLOBAL_PASS).toString();
    var encrp = decryptedPass.toString(Crypto.enc.Utf8);
    let query = user_model.where({ email: email });
    let value = await query.findOne();
    if (email != "" && password != "") {
        if (value != null) {
            // req.session.email = value.email;
            mailid = value.email;
            uname = value.name;
            let pswd = value.password;
            var decryptedPwd = Crypto.AES.decrypt(pswd.trim().toString(), GLOBAL_PASS).toString();
            var decrypt = decryptedPwd.toString(Crypto.enc.Utf8);
            if (value.email == email && decrypt == encrp) {
                // res.redirect('/api/login_otp');
                var _otp = Math.random();
                _otp = _otp * 1000000;
                req.session.OTP = parseInt(_otp);
                var mailOptions = {
                    to: mailid,
                    subject: "OTP FOR SIGNIN",
                    html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + req.session.OTP + "</h1>"
                };
                console.log("login:",req.session);

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        res.status(402).json({ message: error });
                    } else {
                        console.log('Email sent: ' + info.response);
                        res.status(202).json({ message: "Enter otp sent on your email" })
                    }
                });

                res.status(202).json({ message: "Enter otp sent on your email" })
            } else {
                res.status(402).json({ message: "Wrong Credentials." });
            }
        } else {
            res.status(402).json({ message: "Wrong Credentials." });
        }
    } else {
        res.status(402).json({ message: "Wrong Credentials." });
    }
})

app.post('/api/verify', function (req, res) {
    const { otp } = req.body;
    console.log(otp)
    var obj = {
        email: mailid,
        password: encryptedpass,
        name: uname,
        phone: uphone
    };
    if (req.session.OTP === otp) {
        user_model.create(obj);
        res.status(202).json({ message: "Account created successfully." });
    }
    else {
        res.status(406).json({ message: "Incorrect OTP." });
    }
});

app.post('/api/log_verify', function (req, res) {
    const { otp } = req.body;
    console.log("verify:",req.session)
    if (otp == req.session.OTP) {
        res.status(202).json({ message: "Login successful." });
    }
    else {
        res.status(406).json({ message: "Incorrect OTP." });
    }
});

// app.get('/api/resend', function (req, res) {
//     var _otp = Math.random();
//     _otp = _otp * 1000000;
//     otp = parseInt(_otp);
//     var mailOptions = {
//         to: mailid,
//         subject: "OTP RESEND",
//         html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>"
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             res.send(error);
//             return console.log(error);
//         }
//         res.redirect('http://localhost:6060/verify_otp');
//     });
// });

app.get('/api/resend_otp', function (req, res) {
    var _otp = Math.random();
    _otp = _otp * 1000000;
    req.session.OTP = parseInt(_otp);
    var mailOptions = {
        to: mailid,
        subject: "OTP RESEND",
        html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + req.session.OTP + "</h1>"
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(405).json({ message: "Found some error." });
        }
        res.status(201).json({ message: "OTP Send." });
    });
});

app.post('/api/add_restaurant', function (req, res) {
    const { name, address, email, password, phone, gst_in, pan_no, image_url } = req.body;
    var encryptedPassword = Crypto.AES.encrypt(password, GLOBAL_PASS).toString();
    var obj = {
        email: email,
        password: encryptedPassword,
        name: name,
        phone: phone,
        address: address,
        gst_in: gst_in,
        pan_no: pan_no,
        image_url: image_url
    };
    if (name !== "" && address !== "" && email !== "" && password !== "" && phone !== "" && gst_in !== "" && pan_no !== "") {
        restaurant_model.create(obj);
        res.status(201).json({ message: "Restaurant Added." });
    }
    else {
        res.status(405).json({ message: "Invalid input." });
    }
});

app.post('/api/add_product', function (req, res) {
    const { rid, food_name, food_category, food_price, food_image, food_availability, is_veg } = req.body;
    var obj = {
        rid: rid,
        food_name: food_name,
        food_category: food_category,
        food_price: food_price,
        food_image: food_image,
        food_availability: food_availability,
        is_veg: is_veg
    };
    if (rid !== undefined && food_name !== "" && food_price !== "" && food_category !== "" && food_image !== "" && food_availability !== undefined) {
        menu_model.create(obj);
        res.status(201).json({ message: "Product Added." });
    }
    else {
        res.status(405).json({ message: "Invalid input." });
    }
});


app.get('/api/menu_data', async (req, res) => {
    let resp = await menu_model.find();
    res.send(resp);
})

app.get('/api/restaurant_data', async (req, res) => {
    let respo = await restaurant_model.find();
    res.send(respo);
})





