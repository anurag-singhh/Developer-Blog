const mongoose = require('mongoose');

const url = "mongodb+srv://anusingh1104:Anurag12@mycluster.xopgkot.mongodb.net/devblogs?retryWrites=true&w=majority";

// asynchronous function - return a promise
mongoose.connect(url)
.then((result) => {
    console.log('database connected');
})
.catch((err) => {
    console.log('err');
});

module.exports = mongoose;