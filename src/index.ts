import express from "express";
import mongoose from "mongoose";
import WildersController from "./controllers/Wilders";
import { typeDefs } from "./gql/schema";
import { resolvers } from "./gql/resolvers";
import { connectDatabase } from "./connectDataBase";
import startApolloServer from "./startApolloServer";

connectDatabase();
startApolloServer(typeDefs, resolvers).then(() => {
	console.log(" Server ready at http://localhost:4000/graphql 🚀🚀🚀");
});
