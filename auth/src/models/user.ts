import { Schema, model } from "mongoose";

interface UserProps {
  git_id: string;
  email: string;
  password: string;
}

const userSchema = new Schema<UserProps>({
  git_id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model<UserProps>("User", userSchema);

export { User };
