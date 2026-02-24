import mongoose from 'mongoose';

const AdminUserSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });

const AdminUser = mongoose.model('AdminUser', AdminUserSchema);
export default AdminUser;