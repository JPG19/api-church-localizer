import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { ScanCommand, PutCommand } from '@aws-sdk/lib-dynamodb';

const params = {
  TableName: 'Churches',
};

// @desc    Gets All Churches
// @route   GET /api/churches
async function getChurches(req, res) {
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

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(Items));
  } catch (error) {
    console.log(error);
  }
}

// @desc    Gets Single Church
// @route   GET /api/churches/:id
async function getChurch(req, res) {
  try {
    const credentials = {
      region: process.env.AWS_DEFAULT_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    };

    const id = req.url.split('/')[3];

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

// @desc    Updates Single Church
// @route   PUT /api/churches/:id
async function updateChurch(req, res) {
  try {
    const credentials = {
      region: process.env.AWS_DEFAULT_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    };

    const id = req.url.split('/')[3];    

    // get body from request
    const { reviews } = req.body;
    
    const ddbClient = new DynamoDBClient(credentials);

    const data = await ddbClient.send(new ScanCommand(params));
    const { Items } = data;
    const foundItem = Items?.find((Item) => Item.ChurchId === id);

    if (!foundItem) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Product Not Found' }));
    }

    await ddbClient.send(
      new PutCommand({
        TableName: params.TableName,
        Item: {
          ChurchId: id,
          // Spread values of foundItem
          ...foundItem,
          Reviews: reviews,
      }}),
    );

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true }));
  } catch (error) {
    console.log(error);
  }
}

// @desc    Adds Church
// @route   POST /api/churches/add
async function addChurch(req, res) {
  try {
    const credentials = {
      region: process.env.AWS_DEFAULT_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    };
    
    const bodyItem = req.body;

    // make the strings into booleans
    bodyItem.Baptism = bodyItem.Baptism === "true" ? true : false;
    bodyItem.Confirmation = bodyItem.Confirmation === "true" ? true : false;
    bodyItem.Wedding = bodyItem.Wedding === "true" ? true : false;
    bodyItem.FirstCommunion = bodyItem.FirstCommunion === "true" ? true : false;
    bodyItem.Images = bodyItem.Images.split(',');
    bodyItem.Priests = bodyItem.Priests.split(',');


    const ddbClient = new DynamoDBClient(credentials);

    const data = await ddbClient.send(new ScanCommand(params));
    const { Items } = data;
    const foundItem = Items?.find((Item) => Item.ChurchId === bodyItem.ChurchId);

    if (foundItem) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'ChurchId already exists' }));
    }

    await ddbClient.send(
      new PutCommand({
        TableName: params.TableName,
        Item: bodyItem
      }),
    );

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true }));
  } catch (error) {
    console.log(error);
  }
}

export { getChurches, getChurch, updateChurch, addChurch };
