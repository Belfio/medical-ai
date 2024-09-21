import { Upload, Plus, X } from "lucide-react";

import { cn } from "~/lib/utils";

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

export default function ModelUploadSmall({
  className,
  files,
  setFiles,
}: {
  className?: string;
  files: FileList | null;
  setFiles: (files: FileList | null) => void;
}) {
  const addFile = (file: File) => {
    setFiles((prevFiles) => {
      const dataTransfer = new DataTransfer();
      if (prevFiles) {
        Array.from(prevFiles).forEach((f) => dataTransfer.items.add(f));
      }
      dataTransfer.items.add(file);
      return dataTransfer.files;
    });
  };

  const removeFile = (file: File) => {
    setFiles((prevFiles) => {
      if (prevFiles) {
        const dataTransfer = new DataTransfer();
        Array.from(prevFiles).forEach((f) => {
          if (f !== file) {
            dataTransfer.items.add(f);
          }
        });
        return dataTransfer.files;
      }
      return null;
    });
  };

  return (
    <div className={cn("max-w-4xl mx-auto", className)}>
      <div className=" rounded  mb-6">
        <div className="mt-4">
          <h2>Uploaded Files:</h2>
          {files &&
            Array.from(files).map((file) => (
              <FileItem
                key={file.name}
                name={file.name}
                onRemove={() => {
                  removeFile(file);
                }}
              />
            ))}
          <div className="relative">
            <input
              type="file"
              multiple
              onChange={(e) => {
                if (e.target.files) {
                  Array.from(e.target.files).forEach((file) => addFile(file));
                }
              }}
              title="Upload your model files"
              className="absolute w-full h-full custom-file-input"
            />
            <button className="mt-2 text-blue-500 flex items-center">
              <Plus size={16} className="mr-1" /> Add More Files
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
