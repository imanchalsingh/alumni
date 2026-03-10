import mongoose from "mongoose";

const WorkshopSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        shortDescription: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            enum: ["Workshop", "Seminar", "Webinar", "Alumni Talk"],
            required: true,
        },

        mode: {
            type: String,
            enum: ["online", "offline", "hybrid"],
            required: true,
        },

        organization: {
            type: String,
            required: true,
            trim: true,
        },

        speaker: {
            type: String,
            required: true,
            trim: true,
        },

        date: {
            type: Date,
            required: true,
        },

        startTime: {
            type: String,
            required: true,
        },

        endTime: {
            type: String,
            required: true,
        },

        // required only if offline
        venue: {
            type: String,
            required: function () {
                return this.mode === "offline" || this.mode === "hybrid";
            },
        },

        // required only if online
        meetingLink: {
            type: String,
            required: function () {
                return this.mode === "online" || this.mode === "hybrid";
            },
        },

        coverImage: {
            type: String,
            required: true,
        },

        registrationRequired: {
            type: Boolean,
            default: false,
        },

        maxParticipants: {
            type: Number,
            default: null,
        },

        registrationDeadline: {
            type: Date,
        },

        contactName: {
            type: String,
            required: true,
        },

        contactEmail: {
            type: String,
            required: true,
            lowercase: true,
        },

        status: {
            type: String,
            enum: ["upcoming", "ongoing", "completed"],
            default: "upcoming",
        },
    },
    { timestamps: true }
);

const Workshop = mongoose.model("Workshop", WorkshopSchema);

export default Workshop;