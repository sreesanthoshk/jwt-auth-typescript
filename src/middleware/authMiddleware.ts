import { verifyToken }
from "../utils/jwt";

export const authenticate = (
  token: string
) => {

  try {

    const decoded: any =
      verifyToken(token);

    console.log(
      "Token Verified Successfully"
    );

    return decoded;

  } catch (error) {

    throw new Error(
      "Invalid Token"
    );
  }
};

// ROLE AUTHORIZATION

export const authorize = (
  role: string
) => {

  if (role !== "Admin") {

    throw new Error(
      "Access Denied"
    );
  }

  console.log(
    "Admin Access Granted"
  );
};