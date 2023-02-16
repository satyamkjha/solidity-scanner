import { Plan } from "./types";

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
  { value: "wont_fix", icon: "wont_fix", label: "Won't Fix" },
  {
    value: "false_positive",
    icon: "false_positive",
    label: "False Positive",
  },
  { value: "pending_fix", icon: "pending_fix", label: "Reset Bug Status" },
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
      imgUrl: "/teams/shashank.jpeg",
      linkedinUrl: "https://www.linkedin.com/in/shashank-in/",
      twitterUrl: "https://twitter.com/cyberboyIndia",
    },
    {
      name: "Indranil Roy",
      designation: "CTO & Co-Founder",
      imgUrl: "/teams/indranil.jpeg",
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
    imageUrl: "/testimonials/gregory.jpeg",
    testimonial:
      "Thanks to Solidity Scan team for building a comprehensive vulnerability scanner for smart contracts that will help you protect contracts from potential scams. It helps you not only find bugs in source code, but conveniently manage reports with the dashboard from your account. It is a nice tool not only for investors to know about the security of the contract they are investing in, but also for audit teams who conduct security testing and want to expand their tools for contract analysis.",
  },
  {
    name: "Stefan Creadore",
    designation: "Founder and Lead Developer, Exzo Network",
    imageUrl: "/testimonials/stefan.svg",
    testimonial:
      "I highly recommend using SolidityScan for any development team as it will help projects of all sizes save money and scale their development efforts. I conducted a personal review of the results obtained from our audit from a leading manual audit firm and an automated audit from SolidityScan, the results were almost identical, which is why we have decided to continue working with SolidityScan. It saves weeks on our timelines for security auditing, and troubleshooting, and provides a smooth workflow to enhance development proficiency.",
  },
  {
    name: "Jon Greenwood",
    designation: "Integrations, GovernorDAO",
    imageUrl: "/testimonials/jon.svg",
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
};
