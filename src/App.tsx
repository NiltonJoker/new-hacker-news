import { useState } from "react";
import "./App.css";

import AllPostPage from "./pages/AllPostPage";
import FavoritePosts from "./pages/FavoritePosts";

function App() {
  const [showAllPosts, setShowAllPosts] = useState(false);

  return (
    <>
      <h1 className="text-4xl text-center mt-4">Hacker News</h1>

      <div className="flex justify-center my-4">
        <button
          className={`p-3 border rounded-l-xl shadow-md ${
            showAllPosts ? "bg-slate-100" : ""
          }`}
          onClick={() => setShowAllPosts(true)}
        >
          All Posts
        </button>
        <button
          className={`p-3 border rounded-r-xl shadow-md ${
            !showAllPosts ? "bg-slate-100" : ""
          }`}
          onClick={() => setShowAllPosts(false)}
        >
          Favorites
        </button>
      </div>

      <div className={!showAllPosts ? "hidden" : ""}>
        <AllPostPage />
      </div>

      {!showAllPosts && <FavoritePosts />}
    </>
  );
}

export default App;
