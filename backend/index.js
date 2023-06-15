const http = require('http');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const app = express();
const port = 9000;
const Crypto = require("crypto-js");
var nodemailer = require('nodemailer');
let randomstring = require('randomstring')

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
// const conn = mongoose.connect('mongodb+srv://sanjay:minddeft@skminddeft.kutanuu.mongodb.net/myfood');

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
        description: {
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
        lat_long: {
            type: Array,
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
        food_quantity: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    }
);
const menu_model = mongoose.model('menu_data', menuSchema)

const OrdersSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            require: true,
        },
        restaurant_id: {
            type: String,
            require: true,
        },
        user_address: {
            type: String,
            require: true,
        },
        user_lat_long: {
            type: Array,
            require: true,
        },
        orders: {
            type: Array,
            require: true,
        },
        total_amount: {
            type: String,
            require: true,
        },
        order_status: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    }
);
const order_model = mongoose.model('orders_data', OrdersSchema)

const AdminSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: Array,
            require: true
        },
    },
);
const admin_model = mongoose.model('admin_cred', AdminSchema)

const deliverySchema = new mongoose.Schema(
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
        address: {
            type: String,
            require: true,
        },
        aadhar_no: {
            type: String,
            require: true,
        },
        status: {
            type: String,
            require: true,
        },
        current_status: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    }
);
const delivery_model = mongoose.model('delivery_data', deliverySchema)

const DeliveryRequest = new mongoose.Schema(
    {
        requests: {
            type: Object,
            require: true,
        },
    },
);
const request_model = mongoose.model('request_model', DeliveryRequest)

const DeliveryData = new mongoose.Schema(
    {
        d_id: {
            type: String,
            require: true,
        },
        order_id: {
            type: String,
            require: true,
        },
        user_id: {
            type: String,
            require: true,
        },
        restaurant_id: {
            type: String,
            require: true,
        },
        user_address: {
            type: String,
            require: true,
        },
        user_lat_long: {
            type: Array,
            require: true,
        },
        orders: {
            type: Array,
            require: true,
        },
        total_amount: {
            type: String,
            require: true,
        },
        status: {
            type: String,
            require: true,
        }
    },
    {
        timestamps: true,
    }
);
const delivery_schema = mongoose.model('delivery_schema', DeliveryData)

const RestaurantRequest = new mongoose.Schema(
    {
        requests: {
            type: Object,
            require: true,
        },
    },
);
const restaurant_request = mongoose.model('restaurant_request', RestaurantRequest)

const server = http.createServer(app)
app.use(cors())

app.get("/api/", (req, res) => {
    res.send("server running...");
})

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
})

io.on('connection', (socket) => {
    console.log(`new connection ${socket.id}`);
    // socket.on("join", (data) => {
    //     socket.join(data);
    // })
    socket.on("send_restaurant", (deliveryData) => {
        console.log("--- Receive Request Called")
        restaurant_request.create({
            requests: deliveryData,
        }).then((e) => { console.log("Added") })
            .catch((e) => { console.log(e) });

        io.emit("receive_restaurant", deliveryData)
    })

    socket.on("send", (deliveryData) => {
        console.log("---", deliveryData)
        request_model.create({
            requests: deliveryData,
        }).then((e) => { console.log("added") })
            .catch((e) => { console.log(e) });

        io.emit("receive", deliveryData)
    })

    socket.on("disconnect", () => {
        console.log(`User disconnected ---${socket.id}`)
    })
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
    if (password == cpassword) {
        let query = user_model.where({ email: `${mailid}` });
        let value = await query.findOne();
        if (value) {
            if (value.email == mailid) {
                res.json({ message: "User already exists.", code: 201 });
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
                    res.json({ message: "Enter otp sent on your email", code: 200 })
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
                console.log("login:", req.session);

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        res.json({ message: error });
                    } else {
                        console.log('Email sent: ' + info.response);
                        res.json({ message: "Enter otp sent on your email", user_id: value._id, code: 200 })
                    }
                });

                // res.json({ message: "Enter otp sent on your email" })
            } else {
                res.json({ message: "Wrong Credentials." });
            }
        } else {
            res.json({ message: "Wrong Credentials." });
        }
    } else {
        res.json({ message: "Wrong Credentials." });
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
    if (otp == req.session.OTP) {
        user_model.create(obj);
        res.json({ message: "Account created successfully.", code: 200 });
    }
    else {
        res.status(402).json({ message: "Incorrect OTP." });
    }
});

app.post('/api/log_verify', function (req, res) {
    const { otp } = req.body;
    console.log("verify:", req.session)
    if (parseInt(otp) === parseInt(req.session.OTP)) {
        res.json({ message: "Login successful.", code: 200 });
    }
    else {
        res.json({ message: "Incorrect OTP." });
    }
});

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
            res.json({ message: "Found some error." });
        }
        res.json({ message: "OTP Send.", code: 200 });
    });
});

app.post('/api/add_restaurant', function (req, res) {
    const { name, address, email, phone, gst_in, pan_no, description, image_url, lat, long } = req.body;
    const password = randomstring.generate({
        length: 8,
        charset: 'alphabetic'
    })
    console.log(password)
    let encryptedPassword = Crypto.AES.encrypt(password.trim().toString(), GLOBAL_PASS).toString();
    var obj = {
        email: email,
        password: encryptedPassword,
        name: name,
        phone: phone,
        address: address,
        gst_in: gst_in,
        pan_no: pan_no,
        image_url: image_url,
        lat_long: {
            lat: lat, long: long
        },
        description: description
    };
    if (name !== "" && address !== "" && email !== "" && phone !== "" && gst_in !== "" && pan_no !== "") {
        var mailOptions = {
            to: email,
            subject: "Welcome to myFood.com Family",
            html: `<h3>Hello ${name}, Now you are a member of myFood.com</h3>` + `<h4>Your login username is your email id and password is</h4>` + "<h1 style='font-weight:bold;'>" + password + "</h1>"
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.status(402).json({ message: error });
            } else {
                console.log('Email sent: ' + info.response);
                restaurant_model.create(obj);
                res.json({ message: "Restaurant added.", code: 200 })
            }
        });
    }
    else {
        res.json({ message: "Invalid input." });
    }
});

app.post('/api/add_product', function (req, res) {
    const { rid, food_name, food_category, food_price, food_image, food_availability, is_veg, food_quantity } = req.body;
    var obj = {
        rid: rid,
        food_name: food_name,
        food_category: food_category,
        food_price: food_price,
        food_image: food_image,
        food_availability: food_availability,
        is_veg: is_veg,
        food_quantity: food_quantity,
    };
    if (rid !== undefined && food_name !== "" && food_price !== "" && food_category !== "" && food_image !== "" && food_availability !== undefined) {
        menu_model.create(obj);
        res.json({ message: "Product Added.", code: 200 });
    }
    else {
        res.json({ message: "Invalid input." });
    }
});

app.post("/api/restaurant_login", async (req, res) => {
    let { email, password } = req.body;
    let usr_pwd = password;
    let encryptedPass = Crypto.AES.encrypt(usr_pwd.trim().toString(), GLOBAL_PASS).toString();
    let decryptedPass = Crypto.AES.decrypt(encryptedPass, GLOBAL_PASS).toString();
    let encrp = decryptedPass.toString(Crypto.enc.Utf8);
    if (email != "" && password != "") {
        let query = restaurant_model.where({ email: email });
        let value = await query.findOne();
        if (value != null) {
            let pswd = value.password;
            let decryptedPwd = Crypto.AES.decrypt(pswd.trim().toString(), GLOBAL_PASS).toString();
            let decrypt = decryptedPwd.toString(Crypto.enc.Utf8);
            console.log(decrypt)
            console.log(encrp)
            if (value.email == email && decrypt == encrp) {
                res.json({ id: value._id })
            } else {
                res.status(400).json({ message: "Wrong Credentials." });
            }
        } else {
            res.status(402).json({ message: "Wrong Credentials." });
        }
    } else {
        res.status(402).json({ message: "Wrong Credentials." });
    }
})

// app.post("/api/restaurant_id", async (req, res) => {
//     try {
//         let { email } = req.body;
//         let query = restaurant_model.where({ "email": email });
//         let value = await query.findOne();
//         res.json({value})
//     } catch (error) {
//         return res.sendStatus(402).json({ message: error.message })
//     }
// })

app.get('/api/menu_data', async (req, res) => {
    let resp = await menu_model.find();
    res.json(resp);
})

app.get('/api/restaurant_data', async (req, res) => {
    let respo = await restaurant_model.find();
    res.json(respo);
})

app.post("/api/admin/login", async (req, res) => {
    console.log(req.session)
    let { email, password } = req.body;
    let query = admin_model.where({ email: email });
    let value = await query.findOne();
    if (email != "" && password != "") {
        if (value != null) {
            mailid = value.email;
            let pswd = value.password;
            if (pswd == password) {
                res.status(202).json({ message: "Admin logged in." });
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

app.post('/api/restaurant_data/del', async (req, res) => {
    let { id } = req.body;
    try {
        await restaurant_model.deleteOne({ _id: id }).then(async () => {
            await menu_model.deleteOne({ rid: id }).then(function () {
                res.json({ message: "record deleted" })
            }).catch(function (error) {
                res.json({ message: error })
            });
        }).catch(function (error) {
            res.json({ message: error })
        });;
    } catch (error) {
        res.json({ message: error })
    }
})

app.post('/api/restaurant_data/update', async (req, res) => {
    let { id, current_option, changeVal } = req.body;
    if (current_option == 'name') {
        try {
            await restaurant_model.findOneAndUpdate({ _id: id }, { $set: { "name": changeVal } }).then(async () => {
                res.json({ message: "Name updated." })
            }).catch(function (error) {
                res.json({ message: error })
            });
        } catch (error) {
            res.json({ message: error })
        }
    }
    else if (current_option == 'address') {
        try {
            await restaurant_model.findOneAndUpdate({ _id: id }, { $set: { "address": changeVal } }).then(async () => {
                res.json({ message: "Address updated." })
            }).catch(function (error) {
                res.json({ message: error })
            });
        } catch (error) {
            res.json({ message: error })
        }
    }
    else {
        res.json({ message: "Invalid option" })
    }
})

app.post("/api/user/order_data", async (req, res) => {
    let { u_id, cart, full_address, lat, long, total } = req.body;
    let cart_item = [];
    let r_id = cart[0].restaurant_id;
    console.log("-----------------", cart);
    cart.map((val) => {
        let obj = {
            item_id: val.item_id,
            quantity: val.quantity
        }
        cart_item.push(obj)
    })

    console.log("cart_data", cart_item)
    try {
        var obj = {
            user_id: u_id,
            restaurant_id: r_id,
            user_address: full_address,
            user_lat_long: {
                lat: lat, long: long
            },
            orders: cart_item,
            total_amount: total,
            order_status: "pending",
        };
        order_model.create(obj).then((objData) => {
            setTimeout(() => {
                res.json({ message: "Order added.", id: objData._id, code: 200 })
            }, 500)
        })
    } catch (error) {
        console.log(error)
        res.json({ message: error.message })
    }
})

app.post("/api/user/myorder", async (req, res) => {
    let item = []
    let qty = []
    let item_data = []
    let date = []
    let status = []
    let item_data_array_inner = [];
    try {
        let { user_id } = req.body;
        // let query = order_model.where({ "user_id": user_id });
        order_model.find({ "user_id": user_id }).then(async (value) => {
            // console.log("--------", value)
            // value.map(e => e.orders.map(val => console.log('--', val.item_id)))
            item.push(value.map(e => e.orders.map(val => val.item_id)))
            qty.push(value.map(e => e.orders.map(val => val.quantity)))
            date.push(value.map(e => e.createdAt))
            status.push(value.map(e => e.order_status))
            // console.log(date)
            // console.log("item---------", item)
            item[0].map(async (i) => {
                // console.log(i);
                i.map(async (j, key) => {
                    // console.log(i);
                    menu_model.findOne({ "_id": j }).then((menu) => {
                        item_data_array_inner.push(menu)
                        if (key == i.length - 1) {
                            item_data.push(item_data_array_inner)
                            item_data_array_inner = [];
                        }
                        // item_data_array_inner.push(menu)
                        // console.log("innerrr",item_data_array_inner);
                        // console.log(menu);
                    })
                    // setTimeout(() => {
                    // console.log('itemm',item_data_array_inner);
                    // },1000)
                })
            })
            setTimeout(() => {
                res.json({ value, qty, date, item_data, item, status })
            }, 500)
            // console.log(item_data)
        })
    } catch (error) {
        return res.json({ message: error.message })
    }
})

app.post('/api/item/delete', async (req, res) => {
    let { id } = req.body;
    try {
        await menu_model.deleteOne({ _id: id }).then(async () => {
            res.json({ message: "Item deleted", code: 200 })
        }).catch(function (error) {
            res.json({ message: error })
        });
    } catch (error) {
        res.json({ message: error })
    }
})

app.post('/api/item/update', async (req, res) => {
    let { id, current_option, changeVal } = req.body;
    if (current_option == 'img') {
        try {
            await menu_model.findOneAndUpdate({ _id: id }, { $set: { "food_image": changeVal } }).then(async () => {
                res.json({ message: "Image updated.", code: 200 })
            }).catch(function (error) {
                res.json({ message: error })
            });
        } catch (error) {
            res.json({ message: error })
        }
    }
    else if (current_option == 'price') {
        try {
            await menu_model.findOneAndUpdate({ _id: id }, { $set: { "food_price": changeVal } }).then(async () => {
                res.json({ message: "Address updated.", code: 200 })
            }).catch(function (error) {
                res.json({ message: error })
            });
        } catch (error) {
            res.json({ message: error })
        }
    }
    else if (current_option == 'name') {
        try {
            await menu_model.findOneAndUpdate({ _id: id }, { $set: { "food_name": changeVal } }).then(async () => {
                res.json({ message: "Name updated.", code: 200 })
            }).catch(function (error) {
                res.json({ message: error })
            });
        } catch (error) {
            res.json({ message: error })
        }
    }
    else if (current_option == 'avail') {
        try {
            await menu_model.findOneAndUpdate({ _id: id }, { $set: { "food_availability": changeVal } }).then(async () => {
                res.json({ message: "Availability updated.", code: 200 })
            }).catch(function (error) {
                res.json({ message: error })
            });
        } catch (error) {
            res.json({ message: error })
        }
    }
    else {
        res.json({ message: "Invalid option" })
    }
})

app.post('/api/res/data/conf', async (req, res) => {
    let { i } = req.body;
    let query = restaurant_model.where({ "_id": i });
    let value = await query.findOne();
    res.json(value);
})

app.post('/api/add_delivery_person', function (req, res) {
    const { name, address, email, phone, aadhar_no } = req.body;
    const password = randomstring.generate({
        length: 8,
    })
    console.log(password)
    let encryptedPassword = Crypto.AES.encrypt(password.trim().toString(), GLOBAL_PASS).toString();
    var obj = {
        email: email,
        password: encryptedPassword,
        name: name,
        phone: phone,
        address: address,
        aadhar_no: aadhar_no,
        status: "inactive",
        current_status: "idle"
    };
    if (name !== "" && address !== "" && email !== "" && phone !== "" && aadhar_no !== "") {
        var mailOptions = {
            to: email,
            subject: "Welcome to myFood.com Family",
            html: `<h3>Hello ${name}, Now you are a member of myFood.com</h3>` + `<h4>Your login username is your email id and password is</h4>` + "<h1 style='font-weight:bold;'>" + password + "</h1>"
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.status(402).json({ message: error });
            } else {
                console.log('Email sent: ' + info.response);
                delivery_model.create(obj);
                res.json({ message: "Person added.", code: 200 })
            }
        });
    }
    else {
        res.json({ message: "Invalid input." });
    }
});

app.post("/api/delivery_login", async (req, res) => {
    let { email, password } = req.body;
    let usr_pwd = password;
    let encryptedPass = Crypto.AES.encrypt(usr_pwd.trim().toString(), GLOBAL_PASS).toString();
    let decryptedPass = Crypto.AES.decrypt(encryptedPass, GLOBAL_PASS).toString();
    let encrp = decryptedPass.toString(Crypto.enc.Utf8);
    if (email != "" && password != "") {
        let query = delivery_model.where({ email: email });
        let value = await query.findOne();
        if (value != null) {
            let pswd = value.password;
            let decryptedPwd = Crypto.AES.decrypt(pswd.trim().toString(), GLOBAL_PASS).toString();
            let decrypt = decryptedPwd.toString(Crypto.enc.Utf8);
            console.log(decrypt)
            console.log(encrp)
            if (value.email == email && decrypt == encrp) {
                res.json({ id: value._id })
            } else {
                res.json({ message: "Wrong Credentials." });
            }
        } else {
            res.json({ message: "Wrong Credentials." });
        }
    } else {
        res.json({ message: "Wrong Credentials." });
    }
})

app.post("/api/delivery_person/start", async (req, res) => {
    let { id } = req.body;
    if (id != "") {
        try {
            await delivery_model.findOneAndUpdate({ _id: id }, { $set: { "status": "active" } }).then(async () => {
                res.json({ message: "Active.", code: 200 })
            }).catch(function (error) {
                res.json({ message: error })
            });
        } catch (error) {
            res.json({ message: error })
        }
    } else {
        res.json({ message: "Failed." });
    }
})

app.post("/api/delivery_person/stop", async (req, res) => {
    let { id } = req.body;
    if (id != "") {
        try {
            await delivery_model.findOneAndUpdate({ _id: id }, { $set: { "status": "inactive" } }).then(async () => {
                res.json({ message: "Inactive.", code: 200 })
            }).catch(function (error) {
                res.json({ message: error })
            });
        } catch (error) {
            res.json({ message: error })
        }
    } else {
        res.json({ message: "Failed." });
    }
})

app.post('/api/delivery_person/status', async (req, res) => {
    let { i } = req.body;
    let query = delivery_model.where({ "_id": i });
    let value = await query.findOne();
    res.json(value);
})

app.post("/api/restaurant/order/list", async (req, res) => {

    let item = []
    let qty = []
    let item_data = []
    let date = []
    let status = []
    let user = []
    let item_data_array_inner = [];
    try {
        let { id } = req.body;
        order_model.find({ "restaurant_id": id }).then(async (value) => {
            item.push(value.map(e => e.orders.map(val => val.item_id)))
            qty.push(value.map(e => e.orders.map(val => val.quantity)))
            date.push(value.map(e => e.createdAt))
            status.push(value.map(e => e.order_status))
            user.push(value.map(e => e.user_id))
            item[0].map(async (i) => {
                i.map(async (j, key) => {
                    menu_model.findOne({ "_id": j }).then((menu) => {
                        item_data_array_inner.push(menu)
                        if (key == i.length - 1) {
                            item_data.push(item_data_array_inner)
                            item_data_array_inner = [];
                        }
                    })
                })
            })
            setTimeout(() => {
                res.json({ date, item, qty, item_data, status, user })
            }, 500)
        })
    } catch (error) {
        return res.json({ message: error.message })
    }

})

app.post("/api/delivery/profile", async (req, res) => {
    try {
        let { id } = req.body;
        let query = delivery_model.where({ "_id": id });
        let value = await query.find();
        res.json(value)
    } catch (error) {
        return res.json({ message: error.message })
    }
})

app.get("/api/delivery/list", async (req, res) => {
    try {
        let value = await delivery_model.find();
        res.json(value)
    } catch (error) {
        return res.json({ message: error.message })
    }
})

app.post('/api/person/delete', async (req, res) => {
    let { id } = req.body;
    try {
        await delivery_model.deleteOne({ _id: id }).then(async () => {
            res.json({ message: "Person deleted", code: 200 })
        }).catch(function (error) {
            res.json({ message: error })
        });
    } catch (error) {
        res.json({ message: error })
    }
})

app.get('/api/delivery_request', async (req, res) => {
    let value = await request_model.find();
    res.json(value);
})

app.post('/api/request/delete', async (req, res) => {
    let { uniqueid } = req.body;
    try {
        await request_model.deleteOne({ "requests.uniqueid": uniqueid }).then(async () => {
            res.json({ code: 200 })
        }).catch(function (error) {
            res.json({ message: error })
        });
    } catch (error) {
        res.json({ message: error })
    }
})

app.post('/api/request/accept', async (req, res) => {
    let { d_id, order_id, uid, rid, address, user_lat, user_long, cart, cart_total } = req.body;
    delivery_schema.create({
        d_id: d_id,
        order_id: order_id,
        user_id: uid,
        restaurant_id: rid,
        user_address: address,
        user_lat_long: [user_lat, user_long],
        orders: cart,
        total_amount: cart_total,
        status: "incomplete"
    }).then((e) => { console.log("added to delivery person") })
        .catch((e) => { console.log(e) });
})

app.post("/api/delivery_person/status_change", async (req, res) => {
    let { id } = req.body;
    if (id != "") {
        try {
            await delivery_model.findOneAndUpdate({ _id: id }, { $set: { "current_status": "OnDelivery" } }).then(async () => {
                res.json({ message: "Active.", code: 200 })
            }).catch(function (error) {
                res.json({ message: error })
            });
        } catch (error) {
            res.json({ message: error })
        }
    } else {
        res.json({ message: "Failed." });
    }
})

app.post("/api/delivery/status", async (req, res) => {
    let { id } = req.body;
    if (id != "") {
        try {
            await delivery_model.findOne({ _id: id }).then(async (response) => {
                res.json({ data: response, code: 200 })
            }).catch(function (error) {
                res.json({ message: error })
            });
        } catch (error) {
            res.json({ message: error })
        }
    } else {
        res.json({ message: "Failed." });
    }
})


app.post("/api/delivery/current_status", async (req, res) => {
    let { id } = req.body;
    if (id != "") {
        try {
            await delivery_schema.find({ d_id: id }).then(async (val) => {
                let status_count = []
                val.filter((e) => e.status === "incomplete").map(v => status_count.push((v.status)))
                // console.log(status_count.length)
                res.json({ code: 200, incomplete: status_count.length })
            })
        } catch (error) {
            // res.json({ message: error })
            console.log(error)
        }
    } else {
        // res.json({ message: "Failed." });
        console.log("Invalid ID");
    }
})


app.post("/api/delivery/set_complete", async (req, res) => {
    let { id } = req.body;
    if (id != "") {
        try {
            await delivery_schema.find({ d_id: id }).then(async (val) => {
                val.filter((e) => e.status === "incomplete").map(async (v) => {
                    await delivery_model.findOneAndUpdate({ _id: id }, { $set: { "current_status": "idle" } })
                    await delivery_schema.findOneAndUpdate({ _id: v._id }, { $set: { "status": "complete" } })
                    await order_model.findOneAndUpdate({ _id: v.order_id }, { $set: { "order_status": "delivered" } })
                })
                res.json({ code: 200 })
            })
        } catch (error) {
            console.log(error)
        }
    } else {
        // res.json({ message: "Failed." });
        console.log("Invalid ID");
    }
})

app.post("/api/delivery/ongoing_data", async (req, res) => {
    let { id } = req.body;
    console.log(id)
    if (id != "") {
        try {
            await delivery_schema.find({ d_id: id }).then(async (val) => {
                val.filter((e) => e.status === "incomplete").map(async (v) => {
                    restaurant_model.findOne({ _id: v.restaurant_id }).then((res_response) => {
                      user_model.findOne({ email: v.user_id }).then((user_res) => {
                            delivery_schema.findOne({ _id: v._id }).then((response) => {
                                res.json({
                                    code: 200,
                                    _id: response._id,
                                    del_id: response.d_id,
                                    order_id: response.order_id,
                                    user_id: response.user_id,
                                    username: user_res.name,
                                    // username: response.user_id,
                                    restaurant_id: response.restaurant_id,
                                    res_location: res_response.lat_long,
                                    res_address: res_response.address,
                                    res_name: res_response.name,
                                    user_address: response.user_address,
                                    user_lat_long: response.user_lat_long,
                                    orders: response.orders,
                                    total_amount: response.total_amount,
                                    createdAt: response.createdAt,
                                    updatedAt: response.updatedAt
                                })
                            })
                      })
                    })

                })
            })
        } catch (error) {
            console.log("Error :",error)
        }
    } else {
        res.json({ message: "Failed." })
    }
})

app.post('/api/restaurant_request/delete', async (req, res) => {
    let { uniqueid } = req.body;
    try {
        await restaurant_request.deleteOne({ "requests.uniqueid": uniqueid }).then(async () => {
            res.json({ code: 200 })
        }).catch(function (error) {
            res.json({ message: error })
        });
    } catch (error) {
        res.json({ message: error })
    }
})

app.get('/api/restaurant_request', async (req, res) => {
    let value = await restaurant_request.find();
    res.json(value);
})

app.post("/api/delivery/change_status", async (req, res) => {
    let { d_id } = req.body;
    if (d_id != "") {
        try {
            await delivery_schema.find({ d_id: d_id }).then(async (val) => {
                val.filter((e) => e.status === "incomplete").map(async (v) => {
                    await order_model.findOneAndUpdate({ _id: v.order_id }, { $set: { "order_status": "in progress" } })
                })
                res.json({ code: 200 })
            })
        } catch (error) {
            console.log(error)
        }
    } else {
        res.json({ message: "Failed." });
    }
})
