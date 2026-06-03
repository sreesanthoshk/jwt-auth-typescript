import { AuthService } from "./services/AuthService";

import { ProjectService } from "./services/ProjectService";

import {
  authenticate,
  authorize
} from "./middleware/authMiddleware";

const authService =
  new AuthService();

const projectService =
  new ProjectService();

async function main() {

  try {

    // LOGIN USER

    const token =
      await authService.login(

        "john@example.com",

        "123456"
      );

    console.log(
      "\nJWT TOKEN:\n"
    );

    console.log(token);

    // GET USER DETAILS

    const user =
      await authService.getUserByEmail(
        "john@example.com"
      );

    console.log(
      "\nUSER DETAILS:\n"
    );

    console.log(user);

    // VERIFY JWT TOKEN

    const decoded: any =
      authenticate(token);

    // ROLE AUTHORIZATION

    authorize(decoded.role);

    // CREATE PROJECT

    await projectService.createProject({

      projectId:
        "P" + Date.now(),

      taskCode:
        "TSK" + Date.now(),

      taskName:
        "JWT Setup",

      description:
        "Implement JWT authentication",

      employeeId:
        "EMP101"
    });

    // GET ALL PROJECTS

    const projects =
      await projectService.getProjects();

    console.log(
      "\nALL PROJECTS:\n"
    );

    console.log(projects);

    // UPDATE PROJECT

    await projectService.updateProject(

      "P101",

      "Updated JWT Setup"
    );

    // DELETE PROJECT

    /*
    await projectService.deleteProject(
      "P101"
    );
    */

  } catch (error) {

    console.log(error);
  }
}

main();