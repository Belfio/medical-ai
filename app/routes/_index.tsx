import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "Medical AI" },
    {
      name: "description",
      content:
        "A place to discover and share AI models and datasets for medical use",
    },
  ];
};

export default function Index() {
  return (
    <>
      <h1>The Bio-Medical Data and Models Hub</h1>
      <p>We independently evaluate the best models and the best datasets</p>
      <h2 className="mt-8 mb-2">Contribute</h2>
      <div className="flex  gap-2 border-dark  max-w-sm justify-between">
        <Link to="/datasets-add">
          <div className="border-2 rounded-sm p-4 text-center hover:bg-accent transition duration-300 ease-in-out">
            <h3>Add your Dataset</h3>

            <Button className="mt-4">Add your dataset</Button>
          </div>
        </Link>
        <Link to="/model-add">
          <div className="border-2 rounded-sm p-4 text-center hover:bg-accent transition duration-300 ease-in-out">
            <h3>Submit your Model</h3>

            <Button className="mt-4">Add your model</Button>
          </div>
        </Link>
      </div>
      {/* <div className="flex flex-col gap-2 border-dark border-2 rounded-sm p-4 my-4">
        <h2>Latest news</h2>
        <ul>
          <li>
            <Link to="/news/1">News 1</Link>
          </li>
          <li>
            <Link to="/news/2">News 2</Link>
          </li>
        </ul>
      </div> */}
      <h2 className="mt-8 mb-2">Best Authors</h2>
      <div className="flex flex-col gap-2 border-dark border-2 rounded-sm p-4 my-4 max-w-sm">
        <h3>John Doe</h3>
        <p>
          John Doe is a doctor who has contributed to the medical community by
          sharing his knowledge and experience.
        </p>
      </div>
    </>
  );
}
