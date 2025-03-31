
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.20.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const vulnerabilitiesData = [
      {
        id: "BSC-2023-001",
        name: "Reentrancy in ERC-777 Token Contracts",
        description: "A reentrancy vulnerability in ERC-777 token contracts that allows attackers to drain funds by recursively calling the token contract before the balance is updated.",
        severity: "critical",
        blockchains: ["Ethereum", "BSC", "Polygon"],
        discovery_date: "2023-02-15",
        auditor: "OpenZeppelin",
        attack_vectors: ["Reentrancy", "Flash Loans"],
        status: "active",
        reference_links: [
          "https://medium.com/coinmonks/protect-your-solidity-smart-contracts-from-reentrancy-attacks-9972c3af7c21",
          "https://consensys.github.io/smart-contract-best-practices/attacks/reentrancy/"
        ],
        impact: "Critical - Complete draining of contract funds",
        exploit_code: "function attack() external {\n  // Call vulnerable function\n  vulnerableContract.withdraw();\n}",
        mitigation: "Implement checks-effects-interactions pattern and use ReentrancyGuard."
      },
      {
        id: "BSC-2023-002",
        name: "Integer Overflow in Balance Calculation",
        description: "An integer overflow vulnerability in balance calculation allows attackers to artificially increase their token balances.",
        severity: "high",
        blockchains: ["BSC", "Ethereum"],
        discovery_date: "2023-03-10",
        auditor: "CertiK",
        attack_vectors: ["Integer Overflow", "Balance Manipulation"],
        status: "mitigated",
        reference_links: [
          "https://consensys.github.io/smart-contract-best-practices/attacks/overflow-underflow/",
          "https://medium.com/coinmonks/understanding-integer-overflow-underflow-in-solidity-8382539ed8c9"
        ],
        impact: "High - Potential creation of tokens from nowhere",
        mitigation: "Use SafeMath library or Solidity 0.8.x built-in overflow checks."
      },
      {
        id: "BSC-2023-003",
        name: "Access Control Issue in Proxy Contracts",
        description: "Inadequate access control in proxy contracts allows unauthorized users to modify contract logic or execute privileged functions.",
        severity: "critical",
        blockchains: ["Ethereum", "Arbitrum", "Optimism"],
        discovery_date: "2023-01-22",
        auditor: "Trail of Bits",
        attack_vectors: ["Proxy Manipulation", "Delegate Call", "Storage Collision"],
        status: "patched",
        reference_links: [
          "https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/",
          "https://docs.openzeppelin.com/upgrades-plugins/1.x/proxies"
        ],
        impact: "Critical - Complete contract takeover",
        mitigation: "Use OpenZeppelin's Transparent or UUPS proxy patterns with proper access controls."
      },
      // Adding a few more sample vulnerabilities
      {
        id: "BSC-2023-004",
        name: "Flash Loan Attack on Price Oracle",
        description: "Price oracle manipulation using flash loans to artificially change asset prices, enabling attackers to drain funds from lending protocols.",
        severity: "critical",
        blockchains: ["Ethereum", "BSC", "Avalanche"],
        discovery_date: "2023-04-05",
        auditor: "Halborn",
        attack_vectors: ["Flash Loans", "Oracle Manipulation", "Arbitrage"],
        status: "active",
        reference_links: [
          "https://halborn.com/understanding-the-flash-loan-attack-on-harvest-finance/",
          "https://medium.com/coinmonks/defi-security-lecture-5-flash-loan-attacks-68e5160dcfd6"
        ],
        impact: "Critical - Protocol insolvency and asset theft",
        mitigation: "Use time-weighted average price (TWAP) oracles and multiple price sources."
      },
      {
        id: "BSC-2023-005",
        name: "Unchecked Call Return Value",
        description: "Failure to check return values from external calls can lead to silent failures and unexpected contract behavior.",
        severity: "medium",
        blockchains: ["Ethereum", "Polygon"],
        discovery_date: "2023-05-13",
        auditor: "ConsenSys Diligence",
        attack_vectors: ["Failed Transfers", "External Call Manipulation"],
        status: "patched",
        reference_links: [
          "https://consensys.github.io/smart-contract-best-practices/development-recommendations/general/external-calls/",
          "https://blog.sigmaprime.io/solidity-security.html#unchecked-calls"
        ],
        impact: "Medium - Potential loss of funds or function failure",
        mitigation: "Always check return values of low-level calls or use require statements."
      },
    ];

    // Check if the database already has records to avoid duplicate inserts
    const { count, error: countError } = await supabaseClient
      .from('vulnerabilities')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      throw countError;
    }
    
    // Only seed if the database is empty
    if (count === 0) {
      const { error } = await supabaseClient
        .from('vulnerabilities')
        .insert(vulnerabilitiesData);
      
      if (error) {
        throw error;
      }
      
      return new Response(
        JSON.stringify({ success: true, message: 'Vulnerabilities seeded successfully', count: vulnerabilitiesData.length }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({ success: true, message: 'Database already has vulnerabilities, skipping seed', count }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error seeding vulnerabilities:', error);
    
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
