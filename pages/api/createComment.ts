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
      _type: "comment",
      name,
      email,
      comment,
      post: {
        _type: "reference",
        _ref: _id,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Couldn't submit comment", err });
  }
  console.log("Comment submitted");
  res.status(200).json({ message: "Comment submitted" });
}
