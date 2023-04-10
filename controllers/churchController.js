// const Church = require('../models/churchModel')

// const { getPostData } = require('../utils')

const AWS = require('aws-sdk');

// @desc    Gets All Products
// @route   GET /api/products
async function getChurches(req, res) {
  try {
    // const churches = await Product.findAll()

    // res.writeHead(200, { 'Content-Type': 'application/json' })
    // res.end(JSON.stringify(products))

    AWS.config.update({
      region: process.env.DEFAULT_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
      TableName: 'Churches',
    };

    docClient.scan(params, (err, data) => {
      if (err) {
        console.log('Error', err);
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(err));
      }

      const { Items } = data;

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(Items));
    });
  } catch (error) {
    console.log(error);
  }
}

// @desc    Gets Single Product
// @route   GET /api/product/:id
async function getChurch(req, res, id) {
  try {
    // const product = await Product.findById(id);

    // if (!product) {
    //   res.writeHead(404, { 'Content-Type': 'application/json' });
    //   res.end(JSON.stringify({ message: 'Product Not Found' }));
    // } else {
    //   res.writeHead(200, { 'Content-Type': 'application/json' });
    //   res.end(JSON.stringify(product));
    // }

    AWS.config.update({
      region: process.env.DEFAULT_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
      TableName: 'Churches',
    };

    docClient.scan(params, (err, data) => {
      if (err) {
        console.log('Error', err);
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(err));
      }

      const { Items } = data;
      const foundItem = Items?.find((Item) => Item.ChurchId === id);

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(foundItem));
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getChurches,
  getChurch,
};
