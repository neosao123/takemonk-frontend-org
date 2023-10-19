import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "lib/dbConnect";
import Users from "models/Users";
import Orders from "models/Orders";
import jwtDecode from "jwt-decode";
// Initializing the cors middleware

type Data = {
  message?: string;
  success?: boolean;
  // type error
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    headers: { authorization },
    method,
  } = req;

  await dbConnect();
  // type error
  const { _id } = jwtDecode<any>(authorization as any);
  switch (method) {
    case "GET" /* Get a model by its ID */:
      try {
        const user = await Users.findOne({ _id: _id });
        var newQuery = { ...req.query };
        delete newQuery.page;
        // type error
        const skip: any = req.query.limit || 10;
        const totalOrders = await Orders.find({
          "user._id": _id,
        });
        const page: any = req.query.page;
        const orders = await Orders.find(
          {
            "user._id": _id,
          },
          null,
          {
            // type error

            skip: skip * (parseInt(page) - 1 || 0),
            limit: skip,
          }
        ).sort({
          createdAt: -1,
        });

        if (!user) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({
          success: true,
          data: {
            user,
            orders: orders,
            count: Math.ceil(totalOrders.length / skip),
          },
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
