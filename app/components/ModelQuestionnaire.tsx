import { categories, dataTypes, bodyParts } from "~/lib/const";
import { DatasetType, DiseaseType } from "~/lib/types";
import { getCategoryName } from "~/lib/utils";

import { MultiSelectorComplete } from "./ui/multicombo";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { useState } from "react";

export default function ModelQuestionnaire() {
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
          required
        />
        {/* Description */}
        <Textarea
          name="description"
          placeholder="Description"
          className="resize-none"
          required
        />
        {/* Author */}
        <Input
          className=""
          type="text"
          name="author"
          placeholder="Author"
          required
        />
        {/* Website */}
        <Input
          className=""
          type="text"
          name="website"
          placeholder="Website (optional)"
        />
      </div>
    </div>
  );
}
