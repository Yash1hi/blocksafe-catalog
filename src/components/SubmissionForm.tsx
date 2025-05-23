
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon, Plus, Trash, Loader2 } from "lucide-react";
import { format, parse } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { VulnerabilityLevel } from "@/lib/data";
import { submitVulnerability } from "@/lib/supabase-service";

const formSchema = z.object({
  name: z.string().min(5, {
    message: "Vulnerability name must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  severity: z.enum(["critical", "high", "medium", "low", "info"] as const),
  discoveryDate: z.date(),
  auditor: z.string().min(2, {
    message: "Auditor name must be at least 2 characters.",
  }),
  status: z.enum(["active", "patched", "mitigated"] as const),
  impact: z.string().min(10, {
    message: "Impact description must be at least 10 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema> & {
  blockchains: string[];
  attackVectors: string[];
  references: string[];
};

export function SubmissionForm() {
  const [blockchains, setBlockchains] = useState<string[]>([""]);
  const [attackVectors, setAttackVectors] = useState<string[]>([""]);
  const [references, setReferences] = useState<string[]>([""]);
  const [dateInputValue, setDateInputValue] = useState<string>("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      severity: "medium" as VulnerabilityLevel,
      discoveryDate: new Date(),
      auditor: "",
      status: "active",
      impact: "",
      blockchains: [""],
      attackVectors: [""],
      references: [""],
    },
  });
  
  const mutation = useMutation({
    mutationFn: (values: FormValues) => {
      const filteredBlockchains = blockchains.filter(b => b.trim() !== "");
      const filteredAttackVectors = attackVectors.filter(a => a.trim() !== "");
      const filteredReferences = references.filter(r => r.trim() !== "");
      
      if (filteredBlockchains.length === 0) {
        throw new Error("Please add at least one blockchain");
      }
      
      if (filteredAttackVectors.length === 0) {
        throw new Error("Please add at least one attack vector");
      }
      
      return submitVulnerability({
        ...values,
        discoveryDate: format(values.discoveryDate, 'yyyy-MM-dd'),
        blockchains: filteredBlockchains,
        attackVectors: filteredAttackVectors,
        references: filteredReferences,
        name: values.name,
        description: values.description,
        severity: values.severity,
        auditor: values.auditor,
        status: values.status,
        impact: values.impact,
      });
    },
    onSuccess: () => {
      toast.success("Vulnerability submitted successfully!");
      
      // Reset form
      form.reset();
      setBlockchains([""]);
      setAttackVectors([""]);
      setReferences([""]);
      setDateInputValue("");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to submit vulnerability.");
    }
  });

  function onSubmit(values: FormValues) {
    mutation.mutate(values);
  }

  const handleAddItem = (listSetter: React.Dispatch<React.SetStateAction<string[]>>, list: string[]) => {
    listSetter([...list, ""]);
  };

  const handleRemoveItem = (
    index: number, 
    listSetter: React.Dispatch<React.SetStateAction<string[]>>, 
    list: string[]
  ) => {
    if (list.length > 1) {
      const newList = [...list];
      newList.splice(index, 1);
      listSetter(newList);
    }
  };

  const handleItemChange = (
    index: number, 
    value: string, 
    listSetter: React.Dispatch<React.SetStateAction<string[]>>, 
    list: string[]
  ) => {
    const newList = [...list];
    newList[index] = value;
    listSetter(newList);
  };

  // Handle manual date input
  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDateInputValue(value);
    
    try {
      // Try to parse the date string (yyyy-MM-dd format)
      if (value && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
        const parsedDate = parse(value, 'yyyy-MM-dd', new Date());
        
        if (!isNaN(parsedDate.getTime())) {
          form.setValue('discoveryDate', parsedDate);
          return;
        }
      }
    } catch (error) {
      // If parsing fails, don't update the form value
      console.log("Invalid date format:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vulnerability Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Reentrancy in ERC-777 Contracts" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="severity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Severity</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Detailed description of the vulnerability..."
                  className="resize-none min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="discoveryDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Discovery Date</FormLabel>
                <div className="flex flex-col space-y-2">
                  <Input
                    type="date"
                    value={dateInputValue || (field.value ? format(field.value, 'yyyy-MM-dd') : '')}
                    onChange={handleDateInputChange}
                    className="mb-2"
                  />
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground mr-2">Or select from calendar:</span>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            size="icon"
                            type="button"
                          >
                            <CalendarIcon className="h-4 w-4" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            if (date) {
                              setDateInputValue(format(date, 'yyyy-MM-dd'));
                            }
                          }}
                          disabled={(date) =>
                            date > new Date() || date < new Date("2000-01-01")
                          }
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="auditor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Auditor</FormLabel>
                <FormControl>
                  <Input placeholder="Security firm or individual" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormItem>
          <FormLabel>Affected Blockchains</FormLabel>
          <div className="space-y-2">
            {blockchains.map((blockchain, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={blockchain}
                  onChange={(e) => handleItemChange(index, e.target.value, setBlockchains, blockchains)}
                  placeholder="e.g., Ethereum, BSC, Polygon"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleRemoveItem(index, setBlockchains, blockchains)}
                  disabled={blockchains.length === 1}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleAddItem(setBlockchains, blockchains)}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Blockchain
            </Button>
          </div>
        </FormItem>

        <FormItem>
          <FormLabel>Attack Vectors</FormLabel>
          <div className="space-y-2">
            {attackVectors.map((vector, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={vector}
                  onChange={(e) => handleItemChange(index, e.target.value, setAttackVectors, attackVectors)}
                  placeholder="e.g., Reentrancy, Flash Loans"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleRemoveItem(index, setAttackVectors, attackVectors)}
                  disabled={attackVectors.length === 1}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleAddItem(setAttackVectors, attackVectors)}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Attack Vector
            </Button>
          </div>
        </FormItem>

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select current status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="patched">Patched</SelectItem>
                  <SelectItem value="mitigated">Mitigated</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="impact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Impact</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the potential impact of this vulnerability..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>References (Optional)</FormLabel>
          <div className="space-y-2">
            {references.map((reference, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={reference}
                  onChange={(e) => handleItemChange(index, e.target.value, setReferences, references)}
                  placeholder="e.g., https://example.com/blog/vulnerability"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleRemoveItem(index, setReferences, references)}
                  disabled={references.length === 1}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleAddItem(setReferences, references)}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Reference
            </Button>
          </div>
        </FormItem>

        <Button 
          type="submit" 
          className="w-full bg-blocksafe-teal text-blocksafe-dark hover:bg-blocksafe-teal/80"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Vulnerability"
          )}
        </Button>
      </form>
    </Form>
  );
}
