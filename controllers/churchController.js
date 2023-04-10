import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';

const params = {
  TableName: 'Churches',
};

// @desc    Gets All Products
// @route   GET /api/products
async function getChurches(req, res) {
  try {

    console.log('process.env.AWS_DEFAULT_REGION jpg', process.env.AWS_DEFAULT_REGION)
    console.log('process.env.AWS_ACCESS_KEY_ID jpg', process.env.AWS_ACCESS_KEY_ID)
    console.log('process.env.AWS_SECRET_ACCESS_KEY jpg', process.env.AWS_SECRET_ACCESS_KEY)

    const credentials = {
      region: process.env.AWS_DEFAULT_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    };

    const ddbClient = new DynamoDBClient(credentials);

    const data = await ddbClient.send(new ScanCommand(params));
    const { Items } = data;

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(Items));
  } catch (error) {
    console.log(error);
  }
}

// @desc    Gets Single Product
// @route   GET /api/product/:id
async function getChurch(req, res, id) {
  try {
    const credentials = {
      region: process.env.AWS_DEFAULT_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    };

    const ddbClient = new DynamoDBClient(credentials);

    const data = await ddbClient.send(new ScanCommand(params));
    const { Items } = data;
    const foundItem = Items?.find((Item) => Item.ChurchId === id);

    if (!foundItem) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Product Not Found' }));
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(foundItem));
  } catch (error) {
    console.log(error);
  }
}

export { getChurches, getChurch };
