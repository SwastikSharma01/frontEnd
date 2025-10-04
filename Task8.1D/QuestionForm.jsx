import "../styling/QuestionForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

function QuestionForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();

  function handlePost(e) {
    e.preventDefault();

    if (title === "" || description === "" || tags === "") {
      alert("Please fill all fields before posting.");
      return;
    }

    const tagArray = tags.split(",").map((tag) => tag.trim());

    addDoc(collection(db, "questions"), {
      title: title,
      description: description,
      tags: tagArray,
      createdAt: serverTimestamp(),
    })
      .then(() => {
        alert("Question posted successfully!");
        setTitle("");
        setDescription("");
        setTags("");
        navigate("/");
      })
      .catch((err) => {
        console.error("Error adding document:", err);
        alert("Failed to post: " + err.message);
      });
  }

  return (
    <div className="form">
      <h3>What do you want to ask or share?</h3>

      <label>
        Title:
        <input
          type="text"
          placeholder="Start your question with how, what, why, etc."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label>
        Description:
        <textarea
          placeholder="Describe your problem clearly"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <label>
        Tags:
        <input
          type="text"
          placeholder="Add up to 3 tags e.g., Java, React"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </label>

      <button type="submit" onClick={handlePost}>Post</button>
    </div>

  );
}

export default QuestionForm;
