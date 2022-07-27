const mongoose = require ("mongoose");

const connect = () => {

    mongoose.connect("mongodb://localhost:27017/personal_assignments").catch(()=>{
        console.error(err);
    });
};

module.exports = connect;