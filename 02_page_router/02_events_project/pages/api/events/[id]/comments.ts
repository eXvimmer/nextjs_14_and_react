import supabase from "@/services/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = req.query.id as string;
  switch (req.method) {
    case "POST": {
      const { email, text, username }: Record<string, string> = req.body;
      if (!email || !username || !text) {
        return res.status(422).json({
          success: false,
          message: "Email, text, and username are required",
        });
      }
      const { error } = await supabase.from("comments").insert({
        email,
        username,
        text,
        event_id: id,
      });
      return res.status(error ? 500 : 201).json({
        success: !error,
        message: "",
      });
    }
    default: {
      const { data: comments, error } = await supabase
        .from("comments")
        .select()
        .eq("event_id", id);
      return res.status(error ? 404 : 200).json({
        success: !error,
        message: error ? "Not found" : "",
        comments: error ? null : comments,
      });
    }
  }
}
