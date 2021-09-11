import { Schema, model, Document, Model } from "mongoose";

interface PostProps {
  title: string[];
  body: string[];
  modifiedAt: Date;
  authorId: string;
  prize: string;
}

interface PostDoc extends Document {
  title: string[];
  body: string[];
  modifiedAt: Date;
  authorId: string;
  prize: string;
}

interface PostModel extends Model<PostDoc> {
  build(attrs: PostProps): PostDoc;
}

const postSchema = new Schema<PostDoc>(
  {
    title: {
      type: Array,
      required: true,
    },
    body: {
      type: Array,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
    prize: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(_doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

postSchema.statics.build = (attrs: PostProps) => {
  return new Post(attrs);
};

const Post = model<PostDoc, PostModel>("Post", postSchema);

export { Post };
