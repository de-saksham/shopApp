const graphql = require('graphql');

const schema = graphql.buildSchema(`
  enum Category {
    VEGETABLES
    FRUITS
    CHEESE
  }

  type Item {
    _id: String!
    title: String!
    desc: String!
    price: Float!
    stock: Int
    category: Category!
    image: String!
  }

  input ItemInput {
    _id: String!
    title: String!
    desc: String!
    price: Float!
    stock: Int
    category: Category!
    image: String!
  }

  type OrderItem {
    item: Item!
    quantity: Int!
  }

  input OrderItemInput {
    item: ItemInput!
    quantity: Int!
  }

  type Order {
    id: String!
    userId: String!
    items: [OrderItem]!
    total: Float!
  }

  type Query {
    items: [Item!]!
    orders: [Order!]!
    itemById: Item!
    itemsByCategory: [Item!]!
  }

  type Mutation {
    addItem(items: [ItemInput!]!): [Item!]!
    addOrder(order: [OrderItemInput!]!): Order!
  }
`);

module.exports = schema;