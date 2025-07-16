import { Routes, Route, Link } from "react-router-dom";
import BoardList from "./components/BoardList";
import BoardAdd from "./components/BoardAdd";
import BoardEdit from "./components/BoardEdit";
import BoardShow from "./components/BoardShow";

function App() {
  return (
    <div className="container">
      <h1>React Firebase Firestore CRUD</h1>
      <nav>
        <Link to="/">Boards</Link> | <Link to="/add">Add</Link>
      </nav>
      <Routes>
        <Route path="/" element={<BoardList />} />
        <Route path="/add" element={<BoardAdd />} />
        <Route path="/edit/:id" element={<BoardEdit />} />
        <Route path="/show/:id" element={<BoardShow />} />
      </Routes>
    </div>
  );
}

export default App;
