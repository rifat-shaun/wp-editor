import { LaxDocumentEditor } from "./components/LaxDocumentEditor";

function App() {
  return (
    <div className="h-screen bg-neutral-50 flex flex-col">
      <div className="flex-1 overflow-hidden">
        <LaxDocumentEditor />
      </div>
    </div>
  );
}

export default App;
