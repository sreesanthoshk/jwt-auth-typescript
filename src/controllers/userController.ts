import { Request, Response }
from "express";

import { db }
from "../config/db";

// GET USERS

export const getUsers =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const [rows]: any =
        await db.execute(

          `
          SELECT
            employeeId,
            firstName,
            lastName,
            role
          FROM users
          `
        );

      res.status(200).json(
        rows
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Failed to fetch users"
      });
    }
  };