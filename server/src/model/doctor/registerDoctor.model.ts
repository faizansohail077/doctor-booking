import mongoose, { Schema } from 'mongoose';
import { ROLE } from '../../enums';

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
    password: {
        type: String,
        required: true,
        trim: true,
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
    },
    
    location: {
        type: {
            type: String,
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    

    role: {
        type: String,
        default: ROLE.DOCTOR
    },
   
    profile_image: {
        url: String,
        public_id: String
    },
    certificates: {
        type: [
            {
                url: String,
                public_id: String
            }]
    }
}, { timestamps: true })
registerDoctorSchema.index({location: "2dsphere"});

var CreateDoctorSchema = mongoose.model('Doctors', registerDoctorSchema);

export default CreateDoctorSchema;