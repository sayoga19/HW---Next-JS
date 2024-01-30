import jwt from 'jsonwebtoken';
require('dotenv').config();

export default function authToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401).end();
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = user.userId;
    next();
  } catch (err) {
    return res.sendStatus(403).end();
  }
}
