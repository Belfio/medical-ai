// app/components/Models/ModelCard.jsx

import { ExternalLink, Link } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader } from "./ui/card";
import { Model } from "~/lib/types";

export default function ModelCard({ model }: { model: Model }) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <h3 className="text-xl font-semibold">{model.name}</h3>
      </CardHeader>
      <CardDescription className="flex-grow">
        <p className="text-gray-700">{model.description}</p>
      </CardDescription>
      <CardFooter className="flex justify-between items-center">
        <span className="text-sm text-gray-500">By {model.author}</span>
        <Link
          to={`/models/${model.id}`}
          className="flex items-center text-blue-600 hover:text-blue-700"
          aria-label={`View details for ${model.name}`}
        >
          <ExternalLink className="w-5 h-5 mr-1" />
          <span>View</span>
        </Link>
      </CardFooter>
    </Card>
  );
}
