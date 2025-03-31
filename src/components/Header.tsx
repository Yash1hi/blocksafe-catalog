
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Database, Search, Shield } from "lucide-react";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-blocksafe-teal" />
          <Link to="/" className="flex items-center">
            <span className="font-bold text-xl text-blocksafe-teal">BlockSafe</span>
            <span className="ml-1 text-lg text-foreground/80">Catalog</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6 text-sm">
            <Link
              to="/"
              className="transition-colors hover:text-blocksafe-teal"
            >
              Dashboard
            </Link>
            <Link
              to="/vulnerabilities"
              className="transition-colors hover:text-blocksafe-teal"
            >
              Vulnerabilities
            </Link>
            <Link
              to="/submit"
              className="transition-colors hover:text-blocksafe-teal"
            >
              Submit
            </Link>
            <Link
              to="/about"
              className="transition-colors hover:text-blocksafe-teal"
            >
              About
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Search className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only">Search</span>
            </Button>
            <Button variant="default" size="sm" className="gap-1 bg-blocksafe-teal text-blocksafe-dark hover:bg-blocksafe-teal/80">
              <Database className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only">Connect</span>
            </Button>
          </div>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
