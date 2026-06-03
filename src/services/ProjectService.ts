import { db }
from "../config/db";

import { Project }
from "../models/Project";

export class ProjectService {

  // CREATE PROJECT

  async createProject(
    project: Project
  ): Promise<void> {

    await db.execute(

      `
      INSERT INTO projects
      (
        projectId,
        taskCode,
        taskName,
        description,
        employeeId
      )
      VALUES (?, ?, ?, ?, ?)
      `,

      [

        project.projectId,

        project.taskCode,

        project.taskName,

        project.description,

        project.employeeId
      ]
    );
  }

  // GET PROJECTS

  async getProjects() {

    const [rows]: any =
      await db.execute(

        `
        SELECT * FROM projects
        `
      );

    return rows;
  }

  // UPDATE PROJECT

  async updateProject(

    projectId: string,

    taskName: string

  ) {

    await db.execute(

      `
      UPDATE projects
      SET taskName = ?
      WHERE projectId = ?
      `,

      [

        taskName,

        projectId
      ]
    );
  }

  // DELETE PROJECT

  async deleteProject(
    projectId: string
  ) {

    await db.execute(

      `
      DELETE FROM projects
      WHERE projectId = ?
      `,

      [projectId]
    );
  }
  async updateStatus(

  projectId: string,

  status: string

) {

  await db.execute(

    `
    UPDATE projects
    SET status = ?
    WHERE projectId = ?
    `,

    [

      status,

      projectId
    ]
  );
}
}