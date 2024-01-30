const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import authToken from "../middleware/authToken";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "PUT") {
    authToken(req, res, async (err) => {
      if (err) {
        return res.status(400).json(err);
      }
      const { title, author, publisher, year, pages } = req.body;
      try {
        const book = await prisma.book.update({
          where: {
            id: Number(id),
          },
          data: {
            title,
            author,
            publisher,
            year,
            pages,
          },
        });
        res.status(200).json({ book });
      } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Something went wrong" });
      }
    });
  } else if (req.method === "DELETE") {
    authToken(req, res, async (err) => {
      if (err) {
        return res.status(400).json(err);
      }
      try {
        const book = await prisma.book.delete({
          where: {
            id: Number(id),
          },
        });
        res.status(200).json({ book });
      } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Something went wrong" });
      }
    });
  } else if (req.method === "GET") {
    try {
      const book = await prisma.book.findUnique({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json({ book });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Something went wrong" });
    }
  } else {
    res.status(405).end();
  }
}