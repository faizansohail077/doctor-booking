import mongoose, { Schema } from 'mongoose';

const registerDoctorSchema: any = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    street: {
        type: String,
        required: true,
        trim: true
    },
    zip: {
        type: String,
        required: true,
        trim: true
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isProfileCompleted: {
        type: Boolean,
        default: false
    },
    lng: {
        type: Number,
        required: true,
        trim: true
    },
    lat: {
        type: Number,
        required: true,
        trim: true
    }
}, { timestamps: true })

var CreateDoctorSchema = mongoose.model('Doctors', registerDoctorSchema);

export default CreateDoctorSchema;