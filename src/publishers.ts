import { Request, Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";
import booksRouter from "./books.js";

const router = Router();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await prisma.publisher.findMany({});
    res.status(200).json({ publishers: result, ok: true });
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const newPublisher = await prisma.publisher.create({ data: req.body });
    res.status(200).json({ newPublisher, ok: true });
  })
);
export interface RequestWithPublisherId extends Request {
  publisherId: number;
}

router.use("/:id", async (req: RequestWithPublisherId, res, next) => {
  const { id } = req.params;
  req.publisherId = Number(id);
  next();
});

router.get(
  "/:id",
  errorChecked(async (req: RequestWithPublisherId, res) => {
    const publisher = await prisma.publisher.findUniqueOrThrow({
      where: { id: req.publisherId },
    });
    res.status(200).json(publisher);
  })
);

router.put(
  "/:id",
  errorChecked(async (req: RequestWithPublisherId, res) => {
    const updatedPublisher = await prisma.publisher.update({
      where: { id: req.publisherId },
      data: req.body,
    });
    res.status(200).json(updatedPublisher);
  })
);
router.delete(
  "/:id",
  errorChecked(async (req: RequestWithPublisherId, res) => {
    const deletedPublisher = await prisma.publisher.delete({
      where: { id: req.publisherId },
    });
    res.status(200).json(deletedPublisher);
  })
);

router.use("/:publisherId/books", booksRouter);

export default router;
