import mongoose from 'mongoose';
const Schema = mongoose.Schema;
/*
const postSchema = new Schema({
  name: { type: 'String', required: true },
  title: { type: 'String', required: true },
  content: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Post', postSchema);
*/

const todoSchema = new Schema({
    text: { type: 'String', required: true },
    cuid: { type: 'String', required: true },
    completed: { type: 'Boolean', default: false, required: true},
    dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Todo', todoSchema);
