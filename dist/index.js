import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import db from './_db.js';
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const resolvers = {
    Query: {
        games: () => db.games,
        reviews: () => db.reviews,
        authors: () => db.authors,
        review: (_parent, args) => {
            return db.reviews.find(review => review.id === args.id);
        },
        game: (_parent, args) => {
            return db.games.find(game => game.id === args.id);
        },
        author: (_parent, args) => {
            return db.authors.find(author => author.id === args.id);
        }
    },
    Game: {
        reviews: (game) => db.reviews.filter(review => review.game_id === game.id)
    },
    Author: {
        reviews: (author) => db.reviews.filter(review => review.author_id === author.id)
    },
    Review: {
        game: (review) => db.games.find(game => game.id === review.game_id),
        author: (review) => db.authors.find(author => author.id === review.author_id)
    }
};
const server = new ApolloServer({
    typeDefs,
    resolvers
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
});
console.log(`🚀 Server ready at port: `, 4000);
