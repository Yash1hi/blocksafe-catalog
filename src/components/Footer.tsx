
import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-blocksafe-teal" />
          <div className="flex flex-col md:flex-row md:gap-1">
            <span className="font-bold text-base text-blocksafe-teal">BlockSafe</span>
            <span className="text-muted-foreground">Catalog</span>
          </div>
        </div>
        <p className="text-center text-sm text-muted-foreground md:text-right">
          &copy; {new Date().getFullYear()} BlockSafe Catalog. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
