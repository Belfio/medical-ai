
print("Hello World")
import sys
import requests
if len(sys.argv) != 3:
    print("Usage: python setup.py <data_url> <notebook_url>")
    sys.exit(1)



data_path = sys.argv[1]
print(f"Data URL: {data_path}")

# Download the dataset from the provided URL
response = requests.get(data_path)
if response.status_code != 200:
    print(f"Failed to download dataset. Status code: {response.status_code}")
    sys.exit(1)

# Save the dataset to a file
with open('data.csv', 'wb') as f:
    f.write(response.content)

print("Dataset downloaded and saved as 'data.csv'")

notebook_path = sys.argv[2]
print(f"Notebook URL: {notebook_path}")

# Download the notebook from the provided URL
# response = requests.get(notebook_path)
# if response.status_code != 200:
#     print(f"Failed to download notebook. Status code: {response.status_code}")
#     sys.exit(1)

# Save the notebook to a file
# with open('nb.ipynb', 'wb') as f:
#     f.write(response.content)

# print("Notebook downloaded and saved as 'execNotebook.ipynb'")

#run the notebook
import nbformat
from nbconvert.preprocessors import ExecutePreprocessor

# Load the notebook
with open('exec.ipynb') as f:
    notebook = nbformat.read(f, as_version=4)

# Execute the notebook
ep = ExecutePreprocessor(timeout=600, kernel_name='python3')
try:
    ep.preprocess(notebook, {'metadata': {'path': '/app/'}})
    print("Notebook executed successfully")
except Exception as e:
    print(f"Error executing the notebook: {e}")

# Save the executed notebook
with open('output.ipynb', 'w', encoding='utf-8') as f:
    nbformat.write(notebook, f)

print("Executed notebook saved as 'output.ipynb'")
