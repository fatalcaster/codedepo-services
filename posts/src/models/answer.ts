import { Schema, model, Document, Model } from "mongoose";

interface AnswerProps {
  body: string[];
  authorId: string;
  postId: string;
}

interface AnswerDoc extends Document {
  body: string[];
  authorId: string;
  postId: string;
}

interface AnswerModel extends Model<AnswerDoc> {
  build(attrs: AnswerProps): AnswerDoc;
}

const answerSchema = new Schema<AnswerDoc>(
  {
    body: {
      type: Array,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
    postId: {
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

answerSchema.statics.build = (attrs: AnswerProps) => {
  return new Answer(attrs);
};

const Answer = model<AnswerDoc, AnswerModel>("Answer", answerSchema);

export { Answer };
