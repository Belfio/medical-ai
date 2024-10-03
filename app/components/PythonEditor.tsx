import React from "react";
import AceEditor from "react-ace";

// Import a theme and mode for Python
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";

const defaultCode = `
import openai

openai.api_key = "sk-proj-1234567890"

response = openai.Completion.create(
  engine="text-davinci-003",
  prompt="Hello, how are you?",
  max_tokens=50

)
`;
const PythonEditor = () => {
  const [code, setCode] = React.useState<string>(defaultCode);

  const handleChange = (newCode: string) => {
    setCode(newCode);
  };

  return (
    <AceEditor
      mode="python"
      theme="github"
      name="python_editor"
      onChange={handleChange}
      value={code}
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
      }}
      style={{ width: "100%", height: "400px" }}
    />
  );
};

export default PythonEditor;
