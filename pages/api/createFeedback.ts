// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../sanity";

type Data = {
  name: string;
};

const client = sanityClient;

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { _id, name, email, comment } = JSON.parse(req.body);

  try {
    await client.create({
      _type: "feedback",
      name,
      email,
      comment,
    });
  } catch (err) {
    return res.status(500).json({ message: "Couldn't submit feedback", err });
  }
  console.log("Comment submitted");
  res.status(200).json({ message: "Feedback submitted" });
}
