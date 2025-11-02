import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PropertyEditor from "./agents/PropertyEditor";

export default function App() {
  return (
    <BrowserRouter>
      {/* temp nav so it’s easy to reach */}
      <nav style={{padding:12, display:"flex", gap:12}}>
        <Link to="/">Feed</Link>
        <Link to="/agents/editor">Agents Editor</Link>
      </nav>

      <Routes>
        {/* your existing routes */}
        <Route path="/agents/editor" element={<PropertyEditor />} />
      </Routes>
    </BrowserRouter>
  );
}
