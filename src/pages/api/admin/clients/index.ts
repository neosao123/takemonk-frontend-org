import type { NextApiRequest, NextApiResponse } from "next";
import runMiddleware from "lib/cors";
import dbConnect from "lib/dbConnect";
import Clients from "models/Clients";
import { singleFileUploader } from "src/utils/uploader";
import Cors from "cors";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
});


type Data = {
  success?: boolean;
  message?: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await runMiddleware(req, res, cors);
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const clients = await Clients.find(
          {}
        ); /* find all the data in our database */
        res.status(200).json({ success: true, data: clients });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      const uploaded = await singleFileUploader(req.body.profile.cover);
      const client = await Clients.create({
        profile: {
          ...req.body.profile,
          cover: uploaded,
        },
        subscription: { ...req.body.subscription },
        billing: { ...req.body.billing },
        status: req.body.status,
      }); /* create a new model in the database */
      res.status(201).json({ success: true, data: client });
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
