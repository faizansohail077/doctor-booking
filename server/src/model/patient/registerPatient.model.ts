import mongoose, { Schema } from 'mongoose';
import { ROLE } from '../../enums';

const registerPatientSchema: any = new Schema({
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
    
    isApproved: {
        type: Boolean,
        default: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isProfileCompleted: {
        type: Boolean,
        default: false
    },
  
    role: {
        type: String,
        default: ROLE.PATIENT
    }
}, { timestamps: true })

var CreateDoctorSchema = mongoose.model('Patients', registerPatientSchema);

export default CreateDoctorSchema;