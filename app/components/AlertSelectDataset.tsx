import { Link } from "@remix-run/react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

export default function AlertSelectDataset({ alert }: { alert: boolean }) {
  return alert ? (
    <Alert className="bg-yellow-50 border-orange-200">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Don&apos;t forget the dataset</AlertTitle>
      <AlertDescription>
        Please note that the model needs to work on at least one dataset to be
        published. Use one of the existing datasets or add a new one{" "}
        <Link to="/datasets-add" className="underline bold">
          here.
        </Link>
      </AlertDescription>
    </Alert>
  ) : (
    <p className="text-sm text-gray-600 mb-2 ">
      Please note that the model needs to work on at least one dataset to be
      published. Use one of the existing datasets or add a new one{" "}
      <Link to="/datasets-add" className="underline font-bold">
        here.
      </Link>
    </p>
  );
}
