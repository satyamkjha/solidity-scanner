export const severityPriority: { [key: string]: number } = {
  "0": 10,
  critical: 10,
  high: 9,
  medium: 8,
  low: 7,
  informational: 6,
};

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
      imgUrl: "/shashank.jpeg",
      linkedinUrl: "https://www.linkedin.com/in/shashank-in/",
      twitterUrl: "https://twitter.com/cyberboyIndi",
    },
    {
      name: "Indranil Roy",
      designation: "CTO & Co-Founder",
      imgUrl: "/indranil.jpeg",
      linkedinUrl: "https://www.linkedin.com/in/itsmeroy2012/",
      twitterUrl: "https://twitter.com/itsmeroy2012",
    },
  ],
  line2: [
    {
      name: "Aditya D.",
      designation: "Research Team Lead",
      imgUrl: "/aditya.jpeg",
      linkedinUrl: "https://www.linkedin.com/in/ad17ya/",
      twitterUrl: "https://twitter.com/zombie007o",
    },
    {
      name: "Ayush Tripathi",
      designation: "Lead Backend Engineer",
      imgUrl: "/ayush.jpeg",
      linkedinUrl: "https://www.linkedin.com/in/ayush-tripathi51/",
      twitterUrl: "https://twitter.com/TripathiAyush5",
    },
    {
      name: "Satyam Kumar Jha",
      designation: "Frontend Engineer",
      imgUrl: "/satyam.jpg",
      linkedinUrl: "https://www.linkedin.com/in/satyamkjha/",
      twitterUrl: "",
    },
  ],
  line3: [
    {
      name: "Sankalp Pandey",
      designation: "Growth Lead",
      imgUrl: "/sankalp.jpeg",
      linkedinUrl: "https://www.linkedin.com/in/sky007/",
      twitterUrl: "https://twitter.com/SKY_Sankalp",
    },
    {
      name: "Siddharth Neekher",
      designation: "UI/UX Designer",
      imgUrl: "/siddarth.jpeg",
      linkedinUrl: "https://www.linkedin.com/in/siddharth-neekher-340519117/",
      twitterUrl: "https://twitter.com/sidartdigital",
    },
  ],
};

export const userTestimonials = [
  {
    name: "Vitaly Dmitriyevich",
    designation: "Co-Founder Ethereum",
    testimonial:
      "Awesome tool! I am super happy with everything about this product. Its’s a little taste of everything all in one box.",
  },
  {
    name: "Vitaly Dmitriyevich",
    designation: "Co-Founder Ethereum",
    testimonial:
      "Awesome tool! I am super happy with everything about this product. Its’s a little taste of everything all in one box.",
  },
  {
    name: "Vitaly Dmitriyevich",
    designation: "Co-Founder Ethereum",
    testimonial:
      "Awesome tool! I am super happy with everything about this product. Its’s a little taste of everything all in one box.",
  },
  {
    name: "Vitaly Dmitriyevich",
    designation: "Co-Founder Ethereum",
    testimonial:
      "Awesome tool! I am super happy with everything about this product. Its’s a little taste of everything all in one box.",
  },
  {
    name: "Vitaly Dmitriyevich",
    designation: "Co-Founder Ethereum",
    testimonial:
      "Awesome tool! I am super happy with everything about this product. Its’s a little taste of everything all in one box.",
  },
];
