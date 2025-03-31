
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DashboardStats } from "@/components/DashboardStats";
import { SeverityChart } from "@/components/SeverityChart";
import { BlockchainDistribution } from "@/components/BlockchainDistribution";
import { AuditorTable } from "@/components/AuditorTable";
import { RecentVulnerabilities } from "@/components/RecentVulnerabilities";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AlertTriangle, Database, Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 bg-blocksafe-dark">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="space-y-2">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-full bg-blocksafe-teal/20 animate-pulse-subtle blur-lg"></div>
                    <Shield className="relative h-16 w-16 text-blocksafe-teal" />
                  </div>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blocksafe-teal">
                  BlockSafe Catalog
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  A comprehensive database of blockchain vulnerabilities and exploits,
                  helping developers and security researchers build safer blockchain applications.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/vulnerabilities">
                  <Button className="bg-blocksafe-teal text-blocksafe-dark hover:bg-blocksafe-teal/80">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Explore Vulnerabilities
                  </Button>
                </Link>
                <Link to="/submit">
                  <Button variant="outline">
                    <Database className="mr-2 h-4 w-4" />
                    Submit New Entry
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight mb-8">Vulnerability Overview</h2>
            <DashboardStats />
            
            <div className="grid gap-6 mt-8 md:grid-cols-3">
              <SeverityChart />
              <BlockchainDistribution />
            </div>
            
            <div className="grid gap-6 mt-8 md:grid-cols-4">
              <AuditorTable />
              <RecentVulnerabilities />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
