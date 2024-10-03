import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

// SyntaxHighlighter.registerLanguage("javascript", javascript);

interface Cell {
  cell_type: string;
  metadata: any;
  source: string[];
}

const NotebookViewer: React.FC<{ notebookUrl: JSON }> = ({ notebookUrl }) => {
  const [cells, setCells] = useState<Cell[]>([]);

  useEffect(() => {
    setCells(notebookUrl.cells);
  }, [notebookUrl]);

  return (
    <div>
      {cells.map((cell, index) => {
        if (cell.cell_type === "markdown") {
          return (
            <ReactMarkdown key={index}>{cell.source.join("")}</ReactMarkdown>
          );
        } else if (cell.cell_type === "code") {
          return (
            <>
              {/* <SyntaxHighlighter key={index} language="javascript" style={docco}> */}
              {cell.source.join("")}
              {/* </SyntaxHighlighter> */}
            </>
          );
        }
        return null;
      })}
    </div>
  );
};

export default NotebookViewer;
