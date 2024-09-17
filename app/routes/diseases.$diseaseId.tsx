import { Form, useLoaderData } from "@remix-run/react";
import { diseases } from "~/lib/const";
import db from "~/lib/db";
import { DiseaseType } from "~/lib/types";

export default function Diseases() {
  const diseases = useLoaderData<DiseaseType[]>();
  return (
    <>
      DISEASE
      {diseases.length}
      <Form method="POST">
        <input type="text" name="diseaseId" />
        <button type="submit">Create</button>
      </Form>
    </>
  );
}

const littleScript = async () => {
  const diseaseToCreate: DiseaseType[] = diseases.map((d) => {
    return {
      ...d,
      approved: "true",
      createdAt: new Date().toISOString(),
      diseaseId: d.id.toString(),
      tConst: "metadata",
    };
  });
  console.log("creating diseases");
  diseaseToCreate.forEach(async (disease) => {
    console.log("creating disease", disease);
    await db.disease.create(disease);
  });
};

export const action = async () => {
  await littleScript();
  return null;
};

export const loader = async () => {
  const diseases = await db.disease.getNItems();
  console.log("diseases", diseases);
  // const diseases = [];
  return diseases;
};
