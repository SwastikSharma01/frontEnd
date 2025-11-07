import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import "../styling/ArticleForm.css";

function ArticleForm() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [articleText, setArticleText] = useState("");
  const [tags, setTags] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const API_KEY = "9514e3bc54a9a1ed21afd3b62201d35a"; 

  const handleImageSelect = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      alert("Please choose an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data && data.data && data.data.url) {
        setImageUrl(data.data.url);
        alert("Image uploaded successfully!");
      } else {
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Image upload failed. Try again.");
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();

    if (!title || !abstract || !articleText || !imageUrl) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    const tagArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    try {
      await addDoc(collection(db, "articles"), {
        title,
        abstract,
        articleText,
        tags: tagArray,
        imageUrl,
        createdAt: serverTimestamp(),
      });

      alert("Article posted successfully!");
      
      setTitle("");
      setAbstract("");
      setArticleText("");
      setTags("");
      setImageFile(null);
      setImageUrl("");

      navigate("/home");
    } catch (err) {
      console.error("Error posting article:", err);
      alert("Failed to post article.");
    }
  };

  return (
    <div className="article-form">
      <h2>Post an Article</h2>

      <form onSubmit={handlePost}>
        <label>
          Title:
          <input
            type="text"
            placeholder="Enter article title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          Abstract:
          <textarea
            placeholder="Write a short summary"
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
          />
        </label>

        <label>
          Article Text:
          <textarea
            placeholder="Write your full article here..."
            value={articleText}
            onChange={(e) => setArticleText(e.target.value)}
          />
        </label>

        <label>
          Tags:
          <input
            type="text"
            placeholder="Add up to 3 tags, e.g., React, Firebase"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </label>

        <label>
          Upload an Image:
          <input type="file" accept="image/*" onChange={handleImageSelect} />
        </label>

        <div className="image-section">
          <button type="button" onClick={handleImageUpload}>
            Upload Image
          </button>

          {imageUrl && (
            <div className="preview">
              <img src={imageUrl} alt="Uploaded" />
            </div>
          )}
        </div>
        <br />
        <button type="submit" className="postbtn">
          Post Article
        </button>
      </form>
    </div>
  );
}

export default ArticleForm;
