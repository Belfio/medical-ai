import { Link } from "@remix-run/react";

export default function DiseasesPage() {
  return (
    <div>
      <div className="mt-8 flex gap-4">
        <h2 className="text-2xl font-semibold mb-4">Available Models</h2>
        <Link to="/model-add">
          <Button>Add dataset</Button>
        </Link>
      </div>
      Diseases
      <div className="flex flex-col gap-4">
        {diseases.map((disease) => (
          <div key={disease.id}>
            <h2>{disease.name}</h2>
            <p>{disease.description}</p>
          </div>
        ))}
        {categories.map((category) => (
          <div key={category.ICDCode}>
            <h2>
              {category.ICDCode} - {category.categoryName}
            </h2>
            <p>{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
