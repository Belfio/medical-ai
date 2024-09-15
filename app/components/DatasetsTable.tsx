import { Link } from "@remix-run/react";
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
  className?: string;
}

const DatasetsTable: React.FC<DatasetsTableProps> = ({
  datasets,
  className,
}) => {
  return (
    <Table className={`min-w-[1024px] w-full pr-8 ${className}`}>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Data Types</TableHead>
          <TableHead>Diseases</TableHead>
          <TableHead>Body Parts</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Download URL</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {datasets.map((dataset) => (
          <TableRow key={dataset.datasetId}>
            <TableCell>{dataset.name}</TableCell>
            <TableCell>{dataset.dataType}</TableCell>
            <TableCell>{dataset.diseaseIds}</TableCell>
            <TableCell>{dataset.bodyParts}</TableCell>
            <TableCell>{dataset.size}</TableCell>
            <TableCell>{dataset.author}</TableCell>
            <TableCell>
              <Link to={`/datasets/${dataset.datasetId}.zip`} reloadDocument>
                Download
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DatasetsTable;
