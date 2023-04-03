const express = require('express');
const router = express.Router();
const resolvers = require('../resolvers/index.js');
const { orderTypeDefs } = require('../resolvers/orders.js');
const graphqlHTTP = require('express-graphql').graphqlHTTP;

router.get('/orders', (req, res) => {
    graphqlHTTP({
      schema: orderTypeDefs,
      rootValue: resolvers,
      graphiql: true,
    })(req, res);
});

router.post('/addOrder', async (req, res) => {
  const { order } = req.body;
  console.log('req', req.body)
  // execute mutation to add new item
  try {
      await resolvers.Mutation.addOrder(null, { order });
      res.status(200).json({ success: true });
  } catch(error) {
      res.status(500).json({ success: false })
  }
});

module.exports = router;