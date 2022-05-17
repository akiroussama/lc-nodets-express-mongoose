// For clarity in this example we included our typeDefs and resolvers above our test,

import { ApolloServer, gql } from "apollo-server-express";

// but in a real world situation you'd be importing these in from different files
const typeDefs = gql`
	type Query {
		hello(name: String): String!
	}
`;

const resolvers = {
	Query: {
		hello: (_: any, data: any) => `Hello ${data.name}!`,
	},
};

it("returns hello with the provided name", async () => {
	const testServer = new ApolloServer({
		typeDefs,
		resolvers,
	});

	const result = await testServer.executeOperation({
		query: "query SayHelloWorld($name: String) { hello(name: $name) }",
		variables: { name: "world" },
	});

	expect(result.errors).toBeUndefined();
	expect(result.data?.hello).toBe("Hello world!");
});
