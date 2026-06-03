const API_URL =
  "http://localhost:5000";

// LOGIN

async function login() {

  const email =
    document.getElementById(
      "email"
    ).value;

  const password =
    document.getElementById(
      "password"
    ).value;

  try {

    const response =
      await fetch(

        `${API_URL}/api/auth/login`,

        {
          method: "POST",

          headers: {

            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            email,

            password
          })
        }
      );

    const data =
      await response.json();

    localStorage.setItem(
      "token",
      data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    alert(
      "Login Successful"
    );

    window.location.href =
      "dashboard.html";

  } catch (error) {

    console.log(error);

    alert(
      "Login Failed"
    );
  }
}

// LOAD DASHBOARD

async function loadDashboard() {

  const token =
    localStorage.getItem(
      "token"
    );

  if (!token) {

    window.location.href =
      "login.html";

    return;
  }

  const user =
    JSON.parse(

      localStorage.getItem(
        "user"
      )
    );

  // SHOW USER DETAILS

  document.getElementById(
    "userDetails"
  ).innerHTML =

    `
    <p>
      <b>Employee ID:</b>
      ${user.employeeId}
    </p>

    <p>
      <b>Name:</b>
      ${user.firstName}
      ${user.lastName}
    </p>

    <p>
      <b>Email:</b>
      ${user.email}
    </p>

    <p>
      <b>Role:</b>
      ${user.role}
    </p>
    `;

  // HIDE CREATE SECTION
  // FOR EMPLOYEE

  if (
    user.role === "Employee"
  ) {

    document.getElementById(
      "createSection"
    ).style.display = "none";
  }

  await loadEmployees();

  await getProjects();
}

// LOAD EMPLOYEES

async function loadEmployees() {

  try {

    const response =
      await fetch(

        `${API_URL}/api/users`
      );

    const users =
      await response.json();

    let html =

      `
      <option value="">
        Select Employee
      </option>
      `;

    users.forEach(user => {

      html +=

        `
        <option
          value="${user.employeeId}"
        >

          ${user.firstName}
          ${user.lastName}

          (${user.employeeId})

        </option>
        `;
    });

    document.getElementById(
      "employeeId"
    ).innerHTML = html;

  } catch (error) {

    console.log(error);
  }
}

// GET PROJECTS

async function getProjects() {

  try {

    const user =
      JSON.parse(

        localStorage.getItem(
          "user"
        )
      );

    const response =
      await fetch(

        `${API_URL}/api/projects`
      );

    let projects =
      await response.json();

    // EMPLOYEE
    // SEE ONLY OWN TASKS

    if (
      user.role === "Employee"
    ) {

      projects =
        projects.filter(project =>

          project.employeeId ===
          user.employeeId
        );
    }

    let html = "";

    projects.forEach(project => {

      html +=

        `
        <div class="project-card">

          <h3>
            ${project.taskName}
          </h3>

          <p>
            ${project.description}
          </p>

          <p>
            <b>Project ID:</b>
            ${project.projectId}
          </p>

          <p>
            <b>Task Code:</b>
            ${project.taskCode}
          </p>

          <p>
            <b>Assigned Employee:</b>
            ${project.employeeId}
          </p>

          <p>
            <b>Status:</b>
            ${project.status || "Pending"}
          </p>

          <div class="button-group">

            ${
              user.role === "Admin"

              ?

              `
              <button
                class="update-btn"
                onclick="updateProject(
                  '${project.projectId}'
                )"
              >

                Update

              </button>

              <button
                class="delete-btn"
                onclick="deleteProject(
                  '${project.projectId}'
                )"
              >

                Delete

              </button>
              `

              :

              `
              <div class="status-section">

                <select
                  id="status-${project.projectId}"
                  class="status-dropdown"
                >

                  <option
                    value="Pending"

                    ${
                      project.status ===
                      "Pending"

                      ? "selected"

                      : ""
                    }
                  >

                    Pending

                  </option>

                  <option
                    value="In Progress"

                    ${
                      project.status ===
                      "In Progress"

                      ? "selected"

                      : ""
                    }
                  >

                    In Progress

                  </option>

                  <option
                    value="Completed"

                    ${
                      project.status ===
                      "Completed"

                      ? "selected"

                      : ""
                    }
                  >

                    Completed

                  </option>

                </select>

                <button
                  class="update-btn"
                  onclick="updateStatus(
                    '${project.projectId}'
                  )"
                >

                  Save Status

                </button>

              </div>
              `
            }

          </div>

        </div>
        `;
    });

    document.getElementById(
      "projects"
    ).innerHTML = html;

  } catch (error) {

    console.log(error);
  }
}

// CREATE PROJECT

async function createProject() {

  const employeeId =
    document.getElementById(
      "employeeId"
    ).value;

  const taskName =
    document.getElementById(
      "taskName"
    ).value;

  const description =
    document.getElementById(
      "description"
    ).value;

  if (

    !employeeId ||

    !taskName ||

    !description

  ) {

    alert(
      "Please fill all fields"
    );

    return;
  }

  const project = {

    projectId:
      "P" + Date.now(),

    taskCode:
      "TSK" + Date.now(),

    employeeId,

    taskName,

    description,

    status:
      "Pending"
  };

  try {

    await fetch(

      `${API_URL}/api/projects`,

      {
        method: "POST",

        headers: {

          "Content-Type":
            "application/json"
        },

        body: JSON.stringify(
          project
        )
      }
    );

    alert(
      "Project Created Successfully"
    );

    document.getElementById(
      "employeeId"
    ).value = "";

    document.getElementById(
      "taskName"
    ).value = "";

    document.getElementById(
      "description"
    ).value = "";

    await getProjects();

  } catch (error) {

    console.log(error);

    alert(
      "Project Creation Failed"
    );
  }
}

// UPDATE PROJECT

async function updateProject(
  projectId
) {

  const taskName =
    prompt(
      "Enter New Task Name"
    );

  if (!taskName) {

    return;
  }

  try {

    await fetch(

      `${API_URL}/api/projects/${projectId}`,

      {
        method: "PUT",

        headers: {

          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({

          taskName
        })
      }
    );

    alert(
      "Project Updated Successfully"
    );

    await getProjects();

  } catch (error) {

    console.log(error);

    alert(
      "Project Update Failed"
    );
  }
}

// UPDATE STATUS

async function updateStatus(
  projectId
) {

  const status =
    document.getElementById(

      `status-${projectId}`

    ).value;

  try {

    await fetch(

      `${API_URL}/api/projects/status/${projectId}`,

      {
        method: "PUT",

        headers: {

          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({

          status
        })
      }
    );

    alert(
      "Status Updated Successfully"
    );

    await getProjects();

  } catch (error) {

    console.log(error);

    alert(
      "Status Update Failed"
    );
  }
}

// DELETE PROJECT

async function deleteProject(
  projectId
) {

  const confirmDelete =
    confirm(
      "Are you sure to delete?"
    );

  if (!confirmDelete) {

    return;
  }

  try {

    await fetch(

      `${API_URL}/api/projects/${projectId}`,

      {
        method: "DELETE"
      }
    );

    alert(
      "Project Deleted Successfully"
    );

    await getProjects();

  } catch (error) {

    console.log(error);

    alert(
      "Project Delete Failed"
    );
  }
}

// LOGOUT

function logout() {

  localStorage.removeItem(
    "token"
  );

  localStorage.removeItem(
    "user"
  );

  window.location.href =
    "login.html";
}

// AUTO LOAD DASHBOARD

if (

  window.location.pathname
  .includes("dashboard.html")

) {

  loadDashboard();
}