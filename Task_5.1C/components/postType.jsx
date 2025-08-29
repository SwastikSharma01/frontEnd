import { useState } from "react";
import "../styling/postType.css";
import ArticleForm from "./ArticleForm";
import QuestionForm from "./QuestionForm";

function Post_type() {
    const [postType, setPostType] = useState("");

    function handleChange(event) 
    {
        const selectedValue = event.target.value;  
        setPostType(selectedValue);                
    }

    return (
        <div className="Header">

            <h3 className="title"> New Post </h3>

            <section className="radios">
                <p>
                    <strong>Select Post Type:</strong> 

                    <input type="radio" id="post1" value="Question" 
                        checked={postType === "Question"} 
                        onChange={handleChange}
                    />

                    <label className="radioin" htmlFor="post1"> Question</label>

                    <input type="radio" id="post2" value="Article"
                        checked={postType === "Article"}
                        onChange={handleChange}
                    />

                    <label htmlFor="post2"> Article</label>
                </p>
            </section>

            {postType === "Question" && <QuestionForm />}
            {postType === "Article" && <ArticleForm />}

        </div>
    );
}

export default Post_type;
