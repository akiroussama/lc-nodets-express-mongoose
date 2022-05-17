import WilderModel from '../models/Wilder';

export const resolvers = {
    Query: {
        getAllWilders: async () =>  await WilderModel.find({})
    },
};