const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const { password: passwordDB, ...user } = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })
    res.status(200).json({user});
  }
  catch (error) {
    res.status(400).json({ message: "User already exists" });
  }
}