import mongoose, { Types } from "mongoose";

const UsersSchema = new mongoose.Schema({
    username : {type : String, required : true, unique : true},
    password : {type : String, required : true}
})

const contentTypes = ['youtube', 'x'];

const ContentSchema = new mongoose.Schema({
    link : {type : String, required : true},
    type : {type : String, enum : contentTypes, required : true},
    title : {type : String, required : true},
    tags : [{type : Types.ObjectId, ref : 'Tag'}],
    userId : {type : Types.ObjectId, ref : 'User', required : true}
});

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