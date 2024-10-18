import React, { useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";

const defaultCode = (
  datasetUrl: string = "DATA_URL",
  repoUrl: string = "REPO_URL",
  repoName: string = "REPO_NAME"
) => `
  # Mount Google Drive
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
  setScript,
}: {
  datasetUrl: string;
  repoUrl: string;
  repoName: string;
  setScript: (script: string) => void;
}) => {
  const [code, setCode] = React.useState<string>("");

  useEffect(() => {
    setCode(defaultCode(datasetUrl, repoUrl, repoName));
  }, [datasetUrl, repoUrl, repoName]);

  useEffect(() => {
    setScript(code);
  }, [code]);

  return (
    <CodeMirror
      value={code}
      height="200px"
      extensions={[python()]}
      onChange={setCode}
    />
  );
};

export default PythonEditor;
