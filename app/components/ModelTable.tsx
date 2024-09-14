import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { ModelType } from "~/lib/types";

interface ModelsTableProps {
  models: ModelType[];
  className?: string;
}

const ModelsTable: React.FC<ModelsTableProps> = ({ models, className }) => {
  return (
    <Table className={`min-w-[1024px] w-full pr-8 ${className}`}>
      <TableHeader>
        <TableRow>
          <TableHead>Ranking</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Input Data Type</TableHead>
          <TableHead>Target Diseases</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Download URL</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {models.map((model) => (
          <TableRow key={model.modelId}>
            <TableCell>{model.ranking}</TableCell>
            <TableCell>{model.name}</TableCell>
            <TableCell>{model.inputDataTypes}</TableCell>
            <TableCell>{model.diseaseIds}</TableCell>
            <TableCell>{model.author}</TableCell>
            <TableCell>
              <a
                href={model.modelType}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ModelsTable;
