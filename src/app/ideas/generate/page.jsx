"use client";

import React, { useState } from "react";
import axios from "axios";
const ideatypes = ["video", "blog", "shorts", "podcast", "idea"];
const moodTypes = ["happy", "science", "creative"];
const mediasToBeUsed = ["youtube", "instagram", "twitter", "facebook"];
const audienceInterests = ["fashion", "science", "technology", "music"];

import { MultiSelect } from "react-multi-select-component";

const IdeaForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [selectedIdeaTypes, setSelectedIdeaTypes] = useState([]);
  const [selectedMoodTypes, setSelectedMoodTypes] = useState([]);
  const [selectedMediasToBeUsed, setSelectedMediasToBeUsed] = useState([]);
  const [selectedAudienceInterests, setSelectedAudienceInterests] = useState(
    []
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apidata = {
        ...formData,
        type: selectedIdeaTypes.map((type) => type.value),
        theme: selectedMoodTypes.map((type) => type.value),
        media: selectedMediasToBeUsed.map((type) => type.value),
        audienceInterests: selectedAudienceInterests.map((type) => type.value),
      };
      await axios.post("/api/idea", apidata);

      // console.log(apidata);

      // alert("Idea created successfully!");
    } catch (error) {
      console.error("There was an error creating the idea!", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <form onSubmit={handleSubmit} className="">
        <h2 className="text-2xl font-bold mb-4">Create New Idea</h2>

        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </form>

      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center my-2 border-y-2 border-gray-300 py-4 w-full">
          <label className="block mb-2">Select Idea Types</label>

          <MultiSelect
            options={ideatypes.map((type) => ({
              label: type,
              value: type,
            }))}
            value={selectedIdeaTypes}
            onChange={setSelectedIdeaTypes}
            labelledBy="Select Idea Types"
            className="w-3/4"
          />
        </div>

        <div className="flex flex-col items-center my-2 border-y-2 border-gray-300 py-4 w-full">
          <label className="block mb-2">Select Mood Types</label>

          <MultiSelect
            options={moodTypes.map((type) => ({
              label: type,
              value: type,
            }))}
            value={selectedMoodTypes}
            onChange={setSelectedMoodTypes}
            labelledBy="Select Mood Types"
            className="w-3/4"
          />
        </div>

        <div className="flex flex-col items-center my-2 border-y-2 border-gray-300 py-4 w-full">
          <label className="block mb-2">Select Medias To Be Used</label>

          <MultiSelect
            options={mediasToBeUsed.map((type) => ({
              label: type,
              value: type,
            }))}
            value={selectedMediasToBeUsed}
            onChange={setSelectedMediasToBeUsed}
            labelledBy="Select Medias To Be Used"
            className="w-3/4"
          />
        </div>

        <div className="flex flex-col items-center my-2 border-y-2 border-gray-300 py-4 w-full">
          <label className="block mb-2">Select Audience Interests</label>

          <MultiSelect
            options={audienceInterests.map((type) => ({
              label: type,
              value: type,
            }))}
            value={selectedAudienceInterests}
            onChange={setSelectedAudienceInterests}
            labelledBy="Select Audience Interests"
            className="w-3/4"
          />
        </div>
      </div>
      <button
        type="button"
        className="w-full p-2 bg-blue-500 text-white rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default IdeaForm;
