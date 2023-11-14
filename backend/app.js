require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const User = require('./models/user');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');


app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    User.findById('65254e6aa6780c56d6e83fb2')
    .then(user => {
        req.user = user;
        next();
    })
    .catch((error) => console.log(error));
});

app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);
app.use('*', errorRoutes);


const port =  process.env.PORT || 4500;

mongoose
.connect(process.env.MONGOLINK)
.then(() => {
    User.findOne().then(user => {
        if(!user){
            const user = new User({
                name: 'shubham',
                email: 'shubham@gmail.com',
                cart: {
                    items:[]
                }
            })
            user.save();
        }
    });
    app.listen(port);
    console.log('connected!');
})
.catch(error => {
    console.log('Error while connecting to server', error);
})
