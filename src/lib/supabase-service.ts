
import { supabase } from "@/integrations/supabase/client";
import type { Vulnerability, VulnerabilityLevel } from "@/lib/data";

// Type definition based on our database schema
export type DbVulnerability = {
  id: string;
  name: string;
  description: string;
  severity: VulnerabilityLevel;
  blockchains: string[];
  discovery_date: string;
  auditor: string;
  attack_vectors: string[];
  status: 'active' | 'patched' | 'mitigated';
  reference_links: string[];
  impact: string;
  exploit_code?: string;
  mitigation?: string;
};

// Database table name
const TABLE_NAME = 'vulnerabilities';

// Fetch all vulnerabilities
export async function fetchVulnerabilities(): Promise<Vulnerability[]> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*');

  if (error) {
    console.error('Error fetching vulnerabilities:', error);
    throw error;
  }

  // Transform the data from database format to our application format
  return (data || []).map((item: DbVulnerability) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    severity: item.severity,
    blockchains: item.blockchains,
    discoveryDate: item.discovery_date,
    auditor: item.auditor,
    attackVectors: item.attack_vectors,
    status: item.status,
    references: item.reference_links || [],
    impact: item.impact,
    exploitCode: item.exploit_code,
    mitigation: item.mitigation
  }));
}

// Fetch a single vulnerability by ID
export async function fetchVulnerabilityById(id: string): Promise<Vulnerability | null> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // PGRST116 means no rows returned, i.e., vulnerability not found
      return null;
    }
    console.error(`Error fetching vulnerability with ID ${id}:`, error);
    throw error;
  }

  if (!data) return null;

  // Transform the data from database format to our application format
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    severity: data.severity,
    blockchains: data.blockchains,
    discoveryDate: data.discovery_date,
    auditor: data.auditor,
    attackVectors: data.attack_vectors,
    status: data.status,
    references: data.reference_links || [],
    impact: data.impact,
    exploitCode: data.exploit_code,
    mitigation: data.mitigation
  };
}

// Insert a new vulnerability
export async function submitVulnerability(vulnerability: Omit<Vulnerability, 'id'>): Promise<Vulnerability> {
  // Create a new ID for the vulnerability (format: BSC-YYYY-NNN)
  const date = new Date();
  const year = date.getFullYear();
  
  // Get count of vulnerabilities to determine the next ID
  const { count, error: countError } = await supabase
    .from(TABLE_NAME)
    .select('*', { count: 'exact', head: true });
  
  if (countError) {
    console.error('Error counting vulnerabilities:', countError);
    throw countError;
  }
  
  // Create ID with sequential number
  const nextNum = (count || 0) + 1;
  const id = `BSC-${year}-${nextNum.toString().padStart(3, '0')}`;
  
  // Prepare the data for insertion
  const dbVulnerability = {
    id,
    name: vulnerability.name,
    description: vulnerability.description,
    severity: vulnerability.severity,
    blockchains: vulnerability.blockchains,
    discovery_date: vulnerability.discoveryDate,
    auditor: vulnerability.auditor,
    attack_vectors: vulnerability.attackVectors,
    status: vulnerability.status,
    reference_links: vulnerability.references,
    impact: vulnerability.impact,
    exploit_code: vulnerability.exploitCode,
    mitigation: vulnerability.mitigation
  };
  
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert(dbVulnerability)
    .select()
    .single();
  
  if (error) {
    console.error('Error submitting vulnerability:', error);
    throw error;
  }
  
  if (!data) {
    throw new Error('No data returned from insertion');
  }
  
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    severity: data.severity,
    blockchains: data.blockchains,
    discoveryDate: data.discovery_date,
    auditor: data.auditor,
    attackVectors: data.attack_vectors,
    status: data.status,
    references: data.reference_links || [],
    impact: data.impact,
    exploitCode: data.exploit_code,
    mitigation: data.mitigation
  };
}

// Calculate statistics from vulnerabilities
export async function calculateStatsFromDb(): Promise<{
  total: number;
  bySeverity: Record<VulnerabilityLevel, number>;
  byBlockchain: Record<string, number>;
  byAuditor: Record<string, number>;
  recentCount: number;
  patchedCount: number;
}> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*');

  if (error) {
    console.error('Error fetching vulnerabilities for stats:', error);
    throw error;
  }

  const vulnerabilities = data || [];
  
  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(now.getDate() - 30);

  const stats = {
    total: vulnerabilities.length,
    bySeverity: {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      info: 0
    } as Record<VulnerabilityLevel, number>,
    byBlockchain: {} as Record<string, number>,
    byAuditor: {} as Record<string, number>,
    recentCount: 0,
    patchedCount: 0
  };

  vulnerabilities.forEach((vuln: DbVulnerability) => {
    // Count by severity
    if (stats.bySeverity[vuln.severity as VulnerabilityLevel] !== undefined) {
      stats.bySeverity[vuln.severity as VulnerabilityLevel]++;
    }

    // Count by blockchain
    if (vuln.blockchains) {
      vuln.blockchains.forEach(chain => {
        if (!stats.byBlockchain[chain]) {
          stats.byBlockchain[chain] = 0;
        }
        stats.byBlockchain[chain]++;
      });
    }

    // Count by auditor
    if (vuln.auditor) {
      if (!stats.byAuditor[vuln.auditor]) {
        stats.byAuditor[vuln.auditor] = 0;
      }
      stats.byAuditor[vuln.auditor]++;
    }

    // Count recent vulnerabilities
    const discoveryDate = new Date(vuln.discovery_date);
    if (discoveryDate >= thirtyDaysAgo) {
      stats.recentCount++;
    }

    // Count patched vulnerabilities
    if (vuln.status === 'patched') {
      stats.patchedCount++;
    }
  });

  return stats;
}
