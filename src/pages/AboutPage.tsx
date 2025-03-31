
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, Database, Users } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight mb-6">About BlockSafe Catalog</h1>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-8 text-lg">
                BlockSafe Catalog is a comprehensive, human-readable database of known vulnerabilities
                and exploits in blockchain networks and smart contracts. Our mission is to provide
                security researchers, developers, and organizations with centralized, accurate information
                to improve the overall security of blockchain applications.
              </p>
              
              <div className="grid gap-6 mt-12 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <Shield className="h-5 w-5 mr-2 text-blocksafe-teal" />
                      Our Mission
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      To create a trusted resource that documents and categorizes blockchain
                      vulnerabilities, making security knowledge more accessible to the broader
                      blockchain community. We believe that open information sharing is critical
                      to preventing future exploits and improving ecosystem security.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <AlertTriangle className="h-5 w-5 mr-2 text-blocksafe-warning" />
                      Why It Matters
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Billions of dollars have been lost to blockchain hacks and exploits.
                      Many of these incidents leverage the same vulnerabilities repeatedly.
                      By documenting these issues, we help developers avoid common pitfalls
                      and encourage better security practices throughout the industry.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <h2 className="text-2xl font-bold mt-12 mb-6">How It Works</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blocksafe-light rounded-full p-2 mt-1">
                    <Database className="h-5 w-5 text-blocksafe-teal" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Comprehensive Cataloging</h3>
                    <p className="text-muted-foreground">
                      We maintain detailed records of vulnerabilities, including severity ratings,
                      discovery dates, affected blockchains, exploit techniques, and remediation strategies.
                      Each entry is thoroughly researched and verified before publication.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blocksafe-light rounded-full p-2 mt-1">
                    <Users className="h-5 w-5 text-blocksafe-teal" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Community Contributions</h3>
                    <p className="text-muted-foreground">
                      BlockSafe Catalog is a collaborative effort. Security researchers, auditors, and
                      blockchain developers can submit new vulnerabilities or update existing entries.
                      All submissions undergo a review process to ensure accuracy and completeness.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-border my-12"></div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
                <p className="text-muted-foreground">
                  Have questions, suggestions, or want to contribute to the BlockSafe Catalog?
                  Reach out to us at <span className="text-blocksafe-teal">contact@blocksafe-catalog.com</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
