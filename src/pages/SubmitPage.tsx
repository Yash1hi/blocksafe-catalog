
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SubmissionForm } from "@/components/SubmissionForm";

const SubmitPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6 max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Submit a Vulnerability</h1>
          <p className="text-muted-foreground mb-8">
            Help improve blockchain security by submitting details about vulnerabilities you've discovered or researched.
          </p>
          
          <SubmissionForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubmitPage;
