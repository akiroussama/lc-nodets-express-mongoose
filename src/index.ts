
import express from 'express';
import mongoose from 'mongoose';
import WilderModel from './models/Wilder';
import WildersController from './controllers/Wilders';
import cors from 'cors';
import {startApolloServer} from "./initServer";

const { ApolloServer, gql } = require('apollo-server-express');

const resolvers = {
    Query: {
        getAllWilders: async () =>  await WilderModel.find({})
    },
    Mutation: {
        createWilder: async (_:any, data:any) => {
            await WilderModel.init();
            const newWilder = new WilderModel( data);
            newWilder._id = new mongoose.Types.ObjectId();
            // generate a dynamic id
            return await newWilder.save();
        },  
        deleteWilder: async (_:any, {name}:any) => {
            const wilder = await WilderModel.findOne({ name});
            console.log(wilder);
            if (wilder) {
                await wilder.remove();
            }
            return wilder;
        },
        updateWilder: async (_:any, data:any) => {
            await WilderModel.init();
            console.log(data);
            const wilder = await WilderModel.findOne({name: data.name});
            if (wilder) {
                Object.assign(wilder, data);
                await wilder.save();
                return wilder;
            } else {
                return null;
            }
        },
    }
};
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  type Skill {
    votes: Int
    title: String
  }
  type Book {
  title: String
  author: String
}


  # This "Wilder" type defines the queryable fields for every wilder in our data source.
  type Wilder {
    name: String
    city: String
    skills: [Skill]
  }

  type Query {
    getAllWilders: [Wilder]
  }
  input InputSkill {
     votes: Int
    title: String
  }
  input InputWilder {
    name: String!
    city: String!
    skills: [InputSkill]
  }
  type Mutation {
    createWilder(name: String, city: String, skills: [InputSkill] ): Wilder
    updateWilder(name: String, city: String, skills: [InputSkill] ): Wilder
    deleteWilder(name: String!): Wilder
  }

   
`;
//   type mutation {
//     CreateWilder($city: String!, $name: String!, $id: Int!){
//      createWilder(city: $city, name: $name, id: $id){
//       id
//       name
//       city
//     }
//   }
//   }
const app = express();

// On va typer:
// - toutes nos variables (const/let), je viens les types (const maVar: ... =)
// - les paramètres d'entrée de mes fonctions (p1: ..., p2: ...) =>
// - le paramètre de sortie de mes fonctions (): ... =>
function execAsyncHandler(handler: Function): express.RequestHandler {
    return async function (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        try {
            await handler(req, res, next);
        } catch (err) {
            console.log("Error caught by the higher order function");
            next(err);
        }
    }
}

mongoose.connect('mongodb://localhost:27017/wildapi2', {
    autoIndex: true
})
    .then(() => {
        console.log("Connected");
    })
    .catch(() => {
        console.log("Not connected");
    });

     startApolloServer(typeDefs, resolvers).then(() => {
        console.log("Server started at http://localhost:4000/graphql 🚀🚀🚀");
    });

