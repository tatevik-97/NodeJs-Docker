import mongoose from 'mongoose';

interface QuestionsAttrs {
    title: string;
    description: string;
    tags?: string[];
    votes?: number;
    views?: number;
    answers?: AnswersDoc[];
    author: string;
}


interface AnswersDoc extends mongoose.Document {
    user: string;
    text: string;
}

interface QuestionsDoc extends mongoose.Document {
    title: string;
    description: string;
    tags: string[];
    votes: number;
    answers: AnswersDoc[];
    author: string;
    views: number;
}

interface QuestionsModel extends mongoose.Model<QuestionsDoc> {
    build(attrs:QuestionsAttrs): QuestionsDoc;
}

const answersSchema = new mongoose.Schema({
    user: { type: String, required: true },
    text: { type: String, required: true },
});


const questionsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    votes: {
        type: Number,
        default: 0
    },
    views: { type: Number, default: 0 },
    answers: {
        type: [answersSchema],
        default: []
    },
    author: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

questionsSchema.statics.build = (attrs: QuestionsAttrs) => {
    return new Questions(attrs);
};

const Questions = mongoose.model<QuestionsDoc, QuestionsModel>('Questions', questionsSchema);

export { Questions };
