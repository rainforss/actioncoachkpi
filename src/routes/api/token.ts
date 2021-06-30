import express from "express";
import { Session } from "express-session";

export type ExpressRequest = Request & {
  session: Session & { accessToken?: string };
} & {
  app: express.Application;
};

const router = express.Router();

router.get("/", async (req, res) => {
  const token = req.app.locals.graphAccessToken;
  res.status(200).json(token);
});

export default router;
