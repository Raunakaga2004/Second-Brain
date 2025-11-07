import mongoose, { Types } from "mongoose";

const UsersSchema = new mongoose.Schema({
    name : {type : String, required : true},
    mail : {type : String, required : true, unique : true},
    password : {type : String, required : true},
    resetToken: { type: String },
    resetTokenExpiry: { type: Number },
})

const contentTypes = ['youtube', 'x', 'text', 'link'];

const ContentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  type : {type: String, enum : contentTypes, default : 'text'},
  link: {type : String},
  tags: [{ type: Types.ObjectId, ref: 'Tag' }],
  userId: { type: Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const LinkSchema = new mongoose.Schema({
    hash : {type : String, required : true, unique : true},
    userId : {type : Types.ObjectId, required : true, ref : 'User'}
});

const TagsSchema = new mongoose.Schema({
    title : {type : String, required : true, unique : true}
})

export const User = mongoose.model("User", UsersSchema);
export const Content = mongoose.model("Content", ContentSchema);
export const Link = mongoose.model("Link", LinkSchema);
export const Tag = mongoose.model("Tag", TagsSchema);