import mongoose from 'mongoose'
import {Password} from "../services/Password";

interface UserAttrs {
    email: string;
    password: string
}

interface UserDoc extends mongoose.Document {
    email: string;
    password: string
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc
}

const userSchema = new mongoose.Schema({
    email: {
        type: "string",
        unique: true,
        required: true
    },
    password: {
        type: "string",
        required: true
    }
})

userSchema.pre("save", async function (done) {
    if (this.isModified("password")) {
        const hashedPassword = await Password.toHash(this.get("password"))
        this.set("password", hashedPassword)
    }
    done()
})

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>("User", userSchema)

export default User