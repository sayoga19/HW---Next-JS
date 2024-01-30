const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import authToken from "../middleware/authToken";
import upload from "../middleware/multer";
export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    authToken(req, res, async (err) => {
      if (err) {
        return res.status(400).json(err);
      }
      upload.single("image")(req, res, async (err) => {
        if (err) {
          return res.status(400).json(err);
        }
        const { title, author, publisher, year, pages } = req.body;
        try {
          const book = await prisma.book.create({
            data: {
              title,
              author,
              publisher,
              year: parseInt(year),
              pages: parseInt(pages),
              image: req.file.path,
            },
          });
          res.status(200).json({ book });
        } catch (err) {
          console.log("err", err);
          res.status(400).json({ message: "Book already exists" });
        }
      });
    });
  } else if (req.method === "GET") {
    const books = await prisma.book.findMany();
    res.status(200).json({ books });
  } else {
    res.status(405).end();
  }
}
