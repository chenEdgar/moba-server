const mongoose = require('mongoose')

// 需要先register Category model。否则使用Populate填充时会报错
// https://stackoverflow.com/questions/20832126/missingschemaerror-schema-hasnt-been-registered-for-model-user
require('./Category')

const schema = new mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]
})

module.exports = mongoose.model('Article', schema)