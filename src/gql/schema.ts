import {gql} from "apollo-server-express";

export const typeDefs = gql`
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
    type Skill {
        votes: Int
        title: String
    }
    # This "Wilder" type defines the queryable fields for every wilder in our data source.
    type Wilder {
        name: String
        city: String
        skills: [Skill]
    }
    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "getAllWilders" query returns an array of zero or more Wilders (defined above).
    type Query {
        getAllWilders: [Wilder]
    }
`;