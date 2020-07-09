const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    post: { type: String, unique: true, required: true },
    likes: { type: Number, required: true },
    authorId: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Post', schema);