import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (
  employeeId: string,
  role: string
): string => {

  return jwt.sign(

    {
      employeeId,
      role
    },

    process.env.JWT_SECRET as string,

    {
      expiresIn: "1h"
    }
  );
};

export const verifyToken = (
  token: string
) => {

  return jwt.verify(
    token,
    process.env.JWT_SECRET as string
  );
};