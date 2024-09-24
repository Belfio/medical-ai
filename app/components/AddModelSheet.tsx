import { useContext } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { SheetContext } from "./providers/SheetProvider";

export default function AddModelSheet() {
  const { modelSheetOpen, setModelSheetOpen } = useContext(SheetContext);

  return (
    <Sheet open={modelSheetOpen} onOpenChange={setModelSheetOpen}>
      <SheetTrigger className="px-6">Open</SheetTrigger>
      <SheetContent className="w-1/2">
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
