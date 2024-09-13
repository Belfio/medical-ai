import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { DatasetType } from "~/lib/types";

interface DatasetsTableProps {
  datasets: DatasetType[] | [];
}

const DatasetsTable: React.FC<DatasetsTableProps> = ({ datasets }) => {
  return (
    <Table className="min-w-[1024px] w-full pr-8">
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
        {datasets.map((dataset) => (
          <TableRow key={dataset.datasetId}>
            <TableCell>{dataset.datasetId}</TableCell>
            <TableCell>{dataset.datasetId}</TableCell>
            <TableCell>{dataset.description}</TableCell>
            <TableCell>{dataset.userId}</TableCell>
            <TableCell>
              <a
                href={dataset.downloadUrl}
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

export default DatasetsTable;
