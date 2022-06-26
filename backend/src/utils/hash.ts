import jwt from "jsonwebtoken";

export const hashJwt = (id: string) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET);
};
