const express = require('express');
const router = express.Router();
const resolvers = require('../resolvers/index.js');
const { itemsTypeDefs } = require('../resolvers/items.js');
const schema = require('../schema/schema.js');
const graphqlHTTP = require('express-graphql').graphqlHTTP;

router.get('/items', (req, res) => {
    graphqlHTTP({
      schema: schema,
      rootValue: resolvers,
      graphiql: true,
    })(req, res);
});

router.post('/itemById', async (req, res) => {
    const { itemId } = req.body;

    try {
        const data = await resolvers.Query.itemById(null, itemId);
        res.status(200).json({ success: true, data: data });
    } catch(error) {
        res.status(500).json({ success: false })
    }
});

router.post('/productsByCategory', async (req, res) => {
    const { category } = req.body;

    try {
        const data = await resolvers.Query.itemsByCategory(null, category);
        res.status(200).json(data);
    } catch(error) {
        res.status(500).json({ success: false })
    }
})

router.post('/addItems', async (req, res) => {
    const { items } = req.body;
    // execute mutation to add new item
    try {
        await resolvers.Mutation.addItem(null, { items });
        res.status(200).json({ success: true });
    } catch(error) {
        res.status(500).json({ success: false })
    }
});
  
module.exports = router;