import { Upload, AlertCircle, Plus, X } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert";

const FileItem = ({
  name,
  onRemove,
}: {
  name: string;
  onRemove: () => void;
}) => (
  <div className="flex items-center justify-between bg-gray-100 p-2 rounded mt-2">
    <span>{name}</span>
    <button onClick={onRemove} className="text-red-500">
      <X size={16} />
    </button>
  </div>
);

const ModelUploadPage = () => (
  <div className="p-6 max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold mb-6">Upload Your Model</h1>

    <div className="bg-white shadow-md rounded p-6 mb-6">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag and drop your model files here, or click to select files
        </p>
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Select Files
        </button>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Uploaded Files:</h3>
        <FileItem name="model.py" onRemove={() => {}} />
        <FileItem name="weights.h5" onRemove={() => {}} />
        <FileItem name="config.json" onRemove={() => {}} />
        <button className="mt-2 text-blue-500 flex items-center">
          <Plus size={16} className="mr-1" /> Add More Files
        </button>
      </div>
    </div>

    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Supported Formats</AlertTitle>
      <AlertDescription>
        We accept various file types including .py, .pkl, .h5, .pt, .onnx,
        .json, .yaml, and more. Total upload size limit: 5GB
      </AlertDescription>
    </Alert>

    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Upload Requirements</h2>
      <ul className="list-disc pl-5">
        <li>
          Include all necessary files for your model (e.g., weights, config,
          preprocessor)
        </li>
        <li>Provide a requirements.txt file for any dependencies</li>
        <li>Include a README.md with instructions on how to use your model</li>
        <li>Ensure your files don&apos;t contain sensitive information</li>
      </ul>
    </div>
  </div>
);

export default ModelUploadPage;
