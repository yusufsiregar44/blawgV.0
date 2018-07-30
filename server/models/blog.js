const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
  }],
  mediaURI: {
    type: String,
    required: true,
  },
  comments: {
    type: Array,
  },
  writer: {
    type: String,
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
},  {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
