import { NextFunction, Request, Response } from "express";
import { Session } from "express-session";
import { getUserDetails } from "./graph";

export type MyContext = {
  req: Request & { session: Session & { accessToken?: string } };
  res: Response;
};

export const verifyUser = async (
  req: Request & { session: Session & { accessToken?: string } },
  res: Response,
  next: NextFunction
) => {
  if (!req.query.userId) {
    return res.status(404).json({ message: "Missing user information." });
  }
  const userId = req.query.userId as string;
  //Verify the user ID using MS Graph, if exists, proceed to the next step in the pipeline
  try {
    const user = await getUserDetails(req.app.locals.graphAccessToken, userId!);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User does not exist in current tenant." });
    }

    next();
  } catch (error) {
    return res.status(error.statusCode).json(JSON.parse(error.body));
  }
};
