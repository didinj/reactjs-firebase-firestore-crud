import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import type { Board } from "../types/Board";

function BoardEdit() {
  const [board, setBoard] = useState<Board | undefined>();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const loadBoard = async () => {
      const snap = await getDoc(doc(db, "boards", id));
      setBoard(snap.data() as Board);
    };
    loadBoard();
  }, [id]);

  const onSubmit = async (e: any) => {
    if (!id || !board) return;

    e.preventDefault();
    await updateDoc(doc(db, "boards", id), { ...board });
    navigate("/");
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Edit Board</h2>
      <input
        value={board!.title}
        onChange={(e) => {
          if (!board) return;
          setBoard({ ...board, title: e.target.value });
        }}
        required
      />
      <textarea
        value={board!.description}
        onChange={(e) => {
          if (!board) return;
          setBoard({ ...board, description: e.target.value });
        }}
        required
      />
      <button type="submit">Update</button>
    </form>
  );
}

export default BoardEdit;
