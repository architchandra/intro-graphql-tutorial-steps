// Basic types: int, float, string, boolean and ID.



const typeDefs = `#graphql
    type Query {
        reviews: [Review],
        review(id: ID!): Review,
        games: [Game],
        game(id: ID!): Game,
        authors: [Author],
        author(id: ID!): Author,
    },
    type Game {
        id: ID!,
        title: String!,
        platforms: [String!]!,
        reviews: [Review!],
    },
    type Review {
        id: ID!,
        rating: Int!,
        content: String!,
        game: Game!,
        author: Author!,
    },
    type Author {
        id: ID!,
        name: String!,
        verified: Boolean!,
        reviews: [Review!],
    },
    type Mutation {
        deleteGame(id: ID!): [Game],
        addGame(game: AddGameInput): Game,
    },
    input AddGameInput {
        title: String!,
        platforms: [String!]!,
    },
`;



export { typeDefs };