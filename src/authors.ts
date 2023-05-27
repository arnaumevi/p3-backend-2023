import { Request, Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";
import booksRouter from "./books.js";

const router = Router();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const authors = await prisma.author.findMany({});
    res.status(200).json({ authors: authors, ok: true });
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const newAuthor = await prisma.author.create({ data: req.body });
    res.status(200).json({ newAuthor, ok: true });
  })
);
export interface RequestWithAuthorId extends Request {
  authorId: number;
}

router.use("/:id", async (req: RequestWithAuthorId, res, next) => {
  const { id } = req.params;
  req.authorId = Number(id);
  next();
});

router.get(
  "/:id",
  errorChecked(async (req: RequestWithAuthorId, res) => {
    const author = await prisma.author.findUniqueOrThrow({
      where: { id: req.authorId },
    });
    res.status(200).json(author);
  })
);

router.put(
  "/:id",
  errorChecked(async (req: RequestWithAuthorId, res) => {
    const updatedAuthor = await prisma.author.update({
      where: { id: req.authorId },
      data: req.body,
    });
    res.status(200).json(updatedAuthor);
  })
);

router.delete(
  "/:id",
  errorChecked(async (req: RequestWithAuthorId, res) => {
    const deletedAuthor = await prisma.author.delete({
      where: { id: req.authorId },
    });
    res.status(200).json(deletedAuthor);
  })
);
router.use("/:authorId/books", booksRouter);

export default router;
