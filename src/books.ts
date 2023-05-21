import { Request, Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";

const router = Router();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await prisma.book.findMany({});
    res.status(200).json({ books: result, ok: true });
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const newBook = await prisma.book.create({ data: req.body });
    res.status(200).json({ newBook, ok: true });
  })
);

export interface RequestWithBookId extends Request {
  bookId: number;
}
router.use("/:id", async (req: RequestWithBookId, res, next) => {
  const { id } = req.params;
  req.bookId = Number(id);
  next();
});

router.get(
  "/:id",
  errorChecked(async (req: RequestWithBookId, res) => {
    const book = await prisma.book.findUniqueOrThrow({
      where: { id: req.bookId },
    });
    res.status(200).json(book);
  })
);

router.put(
  "/:id",
  errorChecked(async (req: RequestWithBookId, res) => {
    const updatedBook = await prisma.book.update({
      where: { id: req.bookId },
      data: req.body,
    });
    res.status(200).json(updatedBook);
  })
);

router.delete(
  "/:id",
  errorChecked(async (req: RequestWithBookId, res) => {
    const deletedBook = await prisma.book.delete({
      where: { id: req.bookId },
    });
    res.status(200).json(deletedBook);
  })
);

export default router;
