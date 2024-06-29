import { NextApiRequest, NextApiResponse } from "next";

export default function (req: NextApiRequest, res: NextApiResponse) {
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
    const newMessage = { name, email, message };
    console.log(newMessage);
    res
      .status(201)
      .json({ message: "Successfully stored the message", newMessage });
  }
}
