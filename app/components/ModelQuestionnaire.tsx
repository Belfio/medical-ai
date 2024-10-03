import { categories, dataTypes, bodyParts } from "~/lib/const";
import { DatasetType, DiseaseType } from "~/lib/types";
import { getCategoryName } from "~/lib/utils";

import { MultiSelectorComplete } from "./ui/multicombo";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { useState } from "react";
import { GithubInfo } from "./providers/GithubProvider";

export default function ModelQuestionnaire({
  githubInfo,
}: {
  githubInfo?: GithubInfo;
}) {
  return (
    <div>
      <div className="flex flex-col gap-4">
        {" "}
        {/* Name */}
        <Input
          className=""
          type="text"
          name="name"
          placeholder="Name"
          defaultValue={githubInfo?.name}
          required
        />
        {/* Description */}
        <Textarea
          name="description"
          placeholder="Description"
          className="resize-none"
          defaultValue={githubInfo?.description}
          required
        />
        {/* Author */}
        <Input
          className=""
          type="text"
          name="author"
          placeholder="Author"
          defaultValue={githubInfo?.author}
          required
        />
        {/* Website */}
        <Input
          className=""
          type="text"
          name="website"
          placeholder="Website (optional)"
          defaultValue={githubInfo?.website}
        />
      </div>
    </div>
  );
}
