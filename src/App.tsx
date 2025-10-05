import { Editor } from 'lax-wp-editor'

function App() {

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

  return (
    <div className="h-screen bg-neutral-50 flex flex-col">
      <div className="flex-1 overflow-hidden">
        <Editor config={{
          content: '<p>Hello Mim, we are here to help you and this is very much needed</p>',
          defaultToolbar: 'classic',
          aiAutocompletion: {
            enabled: true,
            minWordsToTriggerAutoCompletion: 5,
            debounceTime: 100,
            fetchCompletion: fetchAICompletion,
          },
        }} />
      </div>
    </div>
  )
}

export default App
