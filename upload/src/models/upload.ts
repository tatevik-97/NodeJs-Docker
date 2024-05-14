// import mongoose from "mongoose"
//
// interface PostAttributes {
//     title: string;
//     content: string;
//     userId: string;
// }
//
// interface PostsDoc extends mongoose.Document {
//     title: string;
//     content: string;
//     userId: string;
// }
//
// interface PostModel extends mongoose.Model<PostsDoc> {
//     build(attrs: PostAttributes):PostsDoc
// }
//
// const postSchema = new mongoose.Schema({
//     title: {
//         type: "string",
//         required: true
//     },
//     content: {
//         type: "string",
//         required: true
//     },
//     userId: {
//         type: "string",
//         required: true
//     },
// },
//     {
//         toJSON: {
//             transform(doc, ret){
//                 ret.id = ret._id;
//                 delete ret._id;
//             }
//         }
//     })
// postSchema.statics.build =(attrs: PostAttributes) => {
//     return new Upload(attrs)
// }
//
// const Upload = mongoose.model<PostsDoc, PostModel>("Upload", postSchema);
//
// export {Upload}
