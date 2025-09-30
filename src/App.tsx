import Editor from "./components/Editor";

function App() {
  return (
    <div className="h-screen bg-neutral-50 flex flex-col">
      <div className="text-primary-500 p-4 bg-white border-b border-neutral-200">
        <h1 className="text-xl font-semibold">Lax Editor</h1>
      </div>
      <div className="flex-1 overflow-hidden">
        <Editor />
      </div>
    </div>
  );
}

export default App;
