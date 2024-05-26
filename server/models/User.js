const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UserSchema = new Schema({
    firstname: {type: String, required: true, min: 4},
    lastname: {type: String, required: true, min: 4},
    email: { 
        type: String, 
        required: true, 
        unique: true,
        validate: {
            validator: function(v) {
                // Regular expression for email validation
                return /\S+@\S+\.\S+/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {type: String, required: true},
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;