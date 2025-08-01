import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    unique: true,
    required: true
  },
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
  likes: [
    {  
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Like'
    }

  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

export default mongoose.models.User || mongoose.model('User', userSchema)