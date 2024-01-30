const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET,);
    res.status(200).json({ token });
  }
  catch (error) {
    res.status(400).json({ message: "Invalid email or password" });
  }
}
