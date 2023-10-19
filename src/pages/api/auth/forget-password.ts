import type { NextApiRequest, NextApiResponse } from "next";
import runMiddleware from "lib/cors";
import dbConnect from "lib/dbConnect";
import Users from "models/Users";
import jwt from "jsonwebtoken";
import Cors from "cors";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
});

type Data = {
  success?: boolean;
  message?: string;
  status?: boolean;
  email?: string;
  token?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await runMiddleware(req, res, cors);
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { email } = req.body;
        const usersData = await Users.find({});

        const user = usersData.find((u) => u.email === email);

        if (!user) {
          res.status(400).json({
            message: "common:user-not-found",
            status: false,
          });
        } else {
          const {
            _id,
            email: userEmail,
            fullName,
            cover,
            status,
            firstName,
          } = user;
          // create a jwt token that is valid for 7 days
          const token = jwt.sign(
            {
              _id: _id,
              email: userEmail,
              fullName: fullName,
              firstName: firstName,
              cover: cover ? cover : null,
              status: status,
            },
            `secret key`,
            {
              expiresIn: "10m",
            }
          );
          const url = process.env.DOMAIN;

          var data = JSON.stringify({
            service_id: process.env.EMAILJS_SERVICE_ID,
            template_id: process.env.EMAILJS_TEMPLATE_ID,
            user_id: process.env.EMAILJS_USER_ID,
            template_params: {
              to_email: email,
              from_name: "Commercehope",
              subject: "Forget password",
              message: `Your request to reset your password was submitted. If you did not make this request, simply ignore this email. If you did make this request just click the link below:
              ${url}/reset-password?token=${token}`,
              to_name: fullName,
            },
          });
          const { email: emailUser } = user;
          res.status(200).json({
            success: true,
            message: "common:email-sent",
            email: emailUser,
            token: token,
          });
          // var config = {
          //   method: "post",
          //   url: "https://api.emailjs.com/api/v1.0/email/send",
          //   headers: {
          //     origin: "http://localhost",
          //     "Content-Type": "application/json",
          //   },
          //   data: data,
          // };

          // axios(config)
          //   .then(function (response) {
          //     res.status(200).json({
          //       success: true,
          //       message: "Email sent! Please check your email!",
          //     });
          //   })
          //   .catch(function (error) {
          //     res.status(400).json({
          //       success: false,
          //       message: "Something went wrong!",
          //     });
          //   });
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
