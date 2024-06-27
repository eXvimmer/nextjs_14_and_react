import supabase from "@/services/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "POST": {
      const { email }: { email?: string } = req.body;
      if (!email) {
        return res
          .status(422)
          .json({ message: "Email is required", success: false });
      }
      const { error } = await supabase.from("newsletter").insert({ email });
      if (error) {
        return res.status(500).json({
          message: error.message.includes("duplicate")
            ? "This email address is already registered"
            : "Something went wrong",
          success: false,
        });
      }
      return res.status(201).json({
        message: "Thank you for subscribing to our newsletter!",
        success: true,
      });
    }
    default:
      return res.status(405).setHeader("Allow", "POST").json({
        message: "Method not allowed",
        success: false,
      });
  }
}
