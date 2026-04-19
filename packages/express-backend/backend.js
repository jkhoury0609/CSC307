// backend.js
import express from "express";
import cors from "cors";

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

const app = express();
const port = 8000;

// Helper functions
const findUserByName = (name) => {
  return users.users_list.filter((user) => user.name === name);
};

const findUserById = (id) => {
  return users.users_list.find((user) => user.id === id);
};

const addUser = (user) => {
  users.users_list.push(user);
  return user;
};

const deleteUserById = (id) => {
  const index = users.users_list.findIndex((user) => user.id === id);

  if (index === -1) {
    return false;
  }

  users.users_list.splice(index, 1);
  return true;
};

const findUserByNameAndJob = (name, job) => {
  return users.users_list.filter(
    (user) => user.name === name && user.job === job
  );
};

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// GET all users OR filter by name/job
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name !== undefined && job !== undefined) {
    const result = findUserByNameAndJob(name, job);
    res.send({ users_list: result });
  } else if (name !== undefined) {
    const result = findUserByName(name);
    res.send({ users_list: result });
  } else {
    res.send(users);
  }
});

// GET user by ID
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const found = findUserById(id);

  if (!found) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(found);
  }
});
function generateId() {
  return Math.random().toString(36).substring(2, 8);
}
// POST add new user
app.post("/users", (req, res) => {
  const newUser = {
    id: generateId(),
    name: req.body.name,
    job: req.body.job
  };

  users.users_list.push(newUser);
  res.status(201).json(newUser);
});

// DELETE user by ID
app.delete("/users/:id", (req, res) => {
  const index = users.users_list.findIndex(
    (user) => user.id === req.params.id
  );

  if (index !== -1) {
    users.users_list.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send("User not found");
  }
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});