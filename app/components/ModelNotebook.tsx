import notebookData from "~/assets/prova.ipynb";
import NotebookViewer from "./NotebookViewer";

export default function ModelNotebook() {
  return (
    <div>
      <NotebookViewer notebookUrl={notebookData} />
    </div>
  );
}
