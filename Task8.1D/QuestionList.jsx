import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc
} from "firebase/firestore";
import "../styling/QuestionList.css";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [filterTitle, setFilterTitle] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // Fetches questions in real-time
  useEffect(() => {
    const q = query(collection(db, "questions"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuestions(data);
    });

    return () => unsubscribe();
  }, []);

  // Toggles open/close for question details
  function handleClick(index) {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  }

  // Deletes a question
  async function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this question?");
    if (confirmDelete) {
      await deleteDoc(doc(db, "questions", id));
      alert("Question deleted.");
    }
  }

  // Filters the questions based on user input
  const filteredQuestions = questions.filter((q) => {
  const matchesTitle = q.title.toLowerCase().includes(filterTitle.toLowerCase());

  const matchesTag =
    filterTag.trim() === "" ||
    (q.tags &&
      q.tags.some(function (tag) {
        return tag.toLowerCase() === filterTag.toLowerCase();
      }));

  const matchesDate =
    filterDate === "" ||
    (q.createdAt &&
      q.createdAt.toDate().toISOString().slice(0, 10) === filterDate);

  return matchesTitle && matchesTag && matchesDate;
  });


  return (
    <div className="container">
      <h2>Frequently Asked Questions</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by title"
          value={filterTitle}
          onChange={(e) => setFilterTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by tag"
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
        />
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      {filteredQuestions.map((question, index) => {
        const isOpen = activeIndex === index;

        let symbol;
        if (isOpen) {
          symbol = "-";
        } else {
          symbol = "+";
        }

        return (
          <div className="card" key={question.id}>
            <div className="card-question" onClick={() => handleClick(index)}>
              <span>{question.title}</span>
              <span className="dropdown">{symbol}</span>
            </div>

            {isOpen && (
              <div className="card-answer">
                <p>{question.description}</p>
                {question.tags && (
                  <p><strong>Tags:</strong> {question.tags.join(", ")}</p>
                )}
                {question.createdAt && (
                  <p><strong>Date:</strong> {question.createdAt.toDate().toLocaleDateString("en-IN")}</p>
                )}
                <button onClick={() => handleDelete(question.id)}>Delete</button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default QuestionList;
