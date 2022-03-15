import mongoose from 'mongoose';

interface IWilder {
    name: string;
    city: string;
    skills: { title: string, votes: number }[];
}

const Schema = mongoose.Schema;
const WilderSchema = new Schema<IWilder>({
    name: { type: String, unique: true, required: true },
    city: String,
    skills: [{ title: String, votes: Number }]
});

export default mongoose.model("wilder", WilderSchema);