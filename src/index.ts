import express from "express";
import mongoose, { Schema } from "mongoose";
import { connectToDatabase } from "./connectToDatabase";
import WildersController from "./controllers/Wilders";
import { resolvers } from "./gql/resolvers";
import { typeDefs } from "./gql/schema";
import { startApolloServer } from "./startApolloServer";

// connexion to the database
connectToDatabase();

// start Apollo server
startApolloServer(typeDefs, resolvers);
