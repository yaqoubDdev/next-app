import mongoose from "mongoose"

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  blog:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }
})

likeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default mongoose.models.Like || mongoose.model('Like', likeSchema)