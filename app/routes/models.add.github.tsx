import { Form, useActionData, useFetcher } from "@remix-run/react";

import { Button } from "~/components/ui/button";

import { Input } from "~/components/ui/input";
import { ActionFunctionArgs } from "@remix-run/node";
import { getRepoInfo } from "~/server/github.server";
import { useContext, useEffect } from "react";
import {
  GithubContext,
  GithubInfo,
} from "~/components/providers/GithubProvider";

export default function ModelAdd() {
  const data = useActionData<typeof action>() as {
    message: string;
    repoInfo: GithubInfo;
  };
  const { setGithubInfo } = useContext(GithubContext);
  const fetcher = useFetcher();
  useEffect(() => {
    if (data?.repoInfo) {
      setGithubInfo(data.repoInfo);
    }
  }, [data?.repoInfo, setGithubInfo]);
  const cta = () => {
    if (data?.message === "error") {
      return "Retry";
    }
    if (data?.repoInfo?.name) {
      return "Checked";
    }
    return "Check";
  };
  return (
    <Form method="post" action="/models/add/github">
      <div className="flex  gap-2">
        <Input type="text" name="githubUrl" placeholder="Github URL" />
        <Button
          type="submit"
          name="action"
          value="github"
          className={`${
            data?.message === "error" && "bg-red-500 hover:bg-red-600"
          } ${data?.repoInfo?.name && "bg-green-500 hover:bg-green-600"}`}
          disabled={fetcher.state === "submitting"}
        >
          {cta()}
        </Button>
      </div>
    </Form>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const githubUrl = formData.get("githubUrl");
  console.log("githubUrl inside!!", githubUrl);
  const repoInfo = await getRepoInfo(githubUrl as string);
  if (!repoInfo) {
    return {
      message: "error",
      repoInfo: null,
    };
  }
  console.log("repoInfo", repoInfo);
  return {
    message: "success",
    repoInfo: {
      name: repoInfo.name,
      description: repoInfo.description,
      language: repoInfo.language,
      author: repoInfo.owner.login,
      website: repoInfo.html_url,
    },
  };
};
