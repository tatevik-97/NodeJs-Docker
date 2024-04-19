import mongoose from 'mongoose';

interface PostAttrs {
    title: string;
    description: string;
    tags?: string[];
    votes?: number;
    comments?: CommentDoc[];
    author: string;
    views?: number;
}


interface CommentDoc extends mongoose.Document {
    user: string;
    text: string;
}

interface PostsDoc extends mongoose.Document {
    title: string;
    description: string;
    tags: string[];
    votes: number;
    comments: CommentDoc[];
    author: string;
    views: number;
}

interface PostsModel extends mongoose.Model<PostsDoc> {
    build(attrs: PostAttrs): PostsDoc;
}

const commentSchema = new mongoose.Schema({
    user: { type: String, required: true },
    text: { type: String, required: true },
});

const postSchema = new mongoose.Schema({
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
    comments: {
        type: [commentSchema],
        default: []
    },
    author: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
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

postSchema.statics.build = (attrs: PostAttrs) => {
    return new Posts(attrs);
};

const Posts = mongoose.model<PostsDoc, PostsModel>('Posts', postSchema);

export { Posts };