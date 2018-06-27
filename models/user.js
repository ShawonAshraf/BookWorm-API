import mongoose, { Mongoose } from "mongoose"
import validator from "validator"
import _ from "lodash"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

let UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        validate: {
            validator: validator.isEmail,
            message: "{VALUE} is not a valid email address."
        }
    },
    password: {
        type: String,
        required: 1,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
})

// parse user object to json
UserSchema.methods.toJSON = function() {
    let user = this
    let userObject = user.toObject()
    return _.pick(userObject, ["_id", "email"]);
}

// generate auth token for user
UserSchema.methods.generateAuthToken = function() {
    let user = this
    let access = "auth"
    let token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET).toString()

    user.tokens.push({
        access,
        token
    })

    return user.save().then(() => {
        return token
    }).catch((err) => console.log(err))
}

// find user by token
UserSchema.statics.findByToken = function(token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return Promise.reject()
    }

    return User.findOne({
        _id: decoded._id,
        "tokens.token": token,
        "tokens.access": "auth"
    })
}

// find user by credentials
UserSchema.statics.findByCredentials = function(email, password) {
    var User = this

    return User.findOne({ email }).then((user) => {
        if (!user) {
            return Promise.reject()
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user)
                } else {
                    reject()
                }
            })
        })
    })
}

// pre hook for password check
UserSchema.pre("save", function(next) {
    let user = this
    let saltLevel = parseInt(process.env.SALT)

    if (user.isModified("password")) {
        bcrypt.genSalt(saltLevel, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})


let User = mongoose.model("User", UserSchema)

export default User