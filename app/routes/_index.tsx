import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "Medical AI" },
    {
      name: "description",
      content:
        "A place to discover and share datasets and models for biomedical use",
    },
  ];
};

export default function Index() {
  return (
    <>
      <h1>BioMedical Database</h1>
      <p>Find datasets and the best models.</p>
      <h2 className="mt-8 mb-2">Why</h2>
      Our goal is to advance science by providing the best platform for
      biomedical data and models.
      <h2 className="mt-8 mb-2">What is it.</h2>
      <p>
        We take insipration from Kaggle, where people can submit their models
        and datasets and compete to find the best solution to a problem.
      </p>
      <p>
        biomeddb.com is specifically created to focus on biomedil challanges.
      </p>
      <p>
        In this platform we promote the constant creation of new algorithms and
        models to recognise biological markers. Quality data and algorithms are
        key to progress.
      </p>
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
