"use client";

import React, { useState } from "react";
import TopBars from "../../Layout/TopBars";

const UserList = ({ users = [], addToTeamHandler, removeFromTeamHandler }) => {
  const [searchState, setSearchState] = useState("");

  return (
    <div className="w-full mt-4 border-black">
      <TopBars
        state={searchState}
        setState={setSearchState}
        listItems={["All", "Design", "Content", "Marketting"]}
      />
      <input
        type="text"
        name=""
        id=""
        className="border-y-1 border-black my-2 font-light text-gray-400 px-4 py-2 w-full "
        placeholder="Search for users..."
      />
      {searchState === "All" && (
        <div>
          {users?.map((user, idx) => (
            <div className="flex items-center gap-2" key={idx}>
              <p>{user?.name}</p>
              <button
                className="border-2 border-black px-4 py-2"
                onClick={() => addToTeamHandler(user)}
              >
                Add
              </button>
              <button
                className="border-2 border-black px-4 py-2"
                onClick={() => removeFromTeamHandler(user)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {users
        ?.filter((user) => user?.role === searchState)
        .map((user, idx) => (
          <div className="flex items-center gap-2" key={idx}>
            <p>{user?.name}</p>
            <button
              className="border-2 border-black px-4 py-2"
              onClick={() => addToTeamHandler(user)}
            >
              Add
            </button>
            <button
              className="border-2 border-black px-4 py-2"
              onClick={() => removeFromTeamHandler(user)}
            >
              Remove
            </button>
          </div>
        ))}
    </div>
  );
};

export default UserList;
