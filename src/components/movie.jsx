// Movie.tsx
import React, { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";

const Movie = ({ title, type, action, id }) => {
  const [update, setUpdate] = useState(false);
  const [updateMovieType, setUpdateMovieType] = useState(type);
  const [updateMovieAction, setUpdateMovieAction] = useState(action);
  const [updateMovieTitle, setUpdateMovieTitle] = useState(title);

  const deleteMovie = async (id) => {
    try {
      await deleteDoc(doc(db, "Movies", id));
      window.location.reload();
      toast.success("Movie deleted successfully");
    } catch (e) {
      console.error(e);
      toast.error("Error deleting movie");
    }
  };
  const UpdateMovie = async (id) => {
    try {
      await updateDoc(doc(db, "Movies", id), {
        Type: updateMovieType,
        Title: updateMovieTitle,
        Action: updateMovieAction,
      });
      window.location.reload();
      toast.success("Movie updated successfully");
    } catch (e) {
      console.error(e);
      toast.error("Error updating movie");
    }
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this movie?"
    );
    if (confirmed) {
      deleteMovie(id);
    }
  };

  return (
    <div className="bg-[#e8e8e9] shadow-md rounded-md p-4 w-1/3 mx-auto mb-4 md:flex md:justify-between">
      <div>
        <h1>
          Title:{" "}
          <span className={action ? "text-red-500" : "text-green-500"}>
            {title}
          </span>
        </h1>
        <p>Type: {type}</p>
      </div>

      <div className="mt-2 md:mt-0">
        <span
          className="m-1 border-2 border-solid"
          onClick={() => handleDelete(id)}
        >
          <DeleteIcon />
        </span>
        <span
          className="m-1 border-2 border-solid"
          onClick={() => setUpdate(!update)}
        >
          <EditIcon />
        </span>
      </div>

      {update && (
        <div className="absolute grid p-2 rounded-md bg-slate-300 border translate-y-12">
          <input
            className="mb-2 rounded"
            type="text"
            placeholder={title}
            onChange={(e) => setUpdateMovieTitle(e.target.value)}
          />
          <input
            className="rounded"
            type="text"
            placeholder={type}
            onChange={(e) => setUpdateMovieType(e.target.value)}
          />
          <span className="flex">
            <input
              title="action"
              type="checkbox"
              checked={updateMovieAction}
              onChange={(e) => setUpdateMovieAction(e.target.checked)}
            />
            <label htmlFor="action">Action Movie?</label>
          </span>

          <button
            className="bg-purple-200 text-purple-600 w-fit mx-auto rounded px-2 py-1"
            onClick={() => UpdateMovie(id)}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default Movie;
