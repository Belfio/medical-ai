import React, { useEffect } from "react";
import AceEditor from "react-ace";

// Import a theme and mode for Python
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";

const defaultCode = (
  datasetUrl: string = "DATA_URL",
  repoUrl: string = "REPO_URL",
  repoName: string = "REPO_NAME"
) => `# Mount Google Drive
from google.colab import drive
drive.mount('/content/drive')

# Clone the GitHub repository and enter the directory
!git clone ${repoUrl}
%cd ${repoName}

# Install any dependencies (if a requirements.txt file is present)
!pip install -r requirements.txt

# Load the dataset, download a dataset from a URL
!wget -O dataset.csv ${datasetUrl}

# Import necessary libraries and load the dataset into a DataFrame
import pandas as pd
data = pd.read_csv('dataset.csv')

# Run the model training script
# This assumes there is a script named 'train_model.py' in the repository
!python train_model.py


testSet = dataset.load_data()
result = model.run(testSet)

accuracy = repo.evaluate(result, testSet)




`;
const PythonEditor = ({
  datasetUrl,
  repoUrl,
  repoName,
}: {
  datasetUrl: string;
  repoUrl: string;
  repoName: string;
}) => {
  const [code, setCode] = React.useState<string>("");

  const handleChange = (newCode: string) => {
    setCode(newCode);
  };
  useEffect(() => {
    setCode(defaultCode(datasetUrl, repoUrl, repoName));
  }, [datasetUrl, repoUrl, repoName]);

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
