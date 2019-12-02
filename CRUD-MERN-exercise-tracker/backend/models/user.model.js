const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Define obj/document schema
//trim -> trim whitespaces
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
}, {
  timestamps: true,
});

//Create a user object/document with the defined schema
const User = mongoose.model('User', userSchema);

module.exports = User; //export/ return the created user obj