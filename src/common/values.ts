import { DetectorItemProp } from "./types";

export const severityPriority: { [key: string]: number } = {
  "0": 10,
  critical: 10,
  high: 9,
  medium: 8,
  low: 7,
  informational: 6,
};

export const severityArrayInOrder: {
  value: string;
  shortForm: string;
}[] = [
  {
    value: "critical",
    shortForm: "Crit",
  },
  {
    value: "high",
    shortForm: "High",
  },
  {
    value: "medium",
    shortForm: "Med",
  },
  {
    value: "low",
    shortForm: "Low",
  },
  {
    value: "informational",
    shortForm: "Info",
  },
  {
    value: "gas",
    shortForm: "Gas",
  },
];

export const publishReportType: { [key: string]: string } = {
  self_published: "Self-Published",
  verified: "Verified Report",
  assisted: "Assisted-Audit",
};

export const issueActions = [
  {
    value: "pending_fix",
    icon: "",
    label: "Take action",
    isDisabled: true,
  },
  { value: "wont_fix", icon: "report/wont_fix_color", label: "Won't Fix" },
  {
    value: "false_positive",
    icon: "report/false_positive_color",
    label: "False Positive",
  },
  {
    value: "pending_fix",
    icon: "icons/pending_fix",
    label: "Reset Bug Status",
  },
];

export const userRolesList = [
  {
    value: "admin",
    icon: "icons/admin",
    label: "Admin",
  },
  { value: "editor", icon: "icons/editor", label: "Editor" },
  {
    value: "viewer",
    icon: "icons/reader",
    label: "Viewer",
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
    attackCategory: "Inheritance Vulnerabilities",
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
        pro: true,
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
        beginner: false,
        intermediate: true,
        pro: true,
        custom: true,
      },
      {
        title: "Audit Report History",
        trial: false,
        ondemand: false,
        beginner: false,
        intermediate: true,
        pro: true,
        custom: true,
      },
      {
        title: "Download Audit Report",
        trial: false,
        ondemand: false,
        beginner: false,
        intermediate: false,
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
        title: "Customize Audit Report",
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
        pro: false,
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

export const actionTaken: {
  [key: string]: string;
} = {
  false_positive: "False Positive",
  wont_fix: "Won't Fix",
  pending_fix: "Pending Fix",
  fixed: "Fixed",
};

export const attackMethodColor: {
  [key: string]: string;
} = {
  "Rug Pull": "#9C003D",
  "Flash Loan Attack": "#F46D43",
  Miscellaneous: "#FEE08B",
  Scam: "#E6F598",
  "Business Logic Issue": "#66C2A5",
  Phishing: "#5E4FA2",
  "Access Control": "#3288BD",
  "Private key leak": "#7D7D7D",
  "Price Manipulation": "#A7A7A7",
  "Oracle Issue": "#EBEBEB",
};

export const scanStatesLabel: {
  [key: string]: string;
} = {
  scan_initiate: "Scan in Queue",
  scan_done: "",
  initialised: "Downloading Code...",
  downloaded: "Code Downloaded...",
  download_failed: "Download failed",
  scan_failed: "",
  scanning: "Scan in Progress...",
};

export const blockScans: { [key: string]: string } = {
  etherscan: "Ethereum",
  bscscan: "Binance",
  polygonscan: "Polygon",
  fantom: "fantom",
  cronos: "Cronos",
  avalanche: "Avalanche C-Chain",
  celo: "celo",
  aurora: "Aurora",
  arbiscan: "Arbiscan",
  buildbear: "Buildbear",
  optimism: "Optimism",
  xdc: "XDC",
  reefscan: "Reefscan",
  nordekscan: "Nordek",
  fuse: "Fuse",
};

export const codePlatform: {
  [key: string]: {
    [key: string]: string;
  };
} = {
  etherscan: { etherscan: "#code", blockscout: "?tab=contract" },
  bscscan: { bscscan: "#code" },
  polygonscan: { polygonscan: "#code", blockscout: "?tab=contract" },
  fantom: { fantom: "#code" },
  cronos: { cronos: "#code" },
  avalanche: { avalanche: "#code", routescan: "#code-43114" },
  celo: { celo: "#code" },
  aurora: { aurora: "/contracts#address-tabs" },
  arbiscan: { arbiscan: "#code" },
  buildbear: { buildbear: "" },
  optimism: { optimism: "#code", blockscout: "?tab=contract" },
  xdc: { xdc: "#readContract" },
  reefscan: { reefscan: "" },
  nordekscan: { nordekscan: "/contracts#address-tabs" },
  fuse: { fuse: "/contracts#address-tabs" },
  basescan: { basescan: "#code", blockscout: "?tab=contract" },
  gnosis: { blockscout: "?tab=contract" },
  rootstock: { blockscout: "?tab=contract" },
  neon: { blockscout: "?tab=contract" },
  shimmer: { blockscout: "?tab=contract" },
  shibariumscan: { blockscout: "?tab=contract" },
  etc: { blockscout: "?tab=contract" },
  zksync: { blockscout: "?tab=contract" },
  immutable: { blockscout: "?tab=contract" },
  boba: { routescan: "#code-288" },
  flare: { routescan: "#code-14" },
  metis: { routescan: "#code-1088" },
  chiliz: { routescan: "#code-88888" },
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
  nordekscan: "Nordek",
  fuse: "Blockscout",
  blockscout: "Blockscout",
};

export const contractChain: {
  [key: string]: {
    blockchainName: string;
    description: string;
    website: string;
    logoUrl: string;

    platforms: {
      [key: string]: {
        label: string;
        iconUrl: string;
        chains: {
          value: string;
          label: string;
          icon: string;
          isDisabled: boolean;
          website: string;
        }[];
      };
    };
  };
} = {
  etherscan: {
    blockchainName: "Ethereum",
    description:
      "Ethereum is the community-run technology powering the cryptocurrency ether (ETH) and thousands of decentralized applications.",
    website: "https://ethereum.org/",
    logoUrl: "blockscan/ethereum",
    platforms: {
      etherscan: {
        label: "Etherscan",
        iconUrl: "blockscan/etherscan",
        chains: [
          {
            value: "mainnet",
            label: "Ethereum Mainnet",
            icon: "",
            isDisabled: false,
            website: "https://etherscan.io/",
          },
          {
            value: "sepolia",
            label: "Sepolia Testnet",
            icon: "",
            isDisabled: false,
            website: "https://sepolia.etherscan.io/",
          },
          {
            value: "goerli",
            label: "Goerli Testnet",
            icon: "",
            isDisabled: false,
            website: "https://goerli.etherscan.io/",
          },
          {
            value: "holesky",
            label: "Holesky Testnet",
            icon: "",
            isDisabled: false,
            website: "https://holesky.etherscan.io/",
          },
        ],
      },
      blockscout: {
        label: "Blockscout",
        iconUrl: "blockscan/blockscout",
        chains: [
          {
            value: "eth",
            label: "Ethereum Mainnet",
            icon: "",
            isDisabled: false,
            website: "https://eth.blockscout.com/",
          },
          {
            value: "eth-sepolia",
            label: "Sepolia Testnet",
            icon: "",
            isDisabled: false,
            website: "https://eth-sepolia.blockscout.com/",
          },
          {
            value: "eth-goerli",
            label: "Goerli Testnet",
            icon: "",
            isDisabled: false,
            website: "https://eth-goerli.blockscout.com/",
          },
          {
            value: "eth-holesky",
            label: "Holesky Testnet",
            icon: "",
            isDisabled: false,
            website: "https://eth-holesky.blockscout.com/",
          },
        ],
      },
    },
  },
  optimism: {
    blockchainName: "Optimism",
    description:
      "Optimism is a fast, stable, and scalable L2 blockchain built by Ethereum developers, for Ethereum developers.",
    website: "https://www.optimism.io/",
    logoUrl: "blockscan/optimism",
    platforms: {
      optimism: {
        label: "Optimism",
        iconUrl: "blockscan/optimism",
        chains: [
          {
            value: "mainnet",
            label: "Optimism Mainnet",
            icon: "",
            isDisabled: false,
            website: "https://optimistic.etherscan.io/",
          },
          {
            value: "goerli",
            label: "Optimism Goerli Testnet",
            icon: "",
            isDisabled: false,
            website: "https://goerli-optimism.etherscan.io/",
          },
        ],
      },
      blockscout: {
        label: "Blockscout",
        iconUrl: "blockscan/blockscout",
        chains: [
          {
            value: "optimism",
            label: "Optimism Mainnet",
            icon: "",
            isDisabled: false,
            website: "https://optimism.blockscout.com/",
          },
          {
            value: "optimism-goerli",
            label: "Optimism Goerli Testnet",
            icon: "",
            isDisabled: false,
            website: "https://optimism-goerli.blockscout.com/",
          },
          {
            value: "optimism-sepolia",
            label: "Optimism Sepolia Testnet",
            icon: "",
            isDisabled: false,
            website: "https://optimism-sepolia.blockscout.com/",
          },
        ],
      },
    },
  },
  bscscan: {
    blockchainName: "Binance",
    description:
      "A community-driven blockchain ecosystemof Layer-1 and Layer-2 scaling solutions.",
    website: "https://www.bnbchain.org/",
    logoUrl: "blockscan/binance",
    platforms: {
      bscscan: {
        label: "BscScan",
        iconUrl: "blockscan/bscscan",
        chains: [
          {
            value: "mainnet",
            label: "Bsc Mainnet",
            icon: "",
            isDisabled: false,
            website: "https://bscscan.com/",
          },
          {
            value: "testnet",
            label: "Bsc Testnet",
            icon: "",
            isDisabled: false,
            website: "https://testnet.bscscan.com/",
          },
        ],
      },
    },
  },
  polygonscan: {
    blockchainName: "Polygon",
    description:
      "The fundamental protocol that allows anyone to create and exchange value, powered by zero-knowledge technology.",
    website: "https://polygon.technology/",
    logoUrl: "blockscan/polygon",
    platforms: {
      polygonscan: {
        label: "PolygonScan",
        iconUrl: "blockscan/polygonscan",
        chains: [
          {
            value: "mainnet",
            label: "Polygon Mainnet",
            icon: "",
            isDisabled: false,
            website: "https://polygonscan.com/",
          },
          {
            value: "testnet",
            label: "Mumbai Testnet",
            icon: "",
            isDisabled: false,
            website: "https://mumbai.polygonscan.com/",
          },
        ],
      },
      // blockscout: {
      //   label: "Blockscout",
      //   iconUrl: "blockscan/blockscout",
      //   chains: [
      //     {
      //       value: "polygon",
      //       label: "Polygon Mainnet",
      //       icon: "",
      //       isDisabled: false,
      //       website: "https://polygon.blockscout.com/",
      //     },
      //   ],
      // },
    },
  },
  avalanche: {
    blockchainName: "Avalanche",
    description:
      "Avalanche is a decentralized blockchain platform known for its high-performance consensus protocol and custom subnets, enabling fast and scalable decentralized applications (DApps).",
    website: "https://www.avax.network/",
    logoUrl: "blockscan/avalanche",
    platforms: {
      avalanche: {
        label: "Snowtrace",
        iconUrl: "blockscan/snowtrace",
        chains: [
          {
            value: "mainnet",
            label: "Avalanche Mainnet",
            icon: "",
            isDisabled: false,
            website: "https://snowtrace.io/",
          },
          {
            value: "testnet",
            label: "Avalanche Fuji Testnet",
            icon: "",
            isDisabled: false,
            website: "https://testnet.snowtrace.io/",
          },
        ],
      },
      routescan: {
        label: "Routescan",
        iconUrl: "blockscan/routescan",
        chains: [
          {
            value: "c-chain",
            label: "Avalanche C-Chain",
            icon: "",
            isDisabled: false,
            website: "https://43114.routescan.io/",
          },
        ],
      },
    },
  },
  fantom: {
    blockchainName: "Fantom",
    description:
      "Fantom is a highly scalable blockchain platform for DeFi, crypto dApps, and enterprise applications.",
    website: "https://fantom.foundation/",
    logoUrl: "blockscan/fantom",
    platforms: {
      fantom: {
        label: "FTMScan",
        iconUrl: "blockscan/ftmscan",
        chains: [
          {
            value: "mainnet",
            label: "FTM Mainnet",
            icon: "",
            isDisabled: false,
            website: "https://ftmscan.com/",
          },
          {
            value: "testnet",
            label: "FTM Testnet",
            icon: "",
            isDisabled: false,
            website: "https://testnet.ftmscan.com/",
          },
        ],
      },
    },
  },
  cronos: {
    blockchainName: "Cronos",
    description:
      "Cronos is a blockchain network developed by Crypto.com, designed to provide Ethereum Virtual Machine (EVM) compatibility and cross-chain capabilities, fostering interoperability and scalability in decentralized applications.",
    website: "https://cronos.org/",
    logoUrl: "blockscan/cronos",
    platforms: {
      cronos: {
        label: "Cronos Explorer",
        iconUrl: "blockscan/cronos",
        chains: [
          {
            value: "mainnet",
            label: "Cronos Mainnet",
            icon: "",
            isDisabled: false,
            website: "https://cronoscan.com/",
          },
          {
            value: "testnet",
            label: "Cronos Testnet",
            icon: "",
            isDisabled: false,
            website: "https://explorer.cronos.org/testnet",
          },
        ],
      },
    },
  },
  celo: {
    blockchainName: "Celo",
    description:
      "Celo is a mobile-first blockchain platform focused on financial inclusion, leveraging a stablecoin, cUSD, and a novel proof-of-stake consensus mechanism to enable accessible and affordable financial services for anyone with a mobile phone.",
    website: "https://celo.org/",
    logoUrl: "blockscan/celo",
    platforms: {
      celo: {
        label: "Celo Explorer",
        iconUrl: "blockscan/celo",
        chains: [
          {
            value: "mainnet",
            label: "Celo Mainnet",
            icon: "",
            isDisabled: false,
            website: "https://celoscan.io/",
          },
          {
            value: "testnet",
            label: "Alfajores Testnet",
            icon: "",
            isDisabled: false,
            website: "https://alfajores.celoscan.io/",
          },
        ],
      },
    },
  },
  aurora: {
    blockchainName: "Aurora",
    description:
      "Aurora is a next-generation Ethereum compatible blockchain and ecosystem that runs on the NEAR Protocol, and powers the innovations behind Aurora Cloud—the fastest path for Web2 businesses to capture the value of Web3.",
    website: "https://aurora.dev/",
    logoUrl: "blockscan/aurora",
    platforms: {
      aurora: {
        label: "Blockscout",
        iconUrl: "blockscan/blockscout",
        chains: [
          {
            value: "mainnet",
            label: "Aurora Mainnet",
            icon: "",
            isDisabled: false,
            website: "https://explorer.aurora.dev/",
          },
          {
            value: "testnet",
            label: "Aurora Testnet",
            icon: "",
            isDisabled: false,
            website: "https://explorer.testnet.aurora.dev/",
          },
        ],
      },
    },
  },
  arbiscan: {
    blockchainName: "Arbitrum",
    description:
      "Arbitrum is an Ethereum Layer 2 scaling solution developed by Offchain Labs, utilizing optimistic rollups to enhance transaction throughput and reduce fees on the Ethereum network.",
    website: "https://arbitrum.io/",
    logoUrl: "blockscan/arbitrum",
    platforms: {
      arbiscan: {
        label: "Arbiscan",
        iconUrl: "blockscan/arbitrum",
        chains: [
          {
            value: "mainnet",
            label: "Arbiscan Mainnet",
            icon: "",
            isDisabled: false,
            website: "https://arbiscan.io/",
          },
          {
            value: "goerli",
            label: "Arbiscan Goerli",
            icon: "",
            isDisabled: false,
            website: "https://goerli.arbiscan.io/",
          },
        ],
      },
    },
  },
  reefscan: {
    blockchainName: "Reef",
    description:
      "Reef chain is an EVM compatible blockchain for DeFi. It is fast, scalable, has low transaction costs and does no wasteful mining. It is built with Substrate Framework and comes with on-chain governance.",
    website: "https://reef.io/",
    logoUrl: "blockscan/reefscan",
    platforms: {
      reefscan: {
        label: "ReefScan",
        iconUrl: "blockscan/reefscan",
        chains: [
          {
            value: "mainnet",
            label: "ReefScan Mainnet",
            icon: "",
            isDisabled: false,
            website: "https://reefscan.com/",
          },
        ],
      },
    },
  },
  xdc: {
    blockchainName: "XDC",
    description:
      "XDC Network is an enterprise-grade, open-source blockchain protocol. An EVM-compatible chain with enforceable smart contracts, it is uniquely suited to revolutionize, decentralize, and liquify the trade finance industry through the tokenization of real world assets and financial instruments.",
    website: "https://xdc.org/",
    logoUrl: "blockscan/xdc",
    platforms: {
      xdc: {
        label: "BlocksScan",
        iconUrl: "blockscan/blocksscan",
        chains: [
          {
            value: "mainnet",
            label: "XDC Mainnet",
            icon: "",
            isDisabled: false,
            website: "https://explorer.xinfin.network/",
          },
          {
            value: "testnet",
            label: "XDC Apothem Network",
            icon: "",
            isDisabled: false,
            website: "https://explorer.apothem.network/",
          },
        ],
      },
    },
  },
  nordekscan: {
    blockchainName: "Nordek",
    description:
      "NORDEK strives to be the most business and consumer-friendly blockchain ecosystem for mainstream adoption of web3 payments. NORDEK is powered by fast and low-cost EVM-compatible NRK Network blockchain.",
    website: "https://www.nordek.io/",
    logoUrl: "blockscan/nordekscan",
    platforms: {
      nordekscan: {
        label: "Nordekscan",
        iconUrl: "blockscan/nordekscan",
        chains: [
          {
            value: "mainnet",
            label: "Nordek Mainnet",
            icon: "",
            isDisabled: false,
            website: "https://nordekscan.com/",
          },
        ],
      },
    },
  },
  fuse: {
    blockchainName: "Fuse",
    description:
      "Fuse's public blockchain ecosystem provides low cost Web3 payments without the development headaches or vendor lock-in.",
    website: "https://www.fuse.io/",
    logoUrl: "blockscan/fuse",
    platforms: {
      blockscout: {
        label: "Blockscout",
        iconUrl: "blockscan/blockscout",
        chains: [
          {
            value: "fuse-mainnet",
            label: "Fuse Mainnet",
            icon: "",
            isDisabled: false,
            website: "https://explorer.fuse.io/",
          },
          {
            value: "fuse-testnet",
            label: "Fuse Testnet",
            icon: "",
            isDisabled: false,
            website: "https://explorer.fusespark.io/",
          },
        ],
      },
      fuse: {
        label: "Blockscout",
        iconUrl: "blockscan/blockscout",
        chains: [
          {
            value: "fuse",
            label: "Fuse Mainnet",
            icon: "",
            isDisabled: false,
            website: "https://explorer.fuse.io/",
          },
          {
            value: "fuse",
            label: "Fuse Testnet",
            icon: "",
            isDisabled: false,
            website: "https://explorer.fusespark.io/",
          },
        ],
      },
    },
  },
  basescan: {
    blockchainName: "Base",
    description:
      "Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain.",
    website: "https://base.org/",
    logoUrl: "blockscan/base",
    platforms: {
      basescan: {
        label: "BaseScan",
        iconUrl: "blockscan/base",
        chains: [
          {
            value: "mainnet",
            label: "Base Mainnet",
            icon: "",
            isDisabled: false,
            website: "https://basescan.org/",
          },
          {
            value: "testnet",
            label: "Base Testnet",
            icon: "",
            isDisabled: false,
            website: "https://goerli.basescan.org/",
          },
        ],
      },
      blockscout: {
        label: "Blockscout",
        iconUrl: "blockscan/blockscout",
        chains: [
          {
            value: "base",
            label: "Base Mainnet",
            icon: "",
            isDisabled: false,
            website: "https://base.blockscout.com/",
          },
          {
            value: "base-goerli",
            label: "Base Goerli",
            icon: "",
            isDisabled: false,
            website: "https://base-goerli.blockscout.com/",
          },
          {
            value: "base-sepolia",
            label: "Base Sepolia",
            icon: "",
            isDisabled: false,
            website: "https://base-sepolia.blockscout.com/",
          },
        ],
      },
    },
  },
  gnosis: {
    blockchainName: "Gnosis",
    description:
      "Gnosis is a decentralized platform built on Ethereum that facilitates prediction market and decentralized exchange services, aiming to enable users to forecast and trade on the outcome of various events.",
    website: "https://www.gnosis.io/",
    logoUrl: "blockscan/gnosis",
    platforms: {
      blockscout: {
        label: "Blockscout",
        iconUrl: "blockscan/blockscout",
        chains: [
          {
            value: "gnosis",
            label: "Gnosis Mainnet",
            icon: "",
            isDisabled: false,
            website: "https://gnosis.blockscout.com/",
          },
          {
            value: "gnosis-chiado",
            label: "Gnosis Chiado Testnet",
            icon: "",
            isDisabled: false,
            website: "https://gnosis-chiado.blockscout.com/",
          },
        ],
      },
    },
  },
  rootstock: {
    blockchainName: "Rootstock",
    description:
      "Rootstock (RSK) is a smart contract platform that extends the capabilities of the Bitcoin blockchain by enabling the execution of smart contracts and decentralized applications (dApps).",
    website: "https://rootstock.io/",
    logoUrl: "blockscan/rootstock",
    platforms: {
      blockscout: {
        label: "Blockscout",
        iconUrl: "blockscan/blockscout",
        chains: [
          {
            value: "rootstock",
            label: "Rootstock Mainnet",
            icon: "",
            isDisabled: false,
            website: "https://rootstock.blockscout.com/",
          },
          {
            value: "rootstock-testnet",
            label: "Rootstock Testnet",
            icon: "",
            isDisabled: false,
            website: "https://rootstock-testnet.blockscout.com/",
          },
        ],
      },
    },
  },
  neon: {
    blockchainName: "Neon",
    description:
      "Neon is an Ethereum Virtual Machine with the scalability and liquidity of Solana",
    website: "https://neonevm.org/",
    logoUrl: "blockscan/neon",
    platforms: {
      blockscout: {
        label: "Blockscout",
        iconUrl: "blockscan/blockscout",
        chains: [
          {
            value: "neon",
            label: "Neon Mainnet",
            icon: "",
            isDisabled: false,
            website: "https://neon.blockscout.com/",
          },
          {
            value: "neon-devnet",
            label: "Neon Devnet",
            icon: "",
            isDisabled: false,
            website: "https://neon-devnet.blockscout.com/",
          },
        ],
      },
    },
  },
  shimmer: {
    blockchainName: "Shimmer",
    description:
      "Shimmer is a high-performance, feeless, and parallelized Directed Acyclic Graph (DAG) ledger offering a chain-agnostic solution for fully customizable smart contract chains to be build on top. Shimmer is a bridge to a new era of interoperability and composability. It enables seamless and feeless value transfers between smart contract chains, opening the door to an interoperable future.",
    website: "https://shimmer.network/",
    logoUrl: "blockscan/shimmer",
    platforms: {
      blockscout: {
        label: "Blockscout",
        iconUrl: "blockscan/blockscout",
        chains: [
          {
            value: "shimmer-mainnet",
            label: "Shimmer Mainnet",
            icon: "",
            isDisabled: false,
            website: "https://explorer.evm.shimmer.network/",
          },
          {
            value: "shimmer-testnet",
            label: "Shimmer Testnet",
            icon: "",
            isDisabled: false,
            website: "https://explorer.evm.testnet.shimmer.network/",
          },
        ],
      },
    },
  },
  shibariumscan: {
    blockchainName: "Shibarium",
    description:
      "Gnosis is a decentralized platform built on Ethereum that facilitates prediction market and decentralized exchange services, aiming to enable users to forecast and trade on the outcome of various events.",
    website: "https://shibarium.shib.io/",
    logoUrl: "blockscan/shibariumscan",
    platforms: {
      blockscout: {
        label: "Blockscout",
        iconUrl: "blockscan/blockscout",
        chains: [
          {
            value: "shibariumscan-mainnet",
            label: "Shibarium Mainnet",
            icon: "",
            isDisabled: false,
            website: "https://www.shibariumscan.io/",
          },
          {
            value: "shibariumscan-testnet",
            label: "Puppynet Testnet",
            icon: "",
            isDisabled: false,
            website: "https://puppyscan.shib.io/",
          },
        ],
      },
    },
  },
  lightlink: {
    blockchainName: "Lightlink",
    description:
      "Layer 2 blockchain secured by Ethereum, purposefully built for Metaverse, NFT and Gaming applications",
    website: "https://www.lightlink.io/",
    logoUrl: "blockscan/lightlink",
    platforms: {
      blockscout: {
        label: "Blockscout",
        iconUrl: "blockscan/blockscout",
        chains: [
          {
            value: "lightlink-mainnet",
            label: " LightLink Phoenix Mainnet",
            icon: "",
            isDisabled: false,
            website: "https://phoenix.lightlink.io/",
          },
          {
            value: "lightlink-testnet",
            label: " LightLink Pegasus  Testnet",
            icon: "",
            isDisabled: false,
            website: "https://pegasus.lightlink.io/",
          },
        ],
      },
    },
  },
  etc: {
    blockchainName: "Ethereum Classic",
    description:
      "Ethereum Classic (ETC) is a decentralized blockchain platform that emerged as a result of a fork in the Ethereum network, maintaining the original principles of immutability and preserving the blockchain's history prior to a controversial hard fork.",
    website: "https://ethereumclassic.org/",
    logoUrl: "blockscan/etc",
    platforms: {
      blockscout: {
        label: "Blockscout",
        iconUrl: "blockscan/blockscout",
        chains: [
          {
            value: "etc",
            label: "Ethereum Classic Mainnet",
            icon: "",
            isDisabled: false,
            website: "https://etc.blockscout.com/",
          },
          {
            value: "etc-mordor",
            label: "ETC Mordor Testnet",
            icon: "",
            isDisabled: false,
            website: "https://etc-mordor.blockscout.com/",
          },
        ],
      },
    },
  },
  zksync: {
    blockchainName: "zkSync",
    description:
      "zkSync is a Layer-2 scaling solution for the Ethereum blockchain that employs zk-rollup technology to enhance scalability and efficiency.",
    website: "https://zksync.io/",
    logoUrl: "blockscan/zksync",
    platforms: {
      blockscout: {
        label: "Blockscout",
        iconUrl: "blockscan/blockscout",
        chains: [
          {
            value: "zksync-era-mainnet",
            label: "zkSync Era Mainnet",
            icon: "",
            isDisabled: false,
            website: "https://zksync.blockscout.com/",
          },
        ],
      },
    },
  },
  immutable: {
    blockchainName: "Immutable",
    description:
      "Build with unmatched speed, scale, and flexibility using Immutable’s simple, end-to-end Web3 solutions. Fuel your game's growth and captivate players like never before.",
    website: "https://www.immutable.com/",
    logoUrl: "blockscan/immutable",
    platforms: {
      blockscout: {
        label: "Blockscout",
        iconUrl: "blockscan/blockscout",
        chains: [
          {
            value: "immutable-mainnet",
            label: "Immutable Mainnet",
            icon: "",
            isDisabled: false,
            website: "https://explorer.immutable.com/",
          },
          {
            value: "immutable-testnet",
            label: "Immutable Testnet",
            icon: "",
            isDisabled: false,
            website: "https://explorer.testnet.immutable.com/",
          },
        ],
      },
    },
  },
  boba: {
    blockchainName: "BOBA",
    description:
      "Boba Network is a multichain layer 2 optimistic rollup that aims to unlock the potential of rollup technology and enable interoperability between blockchains and the real world. The protocol is fully compatible with EVM-based tools and has already deployed multichain support for Ethereum, Avalanche, and BNB supporting lightning-fast transactions and lower fees.",
    website: "https://boba.network/",
    logoUrl: "blockscan/boba",
    platforms: {
      routescan: {
        label: "Routescan",
        iconUrl: "blockscan/routescan",
        chains: [
          {
            value: "boba",
            label: "Boba Mainnet",
            icon: "",
            isDisabled: false,
            website: "https://bobascan.com/",
          },
        ],
      },
    },
  },
  flare: {
    blockchainName: "Flare",
    description:
      "EVM-based layer1 blockchain with two native data acquisition protocols.",
    website: "https://flare.network/",
    logoUrl: "blockscan/flare",
    platforms: {
      routescan: {
        label: "Routescan",
        iconUrl: "blockscan/routescan",
        chains: [
          {
            value: "flare",
            label: "Flare Mainnet",
            icon: "",
            isDisabled: false,
            website: "https://mainnet.flarescan.com/",
          },
        ],
      },
    },
  },
  metis: {
    blockchainName: "Metis",
    description:
      "Metis is a blockchain platform that aims to simplify decentralized application development through its user-friendly infrastructure and on-chain governance features.",
    website: "https://www.metis.io/",
    logoUrl: "blockscan/metis",
    platforms: {
      routescan: {
        label: "Routescan",
        iconUrl: "blockscan/routescan",
        chains: [
          {
            value: "metis",
            label: "Metis Mainnet",
            icon: "",
            isDisabled: false,
            website: "https://explorer.metis.io/",
          },
        ],
      },
    },
  },
  chiliz: {
    blockchainName: "Chiliz",
    description:
      "Chiliz Blockchain is a blockchain infrastructure specializing in sports and entertainment applications, enabling the creation of fan engagement and tokenized experiences within the Chiliz ecosystem.",
    website: "https://www.chiliz.com/",
    logoUrl: "blockscan/chiliz",
    platforms: {
      routescan: {
        label: "Routescan",
        iconUrl: "blockscan/routescan",
        chains: [
          {
            value: "chiliz",
            label: "Chiliz Mainnet",
            icon: "",
            isDisabled: false,
            website: "https://chiliscan.com/",
          },
        ],
      },
    },
  },
};

export const platformVsChains: {
  [key: string]: {
    [key: string]: {
      chain: string;
      index: number;
    };
  };
} = {
  blockscout: {
    eth: {
      chain: "etherscan",
      index: 0,
    },
    "eth-goerli": {
      chain: "etherscan",
      index: 2,
    },
    "eth-sepolia": {
      chain: "etherscan",
      index: 1,
    },
    "eth-holesky": {
      chain: "etherscan",
      index: 3,
    },
    gnosis: {
      chain: "gnosis",
      index: 0,
    },
    "gnosis-chiado": {
      chain: "gnosis",
      index: 1,
    },
    optimism: {
      chain: "optimism",
      index: 0,
    },
    "optimism-goerli": {
      chain: "optimism",
      index: 1,
    },
    "optimism-sepolia": {
      chain: "optimism",
      index: 2,
    },
    rootstock: {
      chain: "rootstock",
      index: 0,
    },
    "rootstock-testnet": {
      chain: "rootstock",
      index: 1,
    },
    "neon-devnet": {
      chain: "neon",
      index: 1,
    },
    neon: {
      chain: "neon",
      index: 0,
    },
    "base-goerli": {
      chain: "basescan",
      index: 1,
    },
    "base-sepolia": {
      chain: "basescan",
      index: 2,
    },
    base: {
      chain: "basescan",
      index: 0,
    },
    polygon: {
      chain: "polygonscan",
      index: 0,
    },
    "shimmer-mainnet": {
      chain: "shimmer",
      index: 0,
    },
    "shimmer-testnet": {
      chain: "shimmer",
      index: 1,
    },
    "shibariumscan-mainnet": {
      chain: "shibariumscan",
      index: 0,
    },
    "shibariumscan-testnet": {
      chain: "shibariumscan",
      index: 1,
    },
    "lightlink-testnet": {
      chain: "lightlink",
      index: 1,
    },
    "lightlink-mainnet": {
      chain: "lightlink",
      index: 0,
    },
    "fuse-mainnet": {
      chain: "fuse",
      index: 0,
    },
    "fuse-testnet": {
      chain: "fuse",
      index: 1,
    },
    etc: {
      chain: "etc",
      index: 0,
    },
    "etc-mordor": {
      chain: "etc",
      index: 1,
    },
    "zksync-era-mainnet": {
      chain: "zksync",
      index: 0,
    },
    "immutable-mainnet": {
      chain: "immutable",
      index: 0,
    },
    "immutable-testnet": {
      chain: "immutable",
      index: 1,
    },
  },
  routescan: {
    boba: {
      chain: "boba",
      index: 0,
    },
    chiliz: {
      chain: "chiliz",
      index: 0,
    },
    flare: {
      chain: "flare",
      index: 0,
    },
    metis: {
      chain: "metis",
      index: 0,
    },
    "c-chain": {
      chain: "avalanche",
      index: 0,
    },
  },
};

export const infographicsData: { [key: string]: string[] } = {
  project_github: [
    "Ensure the link leads to a GitHub repository with Solidity (.sol) files. Use the HTTPS GitHub (.git) cloning link.",
    "Verify if the repository is public; for private repositories, integrate GitHub from the Integrations tab.",
  ],
  project_gitlab: [
    "Ensure the link directs to a GitLab repository with Solidity (.sol) files. Use the HTTPS GitLab (.git) cloning link.",
    "Check the repository's visibility; for private repositories, integrate GitLab from the Integrations tab.",
  ],
  project_bitbucket: [
    "Ensure the link points to a Bitbucket repository with Solidity (.sol) files. Use the HTTPS Bitbucket (.git) cloning link.",
    "Confirm the repository's privacy; for private repositories, integrate Bitbucket from the Integrations tab.",
  ],
  project_step_2: [
    "Select or deselect files for the scan.",
    "Non-highlighted files will be skipped by our scanner, including non-Solidity files.",
  ],
  project_step_3: [
    "Enable Actions for your project to trigger scans when new code is pushed.",
    "Integrate with your Git Provider to use this service.",
    "You must own the repository to enable this action.",
  ],
  project_step_0: [""],
  block: [
    "Navigate to the explorer of the blockchain (Ethereum - Etherscan.io).",
    "Use the search bar to find your smart contract and check if the source code is verified in the 'Contract' tab of the selected explorer.",
    "Select the appropriate chain and platform, then start the scan.",
  ],
  filescan_step_1: [
    "Upload Solidity (.sol) files, ideally compiled successfully. Incorrect syntax may lead to inaccurate results.",
    "Choose to upload a single file or multiple files based on your project's structure.",
    "Ensure the project compiles successfully.",
  ],
  filescan_step_2_single: [
    "You can only upload a single file using this method.",
    "File size should not exceed 5 MB and must have a (.sol) extension.",
    "Do not compress the file into a zip.",
  ],
  filescan_step_2_multiple: [
    "Pack the file into a zip with the same folder structure as your project.",
    "Accepted file format: zip",
    "Include Solidity contracts, dependency configs, and framework configs.",
  ],
};

export const OauthName: { [key: string]: string } = {
  github: "GitHub",
  gitlab: "GitLab",
  bitbucket: "Bitbucket",
};

export const socialIconsList = [
  {
    imgUrl: "telegram",
    link: "https://t.me/solidityscan",
  },
  {
    imgUrl: "discord",
    link: "https://discord.com/invite/9HhV4hGENw",
  },
  {
    imgUrl: "twitter",
    link: "https://twitter.com/solidityscan",
  },
];

export const pieData = (
  critical: number,
  high: number,
  medium: number,
  low: number,
  informational: number,
  gas: number
) => [
  {
    id: "critical",
    label: "Critical",
    value: critical,
    color: "#960D00",
  },
  {
    id: "high",
    label: "High",
    value: high,
    color: "#FF5C00",
  },
  {
    id: "medium",
    label: "Medium",
    value: medium,
    color: "#FFE600",
  },
  {
    id: "low",
    label: "Low",
    value: low,
    color: "#38CB89",
  },
  {
    id: "informational",
    label: "Informational",
    value: informational,
    color: "#A0AEC0",
  },
  {
    id: "gas",
    label: "Gas",
    value: gas,
    color: "#F795B4",
  },
];

export const reportProjectDetails = [
  {
    label: "Language",
    value: "Solidity",
  },
  {
    label: "Audit Methodology",
    value: "Static Scanning",
  },
  {
    label: "Commit Hash",
    value: "git_commit_hash",
  },
  {
    label: "Website",
    value: "website",
  },
  {
    label: "Publishers/Owner Name",
    value: "report_owner",
  },
  {
    label: "Organization",
    value: "organization",
  },
  {
    label: "Contact Email",
    value: "email",
  },
];

export const reportBlockDetails = [
  {
    label: "Language",
    value: "Solidity",
  },
  {
    label: "Audit Methodology",
    value: "Static Scanning",
  },
  {
    label: "Contract Type",
    value: "Smart Contract",
  },
  {
    label: "Website",
    value: "website",
  },
  {
    label: "Publishers/Owner Name",
    value: "report_owner",
  },
  {
    label: "Organization",
    value: "organization",
  },
  {
    label: "Contact Email",
    value: "email",
  },
];
