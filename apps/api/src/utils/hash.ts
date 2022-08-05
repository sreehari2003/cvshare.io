import jwt from "jsonwebtoken";

export const hashJwt = (id: string) => jwt.sign({ id }, process.env.JWT_SECRET);
