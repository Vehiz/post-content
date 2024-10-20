import CreatePost from "./pages/CreatePost";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PostProvider } from './components/PostContext';
import PreviewPage from "./pages/PreviewPage";
import EditorPage from "./pages/EditorPage";

function App() {
  return (
    <PostProvider>
    <Router>
      <Routes>
        <Route path="/" element={<CreatePost />} />
        <Route path="/editor" element={<EditorPage />} />
        <Route path="/preview" element={<PreviewPage />} />
      </Routes>
    </Router>
  </PostProvider>
  );
}

export default App;
