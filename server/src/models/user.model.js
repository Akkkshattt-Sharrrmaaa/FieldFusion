import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            index: true
        },

        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true
        },

        password: {
            type: String,
            required: true,
        },

        avatar: {
            type: String
        },

        role: {
            type: String, 
            required: true,
            trim: true,
            enum: ["user", "admin"]

        },

        bookingHistory:[
            {
                type: Schema.Types.ObjectId,
                ref: "Slot"
            }
        ],

        refreshToken: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);