import { useParams } from "@remix-run/react";

export default function UserProfile() {
  const { userId } = useParams();

  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">User: {userId}</h1>
      <p>Details about the user will go here.</p>
    </div>
  );
}
