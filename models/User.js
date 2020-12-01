const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const ENCRYPT_TIMES = 10;

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        validate: [({ length }) => length >= 1, "Password must be at least 6 characters."]
    }
});

// hash password, but only if creating a new user
userSchema.pre("save", function () {
    if (this.isNew) {
        return bcrypt.hash(this.password, bcrypt.genSaltSync(ENCRYPT_TIMES), null).then(hash => {
            this.password = hash;
        })
    } else return;
});

userSchema.methods.checkPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model("User", userSchema);

module.exports = User;
