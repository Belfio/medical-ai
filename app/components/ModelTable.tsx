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
}

const ModelsTable: React.FC<ModelsTableProps> = ({ models }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Download URL</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {models.map((model) => (
          <TableRow key={model.modelId}>
            <TableCell>{model.modelId}</TableCell>
            <TableCell>{model.tConst}</TableCell>
            <TableCell>{model.diseaseId}</TableCell>
            <TableCell>{model.userId}</TableCell>
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
