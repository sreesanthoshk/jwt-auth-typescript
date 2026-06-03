import { Request, Response }
from "express";

import { ProjectService }
from "../services/ProjectService";

const projectService =
  new ProjectService();

// CREATE PROJECT

export const createProject =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const {

        projectId,
        taskCode,
        taskName,
        description,
        employeeId

      } = req.body;

      await projectService.createProject({

        projectId,
        taskCode,
        taskName,
        description,
        employeeId
      });

      res.status(201).json({

        message:
          "Project Created Successfully"
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Project Creation Failed",

        error
      });
    }
  };

// GET PROJECTS

export const getProjects =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const projects =
        await projectService.getProjects();

      res.status(200).json(
        projects
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Failed to fetch projects"
      });
    }
  };

// UPDATE PROJECT

export const updateProject =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const taskName =
        req.body.taskName;

      await projectService.updateProject(

        req.params.id as string,

        taskName
      );

      res.status(200).json({

        message:
          "Project Updated Successfully"
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Project Update Failed"
      });
    }
  };

// DELETE PROJECT
export const deleteProject =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      await projectService.deleteProject(

        req.params.id as string
      );

      res.status(200).json({

        message:
          "Project Deleted Successfully"
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Project Delete Failed"
      });
    } 
  };

  export const updateStatus =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const status =
        req.body.status;

      await projectService.updateStatus(

        req.params.id as string,

        status
      );

      res.status(200).json({

        message:
          "Status Updated"
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Status Update Failed"
      });
    }
  };