import { DetectorItemProp, Plan } from "./types";

export const severityPriority: { [key: string]: number } = {
  "0": 10,
  critical: 10,
  high: 9,
  medium: 8,
  low: 7,
  informational: 6,
};

export const issueActions = [
  {
    value: "pending_fix",
    icon: "",
    label: "Select action",
    isDisabled: true,
  },
  { value: "wont_fix", icon: "icons/wont_fix", label: "Won't Fix" },
  {
    value: "false_positive",
    icon: "icons/false_positive",
    label: "False Positive",
  },
  {
    value: "pending_fix",
    icon: "icons/pending_fix",
    label: "Reset Bug Status",
  },
];

export const dummyIssues = [
  {
    severity: "high",
    issueTitle: "TRANSFER_IN_LOOP",
    filesCount: 4,
  },
  {
    severity: "high",
    issueTitle: "TX_ORIGIN",
    filesCount: 2,
  },
  {
    severity: "medium",
    issueTitle: "ERC20_APPROVE",
    filesCount: 7,
  },
  {
    severity: "medium",
    issueTitle: "EXTRA_GAS_IN_LOOP",
    filesCount: 2,
  },
  {
    severity: "low",
    issueTitle: "PRAGMA_VERSION",
    filesCount: 3,
  },
  {
    severity: "low",
    issueTitle: "PRAGMA_VER",
    filesCount: 3,
  },
];

export const dummyCode = `
  pragma solidity 0.4.24;

  contract ERC20Token {
      function transfer(address to, uint value) returns(bool);
  }

  contract TransferInCycle {
      address[] users;
      mapping(address => uint) balances;

      function dangerousWithdraw() returns (bool) {
          uint l = users.length;
          // <yes> <report> SOLIDITY_TRANSFER_IN_LOOP 8jdj43
          for(uint i; i < l; i++) {
              users[i].transfer(balances[users[i]]);
          }
          i=0;
          // <yes> <report> SOLIDITY_TRANSFER_IN_LOOP 8jdj43
          while(i < l) {
              users[i].transfer(balances[users[i]]);
              i++;
          }
      }

      function goodPrictice(address token) {
          uint l = users.length;
          uint i;
          while(i < l) {
              ERC20Token(token).transfer(users[i], balances[users[i]]);
              i++;
          }
      }

      function goodPrictice(address token) {
        uint l = users.length;
        uint i;
        while(i < l) {
            ERC20Token(token).transfer(users[i], balances[users[i]]);
            i++;
        }

        function goodPrictice(address token) {
          uint l = users.length;
          uint i;
          while(i < l) {
              ERC20Token(token).transfer(users[i], balances[users[i]]);
              i++;
          }

          function goodPrictice(address token) {
            uint l = users.length;
            uint i;
            while(i < l) {
                ERC20Token(token).transfer(users[i], balances[users[i]]);
                i++;
            }

            function goodPrictice(address token) {
              uint l = users.length;
              uint i;
              while(i < l) {
                  ERC20Token(token).transfer(users[i], balances[users[i]]);
                  i++;
              }
    }


  }
`;

export const teamsData = {
  line1: [
    {
      name: "Shashank",
      designation: "Co-Founder & CEO",
      imgUrl: "landing/teams/shashank.jpeg",
      linkedinUrl: "https://www.linkedin.com/in/shashank-in/",
      twitterUrl: "https://twitter.com/cyberboyIndia",
    },
    {
      name: "Indranil Roy",
      designation: "CTO & Co-Founder",
      imgUrl: "landing/teams/indranil.jpeg",
      linkedinUrl: "https://www.linkedin.com/in/itsmeroy2012/",
      twitterUrl: "https://twitter.com/itsmeroy2012",
    },
  ],
  line2: [
    {
      name: "Aditya D.",
      designation: "Research Team Lead",
      imgUrl: "/teams/aditya.jpeg",
      linkedinUrl: "https://www.linkedin.com/in/ad17ya/",
      twitterUrl: "https://twitter.com/zombie007o",
    },
    {
      name: "Ayush Tripathi",
      designation: "Lead Backend Engineer",
      imgUrl: "/teams/ayush.jpeg",
      linkedinUrl: "https://www.linkedin.com/in/ayush-tripathi51/",
      twitterUrl: "https://twitter.com/TripathiAyush5",
    },
    {
      name: "Satyam Kumar Jha",
      designation: "Frontend Engineer",
      imgUrl: "/teams/satyam.jpg",
      linkedinUrl: "https://www.linkedin.com/in/satyamkjha/",
      twitterUrl: "",
    },
  ],
  line3: [
    {
      name: "Sankalp Pandey",
      designation: "Growth Lead",
      imgUrl: "/teams/sankalp.jpeg",
      linkedinUrl: "https://www.linkedin.com/in/sky007/",
      twitterUrl: "https://twitter.com/SKY_Sankalp",
    },
    {
      name: "Siddharth Neekher",
      designation: "UI/UX Designer",
      imgUrl: "/teams/siddarth.jpeg",
      linkedinUrl: "https://www.linkedin.com/in/siddharth-neekher-340519117/",
      twitterUrl: "https://twitter.com/sidartdigital",
    },
  ],
};

export const userTestimonials = [
  {
    name: "Gregory Makodzeba",
    designation: "Co-Founder, Soken",
    imageUrl: "gregory.jpeg",
    testimonial:
      "Thanks to Solidity Scan team for building a comprehensive vulnerability scanner for smart contracts that will help you protect contracts from potential scams. It helps you not only find bugs in source code, but conveniently manage reports with the dashboard from your account. It is a nice tool not only for investors to know about the security of the contract they are investing in, but also for audit teams who conduct security testing and want to expand their tools for contract analysis.",
  },
  {
    name: "Stefan Creadore",
    designation: "Founder and Lead Developer, Exzo Network",
    imageUrl: "stefan.svg",
    testimonial:
      "I highly recommend using SolidityScan for any development team as it will help projects of all sizes save money and scale their development efforts. I conducted a personal review of the results obtained from our audit from a leading manual audit firm and an automated audit from SolidityScan, the results were almost identical, which is why we have decided to continue working with SolidityScan. It saves weeks on our timelines for security auditing, and troubleshooting, and provides a smooth workflow to enhance development proficiency.",
  },
  {
    name: "Jon Greenwood",
    designation: "Integrations, GovernorDAO",
    imageUrl: "jon.svg",
    testimonial:
      "A perfect tool for startup projects in Web 3.0 ! Personally used this as a reference tool while morphing contracts and governance protocols to have a second set of eyes in real-time. Nothing beats actual audits, but the access and ease of use of Solidity Scan make it a no-brainer !",
  },
];

export const monthNames = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export const blockScans: { [key: string]: string } = {
  etherscan: "Ethereum",
  bscscan: "Binance",
  polygonscan: "Polygon",
  fantom: "Fantom",
  cronos: "Cronos",
  avalanche: "Avalanche C-Chain",
  celo: "Celo",
  aurora: "Aurora",
  arbiscan: "Arbiscan",
  buildbear: "Buildbear",
  optimism: "Optimism",
  xdc: "XDC",
  reefscan: "Reefscan",
};

export const blockExplorer: { [key: string]: string } = {
  etherscan: "Etherscan",
  bscscan: "Bscscan",
  polygonscan: "Polygonscan",
  fantom: "FTMScan",
  cronos: "Cronoscan",
  avalanche: "Snowtrace",
  celo: "Celo",
  aurora: "Aurora",
  arbiscan: "Arbiscan",
  buildbear: "Buildbear",
  optimism: "Optimism",
  xdc: "(xdc.blocksscan.io)",
  reefscan: "Reefscan",
};

export const detectorData: DetectorItemProp[] = [
  {
    attackCategory: "Compiler Version Issues",
    swc: ["SWC-102", "SWC-103"],
    nod: 5,
    description:
      "Vulnerabilities related to outdated, floating, multiple, and too recent pragma compiler version in Solidity.",
  },
  {
    attackCategory: "Low-level Calls",
    swc: ["SWC-127"],
    nod: 7,
    description:
      "Vulnerabilities related to low-level calls in solidity such as .call(), delegatecall(), assembly usage, and misconfigurations if they are used incorrectly leading to contract and token compromise.     ",
  },
  {
    attackCategory: "Gas Optimizations/Bugs",
    swc: ["SWC-128", "SWC-134"],
    nod: 26,
    description:
      "Gas optimization techniques that saves deployment as well as transactional costs, obtained from observing a huge dataset of smart contracts.",
  },
  {
    attackCategory: "Best Practices",
    swc: ["SWC-104"],
    nod: 9,
    description:
      "The best practices that should be followed during development that do not necessarily represent a vulnerability but might lead to one due to logical implementations.",
  },
  {
    attackCategory: "Missing Return Values",
    swc: ["SWC-104"],
    nod: 1,
    description:
      "Vulnerabilities related to missing validation on return values from low level and external calls.",
  },
  {
    attackCategory: "Access Control",
    swc: ["SWC-100", "SWC-105", "SWC-106", "SWC-108"],
    nod: 5,
    description:
      "Access control vulnerabilities due to missing validations, misconfigurations, or overly-permissive function visibilities.",
  },
  {
    attackCategory: "Block Value Dependence",
    swc: ["SWC-116", "SWC-105", "SWC-106", "SWC-108"],
    nod: 5,
    description:
      "Block value dependency vulnerabilities such as block.timestamp and block.number, which can be predicted or manipulated leading to logical issues.",
  },
  {
    attackCategory: "Logical Issues",
    swc: [""],
    nod: 2,
    description:
      "Business logic vulnerabilities with varied severity depending on the implementation of the contract.",
  },
  {
    attackCategory: "Arithmetic Operations",
    swc: ["SWC-101", "SWC-129"],
    nod: 3,
    description:
      "Vulnerabilities related to improper and incorrect arithmetic operations such as precision loss and integer overflows and underflows, among many others.     ",
  },
  {
    attackCategory: "Missing Input Validation",
    swc: [""],
    nod: 1,
    description:
      "Vulnerabilities introduced due to missing input validation on business-critical parameters related to ETH present and deposited in the contract.     ",
  },
  {
    attackCategory: "Re-entrancy",
    swc: ["SWC-107"],
    nod: 1,
    description:
      "Multiple types of Re-entrancy vulnerabilities that allow malicious actors to call back into the functions, with severity ranging from low to critical, depending upon the affected logic",
  },
  {
    attackCategory: "Outdated Libraries",
    swc: [""],
    nod: 1,
    description:
      "Vulnerabilities in outdated libraries and packages such as that of OpenZeppelin, containing multiple CVEs and exploits.",
  },
  {
    attackCategory: "Improper Array Operations",
    swc: ["SWC-124", "SWC-128"],
    nod: 3,
    description:
      "Incorrect and vulnerable usage of arrays and mapping, missing input validations on length, incorrect deletions, and denial of service due to their manipulation.     ",
  },
  {
    attackCategory: "Frontrunning Attacks",
    swc: [""],
    nod: 2,
    description:
      "Frontrunning or sandwich attacks such as those found in ERC20’s approve function.     ",
  },
  {
    attackCategory: "Improper Functions",
    swc: [""],
    nod: 4,
    description:
      "Vulnerabilities related to misconfigured function definitions, their incorrect behavior, missing best practices in return valus, etc    ",
  },
  {
    attackCategory: "Shadowing Variables and Functions",
    swc: [""],
    nod: 1,
    description:
      "Variable and function shadowing that overrides intended behavior of the contract using data from a narrower scope, creating confusion and unexpected consequences.",
  },
  {
    attackCategory: "Signature Malleability",
    swc: ["SWC-117", "SWC-121", "SWC-122"],
    nod: 2,
    description:
      "Signature related attacks in Solidity often leading to authorization bypasses and contract compromise or DoS due to improper signature calculations. ",
  },
  {
    attackCategory: "Delegate Call",
    swc: ["SWC-112"],
    nod: 2,
    description:
      "Vulnerabilities related to Delegate Calls that modify the contract’s state by allowing attacker-controlled data inside delegate calls, and when using them in a payable loop.",
  },
  {
    attackCategory: "Missing Two-step Validations",
    swc: [""],
    nod: 1,
    description:
      "Vulnerabilities related to missing best practices during modification of business-critical parameters when they are not using proper 2-factor authentication.     ",
  },
  {
    attackCategory: "Incorrect ERC Interfaces",
    swc: [""],
    nod: 2,
    description:
      "Incorrect usage of ERC interfaces that do not conform with the current ERC specification leading to vulnerabilities when interacting with other tokens.    ",
  },
  {
    attackCategory: "Transaction Order Depedence",
    swc: ["SWC-114"],
    nod: 6,
    description:
      "Incorrect usage of ERC interfaces that do not conform with the current ERC specification leading to vulnerabilities when interacting with other tokens.     ",
  },
  {
    attackCategory: "Events",
    swc: [""],
    nod: 4,
    description:
      "Event-related vulnerabilities and missing best practices such as missing indexed keywords on sensitive fields, superfluous fields, and missed events on critical functions.",
  },
  {
    attackCategory: "Bad Source of Randomness",
    swc: ["SWC-120"],
    nod: 2,
    description:
      "Vulnerabilities related to pseudorandom number generators and their incorrect usage including block values that can be predicted and the logic reverse engineered. ",
  },
  {
    attackCategory: "Denial of Service",
    swc: ["SWC-113", "SWC-128"],
    nod: 2,
    description:
      "Denial of Service vulnerabilities often found in smart contracts due to attacker controlled parameters such as those inside arrays and loops.",
  },
  {
    attackCategory: "Strict Equalit Checks",
    swc: ["SWC-116"],
    nod: 2,
    description:
      "Strict equality validations in timestamps and Ether balance of the contract that can often be manipulated by attackers leading to inconsistencies. ",
  },
  {
    attackCategory: "Data Visibility",
    swc: [""],
    nod: 2,
    description:
      "Incorrect visibility of parameters and functions that expose sensitive data due to wrong use of modifiers and storing private data on chain.    ",
  },
  {
    attackCategory: "Fallback Vulnerabilities",
    swc: [""],
    nod: 6,
    description:
      "Vulnerabilities related to fallback and receive functions in solidity and their incorrect usage.    ",
  },
  {
    attackCategory: "Misc",
    swc: ["SWC-109", "SWC-130"],
    nod: 3,
    description:
      "Miscellaneous category containing vulnerabilities that do not fit in any of the other categories.",
  },
  {
    attackCategory: "Deprecated Variables",
    swc: ["SWC-111"],
    nod: 3,
    description:
      "Usage of deprecated variables, parameters, and functions that are not supported in recent versions of solidity and other external libraries.",
  },
  {
    attackCategory: "Dead Code",
    swc: ["SWC-131", "SWC-135"],
    nod: 1,
    description:
      "Unnecessary and redundant code blocks found in the contract that are not needed and take up useless deployment cost.",
  },
  {
    attackCategory: "Inheritence Vulnerabilities",
    swc: ["SWC-125"],
    nod: 1,
    description:
      "Vulnerabilities related to incorrect and missing inheritance and import statements.",
  },
  {
    attackCategory: "Assert & Require Issues",
    swc: ["SWC-123"],
    nod: 4,
    description:
      "Vulnerabilities related to assert violations, missing best practices in assert and require statements, and state changes in those functions. ",
  },
  {
    attackCategory: "Authorization through tx origin",
    swc: ["SWC-115"],
    nod: 1,
    description:
      "Usage of tx.origin for sensitive authorization transactions that could potentially be manipulated depending on the function logic.",
  },
  {
    attackCategory: "Incorrect Constructor Name",
    swc: ["SWC-118"],
    nod: 1,
    description:
      "Constructor-related vulnerabilities, including incorrect constructor names, misconfigured constructors, and missing input validations in them.",
  },
  {
    attackCategory: "Shadowing State Variables",
    swc: ["SWC-119"],
    nod: 2,
    description:
      "Shadowing when same variable names are used across multiple inherited contracts leading to ambiguities.    ",
  },
  {
    attackCategory: "Insufficient Gas Griefing",
    swc: ["SWC-126"],
    nod: 1,
    description:
      "Vulnerabilities introduced during transaction relaying allowing gas griefing and censoring transactions.",
  },
  {
    attackCategory: "Hash Collision with Multiple Variable Length Arguments",
    swc: ["SWC-133"],
    nod: 1,
    description:
      "Hash collision when multiple variable length arguments are used while packing them during abi encoding.",
  },
  {
    attackCategory: "Unencrypted Private On-chain data",
    swc: ["SWC-136"],
    nod: 1,
    description:
      "Secrets stored in private variables can be read and obtained by any external users or contracts on chain making them insecure for storing sensitive data. ",
  },
];

export const pricing_table_data = [
  {
    title: "Vulnerability",
    data: [
      {
        title: "Vulnerability Scan Score",
        trial: true,
        ondemand: true,
        beginner: true,
        intermediate: true,
        pro: true,
        custom: true,
      },
      {
        title: "Vulnerability Scan Count",
        trial: true,
        ondemand: true,
        beginner: true,
        intermediate: true,
        pro: true,
        custom: true,
      },
      {
        title: "Vulnerability Name",
        trial: true,
        ondemand: true,
        beginner: true,
        intermediate: true,
        pro: true,
        custom: true,
      },
      {
        title: "Vulnerability Description",
        trial: false,
        ondemand: true,
        beginner: true,
        intermediate: true,
        pro: true,
        custom: true,
      },
      {
        title: "Vulnerability Remediation",
        trial: false,
        ondemand: true,
        beginner: true,
        intermediate: true,
        pro: true,
        custom: true,
      },
      {
        title: "Vulnerability Location/Details",
        trial: false,
        ondemand: true,
        beginner: true,
        intermediate: true,
        pro: true,
        custom: true,
      },
      {
        title: "Vulnerability Actions",
        trial: false,
        ondemand: true,
        beginner: true,
        intermediate: true,
        pro: true,
        custom: true,
      },
      {
        title: "Gas Optimization Detection",
        trial: true,
        ondemand: true,
        beginner: true,
        intermediate: true,
        pro: true,
        custom: true,
      },
      {
        title: "Gas Optimization Suggestions",
        trial: false,
        ondemand: true,
        beginner: true,
        intermediate: true,
        pro: true,
        custom: true,
      },
    ],
  },

  {
    title: "Scan",
    data: [
      {
        title: "Threat Scan Score",
        trial: true,
        ondemand: true,
        beginner: true,
        intermediate: true,
        pro: true,
        custom: true,
      },
      {
        title: "Threat Scan Details",
        trial: true,
        ondemand: true,
        beginner: true,
        intermediate: true,
        pro: true,
        custom: true,
      },
      {
        title: "Private APIs",
        trial: false,
        ondemand: false,
        beginner: false,
        intermediate: false,
        pro: false,
        custom: true,
      },
      {
        title: "Public Github integration",
        trial: true,
        ondemand: true,
        beginner: true,
        intermediate: true,
        pro: true,
        custom: true,
      },
      {
        title: "Private Github Integration",
        trial: false,
        ondemand: false,
        beginner: false,
        intermediate: true,
        pro: true,
        custom: true,
      },
      {
        title: "Github Actions",
        trial: false,
        ondemand: false,
        beginner: false,
        intermediate: true,
        pro: true,
        custom: true,
      },
      {
        title: "Verified Contract Scan",
        trial: false,
        ondemand: false,
        beginner: true,
        intermediate: true,
        pro: true,
        custom: true,
      },
      {
        title: "Scan History",
        trial: true,
        ondemand: true,
        beginner: true,
        intermediate: true,
        pro: true,
        custom: true,
      },
      {
        title: "Scans Overview",
        trial: true,
        ondemand: true,
        beginner: true,
        intermediate: true,
        pro: true,
        custom: true,
      },
      {
        title: "No. of scan credits",
        trial: 2,
        ondemand: 2,
        beginner: 20,
        intermediate: 40,
        pro: 80,
        custom: "Unlimited",
      },
      {
        title: "Maximum Computing Time per scan",
        trial: "5 min or less",
        ondemand: "5 min or less",
        beginner: "5 min or less",
        intermediate: "5 min or less",
        pro: "5 min or less",
        custom: "5 min or less",
      },
    ],
  },

  {
    title: "Reporting",
    data: [
      {
        title: "Generate Audit Report",
        trial: false,
        ondemand: false,
        beginner: true,
        intermediate: true,
        pro: true,
        custom: true,
      },
      {
        title: "Customize Audit Report",
        trial: false,
        ondemand: false,
        beginner: true,
        intermediate: true,
        pro: true,
        custom: true,
      },
      {
        title: "Download Audit Report",
        trial: false,
        ondemand: false,
        beginner: true,
        intermediate: true,
        pro: true,
        custom: true,
      },
      {
        title: "Audit Report History",
        trial: false,
        ondemand: false,
        beginner: true,
        intermediate: true,
        pro: true,
        custom: true,
      },
      {
        title: "Publish Audit Report",
        trial: false,
        ondemand: false,
        beginner: false,
        intermediate: false,
        pro: true,
        custom: true,
      },
      {
        title: "Assisted Report Customisation",
        trial: false,
        ondemand: false,
        beginner: false,
        intermediate: false,
        pro: true,
        custom: true,
      },
    ],
  },
  {
    title: "Additional Team Support",
    data: [
      {
        title: "Assisted Report Customization",
        trial: false,
        ondemand: false,
        beginner: false,
        intermediate: false,
        pro: true,
        custom: true,
      },
      {
        title: "Assisted Auditing",
        trial: false,
        ondemand: false,
        beginner: false,
        intermediate: false,
        pro: true,
        custom: true,
      },
      {
        title: "Email Support",
        trial: false,
        ondemand: false,
        beginner: false,
        intermediate: false,
        pro: true,
        custom: true,
      },
      {
        title: "Dedicated Discord/Telegram Support",
        trial: false,
        ondemand: false,
        beginner: false,
        intermediate: false,
        pro: true,
        custom: true,
      },
    ],
  },
  {
    title: "Marketing Activities",
    data: [
      {
        title: "Mention in monthly newsletter",
        trial: false,
        ondemand: false,
        beginner: false,
        intermediate: false,
        pro: true,
        custom: true,
      },
      {
        title: "Dedicated post on all social media handles",
        trial: false,
        ondemand: false,
        beginner: false,
        intermediate: false,
        pro: true,
        custom: true,
      },
      {
        title: "Dedicated blog post",
        trial: false,
        ondemand: false,
        beginner: false,
        intermediate: false,
        pro: false,
        custom: true,
      },
      {
        title: "Twitter Spaces",
        trial: false,
        ondemand: false,
        beginner: false,
        intermediate: false,
        pro: false,
        custom: true,
      },
    ],
  },
];

export const pricing_card_description_data = [
  {
    key: "detector",
    title: "All Detectors",
    description: "Vulnerability Detectors coverage",
    icon: "detectors/detectorIcon.svg",
  },
  {
    key: "github",
    title: "Private Github",
    description: "Private Github",
    icon: "pricing/pricing_card_icons/github.svg",
  },
  {
    key: "actions",
    title: "Github Actions",
    description: "Github Actions",
    icon: "pricing/pricing_card_icons/actions.svg",
  },
  {
    key: "report",
    title: "Publish Reports",
    description: "Generate and Publish report",
    icon: "pricing/pricing_card_icons/report.svg",
  },
  {
    key: "private",
    title: "API Access",
    description: "Private API Access",
    icon: "pricing/pricing_card_icons/private.svg",
  },
];

export const pricing_data = {
  trial: {
    trial: {
      name: "Trial",
      amount: "Free",
      description: null,
      discount: null,
      scan_count: 2,
      github: false,
      report: false,
      publishable_report: false,
    },
  },
  topup: {
    pro: {
      name: "pro",
      description: "Topup Pro",
      discount: null,
      scan_count: 1,
      amount: "3.75",
      github: false,
      report: false,
      publishable_report: false,
    },
    intermediate: {
      name: "intermediate",
      description: "Topup Intermediate",
      discount: null,
      scan_count: 1,
      amount: "6.5",
      github: false,
      report: false,
      publishable_report: false,
    },
    beginner: {
      name: "beginner",
      description: "Topup Beginner",
      discount: null,
      scan_count: 1,
      amount: "7.5",
      github: false,
      report: false,
      publishable_report: false,
    },
    ondemand: {
      name: "ondemand",
      description: "Topup On Demand",
      discount: null,
      scan_count: 1,
      amount: "15.0",
      github: false,
      report: false,
      publishable_report: false,
    },
  },
  yearly: {
    custom: {
      name: "custom",
      description: "Yearly Custom",
      discount: null,
      scan_count: 9990,
      amount: "99999.99",
      github: true,
      report: true,
      publishable_report: true,
    },
    intermediate: {
      name: "intermediate",
      description: "Yearly Intermediate",
      discount: {
        banner: "Save Upto 17%",
        amount: 498,
      },
      scan_count: 400,
      amount: "2499.99",
      github: true,
      report: true,
      publishable_report: false,
    },
    beginner: {
      name: "beginner",
      description: "Yearly Beginner",
      discount: {
        banner: "Good Starter Plan",
        amount: 298,
      },
      scan_count: 200,
      amount: "1499.99",
      github: false,
      report: false,
      publishable_report: false,
    },
    pro: {
      name: "pro",
      description:
        "Yearly Pro Development SME or Security Research SME or NFT SME or Medium Size Teams",
      discount: {
        banner: "Save Upto 50%",
        amount: 598,
      },
      scan_count: 960,
      amount: "2990.0",
      github: true,
      report: true,
      publishable_report: true,
    },
  },
  monthly: {
    custom: {
      name: "custom",
      description:
        "Enterprise Dealing in Crypto Development or Security with Large Team Size. Get your scan results and reports vetted by our security professionals",
      discount: null,
      scan_count: 999,
      amount: "9999.0",
      github: true,
      report: true,
      publishable_report: true,
    },
    beginner: {
      name: "beginner",
      description:
        "Junior Developer or Associate Security Researcher or NFT Enthusiast",
      discount: {
        banner: "Good Starter Plan",
        amount: 0,
      },
      scan_count: 20,
      amount: "149.99",
      github: false,
      report: false,
      publishable_report: false,
    },
    intermediate: {
      name: "intermediate",
      description:
        "Senior Developer or Senior Security Research or Experienced NFT Buyer/ Trader or Small Teams",
      discount: {
        banner: "Save Upto 17%",
        amount: 0,
      },
      scan_count: 40,
      amount: "249.99",
      github: true,
      report: true,
      publishable_report: false,
    },
    pro: {
      name: "pro",
      description:
        "Development SME or Security Research SME or NFT SME or Medium Size Teams",
      discount: {
        banner: "Save Upto 50%",
        amount: 0,
      },
      scan_count: 80,
      amount: "299.0",
      github: true,
      report: true,
      publishable_report: true,
    },
  },
  ondemand: {
    ondemand: {
      name: "ondemand",
      description:
        "Try out the basic features of the product. Get a detailed report with prompts describing detected issues and remediation solutions",
      discount: {
        banner: "Pay as you Go",
        amount: 0,
      },
      scan_count: 2,
      amount: "29.99",
      github: false,
      report: false,
      publishable_report: false,
    },
  },
  "half-yearly": {
    pro: {
      name: "pro",
      description: "Half Yearly Pro",
      discount: {},
      scan_count: 80,
      amount: "1499.0",
      github: true,
      report: true,
      publishable_report: true,
    },
  },
};
