import WilderModel from '../models/Wilder';

const resolvers = {
    Query: {
        getAllWilders: async () =>  await WilderModel.find({})
    },
};