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
import { DatasetType, DiseaseType, ModelType } from "~/lib/types";

interface DatasetsTableProps {
  diseases: DiseaseType[] | [];
  models: ModelType[] | [];
  datasets: DatasetType[] | [];
  className?: string;
}

const DiseasesTable: React.FC<DatasetsTableProps> = ({
  datasets,
  diseases,
  models,
  className,
}) => {
  return (
    <Table className={`min-w-[1024px] w-full pr-8 ${className}`}>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Datasets</TableHead>
          <TableHead>Models</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {diseases.map((disease) => (
          <TableRow key={disease.diseaseId}>
            <TableCell>
              <Link to={`/diseases/${disease.diseaseId}`} className="underline">
                {disease.name}
              </Link>
            </TableCell>
            <TableCell>{disease.description}</TableCell>
            <TableCell>{disease.category}</TableCell>
            <TableCell>
              {
                datasets.filter((dataset) =>
                  JSON.parse(dataset.diseaseIds).includes(disease.diseaseId)
                ).length
              }
            </TableCell>
            <TableCell>
              {
                models.filter(
                  (model) => JSON.parse(model.diseaseIds) === disease.diseaseId
                ).length
              }
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DiseasesTable;
