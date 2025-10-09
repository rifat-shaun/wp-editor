/* eslint-disable */
import Editor from "./components/Editor";
import { useState } from "react";

function App() {
  const [_insertVariable, setInsertVariable] = useState<((key: string, value?: string) => void) | null>(null);

  const fetchAICompletion = async (text: string): Promise<string> => {
    try {
      // Replace with your actual API endpoint
      const apiEndpoint = 'https://dev2.lambdax.ai/api/v1/lax-ai-editor/public/completions';

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          model: 'local',
          stream: false,
          max_tokens: 3 + Math.floor(Math.random() * 6), // random number between 3 and 8
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI suggestion');
      }

      const data = await response.json();
      return data.completion || '';
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('AI Completion failed:', error);
      }
      return '';
    }
  };

  const content = '<p style="text-align: left;">Hello there, we are here to help you<span> </span>and this is very much needed <span data-variable-name="name" class="variable-text" contenteditable="false"></span><span data-variable-name="name_no_value" class="variable-text" contenteditable="false">John Doe</span><img class="ProseMirror-separator" alt=""><br class="ProseMirror-trailingBreak"></p>';

  return (
    <div className="h-screen bg-neutral-50 flex flex-col">
      <div className="flex-1 overflow-hidden">
        <Editor config={{
          content,
          defaultToolbar: 'classic',
          aiAutocompletion: {
            enabled: false,
            minWordsToTriggerAutoCompletion: 5,
            debounceTime: 100,
            fetchCompletion: fetchAICompletion,
          },
          enableVariableText: true,
          variableValues: {
            name: 'John Doe',
            age: '25',
            email: 'john.doe@example.com',
          },
          onShare: () => {
            console.log('Share');
          },
          onEditorReady: ({ insertVariable }) => {
            setInsertVariable(() => insertVariable);
          },
        }} />
      </div>
    </div>
  )
}

export default App
