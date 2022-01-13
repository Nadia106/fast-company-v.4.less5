import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./api";

const App = () => {
  const [users, setUsers] = useState();
  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleToggleBookMark = (userId) => {
    const newArray = users.map((user) =>
      user._id === userId ? { ...user, bookmark: !user.bookmark } : user
    );
    setUsers(newArray);
  };

  return (
    <div>
      {users && (
        <Users
          onDelete={handleDelete}
          onBookMark={handleToggleBookMark}
          users={users}
        />
      )}
    </div>
  );
};

export default App;
