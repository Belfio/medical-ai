import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

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
      <h1>Ciao</h1>
      <h2>Latest Models</h2>
      <ul>
        <li>
          <Link to="/models/1">Model 1</Link>
        </li>
        <li>
          <Link to="/models/2">Model 2</Link>
        </li>
        <li>
          <Link to="/models/3">Model 3</Link>
        </li>
      </ul>
      <h2>Latest Datasets</h2>
      <ul>
        <li>
          <Link to="/datasets/1">Dataset 1</Link>
        </li>
        <li>
          <Link to="/datasets/2">Dataset 2</Link>
        </li>
      </ul>{" "}
    </>
  );
}
