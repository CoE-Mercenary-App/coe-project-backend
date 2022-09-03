const { Schema, model } = require('mongoose');


const userSchema = Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    industry: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String },
    role: { type: String, required: true, default: 'USER_ROLE' },
    likes: { type: String, required: false },

    // --data--
    status: { type: String, required: false },
    active: { type: String, required: false },
    created_at: { type: Date, required: false },
    updated_at: { type: Date, required: false }

}, { collection: 'Users' });

userSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});



module.exports = model('User', userSchema);