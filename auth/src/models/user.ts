import { Schema, model, Document, Model } from "mongoose";

interface UserProps {
  git_id: string;
  email: string;
  username: string;
  privileges: number;
}

interface UserDoc extends Document {
  git_id: string;
  email: string;
  username: string;
  privileges: number;
}

interface UserModel extends Model<UserDoc> {
  build(attrs: UserProps): UserDoc;
}

const userSchema = new Schema<UserDoc>(
  {
    git_id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    privileges: {
      type: Number,
      required: true,
    },
  },
  {
    toObject: {
      transform(_doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    toJSON: {
      transform(_doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

userSchema.statics.build = (attrs: UserProps) => {
  return new User(attrs);
};

const User = model<UserDoc, UserModel>("User", userSchema);

export { User };
