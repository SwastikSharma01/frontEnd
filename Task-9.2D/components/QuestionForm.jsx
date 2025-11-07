import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebaseConfig";
import { doc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Controlled as CodeMirror } from "react-codemirror2";
import ReactMarkdown from "react-markdown";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import "../styling/QuestionForm.css";

function QuestionForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [code, setCode] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserStatus = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setIsPremium(!!userSnap.data().isPremium);
        }
      } catch (err) {
        console.error("Error fetching user premium status:", err);
      }
    };

    fetchUserStatus();
  }, []);

  async function handlePost(e) {
    e.preventDefault();

    if (!title || !description || !tags) {
      alert("Please fill all fields before posting.");
      return;
    }

    const tagArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((t) => t);

    try {
      const user = auth.currentUser;
      if (!user) {
        alert("You must be logged in to post a question.");
        navigate("/login");
        return;
      }

      await addDoc(collection(db, "questions"), {
        title,
        description,
        tags: tagArray,
        code: isPremium ? code : null,
        createdAt: serverTimestamp(),
        userEmail: user.email,
      });

      alert("Question posted successfully!");
      setTitle("");
      setDescription("");
      setTags("");
      setCode("");
      navigate("/home");
    } catch (err) {
      console.error("Error adding document:", err);
      alert("Failed to post: " + err.message);
    }
  }

  return (
    <div className="form">
      <h3>What do you want to ask or share?</h3>

      <form onSubmit={handlePost}>
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
          <br />
          Description:
          {!showPreview ? (
            <textarea
              placeholder="Describe your problem clearly using Markdown syntax"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          ) : (
            <div className="preview-section">
              <h4>Preview:</h4>
              <ReactMarkdown>{description}</ReactMarkdown>
            </div>
          )}
        </label>

        {isPremium ? (
          <button
            type="button"
            className="toggle-btn"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? "Edit Markdown" : "Preview Markdown"}
            <br />
          </button>
        ) : (
          <p className="premium-warning">
            Markdown preview is available for Premium users only. Upgrade your plan to unlock it.
          </p>
        )}

        {isPremium ? (
          <label>
            <br />
            Code Snippet:
            <div className="editor-container">
              <CodeMirror
                value={code}
                options={{
                  mode: "javascript",
                  theme: "material",
                  lineNumbers: true,
                }}
                onBeforeChange={(editor, data, value) => setCode(value)}
              />
            </div>
          </label>
        ) : (
          <p className="premium-warning">
            Code editor is available for Premium users only. Upgrade your plan to unlock it.
          </p>
        )}

        <label>
          Tags:
          <input
            type="text"
            placeholder="Add up to 3 tags e.g., Java, React"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </label>

        <div className="submit-button-container">
          <button type="submit" className="post-btn">
            Post Question
          </button>
        </div>
      </form>
    </div>
  );
}

export default QuestionForm;
