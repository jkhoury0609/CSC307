// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([
    {
    name: "Charlie",
    job: "Janitor"
    },
  {
    name: "Mac",
    job: "Bouncer"
  },
  {
    name: "Dee",
    job: "Aspring actress"
  },
  {
    name: "Dennis",
    job: "Bartender"
  }
  ]);

  function removeOneCharacter(id) {
  deleteUser(id)
    .then((res) => {
      if (res.status === 204) {
        setCharacters((prev) =>
          prev.filter((character) => character.id !== id)
        );
      } else {
        throw new Error("Delete failed");
      }
    })
    .catch((error) => console.log(error));
}
  // src/MyApp.js (a new inner function inside MyApp())

  function postUser(person) {
  const promise = fetch("Http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });

  return promise;
}
  function deleteUser(id) {
    return fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    });
  }
  function updateList(person) {
  postUser(person)
    .then((res) => {
      if (res.status === 201) {
        return res.json();
      }
      throw new Error("User not created");
    })
    .then((newUser) => {
      setCharacters((prev) => [...prev, newUser]);
    })
    .catch((error) => console.log(error));
}
  
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }
  useEffect(() => {
  fetchUsers()
    .then((res) => res.json())
    .then((json) => setCharacters(json["users_list"]))
    .catch((error) => {
      console.log(error);
    });
}, []);

  
  return (
  <div className="container">
    <Table
      characterData={characters}
      removeCharacter={removeOneCharacter}
    />
    <Form handleSubmit={updateList} />
  </div>
);
}

export default MyApp;