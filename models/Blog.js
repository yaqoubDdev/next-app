import mongoose from "mongoose"

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  imageUrl: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema)