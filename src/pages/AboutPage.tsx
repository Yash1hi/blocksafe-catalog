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
                BlockSafe Catalog is a comprehensive database of blockchain vulnerabilities developed as a final project
                for CSCI 4240: Introduction to Blockchain at the University of Colorado Boulder. Created by Yash Thapliyal
                and Kelly McVeigh, undergraduate students in Computer Science, this project aims to provide a centralized
                resource for understanding and learning about blockchain security vulnerabilities.
              </p>
              
              <div className="grid gap-6 mt-12 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <Shield className="h-5 w-5 mr-2 text-blocksafe-teal" />
                      Project Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      As part of our blockchain education journey, we developed BlockSafe Catalog to document
                      and categorize known vulnerabilities in blockchain networks and smart contracts. This project
                      serves as both a learning resource and a practical application of blockchain security concepts
                      covered in CSCI 4240.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <AlertTriangle className="h-5 w-5 mr-2 text-blocksafe-warning" />
                      Educational Value
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Understanding blockchain vulnerabilities is crucial for developing secure applications.
                      Through this project, we aim to help fellow students and developers learn from past
                      security incidents and implement better security practices in their blockchain applications.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <h2 className="text-2xl font-bold mt-12 mb-6">Project Features</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blocksafe-light rounded-full p-2 mt-1">
                    <Database className="h-5 w-5 text-blocksafe-teal" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Vulnerability Database</h3>
                    <p className="text-muted-foreground">
                      Our database includes detailed information about various blockchain vulnerabilities,
                      including their severity, discovery dates, affected platforms, and potential mitigation
                      strategies. Each entry is carefully researched and documented to serve as a learning resource.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blocksafe-light rounded-full p-2 mt-1">
                    <Users className="h-5 w-5 text-blocksafe-teal" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Academic Collaboration</h3>
                    <p className="text-muted-foreground">
                      This project was developed as a collaborative effort between two undergraduate students
                      at CU Boulder, combining our knowledge of blockchain technology, security, and web development
                      to create a valuable resource for the blockchain community.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-border my-12"></div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact</h2>
                <p className="text-muted-foreground">
                  For questions about this project or to learn more about our work, please reach out to us at
                  <span className="text-blocksafe-teal"> yash.thapliyal@colorado.edu</span> or
                  <span className="text-blocksafe-teal"> kelly.mcveigh@colorado.edu</span>
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
