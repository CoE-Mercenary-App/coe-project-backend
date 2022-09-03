const { Schema, model } = require('mongoose');


const serviceSchema = Schema({
    service: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    reviews: [{ type: String, required: false }],

    // ---Relation---
    user: { required: false, type: Schema.Types.ObjectId, ref: 'User' },

    // --data--
    status: { type: String, required: false },
    active: { type: String, required: false },
    created_at: { type: Date, required: false },
    updated_at: { type: Date, required: false }

}, { collection: 'Services' });

serviceSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});



module.exports = model('Service', serviceSchema);