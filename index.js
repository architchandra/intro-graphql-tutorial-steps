import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs } from './schema.js';
import db from './db.js';



const resolvers = {
    Query: {
        games() {
            return db.games;
        },
        game(parent, args, context) {
            return db.games.find((game) => game.id == args.id);
        },
        reviews() {
            return db.reviews;
        },
        review(parent, args, context) {
            return db.reviews.find((review) => review.id == args.id);
        },
        authors() {
            return db.authors;
        },
        author(parent, args, context) {
            return db.authors.find((author) => author.id == args.id);
        },
    },
    Mutation: {
        deleteGame(parent, args) {
            return db.games.filter((game) => game.id !== args.id);
        },
        addGame(parent, args) {
            let game = {
                id: Math.floor(Math.random() * 10000).toString(),
                title: args.game.title,
                platforms: args.game.platforms,
            };
            db.games.push(game);
            
            return game;
        },
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter((review) => review.game_id === parent.id);
        }
    },
    Review: {
        game(parent) {
            return db.games.find((game) => game.id === parent.game_id);
        },
        author(parent) {
            return db.authors.find((author) => author.id === parent.author_id);
        },
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter((review) => review.author_id === parent.id);
        },
    },
};



// server setup
const server = new ApolloServer({
    typeDefs,
    resolvers
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log('server on port', 4000);