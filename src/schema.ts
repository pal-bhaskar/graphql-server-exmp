export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  
  type Game {
    id: ID,
    title: String!,
    platform: [String]!
  }

  type Review {
    id: ID
    content: String!
    rating: Int!
  }

  type Author {
    id: ID
    name: String!
    verified: Boolean!
  }

  type Query {
    games: [Game!]!
    game(id: ID!): Game
    reviews: [Review!]!
    review(id: ID!): Review
    authors: [Author!]!
    author(id: ID!): Author
  }
`;
