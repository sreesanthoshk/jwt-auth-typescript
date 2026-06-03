import { db } from "../config/db";

import { User } from "../models/User";

import {
  hashPassword,
  comparePassword
} from "../utils/password";

import {
  generateToken
} from "../utils/jwt";

export class AuthService {

  // REGISTER USER

  async register(
    user: User
  ): Promise<void> {

    // HASH PASSWORD

    const hashedPassword =
      await hashPassword(user.password);

    // INSERT USER INTO DATABASE

    await db.execute(

      `
      INSERT INTO users
      (
        employeeId,
        email,
        password,
        firstName,
        lastName,
        role
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,

      [
        user.employeeId,
        user.email,
        hashedPassword,
        user.firstName,
        user.lastName,
        user.role
      ]
    );

    console.log(
      "User Registered Successfully"
    );
  }

  // LOGIN USER

  async login(
    email: string,
    password: string
  ): Promise<string> {

    // GET USER

    const [rows]: any =
      await db.execute(

        `
        SELECT * FROM users
        WHERE email = ?
        `,

        [email]
      );

    const user = rows[0];

    // CHECK USER

    if (!user) {

      throw new Error(
        "User not found"
      );
    }

    // VERIFY PASSWORD

    const isValid =
      await comparePassword(
        password,
        user.password
      );

    if (!isValid) {

      throw new Error(
        "Invalid Password"
      );
    }

    // GENERATE JWT

    const token =
      generateToken(
        user.employeeId,
        user.role
      );

    return token;
  }
  async getUserByEmail(
  email: string
) {

  const [rows]: any =
    await db.execute(

      `
      SELECT
        employeeId,
        email,
        firstName,
        lastName,
        role
      FROM users
      WHERE email = ?
      `,

      [email]
    );

  return rows[0];
}
}
  