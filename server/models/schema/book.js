import mongoose, {
    Schema
} from 'mongoose';

var BookSchema = new Schema({
    name: String,
    img: String,
    type: String,
    role: String,
    money: Number,
    userID: String,
    deadline: Date,
    introduction: String,
    description: String,
    school:String,
    isDeleted: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: '待审核'
    },
    views: {
        type: Number,
        default: 0
    },
});

export default mongoose.model('Book', BookSchema);
