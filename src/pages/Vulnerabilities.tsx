
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VulnerabilityCard } from "@/components/VulnerabilityCard";
import { VulnerabilitySearchBar } from "@/components/VulnerabilitySearchBar";
import { VulnerabilityFilter } from "@/components/VulnerabilityFilter";
import { Vulnerability, VulnerabilityLevel, vulnerabilitiesData } from "@/lib/data";

const Vulnerabilities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<VulnerabilityLevel | "all">("all");
  const [selectedBlockchain, setSelectedBlockchain] = useState<string | null>(null);
  const [filteredVulnerabilities, setFilteredVulnerabilities] = useState<Vulnerability[]>([]);

  // Get unique blockchains from vulnerabilities data
  const uniqueBlockchains = Array.from(
    new Set(
      vulnerabilitiesData.flatMap(vuln => vuln.blockchains)
    )
  ).sort();

  useEffect(() => {
    let filtered = [...vulnerabilitiesData];

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
  }, [searchTerm, selectedSeverity, selectedBlockchain]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tight mb-8">Blockchain Vulnerabilities</h1>

          <VulnerabilitySearchBar onSearch={setSearchTerm} />
          
          <VulnerabilityFilter 
            selectedSeverity={selectedSeverity}
            setSelectedSeverity={setSelectedSeverity}
            selectedBlockchain={selectedBlockchain}
            setSelectedBlockchain={setSelectedBlockchain}
            blockchains={uniqueBlockchains}
          />

          {filteredVulnerabilities.length > 0 ? (
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
