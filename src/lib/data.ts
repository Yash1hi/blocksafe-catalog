
export type VulnerabilityLevel = 'critical' | 'high' | 'medium' | 'low' | 'info';

export interface Vulnerability {
  id: string;
  name: string;
  description: string;
  severity: VulnerabilityLevel;
  blockchains: string[];
  discoveryDate: string;
  auditor: string;
  attackVectors: string[];
  status: 'active' | 'patched' | 'mitigated';
  references: string[];
  impact: string;
  exploitCode?: string;
  mitigation?: string;
}

export interface StatsData {
  total: number;
  bySeverity: Record<VulnerabilityLevel, number>;
  byBlockchain: Record<string, number>;
  byAuditor: Record<string, number>;
  recentCount: number;
  patchedCount: number;
}

export const vulnerabilitiesData: Vulnerability[] = [
  {
    id: "BSC-2023-001",
    name: "Reentrancy in ERC-777 Token Contracts",
    description: "A reentrancy vulnerability in ERC-777 token contracts that allows attackers to drain funds by recursively calling the token contract before the balance is updated.",
    severity: "critical",
    blockchains: ["Ethereum", "BSC", "Polygon"],
    discoveryDate: "2023-02-15",
    auditor: "OpenZeppelin",
    attackVectors: ["Reentrancy", "Flash Loans"],
    status: "active",
    references: [
      "https://medium.com/coinmonks/protect-your-solidity-smart-contracts-from-reentrancy-attacks-9972c3af7c21",
      "https://consensys.github.io/smart-contract-best-practices/attacks/reentrancy/"
    ],
    impact: "Critical - Complete draining of contract funds",
    exploitCode: "function attack() external {\n  // Call vulnerable function\n  vulnerableContract.withdraw();\n}",
    mitigation: "Implement checks-effects-interactions pattern and use ReentrancyGuard."
  },
  {
    id: "BSC-2023-002",
    name: "Integer Overflow in Balance Calculation",
    description: "An integer overflow vulnerability in balance calculation allows attackers to artificially increase their token balances.",
    severity: "high",
    blockchains: ["BSC", "Ethereum"],
    discoveryDate: "2023-03-10",
    auditor: "CertiK",
    attackVectors: ["Integer Overflow", "Balance Manipulation"],
    status: "mitigated",
    references: [
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
    discoveryDate: "2023-01-22",
    auditor: "Trail of Bits",
    attackVectors: ["Proxy Manipulation", "Delegate Call", "Storage Collision"],
    status: "patched",
    references: [
      "https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/",
      "https://docs.openzeppelin.com/upgrades-plugins/1.x/proxies"
    ],
    impact: "Critical - Complete contract takeover",
    mitigation: "Use OpenZeppelin's Transparent or UUPS proxy patterns with proper access controls."
  },
  {
    id: "BSC-2023-004",
    name: "Flash Loan Attack on Price Oracle",
    description: "Price oracle manipulation using flash loans to artificially change asset prices, enabling attackers to drain funds from lending protocols.",
    severity: "critical",
    blockchains: ["Ethereum", "BSC", "Avalanche"],
    discoveryDate: "2023-04-05",
    auditor: "Halborn",
    attackVectors: ["Flash Loans", "Oracle Manipulation", "Arbitrage"],
    status: "active",
    references: [
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
    discoveryDate: "2023-05-13",
    auditor: "ConsenSys Diligence",
    attackVectors: ["Failed Transfers", "External Call Manipulation"],
    status: "patched",
    references: [
      "https://consensys.github.io/smart-contract-best-practices/development-recommendations/general/external-calls/",
      "https://blog.sigmaprime.io/solidity-security.html#unchecked-calls"
    ],
    impact: "Medium - Potential loss of funds or function failure",
    mitigation: "Always check return values of low-level calls or use require statements."
  },
  {
    id: "BSC-2023-006",
    name: "Public Burn Function Abuse",
    description: "A public burn function without proper access controls allows malicious actors to burn tokens from any account.",
    severity: "high",
    blockchains: ["BSC", "Polygon"],
    discoveryDate: "2023-06-20",
    auditor: "PeckShield",
    attackVectors: ["Access Control", "Token Manipulation"],
    status: "mitigated",
    references: [
      "https://peckshield.medium.com/the-importance-of-access-control-in-defi-protocols-8bed2c6fa8a0"
    ],
    impact: "High - Unauthorized destruction of user tokens",
    mitigation: "Implement proper access controls and authentication for sensitive functions."
  },
  {
    id: "BSC-2023-007",
    name: "Signature Replay Attack",
    description: "Signatures can be replayed across different chains or contexts due to insufficient signature validation.",
    severity: "medium",
    blockchains: ["Ethereum", "BSC", "Arbitrum"],
    discoveryDate: "2023-07-03",
    auditor: "SlowMist",
    attackVectors: ["Signature Replay", "Cross-Chain Manipulation"],
    status: "active",
    references: [
      "https://medium.com/cypher-core/replay-attack-vulnerability-in-ethereum-smart-contracts-introduced-by-eip-155-8b7fb784a82a",
      "https://github.com/crytic/not-so-smart-contracts/tree/master/replay_attack"
    ],
    impact: "Medium - Unauthorized transactions and potential fund loss",
    mitigation: "Include chain ID, contract address, and nonces in signatures."
  },
  {
    id: "BSC-2023-008",
    name: "MEV Sandwich Attack Vulnerability",
    description: "Smart contracts vulnerable to sandwich attacks where transactions are frontrun and backrun by MEV bots to extract value.",
    severity: "medium",
    blockchains: ["Ethereum", "BSC", "Arbitrum", "Optimism"],
    discoveryDate: "2023-08-12",
    auditor: "Chainalysis",
    attackVectors: ["MEV", "Frontrunning", "Backrunning"],
    status: "active",
    references: [
      "https://medium.com/@danrobinson/ethereum-is-a-dark-forest-ecc5f0505dff",
      "https://arxiv.org/abs/2101.05511"
    ],
    impact: "Medium - Value extraction from user transactions",
    mitigation: "Implement slippage protection and consider private transaction pools."
  },
  {
    id: "BSC-2023-009",
    name: "Governance Token Attack",
    description: "Flash loan attacks on governance mechanisms allowing attackers to temporarily gain control of governance decisions.",
    severity: "high",
    blockchains: ["Ethereum", "Polygon"],
    discoveryDate: "2023-09-05",
    auditor: "Quantstamp",
    attackVectors: ["Flash Loans", "Governance Manipulation"],
    status: "mitigated",
    references: [
      "https://medium.com/beaver-smartcontract-security/defi-security-lecture-4-governance-attacks-d5b4645ba896",
      "https://blog.openzeppelin.com/secure-governance-for-upgradeable-contracts/"
    ],
    impact: "High - Temporary but complete control of protocol decisions",
    mitigation: "Implement timelock mechanisms and voting periods."
  },
  {
    id: "BSC-2023-010",
    name: "Cross-contract Reentrancy",
    description: "Reentrancy attacks that exploit vulnerabilities across multiple contracts in a protocol.",
    severity: "critical",
    blockchains: ["Ethereum", "BSC"],
    discoveryDate: "2023-10-17",
    auditor: "OpenZeppelin",
    attackVectors: ["Reentrancy", "Cross-contract Calls"],
    status: "active",
    references: [
      "https://consensys.github.io/smart-contract-best-practices/attacks/reentrancy/",
      "https://medium.com/@tiankongsky/cross-contract-reentrancy-attack-402d27a02a15"
    ],
    impact: "Critical - Complete draining of protocol funds",
    mitigation: "Use reentrancy guards and maintain consistent state across contracts."
  },
  {
    id: "BSC-2023-011",
    name: "Uninitialized Proxy Implementation",
    description: "Uninitialized proxies can lead to contract takeover if implementation contracts are not properly initialized.",
    severity: "high",
    blockchains: ["Ethereum", "BSC", "Avalanche"],
    discoveryDate: "2023-11-03",
    auditor: "Trail of Bits",
    attackVectors: ["Proxy Manipulation", "Initialization Attacks"],
    status: "patched",
    references: [
      "https://blog.openzeppelin.com/the-transparent-proxy-pattern/",
      "https://docs.openzeppelin.com/upgrades-plugins/1.x/proxies#uninitialized-proxies"
    ],
    impact: "High - Contract takeover and fund theft",
    mitigation: "Ensure implementation contracts are initialized and use initializer modifiers."
  },
  {
    id: "BSC-2023-012",
    name: "Precision Loss in Fixed-Point Math",
    description: "Loss of precision in fixed-point math calculations leading to incorrect results and potential economic attacks.",
    severity: "low",
    blockchains: ["Ethereum", "Polygon", "Arbitrum"],
    discoveryDate: "2023-12-01",
    auditor: "ConsenSys Diligence",
    attackVectors: ["Precision Loss", "Economic Manipulation"],
    status: "mitigated",
    references: [
      "https://hackmd.io/@fvictorio/SkXw8BeMF",
      "https://github.com/crytic/building-secure-contracts/blob/master/not-so-smart-contracts/precision_loss/README.md"
    ],
    impact: "Low - Small economic losses or incorrect calculations",
    mitigation: "Use appropriate scaling factors and libraries designed for fixed-point math."
  }
];

export const calculateStats = (): StatsData => {
  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(now.getDate() - 30);

  const stats: StatsData = {
    total: vulnerabilitiesData.length,
    bySeverity: {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      info: 0
    },
    byBlockchain: {},
    byAuditor: {},
    recentCount: 0,
    patchedCount: 0
  };

  vulnerabilitiesData.forEach(vuln => {
    // Count by severity
    stats.bySeverity[vuln.severity]++;

    // Count by blockchain
    vuln.blockchains.forEach(chain => {
      if (!stats.byBlockchain[chain]) {
        stats.byBlockchain[chain] = 0;
      }
      stats.byBlockchain[chain]++;
    });

    // Count by auditor
    if (!stats.byAuditor[vuln.auditor]) {
      stats.byAuditor[vuln.auditor] = 0;
    }
    stats.byAuditor[vuln.auditor]++;

    // Count recent vulnerabilities
    const discoveryDate = new Date(vuln.discoveryDate);
    if (discoveryDate >= thirtyDaysAgo) {
      stats.recentCount++;
    }

    // Count patched vulnerabilities
    if (vuln.status === 'patched') {
      stats.patchedCount++;
    }
  });

  return stats;
};
