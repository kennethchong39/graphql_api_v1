const { ApolloServer, gql } = require('apollo-server');

// Schema - define the types of the data
const typeDefs = gql`
  enum Status {
    WATCHED
    INTERESTED
    NOT_INTERESTED
    UNKNOWN
  }

  type Actor {
    id: ID!
    name: String!
  }

  type Movie {
    id: ID!
    title: String!
    releaseDate: String
    rating: Int
    status: Status
    # Valid null, [], [...some data]. x not valid [... some data without name or id]
    actor: [Actor]
    # actor: [Actor]! Valid [] or [...some data]
    # actor: [Actor!]! Valid [...some data]
    # fake: Float
    # fake: Boolean
  }

  # Query - type to describe an event that pulls data
  type Query {
    movies: [Movie]
    movie(id: ID): Movie
  }
`;

// Data
const movies = [
  {
    id: '1',
    title: '5 Deadly Venoms',
    releaseDate: '10-10-1983',
    rating: 5,
    status: 'INTERESTED',
  },
  {
    id: '2',
    title: '36th Chamber',
    releaseDate: '10-10-1983',
    rating: 5,
    actor: [
      {
        id: 'adasdasd',
        name: 'Gordon Liu',
      },
    ],
  },
];

// Resolvers
const resolvers = {
  Query: {
    movies: () => {
      return movies;
    },
    movie: (obj, { id }, context, info) => {
      const foundMovie = movies.find((movie) => {
        return movie.id === id;
      });
      return foundMovie;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server started at ${url}`);
});
