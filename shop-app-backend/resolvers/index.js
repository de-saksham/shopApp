const {itemsResolver} = require('./items');
const {orderResolver} = require('./orders');

const resolvers = {
    Query: {
        ...itemsResolver.Query,
        ...orderResolver.Query
    },
    Mutation: {
        ...itemsResolver.Mutation,
        ...orderResolver.Mutation
    },
}

module.exports = resolvers;