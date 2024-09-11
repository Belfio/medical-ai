import { LucideIcon } from "lucide-react";

import { cn } from "~/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Link, useLocation } from "@remix-run/react";
import { buttonVariants } from "./ui/button";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  const url = useLocation();
  const path = url.pathname;
  console.log(path);
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 border-r border-muted dark:border-muted"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  prefetch="intent"
                  to={link.url}
                  className={cn(
                    buttonVariants({
                      variant: link.url === path ? "default" : "ghost",
                      size: "icon",
                    }),
                    "h-9 w-9",
                    link.url === path &&
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              to={link.url}
              prefetch="intent"
              className={cn(
                buttonVariants({
                  variant: link.url === path ? "default" : "ghost",
                  size: "icon",
                }),
                link.url === path &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                "justify-start w-full p-4"
              )}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
            </Link>
          )
        )}
      </nav>
    </div>
  );
}
