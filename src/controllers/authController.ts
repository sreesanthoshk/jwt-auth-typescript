import { Request, Response }
from "express";

import { AuthService }
from "../services/AuthService";

const authService =
  new AuthService();

// REGISTER

export const register =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      await authService.register(
        req.body
      );

      res.status(201).json({

        message:
          "User Registered Successfully"
      });

    } catch (error) {

      res.status(500).json({

        error
      });
    }
  };

// LOGIN

export const login =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const {
        email,
        password
      } = req.body;

      const token =
        await authService.login(
          email,
          password
        );

      const user =
        await authService.getUserByEmail(
          email
        );

      res.status(200).json({

        token,

        user
      });

    } catch (error) {

      res.status(500).json({

        error
      });
    }
  };