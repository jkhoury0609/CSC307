import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(id) {
    deleteUser(id)
      .then((res) => {
        if (res.status === 204) {
          setCharacters((prev) =>
            prev.filter((character) => character._id !== id)
          );
        } else {
          throw new Error("Delete failed");
        }
      })
      .catch((error) => console.log(error));
  }

  function postUser(person) {
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(person)
    });
  }

  function deleteUser(id) {
    return fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE"
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
    return fetch("http://localhost:8000/users");
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => console.log(error));
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