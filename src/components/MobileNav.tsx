
import { useState } from "react";
import { Link } from "react-router-dom";
import { Database, Menu, Search, Shield, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <div className="flex items-center justify-between border-b border-border/40 pb-4">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-blocksafe-teal" />
            <span className="font-bold text-lg text-blocksafe-teal">BlockSafe</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <nav className="flex flex-col gap-4 mt-4">
          <Link
            to="/"
            className="flex py-2 text-lg transition-colors hover:text-blocksafe-teal"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/vulnerabilities"
            className="flex py-2 text-lg transition-colors hover:text-blocksafe-teal"
            onClick={() => setOpen(false)}
          >
            Vulnerabilities
          </Link>
          <Link
            to="/submit"
            className="flex py-2 text-lg transition-colors hover:text-blocksafe-teal"
            onClick={() => setOpen(false)}
          >
            Submit
          </Link>
          <Link
            to="/about"
            className="flex py-2 text-lg transition-colors hover:text-blocksafe-teal"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
        </nav>
        <div className="mt-auto grid gap-2 pt-6">
          <Button variant="outline" className="w-full justify-start gap-2">
            <Search className="h-4 w-4" />
            Search
          </Button>
          <Button variant="default" className="w-full justify-start gap-2 bg-blocksafe-teal text-blocksafe-dark hover:bg-blocksafe-teal/80">
            <Database className="h-4 w-4" />
            Connect
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
