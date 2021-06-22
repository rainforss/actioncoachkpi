import { NextFunction, Request, Response } from "express";
import { Session } from "express-session";
import { getUserDetails } from "./graph";

export type MyContext = {
  req: Request & { session: Session & { accessToken?: string } };
  res: Response;
  next: NextFunction;
};

export const verifyUser = ({ req, res, next }: MyContext) => {
  const userId = req.query.userId;
  //Verify the user ID using MS Graph, if exists, proceed to the next step in the pipeline
  const user = getUserDetails(req.session.accessToken!);

  if (!user) {
    throw Error("User does not exist in current tenant.");
  }

  next();
};
