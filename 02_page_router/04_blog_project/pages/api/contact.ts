import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

// TODO: use env variables to change database in production
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "next_blog";

async function db(collectionName: string) {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  return db.collection(collectionName);
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;
    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({
        message: "Invalid input",
      });
      return;
    }
    const newMessage: Record<string, string> = { name, email, message };
    const messagesCollection = await db("messages");
    try {
      const result = await messagesCollection.insertOne(newMessage);
      newMessage.id = result.insertedId.toString();
      res
        .status(201)
        .json({ message: "Successfully stored the message", newMessage });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Failed to store the message" });
      return;
    }
  }
}
