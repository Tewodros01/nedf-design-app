import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

type MenuItemProps = {
  label: string;
  url?: string;
};

export function MenuItem({ label, url }: MenuItemProps) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link
          href={url ?? "/"}
          className={cn([navigationMenuTriggerStyle(), "font-normal px-3"])}
        >
          {label}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
