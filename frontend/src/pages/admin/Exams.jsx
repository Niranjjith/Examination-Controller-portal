import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Exams() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    api.get("/exams").then(res => setExams(res.data));
  }, []);

  return (
    <>
      <h2>Exams</h2>
      <ul>
        {exams.map(e => (
          <li key={e._id}>{e.name} - {e.subject}</li>
        ))}
      </ul>
    </>
  );
}
