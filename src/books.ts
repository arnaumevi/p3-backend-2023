import { Router } from "express";
import prisma from "./prisma-client.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await prisma.book.findMany({});
    res.status(200).json({ books: result, ok: true });
  } catch (e) {
    res.status(500).send({
      type: e.constructor.name,
      message: e.toString(),
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await prisma.book.findUnique({
      where: { id: Number(id) },
    });
    if (book === null) {
      return res.status(404).json({ error: `Book with ${id} not found` });
    }
    res.status(200).json(book);
  } catch (e) {
    res.status(500).send({
      type: e.constructor.name,
      message: e.toString(),
    });
  }
});

export default router;
