const OrderModel = require('../schema/orderSchema');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid')

// Define the GraphQL schema for the Order type and related input types
const orderTypeDefs = `#graphql
  type Item {
    _id: ID!
    title: String!
    description: String
    price: Float!
    stock: Int
    category: Category!
  }

  input ItemInput {
    title: String!
    desc: String!
    price: Float!
    stock: Int
    category: Category!
    image: String!
  }

  type OrderItem {
    item: ItemInput!
    quantity: Int!
  }

  input OrderItemInput {
    item: Item!
    quantity: Int!
  }

  type Order {
    id: ID!
    userId: String!
    items: [OrderItem]!
    total: Float!
  }

  type Query {
    orders: [Order!]!
  }

  type Mutation {
    addOrder(order: [OrderItemInput!]!): Order!
  }
`;

const ItemModel = mongoose.model('Item');

// Define the resolver functions for the Order type and related types
const orderResolver = {
    Query: {
      orders: async () => {
        try {
          const orders = await OrderModel.find(); // use the find method to fetch all orders from the database
          return orders;
        } catch (err) {
          throw new Error(`Failed to fetch items: ${err}`);
        }
      }
    },
  
    Mutation: {
      addOrder: async (_, { order }) => {
        let totalCost = 0;
        const orderItems = [];
  
        // Loop through the items in the order and create the order items array
        // and calculate the total cost of the order
        for (let i in order.items) {
          // Find the item in the database by its ID
          const item = await ItemModel.findById(order.items[i].itemId);
          // If the item doesn't exist, throw an error
          if (!item) {
            throw new Error(`Item with id ${order.items[i].itemId} not found.`);
          }
          // Check if there is enough stock for the item
          if (item.stock < order.items[i].quantity) {
            throw new Error(`Not enough stock for item ${item.title}.`);
          }
          // Create the order item and add it to the order items array
          const orderItem = {
            item: {
              title: item.title,
              price: item.price,
              desc: item.desc
            },
            quantity: order.items[i].quantity
          };
          orderItems.push(orderItem);
          // Add to the total cost of the order
          totalCost += item.price * order.items[i].quantity;
          // Reduce the stock quantity of the item in the database
          await ItemModel.findByIdAndUpdate(
            item._id,
            { stock: item.stock - order.items[i].quantity }
          );
        }
        // Create the new order object with the user ID, order items, and total cost
        const newOrder = {
          _id: uuidv4(),
          userId: 1,
          items: orderItems,
          total: totalCost
        };
        // Insert the new order into the database
        const insertedOrder = await OrderModel.insertMany(newOrder);
        // Return the newly inserted order
        return insertedOrder[0];
      }
    }
  };

  module.exports = { orderTypeDefs, orderResolver };