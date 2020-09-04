import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {createServer} from 'http';
import cors from 'cors';
import typeDefs from './schema';

'https://medium.com/@th.guibert/basic-apollo-express-graphql-api-with-typescript-2ee021dea2c'

interface IBook {
    title: string,
    author: string,
    ISBN?: string
}

const books: IBook[] = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
        ISBN: 'feq83rq0ue80qwufasjf2q3uas'
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
    {
        title: 'Hatchet',
        author: 'Gary something??'
    }
];

const resolvers = {
    Query: {
        books: () => books
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true
});

const app = express();

app.use('*', cors());
server.applyMiddleware({app, path: '/graphql'});

const httpServer = createServer(app);

httpServer.listen({port: 3000}, (): void =>
    console.log(`🚀  Server ready at http://localhost:3000/graphql`)
);
