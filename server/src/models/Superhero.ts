import mongoose, { Document, Schema } from 'mongoose';

export interface ISuperhero extends Document {
    nickname: string;
    real_name: string;
    origin_description: string;
    superpowers: string[];
    catch_phrase: string;
    Images: string[];
}

const SuperheroSchema: Schema = new Schema(
    {
        nickname: {
            type: String,
            required: true,
        },
        real_name: {
            type: String,
            required: true,
        },
        origin_description: {
            type: String,
            required: true,
        },
        superpowers: {
            type: [String],
            required: true,
        },
        catch_phrase: {
            type: String,
            required: true,
        },
        Images: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true },
);

export const Superhero = mongoose.model<ISuperhero>('Superhero', SuperheroSchema);
