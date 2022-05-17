import mongoose from "mongoose";
import WilderModel from "../models/Wilder";

export const resolvers = {
	Query: {
		getAllWilders: async () => await WilderModel.find({}),
	},
	Mutation: {
		createWilder: async (_: any, data: any) => {
			await WilderModel.init();
			const newWilder = new WilderModel(data);
			newWilder._id = new mongoose.Types.ObjectId();
			// generate a dynamic id
			return await newWilder.save();
		},
		deleteWilder: async (_: any, { name }: any) => {
			const wilder = await WilderModel.findOne({ name });
			console.log(wilder);
			if (wilder) {
				await wilder.remove();
			}
			return wilder;
		},
		updateWilder: async (_: any, data: any) => {
			await WilderModel.init();
			console.log(data);
			const wilder = await WilderModel.findOne({ name: data.name });
			if (wilder) {
				Object.assign(wilder, data);
				await wilder.save();
				return wilder;
			} else {
				return null;
			}
		},
	},
};
