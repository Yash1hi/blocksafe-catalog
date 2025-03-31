
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VulnerabilityCard } from "@/components/VulnerabilityCard";
import { VulnerabilitySearchBar } from "@/components/VulnerabilitySearchBar";
import { VulnerabilityFilter } from "@/components/VulnerabilityFilter";
import { Vulnerability, VulnerabilityLevel } from "@/lib/data";
import { fetchVulnerabilities } from "@/lib/supabase-service";
import { Loader2 } from "lucide-react";
import { DataSeeder } from "@/components/DataSeeder";

const Vulnerabilities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<VulnerabilityLevel | "all">("all");
  const [selectedBlockchain, setSelectedBlockchain] = useState<string | null>(null);
  const [filteredVulnerabilities, setFilteredVulnerabilities] = useState<Vulnerability[]>([]);

  // Fetch vulnerabilities using React Query
  const { data: vulnerabilities, isLoading, error } = useQuery({
    queryKey: ['vulnerabilities'],
    queryFn: fetchVulnerabilities
  });

  // Get unique blockchains from vulnerabilities data
  const uniqueBlockchains = vulnerabilities
    ? Array.from(
        new Set(
          vulnerabilities.flatMap(vuln => vuln.blockchains)
        )
      ).sort()
    : [];

  useEffect(() => {
    if (!vulnerabilities) return;
    
    let filtered = [...vulnerabilities];

    // Filter by search term
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        vuln => 
          vuln.name.toLowerCase().includes(lowerSearchTerm) ||
          vuln.id.toLowerCase().includes(lowerSearchTerm) ||
          vuln.description.toLowerCase().includes(lowerSearchTerm)
      );
    }

    // Filter by severity
    if (selectedSeverity !== "all") {
      filtered = filtered.filter(vuln => vuln.severity === selectedSeverity);
    }

    // Filter by blockchain
    if (selectedBlockchain) {
      filtered = filtered.filter(vuln => 
        vuln.blockchains.includes(selectedBlockchain)
      );
    }

    setFilteredVulnerabilities(filtered);
  }, [searchTerm, selectedSeverity, selectedBlockchain, vulnerabilities]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2 sm:mb-0">Blockchain Vulnerabilities</h1>
            <DataSeeder />
          </div>

          <VulnerabilitySearchBar onSearch={setSearchTerm} />
          
          <VulnerabilityFilter 
            selectedSeverity={selectedSeverity}
            setSelectedSeverity={setSelectedSeverity}
            selectedBlockchain={selectedBlockchain}
            setSelectedBlockchain={setSelectedBlockchain}
            blockchains={uniqueBlockchains}
          />

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blocksafe-teal" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-lg text-blocksafe-danger mb-2">Error loading vulnerabilities.</p>
              <p className="text-sm text-muted-foreground">Please try again later.</p>
            </div>
          ) : filteredVulnerabilities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filteredVulnerabilities.map((vulnerability) => (
                <VulnerabilityCard
                  key={vulnerability.id}
                  vulnerability={vulnerability}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-lg text-muted-foreground mb-2">No vulnerabilities found matching your criteria.</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Vulnerabilities;
