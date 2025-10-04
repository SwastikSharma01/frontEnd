import "../styling/ArticleForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

function ArticleForm() {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [articleText, setArticleText] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();

  const API_KEY = "9514e3bc54a9a1ed21afd3b62201d35a";

  function handleBrowseClick() {
    const input = document.getElementById("fileInput");
    if (input) {
      input.click();
    }
  }

  function handleImageSelect(e) {
    setImageFile(e.target.files[0]);
  }

  async function handleImageUpload() {
    if (!imageFile) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data && data.data && data.data.url) {
        setImageUrl(data.data.url);
        alert("Image uploaded successfully!");
      } else {
        alert("Failed to upload image.");
      }
    } catch (err) {
      alert("Image upload failed.");
    }
  }

  function handlePost(e) {
    e.preventDefault();

    const isEmpty =
      title.trim() === "" ||
      abstract.trim() === "" ||
      articleText.trim() === "" ||
      imageUrl.trim() === "";

    if (isEmpty) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    const tagsArray = tags
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag !== "");

    addDoc(collection(db, "articles"), {
      title,
      abstract,
      imageUrl,
      articleText,
      tags: tagsArray,
      createdAt: serverTimestamp(),
    })
      .then(() => {
        alert("Article posted successfully.");
        setTitle("");
        setAbstract("");
        setImageFile(null);
        setImageUrl("");
        setArticleText("");
        setTags("");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        alert("Failed to post: " + error.message);
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
        Abstract:
        <textarea
          placeholder="Enter a 1-paragraph abstract"
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
        />
      </label>

      <label>
        Add an Image:
        <input
          type="text"
          placeholder="Add image here"
          value={imageUrl === "" ? "" : "Image uploaded"}
          readOnly
        />
      </label>

      <div className="Container">
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageSelect}
        />
        {imageUrl && (
          <div style={{ marginTop: "10px" }}>
            <img
                src={imageUrl}
                alt="Uploaded"
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  borderRadius: "8px",
                  border: "1px solid #ccc"
                }}
            />
          </div>
        )}

        <button type="button" onClick={handleBrowseClick}>Browse</button>
        <button type="button" onClick={handleImageUpload}>Upload</button>
        
      </div>

      <label>
        Article Text:
        <textarea
          placeholder="Enter full article text"
          value={articleText}
          onChange={(e) => setArticleText(e.target.value)}
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

export default ArticleForm;
