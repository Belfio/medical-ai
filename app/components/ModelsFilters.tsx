import { Button } from "./ui/button";

export function ModelsFilters() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-medium">Filters</h2>
        <div className="flex gap-1 items-center">
          <h3 className="text-sm font-medium pr-4">Data type</h3>
          <Button>Imaging</Button>
          <Button>Text</Button>
          <Button>Audio</Button>
          <Button>Video</Button>
          <Button>Signal</Button>
          <Button>Multimodal</Button>
        </div>
        <div className="flex gap-1 items-center">
          <h3 className="text-sm font-medium pr-4">Body part</h3>
          <Button>Skin</Button>
          <Button>Liver</Button>
          <Button>Brain</Button>
          <Button>Heart</Button>
          <Button>Lung</Button>
          <Button>Kidney</Button>
          <Button>Muscle</Button>
          <Button>Eye</Button>
          <Button>Other</Button>
        </div>

        <div className="flex gap-1 items-center">
          <h3 className="text-sm font-medium pr-7">Disease</h3>
          <Button>Cancer</Button>
          <Button>Sleep problem</Button>
          <Button>Digestion</Button>
          <Button>Sight</Button>
          <Button>Gait</Button>
          <Button>Brain injuries</Button>
          <Button>Other</Button>
        </div>
      </div>
    </div>
  );
}
