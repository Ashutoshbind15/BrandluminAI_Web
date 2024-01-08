"use client";

import React, { useEffect, useState } from "react";
import PrimaryButton from "../../UI/Buttons/PrimaryButton";
import UserList from "../../Components/User/UserList";
import axios from "axios";

const NewTeam = () => {
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState([]);
  const [usersData, setUsersData] = useState([]);

  const fetchUsers = async () => {
    const { data } = await axios.get("/api/users");
    setUsersData(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log(usersData);

  return (
    <div className="flex flex-col items-center">
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          className="w-full border-y-1 border-black text-gray-400 font-light my-2 px-4 py-2"
          placeholder="Enter the team name!"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <input
          type="text"
          className="w-full border-y-1 border-black text-gray-400 font-light my-2 px-4 py-2"
          placeholder="Describe the team!"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </form>
      <UserList
        addToTeamHandler={(user) => setMembers((prev) => [...prev, user])}
        removeFromTeamHandler={(user) =>
          setMembers((prev) => prev.filter((u) => u._id !== user._id))
        }
        users={usersData}
      />

      <div className="flex items-center gap-2">
        <h2>Members:</h2>
        {members?.map((member, idx) => (
          <div className="flex items-center gap-2" key={idx}>
            <p>{member?.name}</p>
            <p>{member?.email}</p>
          </div>
        ))}
      </div>

      <button className="rounded-lg mt-4 font-bold bg-black text-white py-2 px-4">
        Add Team
      </button>
    </div>
  );
};

export default NewTeam;
