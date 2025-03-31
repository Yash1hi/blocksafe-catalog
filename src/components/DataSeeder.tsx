
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export function DataSeeder() {
  const [isSeeding, setIsSeeding] = useState(false);
  const queryClient = useQueryClient();
  
  const seedData = async () => {
    setIsSeeding(true);
    try {
      const { data, error } = await supabase.functions.invoke('seed-vulnerabilities');
      
      if (error) {
        throw error;
      }
      
      toast.success(data.message);
      
      // Invalidate queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ['vulnerabilities'] });
      queryClient.invalidateQueries({ queryKey: ['vulnerability-stats'] });
      
    } catch (error) {
      console.error('Error seeding data:', error);
      toast.error(`Failed to seed data: ${error.message || 'Unknown error'}`);
    } finally {
      setIsSeeding(false);
    }
  };
  
  return (
    <Button
      variant="outline"
      size="sm"
      disabled={isSeeding}
      onClick={seedData}
      className="ml-auto"
    >
      {isSeeding ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Seeding Data...
        </>
      ) : (
        "Seed Example Data"
      )}
    </Button>
  );
}
