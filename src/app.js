const express = require("express");
const app = express();

const users = require("./data/users-data");
const states = require("./data/states-data");

// TODO: return a single user by id from /users/:userId in form of { data: Object }
app.use("/users/:userId", (request, response, next) => {
  const { userId } = request.params;
  const foundUser = users.find((user) => user.id === Number(userId))
  
  if (foundUser) {
    response.json({ data: foundUser })
  } else {
    next(`User ID not found: ${userId}`)
  }
})

// TODO: return an array of users from /users in form of { data: Array }
app.use("/users", (request, response, next) => {
  response.json({ data: users })
})

// TODO: Return a single state from /states/:stateCode in the form of { data: { stateCode: String, name: String } }
app.use("/states/:stateCode", (request, response, next) => {
  const { stateCode } = request.params;
  const foundState = states[stateCode];

  if (foundState === undefined) {
    next(`State code not found: ${stateCode}`)
  } else {
    response.json({ data: { name: foundState, stateCode }});
  }
})

// TODO: return all states from /states in the form of { data: Array }
app.use("/states", (request, response, next) => {
  response.json({ data: states })
})

// TODO: add not found handler
app.use((request, response, next) => {
  next(`Not found: ${request.originalUrl}`);
});

// TODO: Add error handler
app.use((error, request, response, next) => {
  console.error(error);
  response.send(error);
});

module.exports = app;
