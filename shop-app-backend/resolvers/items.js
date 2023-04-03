const ItemModel = require('../schema/itemSchema'); 

const itemsTypeDefs = `#graphql
  enum Category {
    VEGETABLES
    FRUITS
    CHEESE
  }

  type Item {
    _id: ID!
    title: String!
    desc: String!
    price: Float!
    stock: Int
    category: Category!
    image: String!
  }

  input ItemInput {
    title: String!
    desc: String!
    price: Float!
    stock: Int
    category: Category!
    image: String!
  }

  type Query {
    items: [Item!]!
    itemById: Item!
    itemsByCategory: [Item!]!
  }

  type Mutation {
    addItem(items: [ItemInput!]!): [Item!]!
  }
`;

const itemsResolver = {
    Query: {
      items: async () => {
        try {
          const items = await ItemModel.find({ stock: { $gt: 0 }}); // use the find method to fetch all items from the database
          return items;
        } catch (err) {
          throw new Error(`Failed to fetch items: ${err}`);
        }
      },
      itemById: async (_, itemId) => {
        try {
          const item = await ItemModel.findById(itemId);
          return item;
        } catch (err) {
          throw new Error(`Failed to fetch itemById: ${err}`)
        }
      },
      itemsByCategory: async (_, category) => {
        const chunkSize = 5;
        const chunkedArr = [];
        try {
          const items = await ItemModel.find({ category: category});
          
          for(let i=0; i < items.length; i += chunkSize) {
            const chunk = items.slice(i, i + chunkSize);
            chunkedArr.push(chunk);
          }

          return chunkedArr;
        } catch (err) {
          throw new Error(`Failed to fetch itemsByCategory: ${err}`)
        }
      }
    },
  
    Mutation: {
      addItem: async (_, { items }) => {
         // Validate the input
         const isValidInput = items.every(
          item => item.title && item.desc && item.price && item.stock && item.category
        );
  
        if (!isValidInput) {
          throw new Error('Missing required field in Item input');
        }
  
        // Construct a new document to insert
        const newItem = items.map(item => ({
          title: item.title || '',
          desc: item.desc,
          price: item.price,
          stock: item.stock,
          category: item.category,
        }));

        // Insert the new document into the database
        const insertedItems = await ItemModel.insertMany(newItem);
        // Return the new document as a GraphQL response
        return insertedItems.map(item => item.toObject());
      },
    },
  };

  module.exports = { itemsTypeDefs, itemsResolver };