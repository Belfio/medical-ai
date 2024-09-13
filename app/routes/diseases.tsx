import { categories, diseases } from "~/lib/const";

export default function DiseasesPage() {
  return (
    <div>
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
