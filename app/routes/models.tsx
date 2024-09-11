import { Link, Outlet, useParams } from "@remix-run/react";
import { ModelsFilters } from "~/components/ModelsFilters";

export default function Models() {
  const { modelId } = useParams();

  return (
    <>
      {modelId ? (
        <Outlet />
      ) : (
        <>
          <ModelsFilters />
          <div className="pt-8">
            No model selected <br />
            <Link to="/models/poba">Go to POBA</Link>
          </div>
        </>
      )}
    </>
  );
}
