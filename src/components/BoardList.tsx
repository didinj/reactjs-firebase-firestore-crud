import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import type { Board } from "../types/Board";

function BoardList() {
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    const fetchBoards = async () => {
      const snapshot = await getDocs(collection(db, "boards"));
      setBoards(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Board))
      );
    };
    fetchBoards();
  }, []);

  const deleteBoard = async (id: string) => {
    await deleteDoc(doc(db, "boards", id));
    setBoards(boards.filter((board) => board.id !== id));
  };

  return (
    <div>
      <h2>Board List</h2>
      <ul>
        {boards.map((board) => (
          <li key={board.id}>
            <Link to={`/show/${board.id}`}>{board.title}</Link>{" "}
            <Link to={`/edit/${board.id}`}>Edit</Link>{" "}
            <button onClick={() => deleteBoard(board.id!)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BoardList;
