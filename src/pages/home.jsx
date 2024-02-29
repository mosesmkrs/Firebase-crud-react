"use client";
import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import Movie from "../components/movie";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate(); // Initialize useRouter
  const [movies, setMovies] = useState([]);

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieType, setNewMovieType] = useState("");
  const [newMovieAction, setNewMovieAction] = useState(false);
  const [loading, setLoading] = useState(false);

  const moviesCollection = collection(db, "Movies");

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const data = await getDocs(moviesCollection);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovies(filteredData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, []);

  const submitMovie = async () => {
    try {
      const docRef = await addDoc(moviesCollection, {
        Title: newMovieTitle,
        Type: newMovieType,
        Action: newMovieAction,
        userId: auth?.currentUser?.uid,
      });
      setNewMovieTitle("");
      setNewMovieType("");
      setNewMovieAction(false);
      fetchMovies();
      toast.success("Movie added successfully");
    } catch (e) {
      console.error(e);
      toast.error("Error adding movie");
    }
  };
  const LogOut = async () => {
    try {
      await signOut(auth);
      toast("Signed Out");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const handleLogOut = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      LogOut();
    }
  };

  return (
    <div>
      <div className="flex gap-2 m-5 justify-center text-center items-center bg-slate-400 p-5 w-fit rounded-md mx-auto">
        <input
          className="p-2 rounded-md bg-slate-200"
          type="text"
          placeholder="enter movie title"
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          className="p-2 rounded-md bg-slate-200"
          type="text"
          placeholder="enter movie type"
          onChange={(e) => setNewMovieType(e.target.value)}
        />
        <input
          type="checkbox"
          title="action"
          checked={newMovieAction}
          onChange={(e) => setNewMovieAction(e.target.checked)}
        />
        <label htmlFor="action">Action movie?</label>
        <button
          onClick={submitMovie}
          className="bg-blue-200 text-blue-800 p-1 rounded"
        >
          Post Movie
        </button>
        <button
          className="px-3 py-1 bg-red-200 text-red-600 rounded"
          onClick={handleLogOut}
        >
          Log Out
        </button>
      </div>
      {loading ? (
        <p className="text-3xl font-bold text-red-500 text-center">
          Movies Loading...
        </p>
      ) : (
        movies.map((movie) => (
          <Movie
            key={movie.Title}
            title={movie.Title}
            type={movie.Type}
            action={movie.Action}
            id={movie.id}
          />
        ))
      )}
    </div>
  );
}

export default Home;
