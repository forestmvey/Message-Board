const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema ({
    email: {
        type: String,
        required: true,
        maxLength: 20,
        lowercase: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 50,
        unique: false,
    },
});

userSchema.pre('save', function(next) {

    // hash and salt password
    bcrypt.hash(this.password, 10)
    .then ( hash => {
        this.password = hash;
        next();
    })
    .catch(err => {
        console.log('Error in hashing password' + err);
        next(err);
    });
});

userSchema.methods.verifyPassword = function(inputedPlainTextPassword) {
    const hashedPassword = this.password;
    return bcrypt.compare( inputedPlainTextPassword, hashedPassword);
}

module.exports = mongoose.model('user', userSchema);