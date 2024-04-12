import mongoose, { Schema } from "mongoose";

const slotSchema = new Schema(
    {
        date: {
            type: String,
            required: true,
        }, 
        startTime: {
            type: Number,
            required: true,
        }, 
        endTime: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
            trim: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true,
    }
);

export const Slot = mongoose.model("Slot", slotSchema);