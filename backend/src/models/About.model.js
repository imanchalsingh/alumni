import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
    siteName: String,
    tagline: String,

    description: String,

    mission: String,
    vision: String,

    targetAudience: String,
    benefits: [String],

    stats: {
        totalAlumni: Number,
        workshopsConducted: Number,
        servicesOffered: Number
    },

    logo: String,
    bannerImage: String,

    contact: {
        email: String,
        phone: String,
        address: String
    },

    socialLinks: {
        linkedin: String,
        github: String,
        instagram: String
    }

}, { timestamps: true });

const About = mongoose.model("About", aboutSchema);

export default About;