import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, onSnapshot, orderBy, query, deleteDoc, doc } from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import "../styling/QuestionList.css";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  const [titleFilter, setTitleFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    const q = query(collection(db, "questions"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuestions(data);
      setFilteredQuestions(data);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let filtered = [...questions];

    if (titleFilter.trim() !== "") {
      filtered = filtered.filter((q) =>
        q.title?.toLowerCase().includes(titleFilter.toLowerCase())
      );
    }

    if (tagFilter.trim() !== "") {
      filtered = filtered.filter(
        (q) =>
          q.tags &&
          q.tags.some((tag) =>
            tag.toLowerCase().includes(tagFilter.toLowerCase())
          )
      );
    }

    if (dateFilter.trim() !== "") {
      filtered = filtered.filter((q) => {
        if (!q.createdAt) return false;
        const postedDate = q.createdAt.toDate().toISOString().split("T")[0];
        return postedDate === dateFilter;
      });
    }

    setFilteredQuestions(filtered);
  }, [titleFilter, tagFilter, dateFilter, questions]);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this question?");
    if (confirmDelete) {
      await deleteDoc(doc(db, "questions", id));
      alert("Question deleted successfully.");
    }
  };

  return (
    <div className="question-list">
      <h2>Frequently Asked Questions</h2>

      <div className="filter-section">
        <input
          type="text"
          placeholder="Filter by Title"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by Tag"
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
        />
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
        <button
          className="clear-filters-btn"
          onClick={() => {
            setTitleFilter("");
            setTagFilter("");
            setDateFilter("");
          }}
        >
          Clear Filters
        </button>
      </div>

      {filteredQuestions.length === 0 && <p>No questions found.</p>}

      {filteredQuestions.map((q, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={q.id} className={`question-card ${isOpen ? "open" : ""}`}>
            <div className="question-header" onClick={() => toggleQuestion(index)}>
              <span className="title-text">{q.title}</span>
              <span className="toggle-icon">{isOpen ? "−" : "+"}</span>
            </div>

            {isOpen && (
              <div className="question-body">
                <div className="question-description">
                  <ReactMarkdown>{q.description}</ReactMarkdown>
                </div>

                {q.code && (
                  <div className="code-snippet">
                    <h4>Code Snippet:</h4>
                    <pre>
                      <code>{q.code}</code>
                    </pre>
                  </div>
                )}

                {q.tags && q.tags.length > 0 && (
                  <div className="tags">
                    {q.tags.map((tag, i) => (
                      <span key={i} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {q.createdAt && (
                  <p className="timestamp">
                    Posted on {q.createdAt.toDate().toLocaleDateString()}
                  </p>
                )}

                <div className="button-section">
                  <button onClick={() => handleDelete(q.id)} className="delete-btn">
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default QuestionList;
