const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

const Course = new Schema(
    {
        name: { type: String, require: true },
        description: {
            type: String,
            default: '',
            minLength: 1,
            maxLength: 600,
        },
        image: { type: String },
        videoId: { type: String },
        level: { type: String },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

mongoose.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt : true
});
mongoose.plugin(slug);

module.exports = mongoose.model('Course', Course);
