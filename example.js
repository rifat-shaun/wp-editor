// Example usage of lax-wp-editor
import React from 'react';
import { Editor, ToolbarProvider, TOOLBAR_TYPES_ENUM } from 'lax-wp-editor';
import 'lax-wp-editor/styles';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Lax WP Editor Example</h1>
      
      {/* Professional Toolbar */}
      <div style={{ marginBottom: '40px' }}>
        <h2>Professional Toolbar</h2>
        <ToolbarProvider initialToolbar={TOOLBAR_TYPES_ENUM.PROFESSIONAL}>
          <Editor />
        </ToolbarProvider>
      </div>

      {/* Classic Toolbar */}
      <div>
        <h2>Classic Toolbar</h2>
        <ToolbarProvider initialToolbar={TOOLBAR_TYPES_ENUM.CLASSIC}>
          <Editor />
        </ToolbarProvider>
      </div>
    </div>
  );
}

export default App;
