import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import db from './db.js';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import itemsRoute from './routes/items.js';
import ordersRoute from './routes/orders.js';
import resolvers from './resolvers/index.js';
import { itemsTypeDefs } from './resolvers/items.js';
import { orderTypeDefs } from './resolvers/orders.js';
import schema from './schema/schema.js';
// Create a new Apollo Server and attach it to an Express app
const app = express();
const httpServer = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/v1', itemsRoute)
app.use('/v1', ordersRoute)
// Set up Apollo Server
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
  cors(),
  bodyParser.json(),
  expressMiddleware(server),
);

app.listen(3000, () => console.log('Server running on port 3000'));

await new Promise((resolve) => httpServer.listen({ port: 4001 }, resolve));
console.log(`🚀 Server ready at http://localhost:4001`);
