import { validateOrReject } from "class-validator";
import express from "express";
import { Session } from "express-session";
import { KpiEntry } from "../../entity/KpiEntry";
import { getRepository } from "typeorm";

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

router.post("/", async (req, res) => {
  try {
    const kpiRepository = getRepository(KpiEntry);
    const kpi = kpiRepository.create(req.body);
    await validateOrReject(kpi);
    const result = await kpiRepository.save(kpi);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
});

export default router;
