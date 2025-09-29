import Editor from "./components/Editor";

function App() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="text-primary-500 p-4 bg-white border-b border-neutral-200">
        <h1 className="text-xl font-semibold">Lax Editor</h1>
      </div>
      <Editor />
    </div>
  );
}

export default App;
