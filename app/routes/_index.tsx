import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "Biomed DB" },
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
      <p>Advance the Open Source research.</p>
      <h2 className="mt-8 mb-2">Why 🤔</h2>
      Our goal is to advance science by providing the best platform for sharing
      biomedical data and models.
      <h2 className="mt-8 mb-2">What is it ❓</h2>
      <p>
        We take insipration from Kaggle, where people can submit their models
        and datasets and compete to find the best solution to a problem.
      </p>
      <p>
        <span className="font-bold">biomeddb.com</span> is specifically created
        to focus on biomedical challanges, starting from the most pressing
        diseases.
      </p>
      <h2 className="mt-8 mb-2">How it works ⚙️</h2>
      <ol className="">
        <li>
          <Link
            to="/diseases"
            className="flex gap-2 border-dark  justify-start items-center hover:bg-accent transition duration-300 ease-in-out w-fit p-1 rounded-sm"
          >
            <div className="p-2 px-4 rounded-full  border-2 border-dark flex items-center justify-center">
              <p>1</p>
            </div>
            <Button variant="ghost" className="p-0">
              Choose a disease or a dataset you want to work on (or upload a new
              one).
            </Button>
          </Link>
        </li>
        <li>
          <Link
            to="/models/add"
            className="flex  gap-2 border-dark   justify-start items-center mt-2 hover:bg-accent transition duration-300 ease-in-out w-fit p-1 rounded-sm"
          >
            <div className="p-2 px-4 rounded-full  border-2 border-dark flex items-center justify-center">
              <p>2</p>
            </div>
            <Button variant="ghost" className="p-0">
              Submit a model by linking a github repository.
            </Button>
          </Link>
        </li>
        <li>
          <Link
            to="/leaderboard"
            className="flex  gap-2 border-dark  justify-start items-center mt-2 hover:bg-accent transition duration-300 ease-in-out w-fit p-1 rounded-sm"
          >
            <div className="p-2 px-4 rounded-full  border-2 border-dark flex items-center justify-center">
              <p>3</p>
            </div>
            <Button variant="ghost" className="p-0">
              Get your new model evaluated by the community and join the
              Leaderboard!
            </Button>
          </Link>
        </li>
      </ol>
      <h2 className="mt-8 mb-2">Contribute 🤝</h2>
      <div className="flex  gap-2 border-dark  max-w-sm justify-between">
        <Link to="/datasets/add">
          <div className="border-2 rounded-sm p-4 text-center hover:bg-accent transition duration-300 ease-in-out">
            <h3>Add your Dataset</h3>

            <Button className="mt-4">Add your dataset</Button>
          </div>
        </Link>
        <Link to="/models/add">
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
      <h2 className="mt-8 mb-2">Leaderboard 🏆</h2>
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
