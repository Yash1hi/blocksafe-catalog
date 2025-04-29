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
