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
import { categories } from "~/lib/const";
import { DatasetType, DiseaseType, ModelType } from "~/lib/types";

interface DatasetsTableProps {
  diseases: DiseaseType[] | [];
  models: ModelType[] | [];
  datasets: DatasetType[] | [];
  className?: string;
  nameSearch?: React.ReactNode;
  categorySearch?: React.ReactNode;
}

const DiseasesTable: React.FC<DatasetsTableProps> = ({
  datasets,
  diseases,
  models,
  className,
  nameSearch,
  categorySearch,
}) => {
  return (
    <Table className={`min-w-[1024px] w-full pr-8 ${className}`}>
      <TableHeader>
        <TableRow>
          <TableHead className="flex-row gap-2 justify-between">
            <span>Name</span> {nameSearch}
          </TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="flex-row gap-2">
            Category {categorySearch}
          </TableHead>
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
            <TableCell>{disease.description.substring(0, 100)}...</TableCell>
            <TableCell>
              {
                categories.find(
                  (c) => String(disease.categoryId) === String(c.categoryId)
                )?.categoryName
              }
            </TableCell>
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
