import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const author = await prisma.author.create({
  data: {
    name: "Michael Jordam",
  },
});
console.log(`Created author ${author.name} (${author.id})`);

const category = await prisma.category.create({
  data: {
    name: "Educative",
  },
});
console.log(`Created category ${category.name} (${category.id})`);

const publisher = await prisma.publisher.create({
  data: {
    name: "Full Stack Producers",
  },
});
console.log(`Created publisher ${publisher.name} (${publisher.id})`);

const book = await prisma.book.create({
  data: {
    title: "How to create a Backend using Typescript, Express y Prisma",
    isbn: "123-456789-0",
    publishedAt: new Date(),
    authorId: author.id,
    categoryId: category.id,
    publisherId: publisher.id,
  },
});
console.log(`Created book ${book.title} (${book.id})`);
