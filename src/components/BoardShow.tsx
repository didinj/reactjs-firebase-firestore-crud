import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import type { Board } from "../types/Board";

function BoardShow() {
  const [board, setBoard] = useState<Board | undefined>();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchBoard = async () => {
      const snap = await getDoc(doc(db, "boards", id));
      setBoard(snap.data() as Board);
    };
    fetchBoard();
  }, [id]);

  return board ? (
    <div>
      <h2>{board.title}</h2>
      <p>{board.description}</p>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default BoardShow;
