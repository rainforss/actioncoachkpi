import express from "express";
import { Session } from "express-session";
import { User } from "../../entity/User";
import { getRepository } from "typeorm";
import { validateOrReject } from "class-validator";

export type ExpressRequest = Request & {
  session: Session & { accessToken?: string };
} & {
  app: express.Application;
};

const router = express.Router();

router.get("/", async (req, res) => {
  const userRepository = getRepository(User);
  const user = await userRepository.find({
    where: { firstName: { $eq: req.query.firstName } },
  });
  if (!user) {
    return res
      .status(400)
      .json({
        message: `User with first name ${req.query.firstName} does not exist.`,
      });
  }
  return res.status(200).json(user);
});

router.post("/", async (req, res) => {
  try {
    const userRepository = getRepository(User);
    const user = userRepository.create(req.body);
    await validateOrReject(user);
    const results = await userRepository.save(user);
    return res.status(200).json(results);
  } catch (error) {
    return res.status(400).json(error);
  }
});

export default router;
