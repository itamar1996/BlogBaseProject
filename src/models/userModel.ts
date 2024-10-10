import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";

export interface IUser extends Document {
  username: string;
  email: string;
  profile: {
    bio?: string;
    socialLinks?: string[];
  };
  posts: Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, 'Username is required'],
    minlength: [10, 'Name too short. Must be at least 10 characters long']
  },
  email: {
    type: String,
    required: true,
    minlength: 10,
    unique: true,
    validate: {
      validator: function (v) {
        return validator.isEmail(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  profile:{
    bio:{
      type :String,
      default :""
    },
    socialLinks:{
      type :String,
      default :""
    }
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Post'
  }],
});

export default mongoose.model<IUser>("User", UserSchema);
