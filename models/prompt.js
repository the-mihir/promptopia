import mongoose, { Schema, model, models } from "mongoose";

const PromptSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Make sure 'User' matches your user model
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required!'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required!'],
    },
}, {
    timestamps: true,
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;
