import Editor from "./components/Editor";

function App() {
  return (
    <div className="h-screen bg-neutral-50 flex flex-col">
      <div className="flex-1 overflow-hidden">
        <Editor />
      </div>
    </div>
  );
}

export default App;
