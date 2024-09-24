import { Form, Link } from "@remix-run/react";
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
import { Button } from "./ui/button";
import { Trash } from "lucide-react";

interface ModelsTableProps {
  models: ModelType[];
  className?: string;
}

const ModelsTable: React.FC<ModelsTableProps> = ({ models, className }) => {
  return (
    <Table className={`min-w-[1024px] w-full pr-8 ${className}`}>
      <TableHeader>
        <TableRow>
          {/* <TableHead>Ranking</TableHead> */}
          <TableHead>Name</TableHead>
          <TableHead>Input Data Type</TableHead>
          <TableHead>Target Diseases</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Notebook</TableHead>
          <TableHead>Model File</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Remove</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {models.map((model) => (
          <TableRow key={model.modelId}>
            {/* <TableCell>{model.ranking}</TableCell> */}
            <TableCell>
              <Link to={`/models/${model.modelId}`} className="underline">
                {model.name}
              </Link>
            </TableCell>

            <TableCell>{model.dataType}</TableCell>
            <TableCell>{model.diseaseIds}</TableCell>
            <TableCell>{model.author}</TableCell>
            <TableCell>
              <Link
                to={`/models/${model.modelId}.ipynb`}
                reloadDocument
                className="underline z-10"
              >
                Download
              </Link>
            </TableCell>
            <TableCell>
              <Link
                to={`/models/${model.modelId}.zip`}
                reloadDocument
                className="underline z-10"
              >
                Download
              </Link>
            </TableCell>
            <TableCell>{model.statusTesting}</TableCell>
            <TableCell>
              <Form action="/api/modelRemove" method="post">
                <Button variant="ghost" name="action" value="remove">
                  <input type="hidden" name="modelId" value={model.modelId} />
                  <Trash className="w-4 h-4" />
                </Button>
              </Form>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ModelsTable;
