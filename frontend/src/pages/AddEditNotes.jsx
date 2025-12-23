import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import API from "../Services/api";

const AddEditNotes = ({ type, noteData, onClose, fetchNotes }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (type === "edit" && noteData) {
      setTitle(noteData.title);
      setContent(noteData.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [type, noteData]);

  const handleSubmit = async () => {
    try {
      if (type === "edit") {
        await API.put(`/notes/${noteData._id}`, { title, content });
      } else {
        await API.post("/notes", { title, content });
      }
      fetchNotes();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative">
      <MdClose onClick={onClose} className="absolute right-2 top-2 cursor-pointer" />

      <input
        className="w-full text-xl outline-none mb-4"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        rows="8"
        className="w-full bg-gray-100 p-2 rounded"
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="w-full mt-4 bg-blue-500 text-white py-2 rounded"
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNotes;
