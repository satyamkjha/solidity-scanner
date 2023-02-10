import { useQuery } from "react-query";

import API from "helpers/api";
import { Report } from "common/types";
import { API_PATH } from "helpers/routeManager";

const getReport = async (project_id: string, report_id: string) => {
  const { data } = await API.post<{ summary_report: Report }>(
    API_PATH.API_GET_REPORT_BETA,
    {
      project_id,
      report_id,
    }
  );
  return data;
};

export const useReport = (project_id: string, report_id: string) => {
  return useQuery(["report-detail", project_id, report_id], () =>
    getReport(project_id, report_id)
  );
};

// {
//   "summary_report": {
//       "SOLIDITY_ADDRESS_HARDCODED": {
//           "issue_details": [
//               {
//                   "bug_hash": "Kyqd4oyKxJC0aL93M6p7srgROc0=",
//                   "bug_id": "SS_272_120",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/InvestorActorMock.sol",
//                           "line_nos_end": [22],
//                           "line_nos_start": [22]
//                       }
//                   ],
//                   "issue_confidence": "0",
//                   "issue_description": "<p>The contract contains an unknown hard-coded address. This address might be used for some malicious activity. Please check the hard-coded address and its usage.\n\nThese hard-coded addresses may be used everywhere throughout the code to define states and interact with the functions and external calls.\n\nTherefore, it is extremely crucial to ensure the correctness of these token contracts as they define various important aspects of the protocol operation.\n\nA misconfigured address mapping could lead to the potential loss of user funds or compromise of the contract owner depending on the function logic.\n\nThe following hard-coded addresses were found - <code>0x1</code></p>",
//                   "issue_name": "HARD-CODED ADDRESS DETECTED",
//                   "issue_remediation": "<p>It is required to check the address. Also, it is required to check the code of the called contract for vulnerabilities.\n\nEnsure that the contract validates if there's an address or a code change or test cases to validate if the address is correct.</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "cdovgiRuH0RmRF8Acod0cw5_WOg=",
//                   "bug_id": "SS_272_121",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [30],
//                           "line_nos_start": [30]
//                       }
//                   ],
//                   "issue_confidence": "0",
//                   "issue_description": "<p>The contract contains an unknown hard-coded address. This address might be used for some malicious activity. Please check the hard-coded address and its usage.\n\nThese hard-coded addresses may be used everywhere throughout the code to define states and interact with the functions and external calls.\n\nTherefore, it is extremely crucial to ensure the correctness of these token contracts as they define various important aspects of the protocol operation.\n\nA misconfigured address mapping could lead to the potential loss of user funds or compromise of the contract owner depending on the function logic.\n\nThe following hard-coded addresses were found - <code>0x80294E2FA1c0957bFDE20164B394d5053a7c710E</code></p>",
//                   "issue_name": "HARD-CODED ADDRESS DETECTED",
//                   "issue_remediation": "<p>It is required to check the address. Also, it is required to check the code of the called contract for vulnerabilities.\n\nEnsure that the contract validates if there's an address or a code change or test cases to validate if the address is correct.</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "XzHElBFEAz85P9W7poCwYrhSHjA=",
//                   "bug_id": "SS_272_122",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [36],
//                           "line_nos_start": [36]
//                       }
//                   ],
//                   "issue_confidence": "0",
//                   "issue_description": "<p>The contract contains an unknown hard-coded address. This address might be used for some malicious activity. Please check the hard-coded address and its usage.\n\nThese hard-coded addresses may be used everywhere throughout the code to define states and interact with the functions and external calls.\n\nTherefore, it is extremely crucial to ensure the correctness of these token contracts as they define various important aspects of the protocol operation.\n\nA misconfigured address mapping could lead to the potential loss of user funds or compromise of the contract owner depending on the function logic.\n\nThe following hard-coded addresses were found - <code>0x25e0D02eAD94b924bB6ef7FDF21741bc5E51d511</code></p>",
//                   "issue_name": "HARD-CODED ADDRESS DETECTED",
//                   "issue_remediation": "<p>It is required to check the address. Also, it is required to check the code of the called contract for vulnerabilities.\n\nEnsure that the contract validates if there's an address or a code change or test cases to validate if the address is correct.</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "Wx55-uAX_gQ-4D9Uzc53FqODj04=",
//                   "bug_id": "SS_272_123",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [42],
//                           "line_nos_start": [42]
//                       }
//                   ],
//                   "issue_confidence": "0",
//                   "issue_description": "<p>The contract contains an unknown hard-coded address. This address might be used for some malicious activity. Please check the hard-coded address and its usage.\n\nThese hard-coded addresses may be used everywhere throughout the code to define states and interact with the functions and external calls.\n\nTherefore, it is extremely crucial to ensure the correctness of these token contracts as they define various important aspects of the protocol operation.\n\nA misconfigured address mapping could lead to the potential loss of user funds or compromise of the contract owner depending on the function logic.\n\nThe following hard-coded addresses were found - <code>0x6D2e97D3f1d4163a6b6353cc687702089A304e40</code></p>",
//                   "issue_name": "HARD-CODED ADDRESS DETECTED",
//                   "issue_remediation": "<p>It is required to check the address. Also, it is required to check the code of the called contract for vulnerabilities.\n\nEnsure that the contract validates if there's an address or a code change or test cases to validate if the address is correct.</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "yi7VCCl07hxzfxN6bQsn47JIJxQ=",
//                   "bug_id": "SS_272_124",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [49],
//                           "line_nos_start": [49]
//                       }
//                   ],
//                   "issue_confidence": "0",
//                   "issue_description": "<p>The contract contains an unknown hard-coded address. This address might be used for some malicious activity. Please check the hard-coded address and its usage.\n\nThese hard-coded addresses may be used everywhere throughout the code to define states and interact with the functions and external calls.\n\nTherefore, it is extremely crucial to ensure the correctness of these token contracts as they define various important aspects of the protocol operation.\n\nA misconfigured address mapping could lead to the potential loss of user funds or compromise of the contract owner depending on the function logic.\n\nThe following hard-coded addresses were found - <code>0x2937B8c223012409590E18dBb4E40e4c5dBa8DC0</code></p>",
//                   "issue_name": "HARD-CODED ADDRESS DETECTED",
//                   "issue_remediation": "<p>It is required to check the address. Also, it is required to check the code of the called contract for vulnerabilities.\n\nEnsure that the contract validates if there's an address or a code change or test cases to validate if the address is correct.</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "pA_r5jk4_q4Ta7owRhlMEdKAELg=",
//                   "bug_id": "SS_272_125",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [60],
//                           "line_nos_start": [60]
//                       }
//                   ],
//                   "issue_confidence": "0",
//                   "issue_description": "<p>The contract contains an unknown hard-coded address. This address might be used for some malicious activity. Please check the hard-coded address and its usage.\n\nThese hard-coded addresses may be used everywhere throughout the code to define states and interact with the functions and external calls.\n\nTherefore, it is extremely crucial to ensure the correctness of these token contracts as they define various important aspects of the protocol operation.\n\nA misconfigured address mapping could lead to the potential loss of user funds or compromise of the contract owner depending on the function logic.\n\nThe following hard-coded addresses were found - <code>0x3a9D1b804410DCBe7A888EBb4C354f84676Cc82c</code></p>",
//                   "issue_name": "HARD-CODED ADDRESS DETECTED",
//                   "issue_remediation": "<p>It is required to check the address. Also, it is required to check the code of the called contract for vulnerabilities.\n\nEnsure that the contract validates if there's an address or a code change or test cases to validate if the address is correct.</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "0i_kYJ2Ms40rvirFsps7XWlmiDI=",
//                   "bug_id": "SS_272_126",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [67],
//                           "line_nos_start": [67]
//                       }
//                   ],
//                   "issue_confidence": "0",
//                   "issue_description": "<p>The contract contains an unknown hard-coded address. This address might be used for some malicious activity. Please check the hard-coded address and its usage.\n\nThese hard-coded addresses may be used everywhere throughout the code to define states and interact with the functions and external calls.\n\nTherefore, it is extremely crucial to ensure the correctness of these token contracts as they define various important aspects of the protocol operation.\n\nA misconfigured address mapping could lead to the potential loss of user funds or compromise of the contract owner depending on the function logic.\n\nThe following hard-coded addresses were found - <code>0x288f14fDBE49653B268358718189320F54f667Bc</code></p>",
//                   "issue_name": "HARD-CODED ADDRESS DETECTED",
//                   "issue_remediation": "<p>It is required to check the address. Also, it is required to check the code of the called contract for vulnerabilities.\n\nEnsure that the contract validates if there's an address or a code change or test cases to validate if the address is correct.</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "I0Vwo_J59d2ffkaZgedicX0kqqo=",
//                   "bug_id": "SS_272_127",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [74],
//                           "line_nos_start": [74]
//                       }
//                   ],
//                   "issue_confidence": "0",
//                   "issue_description": "<p>The contract contains an unknown hard-coded address. This address might be used for some malicious activity. Please check the hard-coded address and its usage.\n\nThese hard-coded addresses may be used everywhere throughout the code to define states and interact with the functions and external calls.\n\nTherefore, it is extremely crucial to ensure the correctness of these token contracts as they define various important aspects of the protocol operation.\n\nA misconfigured address mapping could lead to the potential loss of user funds or compromise of the contract owner depending on the function logic.\n\nThe following hard-coded addresses were found - <code>0xA1871D9309BaDc85f5c9cDa8cbE102e786B0fcA8</code></p>",
//                   "issue_name": "HARD-CODED ADDRESS DETECTED",
//                   "issue_remediation": "<p>It is required to check the address. Also, it is required to check the code of the called contract for vulnerabilities.\n\nEnsure that the contract validates if there's an address or a code change or test cases to validate if the address is correct.</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "iwj-mrUweVz-N6dSs7RqafgJZNg=",
//                   "bug_id": "SS_272_128",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [81],
//                           "line_nos_start": [81]
//                       }
//                   ],
//                   "issue_confidence": "0",
//                   "issue_description": "<p>The contract contains an unknown hard-coded address. This address might be used for some malicious activity. Please check the hard-coded address and its usage.\n\nThese hard-coded addresses may be used everywhere throughout the code to define states and interact with the functions and external calls.\n\nTherefore, it is extremely crucial to ensure the correctness of these token contracts as they define various important aspects of the protocol operation.\n\nA misconfigured address mapping could lead to the potential loss of user funds or compromise of the contract owner depending on the function logic.\n\nThe following hard-coded addresses were found - <code>0x4b87894E668d4b5c8FeeD58dAA3F665c2B39A25E</code></p>",
//                   "issue_name": "HARD-CODED ADDRESS DETECTED",
//                   "issue_remediation": "<p>It is required to check the address. Also, it is required to check the code of the called contract for vulnerabilities.\n\nEnsure that the contract validates if there's an address or a code change or test cases to validate if the address is correct.</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "PoHMuuDLtgv-kOO1Hd-qwYIssUg=",
//                   "bug_id": "SS_272_129",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [88],
//                           "line_nos_start": [88]
//                       }
//                   ],
//                   "issue_confidence": "0",
//                   "issue_description": "<p>The contract contains an unknown hard-coded address. This address might be used for some malicious activity. Please check the hard-coded address and its usage.\n\nThese hard-coded addresses may be used everywhere throughout the code to define states and interact with the functions and external calls.\n\nTherefore, it is extremely crucial to ensure the correctness of these token contracts as they define various important aspects of the protocol operation.\n\nA misconfigured address mapping could lead to the potential loss of user funds or compromise of the contract owner depending on the function logic.\n\nThe following hard-coded addresses were found - <code>0x3545CCC8Fbe7f1e1C32875d0006Fcf6C0E7Eb3D4</code></p>",
//                   "issue_name": "HARD-CODED ADDRESS DETECTED",
//                   "issue_remediation": "<p>It is required to check the address. Also, it is required to check the code of the called contract for vulnerabilities.\n\nEnsure that the contract validates if there's an address or a code change or test cases to validate if the address is correct.</p>",
//                   "severity": "informational"
//               }
//           ],
//           "issue_id": "SOLIDITY_ADDRESS_HARDCODED",
//           "issue_name": "HARD-CODED ADDRESS DETECTED"
//       },
//       "SOLIDITY_BLOCK_PROXY_FOR_TIME": {
//           "issue_details": [
//               {
//                   "bug_hash": "CezY25ZdyPLjzlHmUqf4j5s6W2k=",
//                   "bug_id": "SS_272_54",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [145],
//                           "line_nos_start": [145]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Contracts often need access to time values to perform certain types of functionality. Values such as <code>block.timestamp</code> and <code>block.number</code> can be used to determine the current time or the time delta. However, they are not recommended for most use cases.</p><br /><p>For <code>block.number</code>, as Ethereum block times are generally around 14 seconds, the delta between blocks can be predicted. The block times, on the other hand, do not remain constant and are subject to change for a number of reasons, e.g., fork reorganizations and the difficulty bomb. </p><br /><p>Due to variable block times, <code>block.number</code> should not be relied on for precise calculations of time.</p>",
//                   "issue_name": "BLOCK VALUES AS A PROXY FOR TIME",
//                   "issue_remediation": "<p>Smart contracts should be written with the idea that block values are not precise, and their use can have unexpected results. Alternatively, oracles can be used.</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "OH2GFY5q3mptMlJjhTy53SgIZCI=",
//                   "bug_id": "SS_272_55",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [205],
//                           "line_nos_start": [205]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Contracts often need access to time values to perform certain types of functionality. Values such as <code>block.timestamp</code> and <code>block.number</code> can be used to determine the current time or the time delta. However, they are not recommended for most use cases.</p><br /><p>For <code>block.number</code>, as Ethereum block times are generally around 14 seconds, the delta between blocks can be predicted. The block times, on the other hand, do not remain constant and are subject to change for a number of reasons, e.g., fork reorganizations and the difficulty bomb. </p><br /><p>Due to variable block times, <code>block.number</code> should not be relied on for precise calculations of time.</p>",
//                   "issue_name": "BLOCK VALUES AS A PROXY FOR TIME",
//                   "issue_remediation": "<p>Smart contracts should be written with the idea that block values are not precise, and their use can have unexpected results. Alternatively, oracles can be used.</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "3mPJA4ZUvaMae5wtwSJfgbsNmaQ=",
//                   "bug_id": "SS_272_56",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [223],
//                           "line_nos_start": [223]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Contracts often need access to time values to perform certain types of functionality. Values such as <code>block.timestamp</code> and <code>block.number</code> can be used to determine the current time or the time delta. However, they are not recommended for most use cases.</p><br /><p>For <code>block.number</code>, as Ethereum block times are generally around 14 seconds, the delta between blocks can be predicted. The block times, on the other hand, do not remain constant and are subject to change for a number of reasons, e.g., fork reorganizations and the difficulty bomb. </p><br /><p>Due to variable block times, <code>block.number</code> should not be relied on for precise calculations of time.</p>",
//                   "issue_name": "BLOCK VALUES AS A PROXY FOR TIME",
//                   "issue_remediation": "<p>Smart contracts should be written with the idea that block values are not precise, and their use can have unexpected results. Alternatively, oracles can be used.</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "3mPJA4ZUvaMae5wtwSJfgbsNmaQ=",
//                   "bug_id": "SS_272_56",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [239],
//                           "line_nos_start": [239]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Contracts often need access to time values to perform certain types of functionality. Values such as <code>block.timestamp</code> and <code>block.number</code> can be used to determine the current time or the time delta. However, they are not recommended for most use cases.</p><br /><p>For <code>block.number</code>, as Ethereum block times are generally around 14 seconds, the delta between blocks can be predicted. The block times, on the other hand, do not remain constant and are subject to change for a number of reasons, e.g., fork reorganizations and the difficulty bomb. </p><br /><p>Due to variable block times, <code>block.number</code> should not be relied on for precise calculations of time.</p>",
//                   "issue_name": "BLOCK VALUES AS A PROXY FOR TIME",
//                   "issue_remediation": "<p>Smart contracts should be written with the idea that block values are not precise, and their use can have unexpected results. Alternatively, oracles can be used.</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "wMIoakgZgr3BHITP_XaqaG7t1wQ=",
//                   "bug_id": "SS_272_57",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [22],
//                           "line_nos_start": [22]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Contracts often need access to time values to perform certain types of functionality. Values such as <code>block.timestamp</code> and <code>block.number</code> can be used to determine the current time or the time delta. However, they are not recommended for most use cases.</p><br /><p>For <code>block.number</code>, as Ethereum block times are generally around 14 seconds, the delta between blocks can be predicted. The block times, on the other hand, do not remain constant and are subject to change for a number of reasons, e.g., fork reorganizations and the difficulty bomb. </p><br /><p>Due to variable block times, <code>block.number</code> should not be relied on for precise calculations of time.</p>",
//                   "issue_name": "BLOCK VALUES AS A PROXY FOR TIME",
//                   "issue_remediation": "<p>Smart contracts should be written with the idea that block values are not precise, and their use can have unexpected results. Alternatively, oracles can be used.</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "kaIT9jMgxpICmRa-2Bk-HQC1sMI=",
//                   "bug_id": "SS_272_58",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [100],
//                           "line_nos_start": [100]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Contracts often need access to time values to perform certain types of functionality. Values such as <code>block.timestamp</code> and <code>block.number</code> can be used to determine the current time or the time delta. However, they are not recommended for most use cases.</p><br /><p>For <code>block.number</code>, as Ethereum block times are generally around 14 seconds, the delta between blocks can be predicted. The block times, on the other hand, do not remain constant and are subject to change for a number of reasons, e.g., fork reorganizations and the difficulty bomb. </p><br /><p>Due to variable block times, <code>block.number</code> should not be relied on for precise calculations of time.</p>",
//                   "issue_name": "BLOCK VALUES AS A PROXY FOR TIME",
//                   "issue_remediation": "<p>Smart contracts should be written with the idea that block values are not precise, and their use can have unexpected results. Alternatively, oracles can be used.</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "J3PJpAbBUojazH6bgliJdSS0d6o=",
//                   "bug_id": "SS_272_59",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [105],
//                           "line_nos_start": [105]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Contracts often need access to time values to perform certain types of functionality. Values such as <code>block.timestamp</code> and <code>block.number</code> can be used to determine the current time or the time delta. However, they are not recommended for most use cases.</p><br /><p>For <code>block.number</code>, as Ethereum block times are generally around 14 seconds, the delta between blocks can be predicted. The block times, on the other hand, do not remain constant and are subject to change for a number of reasons, e.g., fork reorganizations and the difficulty bomb. </p><br /><p>Due to variable block times, <code>block.number</code> should not be relied on for precise calculations of time.</p>",
//                   "issue_name": "BLOCK VALUES AS A PROXY FOR TIME",
//                   "issue_remediation": "<p>Smart contracts should be written with the idea that block values are not precise, and their use can have unexpected results. Alternatively, oracles can be used.</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "XQakvqZU1iw8HaNn7kk67A1wR2A=",
//                   "bug_id": "SS_272_60",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [120],
//                           "line_nos_start": [120]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Contracts often need access to time values to perform certain types of functionality. Values such as <code>block.timestamp</code> and <code>block.number</code> can be used to determine the current time or the time delta. However, they are not recommended for most use cases.</p><br /><p>For <code>block.number</code>, as Ethereum block times are generally around 14 seconds, the delta between blocks can be predicted. The block times, on the other hand, do not remain constant and are subject to change for a number of reasons, e.g., fork reorganizations and the difficulty bomb. </p><br /><p>Due to variable block times, <code>block.number</code> should not be relied on for precise calculations of time.</p>",
//                   "issue_name": "BLOCK VALUES AS A PROXY FOR TIME",
//                   "issue_remediation": "<p>Smart contracts should be written with the idea that block values are not precise, and their use can have unexpected results. Alternatively, oracles can be used.</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "343qrpocpkVuMRXeEr3-buVYIGQ=",
//                   "bug_id": "SS_272_61",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TimedCrowdsale.sol",
//                           "line_nos_end": [41],
//                           "line_nos_start": [41]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Contracts often need access to time values to perform certain types of functionality. Values such as <code>block.timestamp</code> and <code>block.number</code> can be used to determine the current time or the time delta. However, they are not recommended for most use cases.</p><br /><p>For <code>block.number</code>, as Ethereum block times are generally around 14 seconds, the delta between blocks can be predicted. The block times, on the other hand, do not remain constant and are subject to change for a number of reasons, e.g., fork reorganizations and the difficulty bomb. </p><br /><p>Due to variable block times, <code>block.number</code> should not be relied on for precise calculations of time.</p>",
//                   "issue_name": "BLOCK VALUES AS A PROXY FOR TIME",
//                   "issue_remediation": "<p>Smart contracts should be written with the idea that block values are not precise, and their use can have unexpected results. Alternatively, oracles can be used.</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "eCc2bf9zQIbCCBW6rpua5Uv7TDc=",
//                   "bug_id": "SS_272_62",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TimedCrowdsale.sol",
//                           "line_nos_end": [74],
//                           "line_nos_start": [74]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Contracts often need access to time values to perform certain types of functionality. Values such as <code>block.timestamp</code> and <code>block.number</code> can be used to determine the current time or the time delta. However, they are not recommended for most use cases.</p><br /><p>For <code>block.number</code>, as Ethereum block times are generally around 14 seconds, the delta between blocks can be predicted. The block times, on the other hand, do not remain constant and are subject to change for a number of reasons, e.g., fork reorganizations and the difficulty bomb. </p><br /><p>Due to variable block times, <code>block.number</code> should not be relied on for precise calculations of time.</p>",
//                   "issue_name": "BLOCK VALUES AS A PROXY FOR TIME",
//                   "issue_remediation": "<p>Smart contracts should be written with the idea that block values are not precise, and their use can have unexpected results. Alternatively, oracles can be used.</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "XbvvBZbKM-iz8BeciK3LRmty8QI=",
//                   "bug_id": "SS_272_63",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TimedCrowdsale.sol",
//                           "line_nos_end": [83],
//                           "line_nos_start": [83]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Contracts often need access to time values to perform certain types of functionality. Values such as <code>block.timestamp</code> and <code>block.number</code> can be used to determine the current time or the time delta. However, they are not recommended for most use cases.</p><br /><p>For <code>block.number</code>, as Ethereum block times are generally around 14 seconds, the delta between blocks can be predicted. The block times, on the other hand, do not remain constant and are subject to change for a number of reasons, e.g., fork reorganizations and the difficulty bomb. </p><br /><p>Due to variable block times, <code>block.number</code> should not be relied on for precise calculations of time.</p>",
//                   "issue_name": "BLOCK VALUES AS A PROXY FOR TIME",
//                   "issue_remediation": "<p>Smart contracts should be written with the idea that block values are not precise, and their use can have unexpected results. Alternatively, oracles can be used.</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "2h3jUw1i3Tjurg8maUzTR8wGc54=",
//                   "bug_id": "SS_272_64",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [349],
//                           "line_nos_start": [349]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Contracts often need access to time values to perform certain types of functionality. Values such as <code>block.timestamp</code> and <code>block.number</code> can be used to determine the current time or the time delta. However, they are not recommended for most use cases.</p><br /><p>For <code>block.number</code>, as Ethereum block times are generally around 14 seconds, the delta between blocks can be predicted. The block times, on the other hand, do not remain constant and are subject to change for a number of reasons, e.g., fork reorganizations and the difficulty bomb. </p><br /><p>Due to variable block times, <code>block.number</code> should not be relied on for precise calculations of time.</p>",
//                   "issue_name": "BLOCK VALUES AS A PROXY FOR TIME",
//                   "issue_remediation": "<p>Smart contracts should be written with the idea that block values are not precise, and their use can have unexpected results. Alternatively, oracles can be used.</p>",
//                   "severity": "informational"
//               }
//           ],
//           "issue_id": "SOLIDITY_BLOCK_PROXY_FOR_TIME",
//           "issue_name": "BLOCK VALUES AS A PROXY FOR TIME"
//       },
//       "SOLIDITY_BOOLEAN_EQUALITY": {
//           "issue_details": [
//               {
//                   "bug_hash": "r-h0RnVWU9T0atW00THm8VLsxUI=",
//                   "bug_id": "SS_272_1",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [195],
//                           "line_nos_start": [195]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>In Solidity, and many other languages, boolean constants can be used directly in conditionals like if and else statements.\nThe contract was found to be equating constants in conditionals which is unnecessary.</p>",
//                   "issue_name": "BOOLEAN EQUALITY",
//                   "issue_remediation": "<p>It is recommended to directly use boolean constants. It is not required to equate them to true or false.</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "l3Pal_UufWLZHAK2vBNpTUihYfI=",
//                   "bug_id": "SS_272_2",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [329],
//                           "line_nos_start": [329]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>In Solidity, and many other languages, boolean constants can be used directly in conditionals like if and else statements.\nThe contract was found to be equating constants in conditionals which is unnecessary.</p>",
//                   "issue_name": "BOOLEAN EQUALITY",
//                   "issue_remediation": "<p>It is recommended to directly use boolean constants. It is not required to equate them to true or false.</p>",
//                   "severity": "informational"
//               }
//           ],
//           "issue_id": "SOLIDITY_BOOLEAN_EQUALITY",
//           "issue_name": "BOOLEAN EQUALITY"
//       },
//       "SOLIDITY_CHEAPER_INEQUALITIES_IN_IF": {
//           "issue_details": [
//               {
//                   "bug_hash": "hnCIHih92kulpcvSsviQWCYpg2E=",
//                   "bug_id": "SS_272_465",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/test/invariants/STETHVaultInvariants.sol",
//                           "line_nos_end": [99],
//                           "line_nos_start": [99]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be doing comparisons using inequalities inside the if statement.\nWhen inside the if statements, non-strict inequalities (>=, <=) are usually cheaper than the strict equalities (>, <).</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN IF()",
//                   "issue_remediation": "<p> It is recommended to go through the code logic, and, if possible, modify the strict inequalities with the non-strict ones to save ~3 gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "EwbDhspzamGd1nHrj-m1xCM5u1c=",
//                   "bug_id": "SS_272_466",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/test/invariants/STETHVaultInvariants.sol",
//                           "line_nos_end": [126],
//                           "line_nos_start": [126]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be doing comparisons using inequalities inside the if statement.\nWhen inside the if statements, non-strict inequalities (>=, <=) are usually cheaper than the strict equalities (>, <).</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN IF()",
//                   "issue_remediation": "<p> It is recommended to go through the code logic, and, if possible, modify the strict inequalities with the non-strict ones to save ~3 gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "O1PEYKRI2PB-46I8ACXY-wbugRc=",
//                   "bug_id": "SS_272_467",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/test/invariants/STETHVaultInvariants.sol",
//                           "line_nos_end": [144],
//                           "line_nos_start": [144]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be doing comparisons using inequalities inside the if statement.\nWhen inside the if statements, non-strict inequalities (>=, <=) are usually cheaper than the strict equalities (>, <).</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN IF()",
//                   "issue_remediation": "<p> It is recommended to go through the code logic, and, if possible, modify the strict inequalities with the non-strict ones to save ~3 gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "Fp9oZiuU43g_FDyucr6BsuD0QmU=",
//                   "bug_id": "SS_272_468",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/DepositQueueLib.sol",
//                           "line_nos_end": [31],
//                           "line_nos_start": [31]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be doing comparisons using inequalities inside the if statement.\nWhen inside the if statements, non-strict inequalities (>=, <=) are usually cheaper than the strict equalities (>, <).</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN IF()",
//                   "issue_remediation": "<p> It is recommended to go through the code logic, and, if possible, modify the strict inequalities with the non-strict ones to save ~3 gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "T_EjL5K19Mf5hwVInmaQO60UwC0=",
//                   "bug_id": "SS_272_469",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/DepositQueueLib.sol",
//                           "line_nos_end": [33],
//                           "line_nos_start": [33]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be doing comparisons using inequalities inside the if statement.\nWhen inside the if statements, non-strict inequalities (>=, <=) are usually cheaper than the strict equalities (>, <).</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN IF()",
//                   "issue_remediation": "<p> It is recommended to go through the code logic, and, if possible, modify the strict inequalities with the non-strict ones to save ~3 gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "KkeaOegA5-3XatGdsEW4FPDgnYs=",
//                   "bug_id": "SS_272_470",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/DepositQueueLib.sol",
//                           "line_nos_end": [46],
//                           "line_nos_start": [46]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be doing comparisons using inequalities inside the if statement.\nWhen inside the if statements, non-strict inequalities (>=, <=) are usually cheaper than the strict equalities (>, <).</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN IF()",
//                   "issue_remediation": "<p> It is recommended to go through the code logic, and, if possible, modify the strict inequalities with the non-strict ones to save ~3 gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "qXVCNoS4CHzUywAWsFNl9UzVzLE=",
//                   "bug_id": "SS_272_471",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/TransferUtils.sol",
//                           "line_nos_end": [30],
//                           "line_nos_start": [30]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be doing comparisons using inequalities inside the if statement.\nWhen inside the if statements, non-strict inequalities (>=, <=) are usually cheaper than the strict equalities (>, <).</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN IF()",
//                   "issue_remediation": "<p> It is recommended to go through the code logic, and, if possible, modify the strict inequalities with the non-strict ones to save ~3 gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "2-7sDRoeVJT3FIHmyewisuLrmjc=",
//                   "bug_id": "SS_272_472",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/STETHVault.sol",
//                           "line_nos_end": [110],
//                           "line_nos_start": [110]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be doing comparisons using inequalities inside the if statement.\nWhen inside the if statements, non-strict inequalities (>=, <=) are usually cheaper than the strict equalities (>, <).</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN IF()",
//                   "issue_remediation": "<p> It is recommended to go through the code logic, and, if possible, modify the strict inequalities with the non-strict ones to save ~3 gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "ZOJuMSQI5zfaSBpm0YMYQtsB7hA=",
//                   "bug_id": "SS_272_473",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/STETHVault.sol",
//                           "line_nos_end": [116],
//                           "line_nos_start": [116]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be doing comparisons using inequalities inside the if statement.\nWhen inside the if statements, non-strict inequalities (>=, <=) are usually cheaper than the strict equalities (>, <).</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN IF()",
//                   "issue_remediation": "<p> It is recommended to go through the code logic, and, if possible, modify the strict inequalities with the non-strict ones to save ~3 gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "U2lLpa3tJ6cRfAz8DTwsZ6loOTw=",
//                   "bug_id": "SS_272_474",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mixins/Capped.sol",
//                           "line_nos_end": [31],
//                           "line_nos_start": [31]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be doing comparisons using inequalities inside the if statement.\nWhen inside the if statements, non-strict inequalities (>=, <=) are usually cheaper than the strict equalities (>, <).</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN IF()",
//                   "issue_remediation": "<p> It is recommended to go through the code logic, and, if possible, modify the strict inequalities with the non-strict ones to save ~3 gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "9EPbocyX1RSWwkc4BoDFsJNLG5Y=",
//                   "bug_id": "SS_272_475",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/YieldVaultMock.sol",
//                           "line_nos_end": [28],
//                           "line_nos_start": [28]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be doing comparisons using inequalities inside the if statement.\nWhen inside the if statements, non-strict inequalities (>=, <=) are usually cheaper than the strict equalities (>, <).</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN IF()",
//                   "issue_remediation": "<p> It is recommended to go through the code logic, and, if possible, modify the strict inequalities with the non-strict ones to save ~3 gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "DywUFp6ol_9uRN1l8h6JDMSgD5k=",
//                   "bug_id": "SS_272_476",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/PrincipalProtectedMock.sol",
//                           "line_nos_end": [47],
//                           "line_nos_start": [47]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be doing comparisons using inequalities inside the if statement.\nWhen inside the if statements, non-strict inequalities (>=, <=) are usually cheaper than the strict equalities (>, <).</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN IF()",
//                   "issue_remediation": "<p> It is recommended to go through the code logic, and, if possible, modify the strict inequalities with the non-strict ones to save ~3 gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "ZoS6o3-sVlbIVNnwubWsKhLJQu8=",
//                   "bug_id": "SS_272_477",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/PrincipalProtectedMock.sol",
//                           "line_nos_end": [75],
//                           "line_nos_start": [75]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be doing comparisons using inequalities inside the if statement.\nWhen inside the if statements, non-strict inequalities (>=, <=) are usually cheaper than the strict equalities (>, <).</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN IF()",
//                   "issue_remediation": "<p> It is recommended to go through the code logic, and, if possible, modify the strict inequalities with the non-strict ones to save ~3 gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "Kwg5_uwLcjatosAbt4BssY7m0-k=",
//                   "bug_id": "SS_272_478",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/PrincipalProtectedMock.sol",
//                           "line_nos_end": [81],
//                           "line_nos_start": [81]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be doing comparisons using inequalities inside the if statement.\nWhen inside the if statements, non-strict inequalities (>=, <=) are usually cheaper than the strict equalities (>, <).</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN IF()",
//                   "issue_remediation": "<p> It is recommended to go through the code logic, and, if possible, modify the strict inequalities with the non-strict ones to save ~3 gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "nht_U4tY_X54j6-LtyCrp3dugR4=",
//                   "bug_id": "SS_272_479",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/PrincipalProtectedMock.sol",
//                           "line_nos_end": [88],
//                           "line_nos_start": [88]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be doing comparisons using inequalities inside the if statement.\nWhen inside the if statements, non-strict inequalities (>=, <=) are usually cheaper than the strict equalities (>, <).</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN IF()",
//                   "issue_remediation": "<p> It is recommended to go through the code logic, and, if possible, modify the strict inequalities with the non-strict ones to save ~3 gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "BKvtAMkFHIdqsvqhOMwqQfDGAwA=",
//                   "bug_id": "SS_272_480",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [81],
//                           "line_nos_start": [81]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be doing comparisons using inequalities inside the if statement.\nWhen inside the if statements, non-strict inequalities (>=, <=) are usually cheaper than the strict equalities (>, <).</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN IF()",
//                   "issue_remediation": "<p> It is recommended to go through the code logic, and, if possible, modify the strict inequalities with the non-strict ones to save ~3 gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "ezsEAuo79GY2OZgH-BhMJji4wLU=",
//                   "bug_id": "SS_272_481",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [106],
//                           "line_nos_start": [106]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be doing comparisons using inequalities inside the if statement.\nWhen inside the if statements, non-strict inequalities (>=, <=) are usually cheaper than the strict equalities (>, <).</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN IF()",
//                   "issue_remediation": "<p> It is recommended to go through the code logic, and, if possible, modify the strict inequalities with the non-strict ones to save ~3 gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "N6TC2DTRsxLe_9FHwMKfYpcKPNM=",
//                   "bug_id": "SS_272_482",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [197],
//                           "line_nos_start": [197]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be doing comparisons using inequalities inside the if statement.\nWhen inside the if statements, non-strict inequalities (>=, <=) are usually cheaper than the strict equalities (>, <).</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN IF()",
//                   "issue_remediation": "<p> It is recommended to go through the code logic, and, if possible, modify the strict inequalities with the non-strict ones to save ~3 gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "LPpdH_E4ch8njcrJ-xCRjWYpQPo=",
//                   "bug_id": "SS_272_483",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [329],
//                           "line_nos_start": [329]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be doing comparisons using inequalities inside the if statement.\nWhen inside the if statements, non-strict inequalities (>=, <=) are usually cheaper than the strict equalities (>, <).</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN IF()",
//                   "issue_remediation": "<p> It is recommended to go through the code logic, and, if possible, modify the strict inequalities with the non-strict ones to save ~3 gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               }
//           ],
//           "issue_id": "SOLIDITY_CHEAPER_INEQUALITIES_IN_IF",
//           "issue_name": "CHEAPER INEQUALITIES IN IF()"
//       },
//       "SOLIDITY_CHEAPER_INEQUALITIES_IN_REQUIRE": {
//           "issue_details": [
//               {
//                   "bug_hash": "8W9KmGfqk8j8YCod43ppsFlTvJs=",
//                   "bug_id": "SS_272_484",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [86],
//                           "line_nos_start": [86]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be performing comparisons using inequalities inside the <code>require</code> statement. When inside the <code>require</code> statements, non-strict inequalities <code>(>=, <=)</code> are usually costlier than strict equalities <code>(>, <)</code>.</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN REQUIRE()",
//                   "issue_remediation": "<p>It is recommended to go through the code logic, and, if possible, modify the non-strict inequalities with the strict ones to save <code>~3</code> gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "CHMBOqzaG2_IUa2pfDasPvbhnQ0=",
//                   "bug_id": "SS_272_485",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [97],
//                           "line_nos_start": [97]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be performing comparisons using inequalities inside the <code>require</code> statement. When inside the <code>require</code> statements, non-strict inequalities <code>(>=, <=)</code> are usually costlier than strict equalities <code>(>, <)</code>.</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN REQUIRE()",
//                   "issue_remediation": "<p>It is recommended to go through the code logic, and, if possible, modify the non-strict inequalities with the strict ones to save <code>~3</code> gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "BKwKuSERcpRgoa045PtO6W3yerY=",
//                   "bug_id": "SS_272_486",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [204],
//                           "line_nos_start": [204]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be performing comparisons using inequalities inside the <code>require</code> statement. When inside the <code>require</code> statements, non-strict inequalities <code>(>=, <=)</code> are usually costlier than strict equalities <code>(>, <)</code>.</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN REQUIRE()",
//                   "issue_remediation": "<p>It is recommended to go through the code logic, and, if possible, modify the non-strict inequalities with the strict ones to save <code>~3</code> gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "As-aon7bD6n5DGSG9qhIi50t4us=",
//                   "bug_id": "SS_272_487",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [266],
//                           "line_nos_start": [266]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be performing comparisons using inequalities inside the <code>require</code> statement. When inside the <code>require</code> statements, non-strict inequalities <code>(>=, <=)</code> are usually costlier than strict equalities <code>(>, <)</code>.</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN REQUIRE()",
//                   "issue_remediation": "<p>It is recommended to go through the code logic, and, if possible, modify the non-strict inequalities with the strict ones to save <code>~3</code> gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "BN45FTmBIl1zHz9oJleCYGFLF0A=",
//                   "bug_id": "SS_272_488",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [296],
//                           "line_nos_start": [296]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be performing comparisons using inequalities inside the <code>require</code> statement. When inside the <code>require</code> statements, non-strict inequalities <code>(>=, <=)</code> are usually costlier than strict equalities <code>(>, <)</code>.</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN REQUIRE()",
//                   "issue_remediation": "<p>It is recommended to go through the code logic, and, if possible, modify the non-strict inequalities with the strict ones to save <code>~3</code> gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "FLMVUeBWZR904iPMF4Kmlo627G4=",
//                   "bug_id": "SS_272_489",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [311],
//                           "line_nos_start": [311]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be performing comparisons using inequalities inside the <code>require</code> statement. When inside the <code>require</code> statements, non-strict inequalities <code>(>=, <=)</code> are usually costlier than strict equalities <code>(>, <)</code>.</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN REQUIRE()",
//                   "issue_remediation": "<p>It is recommended to go through the code logic, and, if possible, modify the non-strict inequalities with the strict ones to save <code>~3</code> gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "Dy-T8me84gUju2EZEDCwoQqaF0M=",
//                   "bug_id": "SS_272_490",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [139],
//                           "line_nos_start": [139]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be performing comparisons using inequalities inside the <code>require</code> statement. When inside the <code>require</code> statements, non-strict inequalities <code>(>=, <=)</code> are usually costlier than strict equalities <code>(>, <)</code>.</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN REQUIRE()",
//                   "issue_remediation": "<p>It is recommended to go through the code logic, and, if possible, modify the non-strict inequalities with the strict ones to save <code>~3</code> gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "g3KZLtWj9QGNTDvK3HE9ggEmR88=",
//                   "bug_id": "SS_272_491",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [141],
//                           "line_nos_start": [141]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be performing comparisons using inequalities inside the <code>require</code> statement. When inside the <code>require</code> statements, non-strict inequalities <code>(>=, <=)</code> are usually costlier than strict equalities <code>(>, <)</code>.</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN REQUIRE()",
//                   "issue_remediation": "<p>It is recommended to go through the code logic, and, if possible, modify the non-strict inequalities with the strict ones to save <code>~3</code> gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "ALB98VnMaH3bXkNk7QTeFt67LvM=",
//                   "bug_id": "SS_272_492",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [202],
//                           "line_nos_start": [202]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be performing comparisons using inequalities inside the <code>require</code> statement. When inside the <code>require</code> statements, non-strict inequalities <code>(>=, <=)</code> are usually costlier than strict equalities <code>(>, <)</code>.</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN REQUIRE()",
//                   "issue_remediation": "<p>It is recommended to go through the code logic, and, if possible, modify the non-strict inequalities with the strict ones to save <code>~3</code> gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "nNYo9uUtG7tQYWHz-7RZKj9553I=",
//                   "bug_id": "SS_272_493",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [216],
//                           "line_nos_start": [216]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be performing comparisons using inequalities inside the <code>require</code> statement. When inside the <code>require</code> statements, non-strict inequalities <code>(>=, <=)</code> are usually costlier than strict equalities <code>(>, <)</code>.</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN REQUIRE()",
//                   "issue_remediation": "<p>It is recommended to go through the code logic, and, if possible, modify the non-strict inequalities with the strict ones to save <code>~3</code> gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "zTi-_AL2zog3Nm27CUQVcx0nhas=",
//                   "bug_id": "SS_272_494",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [225],
//                           "line_nos_start": [225]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be performing comparisons using inequalities inside the <code>require</code> statement. When inside the <code>require</code> statements, non-strict inequalities <code>(>=, <=)</code> are usually costlier than strict equalities <code>(>, <)</code>.</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN REQUIRE()",
//                   "issue_remediation": "<p>It is recommended to go through the code logic, and, if possible, modify the non-strict inequalities with the strict ones to save <code>~3</code> gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "kXKFfb_RZoK1s2DtD2EdM5F_zB4=",
//                   "bug_id": "SS_272_495",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [228],
//                           "line_nos_start": [228]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be performing comparisons using inequalities inside the <code>require</code> statement. When inside the <code>require</code> statements, non-strict inequalities <code>(>=, <=)</code> are usually costlier than strict equalities <code>(>, <)</code>.</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN REQUIRE()",
//                   "issue_remediation": "<p>It is recommended to go through the code logic, and, if possible, modify the non-strict inequalities with the strict ones to save <code>~3</code> gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "s5cqAVA0ppvJbGOMouGdpZ8tXsA=",
//                   "bug_id": "SS_272_496",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [278],
//                           "line_nos_start": [278]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be performing comparisons using inequalities inside the <code>require</code> statement. When inside the <code>require</code> statements, non-strict inequalities <code>(>=, <=)</code> are usually costlier than strict equalities <code>(>, <)</code>.</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN REQUIRE()",
//                   "issue_remediation": "<p>It is recommended to go through the code logic, and, if possible, modify the non-strict inequalities with the strict ones to save <code>~3</code> gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "Kug6bBraE9nxMmyNtBAC5Rau4LQ=",
//                   "bug_id": "SS_272_497",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/AtlantisGate.sol",
//                           "line_nos_end": [44],
//                           "line_nos_start": [44]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be performing comparisons using inequalities inside the <code>require</code> statement. When inside the <code>require</code> statements, non-strict inequalities <code>(>=, <=)</code> are usually costlier than strict equalities <code>(>, <)</code>.</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN REQUIRE()",
//                   "issue_remediation": "<p>It is recommended to go through the code logic, and, if possible, modify the non-strict inequalities with the strict ones to save <code>~3</code> gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "9JGeBPELWEBwpJvawq2RAHgZhRI=",
//                   "bug_id": "SS_272_498",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/AtlantisGate.sol",
//                           "line_nos_end": [50],
//                           "line_nos_start": [50]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be performing comparisons using inequalities inside the <code>require</code> statement. When inside the <code>require</code> statements, non-strict inequalities <code>(>=, <=)</code> are usually costlier than strict equalities <code>(>, <)</code>.</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN REQUIRE()",
//                   "issue_remediation": "<p>It is recommended to go through the code logic, and, if possible, modify the non-strict inequalities with the strict ones to save <code>~3</code> gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "ybGiGNNRdjORp-F8PtpJz4EZkGg=",
//                   "bug_id": "SS_272_499",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/AtlantisGate.sol",
//                           "line_nos_end": [59],
//                           "line_nos_start": [59]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be performing comparisons using inequalities inside the <code>require</code> statement. When inside the <code>require</code> statements, non-strict inequalities <code>(>=, <=)</code> are usually costlier than strict equalities <code>(>, <)</code>.</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN REQUIRE()",
//                   "issue_remediation": "<p>It is recommended to go through the code logic, and, if possible, modify the non-strict inequalities with the strict ones to save <code>~3</code> gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "c1LYBZBQR5gPrGDV3qF0S2PQjik=",
//                   "bug_id": "SS_272_500",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/AtlantisGate.sol",
//                           "line_nos_end": [60],
//                           "line_nos_start": [60]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be performing comparisons using inequalities inside the <code>require</code> statement. When inside the <code>require</code> statements, non-strict inequalities <code>(>=, <=)</code> are usually costlier than strict equalities <code>(>, <)</code>.</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN REQUIRE()",
//                   "issue_remediation": "<p>It is recommended to go through the code logic, and, if possible, modify the non-strict inequalities with the strict ones to save <code>~3</code> gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "j06xRZifwpl6hVAPUHhaOMQxSxU=",
//                   "bug_id": "SS_272_501",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/AtlantisGate.sol",
//                           "line_nos_end": [61],
//                           "line_nos_start": [61]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be performing comparisons using inequalities inside the <code>require</code> statement. When inside the <code>require</code> statements, non-strict inequalities <code>(>=, <=)</code> are usually costlier than strict equalities <code>(>, <)</code>.</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN REQUIRE()",
//                   "issue_remediation": "<p>It is recommended to go through the code logic, and, if possible, modify the non-strict inequalities with the strict ones to save <code>~3</code> gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "Ku5jXKHyXKUclx5733s90nV2q8U=",
//                   "bug_id": "SS_272_502",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/AtlantisGate.sol",
//                           "line_nos_end": [70],
//                           "line_nos_start": [70]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be performing comparisons using inequalities inside the <code>require</code> statement. When inside the <code>require</code> statements, non-strict inequalities <code>(>=, <=)</code> are usually costlier than strict equalities <code>(>, <)</code>.</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN REQUIRE()",
//                   "issue_remediation": "<p>It is recommended to go through the code logic, and, if possible, modify the non-strict inequalities with the strict ones to save <code>~3</code> gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "Mxu6GRv1Ty1n4Ic9jjm6MDyFn-k=",
//                   "bug_id": "SS_272_503",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/AtlantisGate.sol",
//                           "line_nos_end": [71],
//                           "line_nos_start": [71]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be performing comparisons using inequalities inside the <code>require</code> statement. When inside the <code>require</code> statements, non-strict inequalities <code>(>=, <=)</code> are usually costlier than strict equalities <code>(>, <)</code>.</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN REQUIRE()",
//                   "issue_remediation": "<p>It is recommended to go through the code logic, and, if possible, modify the non-strict inequalities with the strict ones to save <code>~3</code> gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "Xj4BXHvs8WsPcX6B6I2Zw_Vak6o=",
//                   "bug_id": "SS_272_504",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TimedCrowdsale.sol",
//                           "line_nos_end": [41],
//                           "line_nos_start": [41]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be performing comparisons using inequalities inside the <code>require</code> statement. When inside the <code>require</code> statements, non-strict inequalities <code>(>=, <=)</code> are usually costlier than strict equalities <code>(>, <)</code>.</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN REQUIRE()",
//                   "issue_remediation": "<p>It is recommended to go through the code logic, and, if possible, modify the non-strict inequalities with the strict ones to save <code>~3</code> gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "IZBCVHVyCaRS46Gf0qgsdK_3UNs=",
//                   "bug_id": "SS_272_505",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [160],
//                           "line_nos_start": [160]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be performing comparisons using inequalities inside the <code>require</code> statement. When inside the <code>require</code> statements, non-strict inequalities <code>(>=, <=)</code> are usually costlier than strict equalities <code>(>, <)</code>.</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN REQUIRE()",
//                   "issue_remediation": "<p>It is recommended to go through the code logic, and, if possible, modify the non-strict inequalities with the strict ones to save <code>~3</code> gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "kAIovNLxZxRQANErH_0DJGEcnlA=",
//                   "bug_id": "SS_272_506",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [165],
//                           "line_nos_start": [165]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be performing comparisons using inequalities inside the <code>require</code> statement. When inside the <code>require</code> statements, non-strict inequalities <code>(>=, <=)</code> are usually costlier than strict equalities <code>(>, <)</code>.</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN REQUIRE()",
//                   "issue_remediation": "<p>It is recommended to go through the code logic, and, if possible, modify the non-strict inequalities with the strict ones to save <code>~3</code> gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "3giySQ2qg1X5eEtjmhBLZF_jCy4=",
//                   "bug_id": "SS_272_507",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [213],
//                           "line_nos_start": [213]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be performing comparisons using inequalities inside the <code>require</code> statement. When inside the <code>require</code> statements, non-strict inequalities <code>(>=, <=)</code> are usually costlier than strict equalities <code>(>, <)</code>.</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN REQUIRE()",
//                   "issue_remediation": "<p>It is recommended to go through the code logic, and, if possible, modify the non-strict inequalities with the strict ones to save <code>~3</code> gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "0baF6QgTNexUmcVPvPUFOT7Vc8w=",
//                   "bug_id": "SS_272_508",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [237],
//                           "line_nos_start": [237]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be performing comparisons using inequalities inside the <code>require</code> statement. When inside the <code>require</code> statements, non-strict inequalities <code>(>=, <=)</code> are usually costlier than strict equalities <code>(>, <)</code>.</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN REQUIRE()",
//                   "issue_remediation": "<p>It is recommended to go through the code logic, and, if possible, modify the non-strict inequalities with the strict ones to save <code>~3</code> gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "-bqaED2rSJSDMrWEaSNP_5PwLKw=",
//                   "bug_id": "SS_272_509",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Airdrop.sol",
//                           "line_nos_end": [41],
//                           "line_nos_start": [41]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be performing comparisons using inequalities inside the <code>require</code> statement. When inside the <code>require</code> statements, non-strict inequalities <code>(>=, <=)</code> are usually costlier than strict equalities <code>(>, <)</code>.</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN REQUIRE()",
//                   "issue_remediation": "<p>It is recommended to go through the code logic, and, if possible, modify the non-strict inequalities with the strict ones to save <code>~3</code> gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "kmj7hgf1k0SGiiFP0yRdC2_sdRs=",
//                   "bug_id": "SS_272_510",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/BRZtruffle/contracts/Token.sol",
//                           "line_nos_end": [43],
//                           "line_nos_start": [43]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The contract was found to be performing comparisons using inequalities inside the <code>require</code> statement. When inside the <code>require</code> statements, non-strict inequalities <code>(>=, <=)</code> are usually costlier than strict equalities <code>(>, <)</code>.</p>",
//                   "issue_name": "CHEAPER INEQUALITIES IN REQUIRE()",
//                   "issue_remediation": "<p>It is recommended to go through the code logic, and, if possible, modify the non-strict inequalities with the strict ones to save <code>~3</code> gas as long as the logic of the code is not affected.</p>",
//                   "severity": "gas"
//               }
//           ],
//           "issue_id": "SOLIDITY_CHEAPER_INEQUALITIES_IN_REQUIRE",
//           "issue_name": "CHEAPER INEQUALITIES IN REQUIRE()"
//       },
//       "SOLIDITY_COMPILER_VERSION_RECENT": {
//           "issue_details": [
//               {
//                   "bug_hash": "LuqNYKqZxZQKZ4cYO2WLVdKeJ3M=",
//                   "bug_id": "SS_272_50",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/MoonrayToken/SandwichTokenTestHarness.sol",
//                           "line_nos_end": [2],
//                           "line_nos_start": [2]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>The compiler version detected in the code is too recent. Therefore, it is not time-tested and may be susceptible to multiple bugs and vulnerabilities, both from the usage and security perspectives.\nThe following compiler versions were detected which were too recent - \n ['/MoonrayToken/SandwichTokenTestHarness.sol'] - ^0.8.11</p>",
//                   "issue_name": "COMPILER VERSION TOO RECENT",
//                   "issue_remediation": "<p>It is suggested to use a compiler version that is neither too recent nor too old i.e., Solidity <code>0.8.7</code>. A stable compiler version should be used that is time-tested by the community, which fixed vulnerabilities introduced in older compiler versions.</p><br /><p>The code should be kept updated according to the compiler release cycle. It should be tested before going on the Mainnet to reduce the chances of new vulnerabilities being introduced.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "PZLxn73aHRp1e64omDNtiA1NEM0=",
//                   "bug_id": "SS_272_51",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/MoonrayToken/MoonrayToken.sol",
//                           "line_nos_end": [2],
//                           "line_nos_start": [2]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>The compiler version detected in the code is too recent. Therefore, it is not time-tested and may be susceptible to multiple bugs and vulnerabilities, both from the usage and security perspectives.\nThe following compiler versions were detected which were too recent - \n ['/MoonrayToken/MoonrayToken.sol'] - ^0.8.11</p>",
//                   "issue_name": "COMPILER VERSION TOO RECENT",
//                   "issue_remediation": "<p>It is suggested to use a compiler version that is neither too recent nor too old i.e., Solidity <code>0.8.7</code>. A stable compiler version should be used that is time-tested by the community, which fixed vulnerabilities introduced in older compiler versions.</p><br /><p>The code should be kept updated according to the compiler release cycle. It should be tested before going on the Mainnet to reduce the chances of new vulnerabilities being introduced.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "Kc4ch7rTRtb0zvNq3ruVLjnKm-s=",
//                   "bug_id": "SS_272_52",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/MoonrayToken/MoonrayTokenBase.sol",
//                           "line_nos_end": [2],
//                           "line_nos_start": [2]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>The compiler version detected in the code is too recent. Therefore, it is not time-tested and may be susceptible to multiple bugs and vulnerabilities, both from the usage and security perspectives.\nThe following compiler versions were detected which were too recent - \n ['/MoonrayToken/MoonrayTokenBase.sol'] - ^0.8.11</p>",
//                   "issue_name": "COMPILER VERSION TOO RECENT",
//                   "issue_remediation": "<p>It is suggested to use a compiler version that is neither too recent nor too old i.e., Solidity <code>0.8.7</code>. A stable compiler version should be used that is time-tested by the community, which fixed vulnerabilities introduced in older compiler versions.</p><br /><p>The code should be kept updated according to the compiler release cycle. It should be tested before going on the Mainnet to reduce the chances of new vulnerabilities being introduced.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "3nrt5g9BAiAp9r1eziyB3TwZVNo=",
//                   "bug_id": "SS_272_53",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/MoonrayToken/SandwichToken.sol",
//                           "line_nos_end": [2],
//                           "line_nos_start": [2]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>The compiler version detected in the code is too recent. Therefore, it is not time-tested and may be susceptible to multiple bugs and vulnerabilities, both from the usage and security perspectives.\nThe following compiler versions were detected which were too recent - \n ['/MoonrayToken/SandwichToken.sol'] - ^0.8.11</p>",
//                   "issue_name": "COMPILER VERSION TOO RECENT",
//                   "issue_remediation": "<p>It is suggested to use a compiler version that is neither too recent nor too old i.e., Solidity <code>0.8.7</code>. A stable compiler version should be used that is time-tested by the community, which fixed vulnerabilities introduced in older compiler versions.</p><br /><p>The code should be kept updated according to the compiler release cycle. It should be tested before going on the Mainnet to reduce the chances of new vulnerabilities being introduced.</p>",
//                   "severity": "low"
//               }
//           ],
//           "issue_id": "SOLIDITY_COMPILER_VERSION_RECENT",
//           "issue_name": "COMPILER VERSION TOO RECENT"
//       },
//       "SOLIDITY_FUNCTION_SHOULD_NOT_BE_PURE": {
//           "issue_details": [
//               {
//                   "bug_hash": "U3sTNwTPQrEH9PapQvucfGlXJSo=",
//                   "bug_id": "SS_272_3",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/CastUint.sol",
//                           "line_nos_end": [16],
//                           "line_nos_start": [9]
//                       }
//                   ],
//                   "issue_confidence": "0",
//                   "issue_description": "<p>A function was found to be declared as <code>pure</code> that reads or writes to the state. Functions can be declared pure in which case they promise not to read from or modify the state.\n\nThe following statements are considered modifying the state:\n\n1. Writing to state variables.\n2. [Emitting events](https://docs.soliditylang.org/en/develop/contracts.html#events](https://docs.soliditylang.org/en/develop/contracts.html#events)\n3. [Creating other contracts](https://docs.soliditylang.org/en/develop/control-structures.html#creating-contracts)\n4. Using <code>selfdestruct</code>\n5. Sending Ether via calls\n6. Calling any function not marked <code>view</code> or <code>pure</code>.\n7. Using low-level calls.\n8. Using inline assembly that contains certain opcodes.\n\nThe following are considered reading from the state:\n\n1. Reading from state variables\n2. Accessing <code>address(this).balance</code> or <code>.balance</code>\n3. Accessing any of the members of <code>block</code>, <code>tx</code>, <code>msg</code> (with the exception of <code>msg.sig</code> and <code>msg.data</code>)\n4. Calling any function not marked <code>pure</code>\n5. Using inline assembly that contains certain opcodes</p>",
//                   "issue_name": "READ OR MODIFY IN PURE FUNCTION",
//                   "issue_remediation": "<p>Do not declare functions that read from or modify the state as <code>pure.</code> </p>",
//                   "severity": "low"
//               }
//           ],
//           "issue_id": "SOLIDITY_FUNCTION_SHOULD_NOT_BE_PURE",
//           "issue_name": "READ OR MODIFY IN PURE FUNCTION"
//       },
//       "SOLIDITY_GAS_LIMIT_IN_LOOPS": {
//           "issue_details": [
//               {
//                   "bug_hash": "lAR0vNEQ8zWn9PszBu1jXuK6jkM=",
//                   "bug_id": "SS_272_74",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Airdrop.sol",
//                           "line_nos_end": [25],
//                           "line_nos_start": [25]
//                       }
//                   ],
//                   "issue_confidence": "0",
//                   "issue_description": "<p>Ethereum is a very resource-constrained environment. Prices per computational step are orders of magnitude higher than with centralized providers. Moreover, Ethereum miners impose a limit on the total number of Gas consumed in a block. If <code>array.length</code> is large enough, the function exceeds the block gas limit, and transactions calling it will never be confirmed.</p><p>This becomes a security issue, if an external actor influences <code>array.length</code>.</p><br /><p>E.g., if an array enumerates all registered addresses, an adversary can register many addresses, causing the problem described above.</p>",
//                   "issue_name": "UNCHECKED ARRAY LENGTH",
//                   "issue_remediation": "<p>Either explicitly or just due to normal operation, the number of iterations in a loop can grow beyond the block gas limit, which can cause the complete contract to be stalled at a certain point. Therefore, loops with a bigger or unknown number of steps should always be avoided.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "zCZO2zEmy7U_Mbe1XAMFr_Hn1aY=",
//                   "bug_id": "SS_272_75",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Airdrop.sol",
//                           "line_nos_end": [37],
//                           "line_nos_start": [37]
//                       }
//                   ],
//                   "issue_confidence": "0",
//                   "issue_description": "<p>Ethereum is a very resource-constrained environment. Prices per computational step are orders of magnitude higher than with centralized providers. Moreover, Ethereum miners impose a limit on the total number of Gas consumed in a block. If <code>array.length</code> is large enough, the function exceeds the block gas limit, and transactions calling it will never be confirmed.</p><p>This becomes a security issue, if an external actor influences <code>array.length</code>.</p><br /><p>E.g., if an array enumerates all registered addresses, an adversary can register many addresses, causing the problem described above.</p>",
//                   "issue_name": "UNCHECKED ARRAY LENGTH",
//                   "issue_remediation": "<p>Either explicitly or just due to normal operation, the number of iterations in a loop can grow beyond the block gas limit, which can cause the complete contract to be stalled at a certain point. Therefore, loops with a bigger or unknown number of steps should always be avoided.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "lAR0vNEQ8zWn9PszBu1jXuK6jkM=",
//                   "bug_id": "SS_272_74",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Airdrop.sol",
//                           "line_nos_end": [45],
//                           "line_nos_start": [45]
//                       }
//                   ],
//                   "issue_confidence": "0",
//                   "issue_description": "<p>Ethereum is a very resource-constrained environment. Prices per computational step are orders of magnitude higher than with centralized providers. Moreover, Ethereum miners impose a limit on the total number of Gas consumed in a block. If <code>array.length</code> is large enough, the function exceeds the block gas limit, and transactions calling it will never be confirmed.</p><p>This becomes a security issue, if an external actor influences <code>array.length</code>.</p><br /><p>E.g., if an array enumerates all registered addresses, an adversary can register many addresses, causing the problem described above.</p>",
//                   "issue_name": "UNCHECKED ARRAY LENGTH",
//                   "issue_remediation": "<p>Either explicitly or just due to normal operation, the number of iterations in a loop can grow beyond the block gas limit, which can cause the complete contract to be stalled at a certain point. Therefore, loops with a bigger or unknown number of steps should always be avoided.</p>",
//                   "severity": "high"
//               }
//           ],
//           "issue_id": "SOLIDITY_GAS_LIMIT_IN_LOOPS",
//           "issue_name": "UNCHECKED ARRAY LENGTH"
//       },
//       "SOLIDITY_GAS_OPTIMIZATION_IN_DECREMENTS": {
//           "issue_details": [
//               {
//                   "bug_hash": "LCnc8fhXbIToDkpfacgY4fbRAOo=",
//                   "bug_id": "SS_272_204",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [86],
//                           "line_nos_start": [86]
//                       }
//                   ],
//                   "issue_confidence": "0",
//                   "issue_description": "<p><code>--i</code> costs less gas compared to <code>i--</code> or <code>i -= 1</code> for unsigned integers.\nIn <code>i--</code>, the compiler has to create a temporary variable to store the initial value. This is not the case with <code>--i</code> in which the value is directly decremented and returned, thus, making it a cheaper alternative.</p>",
//                   "issue_name": "GAS OPTIMIZATION IN DECREMENTS",
//                   "issue_remediation": "<p>Consider changing the post-decrements <code>(i--)</code> to pre-decrements <code>(--i)</code> as long as the value is not used in any calculations or inside returns. Make sure that the logic of the code is not changed.\n\n</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "LCnc8fhXbIToDkpfacgY4fbRAOo=",
//                   "bug_id": "SS_272_204",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [109],
//                           "line_nos_start": [109]
//                       }
//                   ],
//                   "issue_confidence": "0",
//                   "issue_description": "<p><code>--i</code> costs less gas compared to <code>i--</code> or <code>i -= 1</code> for unsigned integers.\nIn <code>i--</code>, the compiler has to create a temporary variable to store the initial value. This is not the case with <code>--i</code> in which the value is directly decremented and returned, thus, making it a cheaper alternative.</p>",
//                   "issue_name": "GAS OPTIMIZATION IN DECREMENTS",
//                   "issue_remediation": "<p>Consider changing the post-decrements <code>(i--)</code> to pre-decrements <code>(--i)</code> as long as the value is not used in any calculations or inside returns. Make sure that the logic of the code is not changed.\n\n</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "LCnc8fhXbIToDkpfacgY4fbRAOo=",
//                   "bug_id": "SS_272_204",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [121],
//                           "line_nos_start": [121]
//                       }
//                   ],
//                   "issue_confidence": "0",
//                   "issue_description": "<p><code>--i</code> costs less gas compared to <code>i--</code> or <code>i -= 1</code> for unsigned integers.\nIn <code>i--</code>, the compiler has to create a temporary variable to store the initial value. This is not the case with <code>--i</code> in which the value is directly decremented and returned, thus, making it a cheaper alternative.</p>",
//                   "issue_name": "GAS OPTIMIZATION IN DECREMENTS",
//                   "issue_remediation": "<p>Consider changing the post-decrements <code>(i--)</code> to pre-decrements <code>(--i)</code> as long as the value is not used in any calculations or inside returns. Make sure that the logic of the code is not changed.\n\n</p>",
//                   "severity": "gas"
//               }
//           ],
//           "issue_id": "SOLIDITY_GAS_OPTIMIZATION_IN_DECREMENTS",
//           "issue_name": "GAS OPTIMIZATION IN DECREMENTS"
//       },
//       "SOLIDITY_GAS_OPTIMIZATION_IN_INCREMENTS": {
//           "issue_details": [
//               {
//                   "bug_hash": "lFnI9A5rLCui0wzCQKjYu6xNTQs=",
//                   "bug_id": "SS_272_197",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/BaseVault.sol",
//                           "line_nos_end": [310],
//                           "line_nos_start": [310]
//                       }
//                   ],
//                   "issue_confidence": "0",
//                   "issue_description": "<p><code>++i</code> costs less gas compared to <code>i++</code> or <code>i += 1</code> for unsigned integers.\nIn <code>i++</code>, the compiler has to create a temporary variable to store the initial value. This is not the case with <code>++i</code> in which the value is directly incremented and returned, thus, making it a cheaper alternative.</p>",
//                   "issue_name": "GAS OPTIMIZATION IN INCREMENTS",
//                   "issue_remediation": "<p>Consider changing the post-increments <code>(i++)</code> to pre-increments <code>(++i)</code> as long as the value is not used in any calculations or inside returns. Make sure that the logic of the code is not changed.\n\n</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "38Ec76xNfhhSm7MUnGXgn3lhhog=",
//                   "bug_id": "SS_272_198",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Airdrop.sol",
//                           "line_nos_end": [25],
//                           "line_nos_start": [25]
//                       }
//                   ],
//                   "issue_confidence": "0",
//                   "issue_description": "<p><code>++i</code> costs less gas compared to <code>i++</code> or <code>i += 1</code> for unsigned integers.\nIn <code>i++</code>, the compiler has to create a temporary variable to store the initial value. This is not the case with <code>++i</code> in which the value is directly incremented and returned, thus, making it a cheaper alternative.</p>",
//                   "issue_name": "GAS OPTIMIZATION IN INCREMENTS",
//                   "issue_remediation": "<p>Consider changing the post-increments <code>(i++)</code> to pre-increments <code>(++i)</code> as long as the value is not used in any calculations or inside returns. Make sure that the logic of the code is not changed.\n\n</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "oAlpF5O9hcEXpgODqk_cDWBVmQc=",
//                   "bug_id": "SS_272_199",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Airdrop.sol",
//                           "line_nos_end": [37],
//                           "line_nos_start": [37]
//                       }
//                   ],
//                   "issue_confidence": "0",
//                   "issue_description": "<p><code>++i</code> costs less gas compared to <code>i++</code> or <code>i += 1</code> for unsigned integers.\nIn <code>i++</code>, the compiler has to create a temporary variable to store the initial value. This is not the case with <code>++i</code> in which the value is directly incremented and returned, thus, making it a cheaper alternative.</p>",
//                   "issue_name": "GAS OPTIMIZATION IN INCREMENTS",
//                   "issue_remediation": "<p>Consider changing the post-increments <code>(i++)</code> to pre-increments <code>(++i)</code> as long as the value is not used in any calculations or inside returns. Make sure that the logic of the code is not changed.\n\n</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "38Ec76xNfhhSm7MUnGXgn3lhhog=",
//                   "bug_id": "SS_272_198",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Airdrop.sol",
//                           "line_nos_end": [45],
//                           "line_nos_start": [45]
//                       }
//                   ],
//                   "issue_confidence": "0",
//                   "issue_description": "<p><code>++i</code> costs less gas compared to <code>i++</code> or <code>i += 1</code> for unsigned integers.\nIn <code>i++</code>, the compiler has to create a temporary variable to store the initial value. This is not the case with <code>++i</code> in which the value is directly incremented and returned, thus, making it a cheaper alternative.</p>",
//                   "issue_name": "GAS OPTIMIZATION IN INCREMENTS",
//                   "issue_remediation": "<p>Consider changing the post-increments <code>(i++)</code> to pre-increments <code>(++i)</code> as long as the value is not used in any calculations or inside returns. Make sure that the logic of the code is not changed.\n\n</p>",
//                   "severity": "gas"
//               }
//           ],
//           "issue_id": "SOLIDITY_GAS_OPTIMIZATION_IN_INCREMENTS",
//           "issue_name": "GAS OPTIMIZATION IN INCREMENTS"
//       },
//       "SOLIDITY_INCORRECT_ACCESS_CONTROL": {
//           "issue_details": [
//               {
//                   "bug_hash": "M2k3HvRNVGcwAHK0PjlQ2A9lwjg=",
//                   "bug_id": "SS_272_18",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/AtlantisGate.sol",
//                           "line_nos_end": [46],
//                           "line_nos_start": [43]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Access control plays an important role in segregation of privileges in smart contracts and other applications. If this is misconfigured or not properly validated on sensitive functions, it may lead to loss of funds, tokens and in some cases compromise of the smart contract.\n\nThe contract AtlantisGate is importing an access control library @openzeppelin/contracts/access/AccessControl.sol but the function deposit is missing the modifier onlyRole.</p>",
//                   "issue_name": "INCORRECT ACCESS CONTROL",
//                   "issue_remediation": "<p>It is recommended to go through the contract and observe the functions that are lacking an access control modifier. If they contain sensitive administrative actions, it is advised to add a suitable modifier to the same</p>",
//                   "severity": "critical"
//               },
//               {
//                   "bug_hash": "gZt0gUj3SUi4G4U0GQVLmmm8b6E=",
//                   "bug_id": "SS_272_19",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/AtlantisGate.sol",
//                           "line_nos_end": [85],
//                           "line_nos_start": [83]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Access control plays an important role in segregation of privileges in smart contracts and other applications. If this is misconfigured or not properly validated on sensitive functions, it may lead to loss of funds, tokens and in some cases compromise of the smart contract.\n\nThe contract AtlantisGate is importing an access control library @openzeppelin/contracts/access/AccessControl.sol but the function  is missing the modifier onlyRole.</p>",
//                   "issue_name": "INCORRECT ACCESS CONTROL",
//                   "issue_remediation": "<p>It is recommended to go through the contract and observe the functions that are lacking an access control modifier. If they contain sensitive administrative actions, it is advised to add a suitable modifier to the same</p>",
//                   "severity": "critical"
//               },
//               {
//                   "bug_hash": "aIgeK4pfu6_QUMqt0TFIDAIVSbc=",
//                   "bug_id": "SS_272_20",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/AtlantisGate.sol",
//                           "line_nos_end": [89],
//                           "line_nos_start": [87]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Access control plays an important role in segregation of privileges in smart contracts and other applications. If this is misconfigured or not properly validated on sensitive functions, it may lead to loss of funds, tokens and in some cases compromise of the smart contract.\n\nThe contract AtlantisGate is importing an access control library @openzeppelin/contracts/access/AccessControl.sol but the function  is missing the modifier onlyRole.</p>",
//                   "issue_name": "INCORRECT ACCESS CONTROL",
//                   "issue_remediation": "<p>It is recommended to go through the contract and observe the functions that are lacking an access control modifier. If they contain sensitive administrative actions, it is advised to add a suitable modifier to the same</p>",
//                   "severity": "critical"
//               },
//               {
//                   "bug_hash": "D5HKq0quAWeGuKuCqtnzknQfFwI=",
//                   "bug_id": "SS_272_21",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [117],
//                           "line_nos_start": [93]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Access control plays an important role in segregation of privileges in smart contracts and other applications. If this is misconfigured or not properly validated on sensitive functions, it may lead to loss of funds, tokens and in some cases compromise of the smart contract.\n\nThe contract WAHED is importing an access control library @openzeppelin/contracts/access/Ownable.sol but the function claim is missing the modifier onlyOwner.</p>",
//                   "issue_name": "INCORRECT ACCESS CONTROL",
//                   "issue_remediation": "<p>It is recommended to go through the contract and observe the functions that are lacking an access control modifier. If they contain sensitive administrative actions, it is advised to add a suitable modifier to the same</p>",
//                   "severity": "critical"
//               },
//               {
//                   "bug_hash": "NGnnul-RXFGCIeWtPezAEwQNc9Q=",
//                   "bug_id": "SS_272_22",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [78],
//                           "line_nos_start": [78]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Access control plays an important role in segregation of privileges in smart contracts and other applications. If this is misconfigured or not properly validated on sensitive functions, it may lead to loss of funds, tokens and in some cases compromise of the smart contract.\n\nThe contract TokenVesting is importing an access control library @openzeppelin/contracts/access/Ownable.sol but the function  is missing the modifier onlyOwner.</p>",
//                   "issue_name": "INCORRECT ACCESS CONTROL",
//                   "issue_remediation": "<p>It is recommended to go through the contract and observe the functions that are lacking an access control modifier. If they contain sensitive administrative actions, it is advised to add a suitable modifier to the same</p>",
//                   "severity": "critical"
//               },
//               {
//                   "bug_hash": "LVysRPhOKjNVYoemQXdL11weubQ=",
//                   "bug_id": "SS_272_23",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [80],
//                           "line_nos_start": [80]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Access control plays an important role in segregation of privileges in smart contracts and other applications. If this is misconfigured or not properly validated on sensitive functions, it may lead to loss of funds, tokens and in some cases compromise of the smart contract.\n\nThe contract TokenVesting is importing an access control library @openzeppelin/contracts/access/Ownable.sol but the function  is missing the modifier onlyOwner.</p>",
//                   "issue_name": "INCORRECT ACCESS CONTROL",
//                   "issue_remediation": "<p>It is recommended to go through the contract and observe the functions that are lacking an access control modifier. If they contain sensitive administrative actions, it is advised to add a suitable modifier to the same</p>",
//                   "severity": "critical"
//               },
//               {
//                   "bug_hash": "GQ7XEF64KKMFrl9jHVpOXgmLfuA=",
//                   "bug_id": "SS_272_24",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [242],
//                           "line_nos_start": [222]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Access control plays an important role in segregation of privileges in smart contracts and other applications. If this is misconfigured or not properly validated on sensitive functions, it may lead to loss of funds, tokens and in some cases compromise of the smart contract.\n\nThe contract TokenVesting is importing an access control library @openzeppelin/contracts/access/Ownable.sol but the function release is missing the modifier onlyOwner.</p>",
//                   "issue_name": "INCORRECT ACCESS CONTROL",
//                   "issue_remediation": "<p>It is recommended to go through the contract and observe the functions that are lacking an access control modifier. If they contain sensitive administrative actions, it is advised to add a suitable modifier to the same</p>",
//                   "severity": "critical"
//               }
//           ],
//           "issue_id": "SOLIDITY_INCORRECT_ACCESS_CONTROL",
//           "issue_name": "INCORRECT ACCESS CONTROL"
//       },
//       "SOLIDITY_INTERNAL_FUNCTIONS_NEVER_USED": {
//           "issue_details": [
//               {
//                   "bug_hash": "BI79_Wc-gHvc8LNPczJUyKtiGJM=",
//                   "bug_id": "SS_272_76",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/test/invariants/STETHVaultInvariants.sol",
//                           "line_nos_end": [32],
//                           "line_nos_start": [30]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "UQXMH8Me97n7hwMkahkl2FzGkNU=",
//                   "bug_id": "SS_272_77",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/test/invariants/STETHVaultInvariants.sol",
//                           "line_nos_end": [42],
//                           "line_nos_start": [40]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "BB2pl_jqahxnDxvlCXCsFMANf6Q=",
//                   "bug_id": "SS_272_81",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/DepositQueueLib.sol",
//                           "line_nos_end": [62],
//                           "line_nos_start": [60]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "rLKsKNSh_9TlHmiZLQtN5xuVlBM=",
//                   "bug_id": "SS_272_82",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/DepositQueueLib.sol",
//                           "line_nos_end": [52],
//                           "line_nos_start": [26]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "Xz31IozbkVxuDdYs9LQuLKhLhu4=",
//                   "bug_id": "SS_272_80",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/DepositQueueLib.sol",
//                           "line_nos_end": [24],
//                           "line_nos_start": [17]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "9S0TAVtaFADUAskILmVQwxjpbgg=",
//                   "bug_id": "SS_272_79",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/DepositQueueLib.sol",
//                           "line_nos_end": [58],
//                           "line_nos_start": [54]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "GJg2qmAiu5n8hp-7cX4ANb2iVX4=",
//                   "bug_id": "SS_272_78",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/DepositQueueLib.sol",
//                           "line_nos_end": [66],
//                           "line_nos_start": [64]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "73hn_xlAKFmDzB_S0AQ74HNAWew=",
//                   "bug_id": "SS_272_83",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/TransferUtils.sol",
//                           "line_nos_end": [16],
//                           "line_nos_start": [10]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "XCpDDiH_D9DC1vk2reegT-YtUBA=",
//                   "bug_id": "SS_272_84",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/TransferUtils.sol",
//                           "line_nos_end": [25],
//                           "line_nos_start": [18]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "h_s2FqeIQKgUBFtoe5r6bkuhTpo=",
//                   "bug_id": "SS_272_85",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/CastUint.sol",
//                           "line_nos_end": [16],
//                           "line_nos_start": [9]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "UvgPlS0w8JvEHnIQHyefQ9eLueQ=",
//                   "bug_id": "SS_272_89",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/FixedPointMath.sol",
//                           "line_nos_end": [56],
//                           "line_nos_start": [54]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "g-xAw4Mq-Ne3d01hSFfxseyiB9o=",
//                   "bug_id": "SS_272_90",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/FixedPointMath.sol",
//                           "line_nos_end": [52],
//                           "line_nos_start": [50]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "GJYD59oIxwlFZPQFwlCADFr6Eb8=",
//                   "bug_id": "SS_272_87",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/FixedPointMath.sol",
//                           "line_nos_end": [44],
//                           "line_nos_start": [42]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "DltZH_dFVcYLFQoS-AQ82Ju9H-8=",
//                   "bug_id": "SS_272_88",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/FixedPointMath.sol",
//                           "line_nos_end": [60],
//                           "line_nos_start": [58]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "MS1j4dsLZCITAfywerzW5XTRe7g=",
//                   "bug_id": "SS_272_86",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/FixedPointMath.sol",
//                           "line_nos_end": [48],
//                           "line_nos_start": [46]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "zFFRPKNoCFe1OmQW6pGzqk00XCA=",
//                   "bug_id": "SS_272_91",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/PrincipalProtectedMock.sol",
//                           "line_nos_end": [100],
//                           "line_nos_start": [63]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "v1n3xmxW-NFf9zbKEapCOVJKltA=",
//                   "bug_id": "SS_272_95",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/PrincipalProtectedMock.sol",
//                           "line_nos_end": [61],
//                           "line_nos_start": [46]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "ecB2IMzuwUU6Xnmqg-FvltA9kD0=",
//                   "bug_id": "SS_272_93",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/BaseVault.sol",
//                           "line_nos_end": [330],
//                           "line_nos_start": [324]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "QV8YsChGsqqM_LLhS6wBXptsP0U=",
//                   "bug_id": "SS_272_94",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/BaseVault.sol",
//                           "line_nos_end": [337],
//                           "line_nos_start": [335]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "yXo3sgpMCxc91eoP9EreAHTRSvk=",
//                   "bug_id": "SS_272_92",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/PrincipalProtectedMock.sol",
//                           "line_nos_end": [112],
//                           "line_nos_start": [109]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "WnX_4OO1BdsmPSEr9OsdDHAkCAc=",
//                   "bug_id": "SS_272_96",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/STETHVault.sol",
//                           "line_nos_end": [153],
//                           "line_nos_start": [149]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "zMtSnBjbr0fxxHico2VOwv55tpM=",
//                   "bug_id": "SS_272_98",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mixins/Capped.sol",
//                           "line_nos_end": [33],
//                           "line_nos_start": [29]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "8CYgYl_Vjz3POhBH-df-WSWs9O4=",
//                   "bug_id": "SS_272_97",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mixins/Capped.sol",
//                           "line_nos_end": [43],
//                           "line_nos_start": [39]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "rRsrQeS_pc7KJ5xOgciBLiJXVvM=",
//                   "bug_id": "SS_272_99",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [109],
//                           "line_nos_start": [106]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "VL8EjaBuWyCIcGVCBc9CG1xJ1oI=",
//                   "bug_id": "SS_272_101",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [80],
//                           "line_nos_start": [74]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "c9Q0Nds04WF32p83SoceGLn7hmY=",
//                   "bug_id": "SS_272_100",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [69],
//                           "line_nos_start": [57]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "Q4o3tfUpaimtJKM_LV4h9DYrgaE=",
//                   "bug_id": "SS_272_102",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [90],
//                           "line_nos_start": [85]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "iJ8GmQ-Zx6txPpq0xABLuD3ZIwY=",
//                   "bug_id": "SS_272_103",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [100],
//                           "line_nos_start": [95]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "-1cOIRgH30brsw75wyCbvk3gkm4=",
//                   "bug_id": "SS_272_107",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [318],
//                           "line_nos_start": [310]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "EYtunazIw-SaGDl9d5QIu5I1lbw=",
//                   "bug_id": "SS_272_106",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [301],
//                           "line_nos_start": [294]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "99ZEVWwL7I8TzJn9az-GkoMELmA=",
//                   "bug_id": "SS_272_104",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [272],
//                           "line_nos_start": [265]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "K-7vfhVMmg0wrr59ooWyID2v1Hg=",
//                   "bug_id": "SS_272_105",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [286],
//                           "line_nos_start": [281]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "5rEt5IOhbFQFHuIWUYz5Ewl_RQo=",
//                   "bug_id": "SS_272_109",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [121],
//                           "line_nos_start": [119]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "z3qMYFbMqry8NNIwrK25RbDpvP8=",
//                   "bug_id": "SS_272_108",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/MasterContract.sol",
//                           "line_nos_end": [104],
//                           "line_nos_start": [97]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "unxKZ0I8e0HuBhB5hkVeNKncTRc=",
//                   "bug_id": "SS_272_110",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Crowdsale.sol",
//                           "line_nos_end": [163],
//                           "line_nos_start": [152]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "JEpdWYSzMvO8SZQjU_MbFHZuYqE=",
//                   "bug_id": "SS_272_111",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TimedCrowdsale.sol",
//                           "line_nos_end": [115],
//                           "line_nos_start": [105]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "SwXPs6J6lobMSbse4pjkXxWFzk8=",
//                   "bug_id": "SS_272_115",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/AllowanceCrowdsale.sol",
//                           "line_nos_end": [61],
//                           "line_nos_start": [55]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "rZfQamInmk572dn3eZy4h4kZNRA=",
//                   "bug_id": "SS_272_117",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Crowdsale.sol",
//                           "line_nos_end": [176],
//                           "line_nos_start": [171]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "TvU63ymEp8TW0i-elyxKBXZ__Qk=",
//                   "bug_id": "SS_272_112",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Crowdsale.sol",
//                           "line_nos_end": [233],
//                           "line_nos_start": [231]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "M6fJdwUFHFMbx_6-hgjM8cY5-tA=",
//                   "bug_id": "SS_272_116",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Crowdsale.sol",
//                           "line_nos_end": [201],
//                           "line_nos_start": [197]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "0tefn54Kxmr6UqAgAarzojrXHEQ=",
//                   "bug_id": "SS_272_114",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Crowdsale.sol",
//                           "line_nos_end": [213],
//                           "line_nos_start": [209]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "_1YSIG9Rkjw9t_VUnoS0FIw85N8=",
//                   "bug_id": "SS_272_113",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Crowdsale.sol",
//                           "line_nos_end": [226],
//                           "line_nos_start": [220]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "b0PSmW8qrKODPmg_36GbwB4m31k=",
//                   "bug_id": "SS_272_119",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [342],
//                           "line_nos_start": [324]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "vHwuntbYzJF_Pcm6Kn3cq24Ic5s=",
//                   "bug_id": "SS_272_118",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/OTCContract.sol",
//                           "line_nos_end": [26],
//                           "line_nos_start": [19]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>YET TO BE DEFINED</p>",
//                   "issue_name": "INTERNAL FUNCTIONS NEVER USED",
//                   "issue_remediation": "<p>YET TO BE DEFINED</p>",
//                   "severity": "low"
//               }
//           ],
//           "issue_id": "SOLIDITY_INTERNAL_FUNCTIONS_NEVER_USED",
//           "issue_name": "INTERNAL FUNCTIONS NEVER USED"
//       },
//       "SOLIDITY_LONG_NUMBER_LITERALS": {
//           "issue_details": [
//               {
//                   "bug_hash": "QWVfOKBfzRThYulCuLcR_oklKTk=",
//                   "bug_id": "SS_272_4",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/MasterContract.sol",
//                           "line_nos_end": [24],
//                           "line_nos_start": [24]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Solidity supports multiple rational and integer literals, including decimal fractions and scientific notations. The use of very large numbers with too many digits was detected in the code that could have been optimized using a different notation also supported by Solidity. The variable _totalSupply was found to be affected. .</p>",
//                   "issue_name": "LONG NUMBER LITERALS",
//                   "issue_remediation": "<p>Scientific notation in the form of 2e10 is also supported, where the mantissa can be fractional but the exponent has to be an integer. The literal MeE is equivalent to M * 10**E. Examples include 2e10, 2e10, 2e-10, 2.5e1, as suggested in official solidity documentation https://docs.soliditylang.org/en/latest/types.html#rational-and-integer-literals</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "YiuqxRfqsY4vl5lSvpD3alTl3xI=",
//                   "bug_id": "SS_272_5",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/MasterContract.sol",
//                           "line_nos_end": [27],
//                           "line_nos_start": [27]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Solidity supports multiple rational and integer literals, including decimal fractions and scientific notations. The use of very large numbers with too many digits was detected in the code that could have been optimized using a different notation also supported by Solidity. The variable MAX_TRANSFER was found to be affected. .</p>",
//                   "issue_name": "LONG NUMBER LITERALS",
//                   "issue_remediation": "<p>Scientific notation in the form of 2e10 is also supported, where the mantissa can be fractional but the exponent has to be an integer. The literal MeE is equivalent to M * 10**E. Examples include 2e10, 2e10, 2e-10, 2.5e1, as suggested in official solidity documentation https://docs.soliditylang.org/en/latest/types.html#rational-and-integer-literals</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "n76LA3IUvJ3X_TnAEM6Zvj_Kgpk=",
//                   "bug_id": "SS_272_6",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/MasterContract.sol",
//                           "line_nos_end": [34],
//                           "line_nos_start": [34]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Solidity supports multiple rational and integer literals, including decimal fractions and scientific notations. The use of very large numbers with too many digits was detected in the code that could have been optimized using a different notation also supported by Solidity. The variable AirdropToken was found to be affected. .</p>",
//                   "issue_name": "LONG NUMBER LITERALS",
//                   "issue_remediation": "<p>Scientific notation in the form of 2e10 is also supported, where the mantissa can be fractional but the exponent has to be an integer. The literal MeE is equivalent to M * 10**E. Examples include 2e10, 2e10, 2e-10, 2.5e1, as suggested in official solidity documentation https://docs.soliditylang.org/en/latest/types.html#rational-and-integer-literals</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "2JE_G396JyV5yh8-EUb_6CfzCR4=",
//                   "bug_id": "SS_272_7",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/MasterContract.sol",
//                           "line_nos_end": [37],
//                           "line_nos_start": [37]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Solidity supports multiple rational and integer literals, including decimal fractions and scientific notations. The use of very large numbers with too many digits was detected in the code that could have been optimized using a different notation also supported by Solidity. The variable seadSaleToken was found to be affected. .</p>",
//                   "issue_name": "LONG NUMBER LITERALS",
//                   "issue_remediation": "<p>Scientific notation in the form of 2e10 is also supported, where the mantissa can be fractional but the exponent has to be an integer. The literal MeE is equivalent to M * 10**E. Examples include 2e10, 2e10, 2e-10, 2.5e1, as suggested in official solidity documentation https://docs.soliditylang.org/en/latest/types.html#rational-and-integer-literals</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "_E5LwgyrwgyS3wu_qIBwZR4o3pQ=",
//                   "bug_id": "SS_272_8",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/MasterContract.sol",
//                           "line_nos_end": [40],
//                           "line_nos_start": [40]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Solidity supports multiple rational and integer literals, including decimal fractions and scientific notations. The use of very large numbers with too many digits was detected in the code that could have been optimized using a different notation also supported by Solidity. The variable publicSaleToken was found to be affected. .</p>",
//                   "issue_name": "LONG NUMBER LITERALS",
//                   "issue_remediation": "<p>Scientific notation in the form of 2e10 is also supported, where the mantissa can be fractional but the exponent has to be an integer. The literal MeE is equivalent to M * 10**E. Examples include 2e10, 2e10, 2e-10, 2.5e1, as suggested in official solidity documentation https://docs.soliditylang.org/en/latest/types.html#rational-and-integer-literals</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "rFhDxeERZMbGLmwFd3bk6jPcsTQ=",
//                   "bug_id": "SS_272_9",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/MasterContract.sol",
//                           "line_nos_end": [43],
//                           "line_nos_start": [43]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Solidity supports multiple rational and integer literals, including decimal fractions and scientific notations. The use of very large numbers with too many digits was detected in the code that could have been optimized using a different notation also supported by Solidity. The variable operationToken was found to be affected. .</p>",
//                   "issue_name": "LONG NUMBER LITERALS",
//                   "issue_remediation": "<p>Scientific notation in the form of 2e10 is also supported, where the mantissa can be fractional but the exponent has to be an integer. The literal MeE is equivalent to M * 10**E. Examples include 2e10, 2e10, 2e-10, 2.5e1, as suggested in official solidity documentation https://docs.soliditylang.org/en/latest/types.html#rational-and-integer-literals</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "fE2m4hfxMwjerDvQ8J1u81ft0NY=",
//                   "bug_id": "SS_272_10",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/MasterContract.sol",
//                           "line_nos_end": [46],
//                           "line_nos_start": [46]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Solidity supports multiple rational and integer literals, including decimal fractions and scientific notations. The use of very large numbers with too many digits was detected in the code that could have been optimized using a different notation also supported by Solidity. The variable developmentToken was found to be affected. .</p>",
//                   "issue_name": "LONG NUMBER LITERALS",
//                   "issue_remediation": "<p>Scientific notation in the form of 2e10 is also supported, where the mantissa can be fractional but the exponent has to be an integer. The literal MeE is equivalent to M * 10**E. Examples include 2e10, 2e10, 2e-10, 2.5e1, as suggested in official solidity documentation https://docs.soliditylang.org/en/latest/types.html#rational-and-integer-literals</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "pm9bE5afI8zA0Ww_Vs0wt_FKgwY=",
//                   "bug_id": "SS_272_11",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/MasterContract.sol",
//                           "line_nos_end": [49],
//                           "line_nos_start": [49]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Solidity supports multiple rational and integer literals, including decimal fractions and scientific notations. The use of very large numbers with too many digits was detected in the code that could have been optimized using a different notation also supported by Solidity. The variable marketingToken was found to be affected. .</p>",
//                   "issue_name": "LONG NUMBER LITERALS",
//                   "issue_remediation": "<p>Scientific notation in the form of 2e10 is also supported, where the mantissa can be fractional but the exponent has to be an integer. The literal MeE is equivalent to M * 10**E. Examples include 2e10, 2e10, 2e-10, 2.5e1, as suggested in official solidity documentation https://docs.soliditylang.org/en/latest/types.html#rational-and-integer-literals</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "6H3JqSj0r2PxUK6325j1BVG-rjk=",
//                   "bug_id": "SS_272_12",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/MasterContract.sol",
//                           "line_nos_end": [52],
//                           "line_nos_start": [52]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Solidity supports multiple rational and integer literals, including decimal fractions and scientific notations. The use of very large numbers with too many digits was detected in the code that could have been optimized using a different notation also supported by Solidity. The variable teamToken was found to be affected. .</p>",
//                   "issue_name": "LONG NUMBER LITERALS",
//                   "issue_remediation": "<p>Scientific notation in the form of 2e10 is also supported, where the mantissa can be fractional but the exponent has to be an integer. The literal MeE is equivalent to M * 10**E. Examples include 2e10, 2e10, 2e-10, 2.5e1, as suggested in official solidity documentation https://docs.soliditylang.org/en/latest/types.html#rational-and-integer-literals</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "aXyawVdxRa8sNtm8-OqnvlqVRhc=",
//                   "bug_id": "SS_272_13",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/MasterContract.sol",
//                           "line_nos_end": [55],
//                           "line_nos_start": [55]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Solidity supports multiple rational and integer literals, including decimal fractions and scientific notations. The use of very large numbers with too many digits was detected in the code that could have been optimized using a different notation also supported by Solidity. The variable advisorToken was found to be affected. .</p>",
//                   "issue_name": "LONG NUMBER LITERALS",
//                   "issue_remediation": "<p>Scientific notation in the form of 2e10 is also supported, where the mantissa can be fractional but the exponent has to be an integer. The literal MeE is equivalent to M * 10**E. Examples include 2e10, 2e10, 2e-10, 2.5e1, as suggested in official solidity documentation https://docs.soliditylang.org/en/latest/types.html#rational-and-integer-literals</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "nlAkT5QSJLi805JsvkIXEiyHCiI=",
//                   "bug_id": "SS_272_14",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/MasterContract.sol",
//                           "line_nos_end": [58],
//                           "line_nos_start": [58]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Solidity supports multiple rational and integer literals, including decimal fractions and scientific notations. The use of very large numbers with too many digits was detected in the code that could have been optimized using a different notation also supported by Solidity. The variable communityToken was found to be affected. .</p>",
//                   "issue_name": "LONG NUMBER LITERALS",
//                   "issue_remediation": "<p>Scientific notation in the form of 2e10 is also supported, where the mantissa can be fractional but the exponent has to be an integer. The literal MeE is equivalent to M * 10**E. Examples include 2e10, 2e10, 2e-10, 2.5e1, as suggested in official solidity documentation https://docs.soliditylang.org/en/latest/types.html#rational-and-integer-literals</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "lwtbnG4GFdAZeHs_Ein52OTHNww=",
//                   "bug_id": "SS_272_15",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/MasterContract.sol",
//                           "line_nos_end": [61],
//                           "line_nos_start": [61]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Solidity supports multiple rational and integer literals, including decimal fractions and scientific notations. The use of very large numbers with too many digits was detected in the code that could have been optimized using a different notation also supported by Solidity. The variable reserveToken was found to be affected. .</p>",
//                   "issue_name": "LONG NUMBER LITERALS",
//                   "issue_remediation": "<p>Scientific notation in the form of 2e10 is also supported, where the mantissa can be fractional but the exponent has to be an integer. The literal MeE is equivalent to M * 10**E. Examples include 2e10, 2e10, 2e-10, 2.5e1, as suggested in official solidity documentation https://docs.soliditylang.org/en/latest/types.html#rational-and-integer-literals</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "SMkCnoJV2y_fuZevFfxffVBKlFg=",
//                   "bug_id": "SS_272_16",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/MasterContract.sol",
//                           "line_nos_end": [64],
//                           "line_nos_start": [64]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Solidity supports multiple rational and integer literals, including decimal fractions and scientific notations. The use of very large numbers with too many digits was detected in the code that could have been optimized using a different notation also supported by Solidity. The variable stakingToken was found to be affected. .</p>",
//                   "issue_name": "LONG NUMBER LITERALS",
//                   "issue_remediation": "<p>Scientific notation in the form of 2e10 is also supported, where the mantissa can be fractional but the exponent has to be an integer. The literal MeE is equivalent to M * 10**E. Examples include 2e10, 2e10, 2e-10, 2.5e1, as suggested in official solidity documentation https://docs.soliditylang.org/en/latest/types.html#rational-and-integer-literals</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "VxqLQ1t3FLuFb1VsjrmMMMwDYPA=",
//                   "bug_id": "SS_272_17",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/MasterContract.sol",
//                           "line_nos_end": [67],
//                           "line_nos_start": [67]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Solidity supports multiple rational and integer literals, including decimal fractions and scientific notations. The use of very large numbers with too many digits was detected in the code that could have been optimized using a different notation also supported by Solidity. The variable liquidityToken was found to be affected. .</p>",
//                   "issue_name": "LONG NUMBER LITERALS",
//                   "issue_remediation": "<p>Scientific notation in the form of 2e10 is also supported, where the mantissa can be fractional but the exponent has to be an integer. The literal MeE is equivalent to M * 10**E. Examples include 2e10, 2e10, 2e-10, 2.5e1, as suggested in official solidity documentation https://docs.soliditylang.org/en/latest/types.html#rational-and-integer-literals</p>",
//                   "severity": "low"
//               }
//           ],
//           "issue_id": "SOLIDITY_LONG_NUMBER_LITERALS",
//           "issue_name": "LONG NUMBER LITERALS"
//       },
//       "SOLIDITY_MISSING_EVENTS": {
//           "issue_details": [
//               {
//                   "bug_hash": "D-8R6cvCQcEPO7a9pISRaj33dUU=",
//                   "bug_id": "SS_272_205",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/test/invariants/STETHVaultInvariants.sol",
//                           "line_nos_end": [22],
//                           "line_nos_start": [14]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract STETH was found to be missing these events on the function transferFrom which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "NAJdwNZxB_S6heTbpdzWmJ_bEaQ=",
//                   "bug_id": "SS_272_206",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/test/invariants/STETHVaultInvariants.sol",
//                           "line_nos_end": [26],
//                           "line_nos_start": [24]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract STETH was found to be missing these events on the function generateInterest which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "8YLdYSjBDuPE4LrAhlaJqHYeWg0=",
//                   "bug_id": "SS_272_207",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/test/invariants/STETHVaultInvariants.sol",
//                           "line_nos_end": [32],
//                           "line_nos_start": [30]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract String was found to be missing these events on the function equal which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "FiZZBHo7v0E3hOod4yjWaye0hWU=",
//                   "bug_id": "SS_272_208",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/test/invariants/STETHVaultInvariants.sol",
//                           "line_nos_end": [42],
//                           "line_nos_start": [40]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract FuzzyAddresses was found to be missing these events on the function _addressIsAllowed which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "jud9oDBAEoIb8GElbViVCN66N9A=",
//                   "bug_id": "SS_272_209",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/test/invariants/STETHVaultInvariants.sol",
//                           "line_nos_end": [65],
//                           "line_nos_start": [63]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract STETHVaultInvariants was found to be missing these events on the function echidna_test_name which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "n5fATSQEjvhdQ9uUv4N3Sg3MtUQ=",
//                   "bug_id": "SS_272_210",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/test/invariants/STETHVaultInvariants.sol",
//                           "line_nos_end": [69],
//                           "line_nos_start": [67]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract STETHVaultInvariants was found to be missing these events on the function echidna_test_symbol which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "WBThbe85BYdgSxTsE9INC1gpzNY=",
//                   "bug_id": "SS_272_211",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/test/invariants/STETHVaultInvariants.sol",
//                           "line_nos_end": [73],
//                           "line_nos_start": [71]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract STETHVaultInvariants was found to be missing these events on the function echidna_test_decimals which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "B3CBWZ1do6StJZORpwcaI9WIREE=",
//                   "bug_id": "SS_272_212",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/test/invariants/STETHVaultInvariants.sol",
//                           "line_nos_end": [79],
//                           "line_nos_start": [75]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract STETHVaultInvariants was found to be missing these events on the function generateInterest which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "ai030UPnNXk8xvzgTrm1kJfKX3I=",
//                   "bug_id": "SS_272_213",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/test/invariants/STETHVaultInvariants.sol",
//                           "line_nos_end": [90],
//                           "line_nos_start": [82]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract STETHVaultInvariants was found to be missing these events on the function echidna_sum_total_supply which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "ehq81KhUkg1x_EuVhaZKaKu7OFs=",
//                   "bug_id": "SS_272_214",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/test/invariants/STETHVaultInvariants.sol",
//                           "line_nos_end": [102],
//                           "line_nos_start": [98]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract STETHVaultInvariants was found to be missing these events on the function helpProcessQueue which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "l3IHYIdNP56z3WfYOeRnO5Yl504=",
//                   "bug_id": "SS_272_215",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/test/invariants/STETHVaultInvariants.sol",
//                           "line_nos_end": [109],
//                           "line_nos_start": [104]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract STETHVaultInvariants was found to be missing these events on the function deposit which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "UPt_8d9Tz8dOqPxyzIkEj3P69Vo=",
//                   "bug_id": "SS_272_216",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/test/invariants/STETHVaultInvariants.sol",
//                           "line_nos_end": [116],
//                           "line_nos_start": [111]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract STETHVaultInvariants was found to be missing these events on the function mint which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "IH1Ucs0xixvGN5f4-RdxuJUKGns=",
//                   "bug_id": "SS_272_217",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/test/invariants/STETHVaultInvariants.sol",
//                           "line_nos_end": [158],
//                           "line_nos_start": [155]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract STETHVaultInvariants was found to be missing these events on the function transfer which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "iJweV0qa73lWycDZyXq8I06Yfuo=",
//                   "bug_id": "SS_272_218",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/test/invariants/STETHVaultInvariants.sol",
//                           "line_nos_end": [167],
//                           "line_nos_start": [160]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract STETHVaultInvariants was found to be missing these events on the function transferFrom which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "QKEL3bInszOCRujBn2Kq2Fhd9aU=",
//                   "bug_id": "SS_272_219",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/DepositQueueLib.sol",
//                           "line_nos_end": [24],
//                           "line_nos_start": [17]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract DepositQueueLib was found to be missing these events on the function push which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "nPyWiPjUsM_MCcLQDp5WBEXTuqY=",
//                   "bug_id": "SS_272_220",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/DepositQueueLib.sol",
//                           "line_nos_end": [52],
//                           "line_nos_start": [26]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract DepositQueueLib was found to be missing these events on the function remove which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "6MSbgE60L84DJw3xgdaUEYzkTHM=",
//                   "bug_id": "SS_272_221",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/DepositQueueLib.sol",
//                           "line_nos_end": [58],
//                           "line_nos_start": [54]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract DepositQueueLib was found to be missing these events on the function get which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "I9SDGGYhcLO9NlOHxS5iwnPFGFg=",
//                   "bug_id": "SS_272_222",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/DepositQueueLib.sol",
//                           "line_nos_end": [62],
//                           "line_nos_start": [60]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract DepositQueueLib was found to be missing these events on the function balanceOf which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "nMPYhJKvERAeEedvLg2y-XbiZhg=",
//                   "bug_id": "SS_272_223",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/DepositQueueLib.sol",
//                           "line_nos_end": [66],
//                           "line_nos_start": [64]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract DepositQueueLib was found to be missing these events on the function size which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "ZKLfGU0oQbpYmoQnHngn3JmCzQk=",
//                   "bug_id": "SS_272_224",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/TransferUtils.sol",
//                           "line_nos_end": [16],
//                           "line_nos_start": [10]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract TransferUtils was found to be missing these events on the function safeTransfer which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "fAdVDAbmCMYONuLk6yIsgoBX_1s=",
//                   "bug_id": "SS_272_225",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/TransferUtils.sol",
//                           "line_nos_end": [25],
//                           "line_nos_start": [18]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract TransferUtils was found to be missing these events on the function safeTransferFrom which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "1BayGUaKFBltC0pNcf6u5SEVyUA=",
//                   "bug_id": "SS_272_226",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/TransferUtils.sol",
//                           "line_nos_end": [35],
//                           "line_nos_start": [27]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract TransferUtils was found to be missing these events on the function _callOptionalReturn which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "spq7AlNOsMtOrHJ-fdWEvVrE4Lc=",
//                   "bug_id": "SS_272_227",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/CastUint.sol",
//                           "line_nos_end": [16],
//                           "line_nos_start": [9]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract CastUint was found to be missing these events on the function toAddress which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "UvsUGk2ndU7uFCc0tdxPpVnQZFw=",
//                   "bug_id": "SS_272_228",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/FixedPointMath.sol",
//                           "line_nos_end": [22],
//                           "line_nos_start": [15]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract FixedPointMath was found to be missing these events on the function mulDivDown which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "zH5Rc5NnZGLCJU2leeDQfQv82Gk=",
//                   "bug_id": "SS_272_229",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/FixedPointMath.sol",
//                           "line_nos_end": [32],
//                           "line_nos_start": [24]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract FixedPointMath was found to be missing these events on the function mulDivUp which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "d_O4gDfT7h7ihxDaagTmEnHOwjA=",
//                   "bug_id": "SS_272_230",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/FixedPointMath.sol",
//                           "line_nos_end": [36],
//                           "line_nos_start": [34]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract FixedPointMath was found to be missing these events on the function mulDivUp which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "uU33YtlmkJY3kj_qRfDMFcv3NY8=",
//                   "bug_id": "SS_272_231",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/FixedPointMath.sol",
//                           "line_nos_end": [40],
//                           "line_nos_start": [38]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract FixedPointMath was found to be missing these events on the function mulDivDown which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "vIKqsQeiYzxxCIPQc8VNiLT2tqU=",
//                   "bug_id": "SS_272_232",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/FixedPointMath.sol",
//                           "line_nos_end": [44],
//                           "line_nos_start": [42]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract FixedPointMath was found to be missing these events on the function mulDivUp which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "6DxFefZKs62w-AoFj3bmexG6tlo=",
//                   "bug_id": "SS_272_233",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/FixedPointMath.sol",
//                           "line_nos_end": [48],
//                           "line_nos_start": [46]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract FixedPointMath was found to be missing these events on the function mulDivDown which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "_H6pYRQTEPpAaOPl8v-zt4V-wng=",
//                   "bug_id": "SS_272_234",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/FixedPointMath.sol",
//                           "line_nos_end": [52],
//                           "line_nos_start": [50]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract FixedPointMath was found to be missing these events on the function fractionRoundUp which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "AgqEiQZCLgsyhsU6TWBr0FnGv3U=",
//                   "bug_id": "SS_272_235",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/FixedPointMath.sol",
//                           "line_nos_end": [56],
//                           "line_nos_start": [54]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract FixedPointMath was found to be missing these events on the function fractionRoundDown which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "f462rrmgRVyeeVPCJfWGwzCaJKo=",
//                   "bug_id": "SS_272_236",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/FixedPointMath.sol",
//                           "line_nos_end": [60],
//                           "line_nos_start": [58]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract FixedPointMath was found to be missing these events on the function min which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "tAk5gbwFAHDUHZtgFRLaIeovSDw=",
//                   "bug_id": "SS_272_237",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/configuration/ConfigurationManager.sol",
//                           "line_nos_end": [38],
//                           "line_nos_start": [36]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract ConfigurationManager was found to be missing these events on the function getParameter which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "2wJ7rbakA37oAnikMXd22ZJGGtk=",
//                   "bug_id": "SS_272_238",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/configuration/ConfigurationManager.sol",
//                           "line_nos_end": [46],
//                           "line_nos_start": [44]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract ConfigurationManager was found to be missing these events on the function getGlobalParameter which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "OUARZCmdsEkxLWJjEKoHqJWuyeg=",
//                   "bug_id": "SS_272_239",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/configuration/ConfigurationManager.sol",
//                           "line_nos_end": [66],
//                           "line_nos_start": [64]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract ConfigurationManager was found to be missing these events on the function getCap which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "BF3vxx19FO2H_F0vPMRyasCRt7w=",
//                   "bug_id": "SS_272_240",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/BaseVault.sol",
//                           "line_nos_end": [60],
//                           "line_nos_start": [58]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BaseVault was found to be missing these events on the function decimals which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "bhzW8NAXkc_UzUo2614mlf48DIE=",
//                   "bug_id": "SS_272_241",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/BaseVault.sol",
//                           "line_nos_end": [155],
//                           "line_nos_start": [155]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BaseVault was found to be missing these events on the function totalAssets which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "0Y3z0FcKYWQSyJvQWSa_QnKlx5k=",
//                   "bug_id": "SS_272_242",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/BaseVault.sol",
//                           "line_nos_end": [162],
//                           "line_nos_start": [160]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BaseVault was found to be missing these events on the function previewDeposit which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "8qjVxgdvMOevTJIzLMd1hlg8H-c=",
//                   "bug_id": "SS_272_243",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/BaseVault.sol",
//                           "line_nos_end": [170],
//                           "line_nos_start": [167]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BaseVault was found to be missing these events on the function previewMint which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "k7StZPIxCxudY_FZFyi6YYcZfT0=",
//                   "bug_id": "SS_272_244",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/BaseVault.sol",
//                           "line_nos_end": [177],
//                           "line_nos_start": [175]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BaseVault was found to be missing these events on the function previewWithdraw which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "O_pRnAkT8EVvad_-2lanXeI9PQE=",
//                   "bug_id": "SS_272_245",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/BaseVault.sol",
//                           "line_nos_end": [185],
//                           "line_nos_start": [182]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BaseVault was found to be missing these events on the function previewRedeem which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "SPr2eDWlIV63WE6Xm1QROq2NGNs=",
//                   "bug_id": "SS_272_246",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/BaseVault.sol",
//                           "line_nos_end": [193],
//                           "line_nos_start": [190]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BaseVault was found to be missing these events on the function convertToShares which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "xm5Tmm6t6CfEa5dNlsdSHfXh_98=",
//                   "bug_id": "SS_272_247",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/BaseVault.sol",
//                           "line_nos_end": [201],
//                           "line_nos_start": [198]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BaseVault was found to be missing these events on the function convertToAssets which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "BTps71ok5c1lKhm65JSDE5CZDMg=",
//                   "bug_id": "SS_272_248",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/BaseVault.sol",
//                           "line_nos_end": [208],
//                           "line_nos_start": [206]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BaseVault was found to be missing these events on the function maxDeposit which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "SVSYZoILuECNccWAaA8YENteFTs=",
//                   "bug_id": "SS_272_249",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/BaseVault.sol",
//                           "line_nos_end": [215],
//                           "line_nos_start": [213]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BaseVault was found to be missing these events on the function maxMint which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "fYii2fwp41lBtCGHYZqErZTh_Iw=",
//                   "bug_id": "SS_272_250",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/BaseVault.sol",
//                           "line_nos_end": [222],
//                           "line_nos_start": [220]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BaseVault was found to be missing these events on the function maxWithdraw which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "pEXI0QJgj__AzXyxIR9NwvDaWN8=",
//                   "bug_id": "SS_272_251",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/BaseVault.sol",
//                           "line_nos_end": [229],
//                           "line_nos_start": [227]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BaseVault was found to be missing these events on the function maxRedeem which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "6or8HPxcmbMbJm8aGCJfbtYMXDs=",
//                   "bug_id": "SS_272_252",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/BaseVault.sol",
//                           "line_nos_end": [238],
//                           "line_nos_start": [234]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BaseVault was found to be missing these events on the function withdrawFeeRatio which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "LwgLBUKmoTpqhNm-1iBRhEiAezE=",
//                   "bug_id": "SS_272_253",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/BaseVault.sol",
//                           "line_nos_end": [245],
//                           "line_nos_start": [243]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BaseVault was found to be missing these events on the function idleAssetsOf which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "gsXXfpYbB1zOKwBI3OVkSqhTgWA=",
//                   "bug_id": "SS_272_254",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/BaseVault.sol",
//                           "line_nos_end": [255],
//                           "line_nos_start": [250]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BaseVault was found to be missing these events on the function assetsOf which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "8F73pckAaOzeVD4PGweycMxiJk4=",
//                   "bug_id": "SS_272_255",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/BaseVault.sol",
//                           "line_nos_end": [262],
//                           "line_nos_start": [260]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BaseVault was found to be missing these events on the function totalIdleAssets which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "-jaiyZgpIxvJxtmcgMNRAca69iY=",
//                   "bug_id": "SS_272_256",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/BaseVault.sol",
//                           "line_nos_end": [269],
//                           "line_nos_start": [267]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BaseVault was found to be missing these events on the function depositQueueSize which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "wvBVBVD3HbgGaSlKlPor680sD7E=",
//                   "bug_id": "SS_272_257",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/BaseVault.sol",
//                           "line_nos_end": [276],
//                           "line_nos_start": [274]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BaseVault was found to be missing these events on the function controller which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "hvXRd6WUCM8mOCl3nZ7VNHqDN_g=",
//                   "bug_id": "SS_272_258",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/BaseVault.sol",
//                           "line_nos_end": [317],
//                           "line_nos_start": [306]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BaseVault was found to be missing these events on the function processQueuedDeposits which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "s_0HZ6bvV43n852R8mDbL1ZmOSA=",
//                   "bug_id": "SS_272_259",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/BaseVault.sol",
//                           "line_nos_end": [337],
//                           "line_nos_start": [335]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BaseVault was found to be missing these events on the function _getFee which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "D-4144y4tf3T4f10f1nbwM6Qf5M=",
//                   "bug_id": "SS_272_260",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/BaseVault.sol",
//                           "line_nos_end": [342],
//                           "line_nos_start": [342]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BaseVault was found to be missing these events on the function _beforeWithdraw which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "7hxSMITLlXKpmBRMS3FVYsFfARw=",
//                   "bug_id": "SS_272_261",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/BaseVault.sol",
//                           "line_nos_end": [345],
//                           "line_nos_start": [345]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BaseVault was found to be missing these events on the function _afterRoundStart which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "5sDeNWFZlMjIewfjN2TBB0zHfFI=",
//                   "bug_id": "SS_272_262",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/BaseVault.sol",
//                           "line_nos_end": [348],
//                           "line_nos_start": [348]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BaseVault was found to be missing these events on the function _afterRoundEnd which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "-5-FNabNyZEvjc5FNwrfufcR_88=",
//                   "bug_id": "SS_272_263",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/STETHVault.sol",
//                           "line_nos_end": [47],
//                           "line_nos_start": [45]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract STETHVault was found to be missing these events on the function name which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "coTfV67vT_PmjdKmyz0wU9QeGjY=",
//                   "bug_id": "SS_272_264",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/STETHVault.sol",
//                           "line_nos_end": [54],
//                           "line_nos_start": [52]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract STETHVault was found to be missing these events on the function symbol which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "UTMmXzk0XURuyHaMVzM32jUi7zg=",
//                   "bug_id": "SS_272_265",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/STETHVault.sol",
//                           "line_nos_end": [130],
//                           "line_nos_start": [128]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract STETHVault was found to be missing these events on the function _beforeWithdraw which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "dZTGBng9bvaQoe1HXTqC_p4pFtI=",
//                   "bug_id": "SS_272_266",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/STETHVault.sol",
//                           "line_nos_end": [137],
//                           "line_nos_start": [135]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract STETHVault was found to be missing these events on the function totalAssets which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "SWzSFNKuHqSx-gaT9RSh7U7tlcI=",
//                   "bug_id": "SS_272_267",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/STETHVault.sol",
//                           "line_nos_end": [153],
//                           "line_nos_start": [149]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract STETHVault was found to be missing these events on the function _tryTransferSTETH which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "bshokWfIJFMJqg3r3h99Zs_FQxU=",
//                   "bug_id": "SS_272_268",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mixins/Capped.sol",
//                           "line_nos_end": [23],
//                           "line_nos_start": [20]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract Capped was found to be missing these events on the function availableCap which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "mVjlQjgQIPUSn1REVBbqktfrlkU=",
//                   "bug_id": "SS_272_269",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mixins/Capped.sol",
//                           "line_nos_end": [33],
//                           "line_nos_start": [29]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract Capped was found to be missing these events on the function _spendCap which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "Q8wvMyyI86geLGUb3Nza9nIBQfM=",
//                   "bug_id": "SS_272_270",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mixins/Capped.sol",
//                           "line_nos_end": [43],
//                           "line_nos_start": [39]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract Capped was found to be missing these events on the function _restoreCap which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "qV1mbboa7-IWRQqnfJL4VAGxhI4=",
//                   "bug_id": "SS_272_271",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/YieldVaultMock.sol",
//                           "line_nos_end": [21],
//                           "line_nos_start": [19]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract YieldVaultMock was found to be missing these events on the function totalAssets which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "-ekB5_MrGnOQPlWuinR4hkZarfI=",
//                   "bug_id": "SS_272_272",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/YieldVaultMock.sol",
//                           "line_nos_end": [25],
//                           "line_nos_start": [23]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract YieldVaultMock was found to be missing these events on the function _beforeWithdraw which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "lDXd53jwTdsiRPbGMY5f1r3DEyA=",
//                   "bug_id": "SS_272_273",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/YieldVaultMock.sol",
//                           "line_nos_end": [32],
//                           "line_nos_start": [27]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract YieldVaultMock was found to be missing these events on the function _afterRoundStart which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "8kTGq4CQKJXcWrGM8vGgCddpzyo=",
//                   "bug_id": "SS_272_274",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/InvestorActorMock.sol",
//                           "line_nos_end": [18],
//                           "line_nos_start": [16]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract InvestorActorMock was found to be missing these events on the function generatePremium which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "Ol706Gti-WbA_8JPxYFauBnxO3w=",
//                   "bug_id": "SS_272_275",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/InvestorActorMock.sol",
//                           "line_nos_end": [23],
//                           "line_nos_start": [20]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract InvestorActorMock was found to be missing these events on the function buyOptionsWithYield which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "U3MBdblLVK5Id8ZMSp_i1youHNg=",
//                   "bug_id": "SS_272_276",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/InvestorActorMock.sol",
//                           "line_nos_end": [27],
//                           "line_nos_start": [25]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract InvestorActorMock was found to be missing these events on the function approveVaultToPull which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "12KkbxKRD-Hc3MizOsCc8ME8920=",
//                   "bug_id": "SS_272_277",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/YieldSourceMock.sol",
//                           "line_nos_end": [23],
//                           "line_nos_start": [21]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract YieldSourceMock was found to be missing these events on the function name which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "YP_3W1wIrmoLj2S-8BVv2yMwWfI=",
//                   "bug_id": "SS_272_278",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/YieldSourceMock.sol",
//                           "line_nos_end": [27],
//                           "line_nos_start": [25]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract YieldSourceMock was found to be missing these events on the function symbol which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "ZRvTJAz6-Niab_LSd0Sr4RitVj0=",
//                   "bug_id": "SS_272_279",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/YieldSourceMock.sol",
//                           "line_nos_end": [31],
//                           "line_nos_start": [29]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract YieldSourceMock was found to be missing these events on the function generateInterest which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "hQGt3RdvVio2BUTFJzM9Td5xzo8=",
//                   "bug_id": "SS_272_280",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/YieldSourceMock.sol",
//                           "line_nos_end": [41],
//                           "line_nos_start": [33]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract YieldSourceMock was found to be missing these events on the function deposit which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "wdPqpjTPa2na-LZ8KIP_q9g-Ns4=",
//                   "bug_id": "SS_272_281",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/YieldSourceMock.sol",
//                           "line_nos_end": [48],
//                           "line_nos_start": [43]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract YieldSourceMock was found to be missing these events on the function withdraw which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "IhCTuHwR1S1CakyZyHVyUD3GggY=",
//                   "bug_id": "SS_272_282",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/YieldSourceMock.sol",
//                           "line_nos_end": [58],
//                           "line_nos_start": [50]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract YieldSourceMock was found to be missing these events on the function redeem which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "ZeQBhDIIbibjy4_8zYvE3qLLiJ0=",
//                   "bug_id": "SS_272_283",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/YieldSourceMock.sol",
//                           "line_nos_end": [62],
//                           "line_nos_start": [60]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract YieldSourceMock was found to be missing these events on the function previewDeposit which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "Gk15KkYeT5-dHcO2uPoeGBas8aI=",
//                   "bug_id": "SS_272_284",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/YieldSourceMock.sol",
//                           "line_nos_end": [67],
//                           "line_nos_start": [64]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract YieldSourceMock was found to be missing these events on the function previewWithdraw which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "D0G1n4Hp3mAKwzbC7-vtMP1y9cQ=",
//                   "bug_id": "SS_272_285",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/YieldSourceMock.sol",
//                           "line_nos_end": [71],
//                           "line_nos_start": [69]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract YieldSourceMock was found to be missing these events on the function previewRedeem which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "hreu7y6L6ZIWCQKJ8NsIf3MlVTs=",
//                   "bug_id": "SS_272_286",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/YieldSourceMock.sol",
//                           "line_nos_end": [75],
//                           "line_nos_start": [73]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract YieldSourceMock was found to be missing these events on the function totalAssets which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "yVntpnQ2XYK5IPqcMwAJmpA4Ets=",
//                   "bug_id": "SS_272_287",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/YieldSourceMock.sol",
//                           "line_nos_end": [80],
//                           "line_nos_start": [77]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract YieldSourceMock was found to be missing these events on the function convertToShares which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "OgVh4qVmWH6Ztwy9yCJie0t8bME=",
//                   "bug_id": "SS_272_288",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/YieldSourceMock.sol",
//                           "line_nos_end": [85],
//                           "line_nos_start": [82]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract YieldSourceMock was found to be missing these events on the function convertToAssets which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "K2jJba8LAKB-D_UtOWj0Op6GnDA=",
//                   "bug_id": "SS_272_289",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/Asset.sol",
//                           "line_nos_end": [13],
//                           "line_nos_start": [11]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract Asset was found to be missing these events on the function mint which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "C92DViUhczLag6CbPkBpw8AaT6M=",
//                   "bug_id": "SS_272_290",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/Asset.sol",
//                           "line_nos_end": [17],
//                           "line_nos_start": [15]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract Asset was found to be missing these events on the function donate which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "1sGg4VRTPt_jCZ_fbxuJcMLRpd0=",
//                   "bug_id": "SS_272_291",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/Asset.sol",
//                           "line_nos_end": [21],
//                           "line_nos_start": [19]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract Asset was found to be missing these events on the function burn which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "zXz21FpcAzMD3ot1_kC-xmeB7XU=",
//                   "bug_id": "SS_272_292",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/DepositQueueMock.sol",
//                           "line_nos_end": [14],
//                           "line_nos_start": [12]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract DepositQueueMock was found to be missing these events on the function push which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "VBLWAIq1eHO9O3HEBbjziIx0L3Q=",
//                   "bug_id": "SS_272_293",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/DepositQueueMock.sol",
//                           "line_nos_end": [18],
//                           "line_nos_start": [16]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract DepositQueueMock was found to be missing these events on the function remove which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "uJKJNZcwinZNE6r06o2ETjFOues=",
//                   "bug_id": "SS_272_294",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/DepositQueueMock.sol",
//                           "line_nos_end": [22],
//                           "line_nos_start": [20]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract DepositQueueMock was found to be missing these events on the function get which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "ktkYsf6BQQ0TA0Lxhj7o8lQGNw0=",
//                   "bug_id": "SS_272_295",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/DepositQueueMock.sol",
//                           "line_nos_end": [26],
//                           "line_nos_start": [24]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract DepositQueueMock was found to be missing these events on the function balanceOf which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "QdmeA6sgnzakh07VKZ5W5sTO1TA=",
//                   "bug_id": "SS_272_296",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/DepositQueueMock.sol",
//                           "line_nos_end": [30],
//                           "line_nos_start": [28]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract DepositQueueMock was found to be missing these events on the function size which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "-UfEWgGR2j4PY-dw6qcm2nh0_LQ=",
//                   "bug_id": "SS_272_297",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/DepositQueueMock.sol",
//                           "line_nos_end": [34],
//                           "line_nos_start": [32]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract DepositQueueMock was found to be missing these events on the function totalDeposited which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "M4h6vUk6qiB_oYlbhhZ74R2YEYQ=",
//                   "bug_id": "SS_272_298",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/FixedPointMathMock.sol",
//                           "line_nos_end": [17],
//                           "line_nos_start": [11]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract FixedPointMathMock was found to be missing these events on the function mulDivUp which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "k-2FiGDvEg20Ia6G6R5PkojiBiE=",
//                   "bug_id": "SS_272_299",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/FixedPointMathMock.sol",
//                           "line_nos_end": [25],
//                           "line_nos_start": [19]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract FixedPointMathMock was found to be missing these events on the function mulDivDown which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "48pX3zInm1cYnjDHYHczWqD-9uA=",
//                   "bug_id": "SS_272_300",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/FixedPointMathMock.sol",
//                           "line_nos_end": [29],
//                           "line_nos_start": [27]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract FixedPointMathMock was found to be missing these events on the function mulDivUpFractional0 which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "GHvL1x6fiPia-ejKR4b97L3jyOU=",
//                   "bug_id": "SS_272_301",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/FixedPointMathMock.sol",
//                           "line_nos_end": [33],
//                           "line_nos_start": [31]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract FixedPointMathMock was found to be missing these events on the function mulDivDownFractional0 which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "xNMkHr_bk9jpDe7zF7_UmjxZMLg=",
//                   "bug_id": "SS_272_302",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/FixedPointMathMock.sol",
//                           "line_nos_end": [37],
//                           "line_nos_start": [35]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract FixedPointMathMock was found to be missing these events on the function mulDivUpFractional1 which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "cNmE7VmIczmSionr44x4DdEFqtU=",
//                   "bug_id": "SS_272_303",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/FixedPointMathMock.sol",
//                           "line_nos_end": [41],
//                           "line_nos_start": [39]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract FixedPointMathMock was found to be missing these events on the function mulDivDownFractional1 which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "T9_cXYwMuDlOhCboaGtD0VhVVpg=",
//                   "bug_id": "SS_272_304",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/FixedPointMathMock.sol",
//                           "line_nos_end": [45],
//                           "line_nos_start": [43]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract FixedPointMathMock was found to be missing these events on the function fractionRoundUp which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "vjKtc0kAX4RRI6hB9UwpfIpxf9o=",
//                   "bug_id": "SS_272_305",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/FixedPointMathMock.sol",
//                           "line_nos_end": [49],
//                           "line_nos_start": [47]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract FixedPointMathMock was found to be missing these events on the function fractionRoundDown which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "rS3Ed34os0MtQbZXEWs9CVVAYug=",
//                   "bug_id": "SS_272_306",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/FixedPointMathMock.sol",
//                           "line_nos_end": [53],
//                           "line_nos_start": [51]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract FixedPointMathMock was found to be missing these events on the function min which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "zem0pEJmsw5scX63ghB4gZIjB_I=",
//                   "bug_id": "SS_272_307",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/PrincipalProtectedMock.sol",
//                           "line_nos_end": [107],
//                           "line_nos_start": [105]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract PrincipalProtectedMock was found to be missing these events on the function totalAssets which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "CMCe2yHRDVjRkqxsgzMe1lgBrMk=",
//                   "bug_id": "SS_272_308",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/PrincipalProtectedMock.sol",
//                           "line_nos_end": [112],
//                           "line_nos_start": [109]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract PrincipalProtectedMock was found to be missing these events on the function _beforeWithdraw which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "CbNumMjRMhwRceNg2bcvot70CAo=",
//                   "bug_id": "SS_272_309",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/interfaces/IERC4626.sol",
//                           "line_nos_end": [21],
//                           "line_nos_start": [21]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IERC4626 was found to be missing these events on the function totalAssets which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "yi6V8_jxtUuuKKaT91XZIs1Xscs=",
//                   "bug_id": "SS_272_310",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/interfaces/IERC4626.sol",
//                           "line_nos_end": [27],
//                           "line_nos_start": [27]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IERC4626 was found to be missing these events on the function deposit which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "tE8fAZ7q0dSOrQNgu_7jnAPbo2k=",
//                   "bug_id": "SS_272_311",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/interfaces/IERC4626.sol",
//                           "line_nos_end": [33],
//                           "line_nos_start": [33]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IERC4626 was found to be missing these events on the function mint which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "3VYcXdLOMP7hGlgzalL1MG0iGqg=",
//                   "bug_id": "SS_272_312",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/interfaces/IERC4626.sol",
//                           "line_nos_end": [43],
//                           "line_nos_start": [39]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IERC4626 was found to be missing these events on the function redeem which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "IA5n_amRGf0rYDWF5V_hDCWfACo=",
//                   "bug_id": "SS_272_313",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/interfaces/IERC4626.sol",
//                           "line_nos_end": [53],
//                           "line_nos_start": [49]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IERC4626 was found to be missing these events on the function withdraw which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "N_EZuB0ZVXBltzyHgy4mD9QAcuQ=",
//                   "bug_id": "SS_272_314",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/interfaces/IERC4626.sol",
//                           "line_nos_end": [58],
//                           "line_nos_start": [58]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IERC4626 was found to be missing these events on the function previewDeposit which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "D6Jqoi_4WdWuwLF8by8OXF7oqTA=",
//                   "bug_id": "SS_272_315",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/interfaces/IERC4626.sol",
//                           "line_nos_end": [63],
//                           "line_nos_start": [63]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IERC4626 was found to be missing these events on the function previewMint which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "UOzTp1Np8kyOQ4FX-78skkuJCt8=",
//                   "bug_id": "SS_272_316",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/interfaces/IERC4626.sol",
//                           "line_nos_end": [68],
//                           "line_nos_start": [68]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IERC4626 was found to be missing these events on the function previewWithdraw which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "fXVcpWcb_hiG_NQEK8UH3JoWNJY=",
//                   "bug_id": "SS_272_317",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/interfaces/IERC4626.sol",
//                           "line_nos_end": [73],
//                           "line_nos_start": [73]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IERC4626 was found to be missing these events on the function previewRedeem which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "0BuoJKwhDyZbSOkLGxt5b5YoySs=",
//                   "bug_id": "SS_272_318",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/interfaces/IERC4626.sol",
//                           "line_nos_end": [79],
//                           "line_nos_start": [79]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IERC4626 was found to be missing these events on the function convertToShares which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "mMhBxYyx_uED7S9XQdz_FvXwEGo=",
//                   "bug_id": "SS_272_319",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/interfaces/IERC4626.sol",
//                           "line_nos_end": [85],
//                           "line_nos_start": [85]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IERC4626 was found to be missing these events on the function convertToAssets which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "bOMhgGZfUKUkZy8GN7b3LpcC9LY=",
//                   "bug_id": "SS_272_320",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/interfaces/IERC4626.sol",
//                           "line_nos_end": [91],
//                           "line_nos_start": [91]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IERC4626 was found to be missing these events on the function maxDeposit which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "7higrntJB0bM-bteTAT_veoxdUU=",
//                   "bug_id": "SS_272_321",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/interfaces/IERC4626.sol",
//                           "line_nos_end": [97],
//                           "line_nos_start": [97]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IERC4626 was found to be missing these events on the function maxMint which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "LAmVivNQmGrsTnp-3TMvQEjVpXk=",
//                   "bug_id": "SS_272_322",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/interfaces/IERC4626.sol",
//                           "line_nos_end": [103],
//                           "line_nos_start": [103]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IERC4626 was found to be missing these events on the function maxWithdraw which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "qgKz6ngBe8IMxyS4occTxcvzHVY=",
//                   "bug_id": "SS_272_323",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/interfaces/IERC4626.sol",
//                           "line_nos_end": [109],
//                           "line_nos_start": [109]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IERC4626 was found to be missing these events on the function maxRedeem which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "izouxPOEpIa7S68fBdx8pbzXaoc=",
//                   "bug_id": "SS_272_324",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/interfaces/IVault.sol",
//                           "line_nos_end": [23],
//                           "line_nos_start": [23]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IVault was found to be missing these events on the function withdrawFeeRatio which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "wW_76A2GfU6PeGSmgSEcVgzeWYM=",
//                   "bug_id": "SS_272_325",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/interfaces/IVault.sol",
//                           "line_nos_end": [28],
//                           "line_nos_start": [28]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IVault was found to be missing these events on the function controller which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "y6Y07uZfdh9E7HffvEK87tOO6GI=",
//                   "bug_id": "SS_272_326",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/interfaces/IVault.sol",
//                           "line_nos_end": [33],
//                           "line_nos_start": [33]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IVault was found to be missing these events on the function idleAssetsOf which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "YX2VbcG1gT7PkMvsn024_OtK14M=",
//                   "bug_id": "SS_272_327",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/interfaces/IVault.sol",
//                           "line_nos_end": [39],
//                           "line_nos_start": [39]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IVault was found to be missing these events on the function assetsOf which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "EM14lM1RFs7p1yfwRADiQHfwigs=",
//                   "bug_id": "SS_272_328",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/interfaces/IVault.sol",
//                           "line_nos_end": [44],
//                           "line_nos_start": [44]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IVault was found to be missing these events on the function totalIdleAssets which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "2mirJgxWeW1NvedIx4SYOQNYdTw=",
//                   "bug_id": "SS_272_329",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/interfaces/IVault.sol",
//                           "line_nos_end": [49],
//                           "line_nos_start": [49]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IVault was found to be missing these events on the function depositQueueSize which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "xRXa-aSABHwmG_cZ1rIOZW6fRFE=",
//                   "bug_id": "SS_272_330",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/interfaces/IVault.sol",
//                           "line_nos_end": [55],
//                           "line_nos_start": [55]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IVault was found to be missing these events on the function startRound which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "At09hrfCoIZ4MOd_VNcl34kBNuM=",
//                   "bug_id": "SS_272_331",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/interfaces/IVault.sol",
//                           "line_nos_end": [61],
//                           "line_nos_start": [61]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IVault was found to be missing these events on the function endRound which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "Ne9ewzZSpK0ymGiSEtrL9c8nV5A=",
//                   "bug_id": "SS_272_332",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/interfaces/IVault.sol",
//                           "line_nos_end": [71],
//                           "line_nos_start": [71]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IVault was found to be missing these events on the function processQueuedDeposits which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "ZVc4ndDEe6lGRb6VWKYvsAthSC0=",
//                   "bug_id": "SS_272_333",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/interfaces/IConfigurationManager.sol",
//                           "line_nos_end": [15],
//                           "line_nos_start": [11]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IConfigurationManager was found to be missing these events on the function setParameter which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "QNunnUOdTd0rALRztPtFjkT-ydk=",
//                   "bug_id": "SS_272_334",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/interfaces/IConfigurationManager.sol",
//                           "line_nos_end": [17],
//                           "line_nos_start": [17]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IConfigurationManager was found to be missing these events on the function getParameter which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "0QgARlf7KaNLDRdc_yFA8hf6Duc=",
//                   "bug_id": "SS_272_335",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/interfaces/IConfigurationManager.sol",
//                           "line_nos_end": [19],
//                           "line_nos_start": [19]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IConfigurationManager was found to be missing these events on the function getGlobalParameter which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "bqIxdsH88qpbLG3yQbXu3q_C3s8=",
//                   "bug_id": "SS_272_336",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/interfaces/IConfigurationManager.sol",
//                           "line_nos_end": [21],
//                           "line_nos_start": [21]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IConfigurationManager was found to be missing these events on the function setCap which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "NjKkWPHJXLEVWedEkF4rjFisvT4=",
//                   "bug_id": "SS_272_337",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/interfaces/IConfigurationManager.sol",
//                           "line_nos_end": [23],
//                           "line_nos_start": [23]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IConfigurationManager was found to be missing these events on the function getCap which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "2_8HnOe5j8MqLIbrZWNhYmDzYV8=",
//                   "bug_id": "SS_272_338",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [18],
//                           "line_nos_start": [18]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IERC20 was found to be missing these events on the function totalSupply which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "MlS7xTSNe-R-vV1z1Lz7F4ajnvw=",
//                   "bug_id": "SS_272_339",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [20],
//                           "line_nos_start": [20]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IERC20 was found to be missing these events on the function balanceOf which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "oHgO2lYTAaxnxKRDcqLgcR3a4m0=",
//                   "bug_id": "SS_272_340",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [23],
//                           "line_nos_start": [22]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IERC20 was found to be missing these events on the function allowance which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "UIH5HBjFcPutdwnnuiBpx9gMcq0=",
//                   "bug_id": "SS_272_341",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [25],
//                           "line_nos_start": [25]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IERC20 was found to be missing these events on the function transfer which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "VH-qeIpAM22k2y4GJBC8Zn0YrL0=",
//                   "bug_id": "SS_272_342",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [28],
//                           "line_nos_start": [27]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IERC20 was found to be missing these events on the function approve which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "WkniB4fnV2HTZf3gMqLL7i0uPgk=",
//                   "bug_id": "SS_272_343",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [31],
//                           "line_nos_start": [30]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract IERC20 was found to be missing these events on the function transferFrom which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "3_ykgto5nV_gLD81rcGfi1IWcg0=",
//                   "bug_id": "SS_272_344",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [69],
//                           "line_nos_start": [57]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract SafeMath was found to be missing these events on the function mul which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "ySUh5UfXSkw_jhqjfkZnu8Hl_BY=",
//                   "bug_id": "SS_272_345",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [80],
//                           "line_nos_start": [74]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract SafeMath was found to be missing these events on the function div which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "WtZ9-Gi60uA18it2l8Zfb9Ix1vg=",
//                   "bug_id": "SS_272_346",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [90],
//                           "line_nos_start": [85]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract SafeMath was found to be missing these events on the function sub which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "BdTOsCLUTNQ8PXY7U7V9i1BrX_8=",
//                   "bug_id": "SS_272_347",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [100],
//                           "line_nos_start": [95]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract SafeMath was found to be missing these events on the function add which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "Dx5GQ2Eor2xAj6XMm2507K_Rx38=",
//                   "bug_id": "SS_272_348",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [109],
//                           "line_nos_start": [106]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract SafeMath was found to be missing these events on the function mod which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "rB5hAogpPWPU3pZyuASWN_wCfDQ=",
//                   "bug_id": "SS_272_349",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [135],
//                           "line_nos_start": [133]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract ERC20 was found to be missing these events on the function totalSupply which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "AgzYjZDpL2FIyRyalyDYo3BA4_M=",
//                   "bug_id": "SS_272_350",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [144],
//                           "line_nos_start": [142]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract ERC20 was found to be missing these events on the function balanceOf which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "evaw3ScjeQxOJgdC22awmRMXlAE=",
//                   "bug_id": "SS_272_351",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [161],
//                           "line_nos_start": [152]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract ERC20 was found to be missing these events on the function allowance which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "aSXqRPRfiSBRBXd8A2DMHy5wHJk=",
//                   "bug_id": "SS_272_352",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [171],
//                           "line_nos_start": [168]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract ERC20 was found to be missing these events on the function transfer which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "Yhg3sBIOdBlmHg3aDq_WJlcTk7s=",
//                   "bug_id": "SS_272_353",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [209],
//                           "line_nos_start": [196]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract ERC20 was found to be missing these events on the function transferFrom which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "i5n26YPYN6NPIbfN9UrrD36qRmo=",
//                   "bug_id": "SS_272_354",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [318],
//                           "line_nos_start": [310]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract ERC20 was found to be missing these events on the function _burnFrom which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "2-abN8_7kV8LmXUYeKXmNbOb7n8=",
//                   "bug_id": "SS_272_355",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [356],
//                           "line_nos_start": [354]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract TokenMintERC20Token was found to be missing these events on the function name which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "lUeQGgLCVe3uNnUvrJQgLAeP_0Q=",
//                   "bug_id": "SS_272_356",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [363],
//                           "line_nos_start": [361]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract TokenMintERC20Token was found to be missing these events on the function symbol which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "sXAu0VtVplE8GAwO5jagqvBrUmQ=",
//                   "bug_id": "SS_272_357",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [370],
//                           "line_nos_start": [368]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract TokenMintERC20Token was found to be missing these events on the function decimals which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "k5mztHdEuCVyOHAKrxwhhfEFHn8=",
//                   "bug_id": "SS_272_358",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [70],
//                           "line_nos_start": [68]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract NFTLender was found to be missing these events on the function getBalance which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "GCb8A_uEU4DfoHEMNip8DKYbgA8=",
//                   "bug_id": "SS_272_359",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [74],
//                           "line_nos_start": [72]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract NFTLender was found to be missing these events on the function getListingById which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "7rExGxs-sPa-PqRG9K_O5wMfht8=",
//                   "bug_id": "SS_272_360",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [98],
//                           "line_nos_start": [76]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract NFTLender was found to be missing these events on the function getListings which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "7qsAz4gRQW7yWIyLx63eukMv8DA=",
//                   "bug_id": "SS_272_361",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [102],
//                           "line_nos_start": [100]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract NFTLender was found to be missing these events on the function getAllListings which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "Ned8DIFkEU2GY5eIcqa_vhv8DJY=",
//                   "bug_id": "SS_272_362",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [134],
//                           "line_nos_start": [104]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract NFTLender was found to be missing these events on the function getListingsByAddress which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "hV_w7PUIN3es_WZwTqJsD4yJnqg=",
//                   "bug_id": "SS_272_363",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [193],
//                           "line_nos_start": [184]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract NFTLender was found to be missing these events on the function cancelListing which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "SaPACzOT0tLUAztXvz4gXNmmHpU=",
//                   "bug_id": "SS_272_364",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [213],
//                           "line_nos_start": [195]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract NFTLender was found to be missing these events on the function fundListing which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "UivbNl7aSJ2SEqJVB4-oinYW9Ps=",
//                   "bug_id": "SS_272_365",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [219],
//                           "line_nos_start": [215]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract NFTLender was found to be missing these events on the function withdrawBalance which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "I-n-jRFGStn7M7f52FVMKG1rMwQ=",
//                   "bug_id": "SS_272_366",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [235],
//                           "line_nos_start": [221]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract NFTLender was found to be missing these events on the function repayForListing which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "Fvf-BrzHZ1nCZqz-wuTFLmsF9NU=",
//                   "bug_id": "SS_272_367",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [249],
//                           "line_nos_start": [237]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract NFTLender was found to be missing these events on the function claimCollateralAsFunder which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "J8jjl19dXgdszMWG7qX_ztyNGQA=",
//                   "bug_id": "SS_272_368",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [254],
//                           "line_nos_start": [251]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract NFTLender was found to be missing these events on the function setListingPrice which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "rGOVwahyods24OSRA_fEmusMxkc=",
//                   "bug_id": "SS_272_369",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [258],
//                           "line_nos_start": [256]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract NFTLender was found to be missing these events on the function getListingPrice which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "It28pS9O1PhTA1vlJlyDQWRSrxM=",
//                   "bug_id": "SS_272_370",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [262],
//                           "line_nos_start": [260]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract NFTLender was found to be missing these events on the function getContractBalance which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "ut1KQOO9g02q6igq_DV2ew50SHE=",
//                   "bug_id": "SS_272_371",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [266],
//                           "line_nos_start": [264]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract NFTLender was found to be missing these events on the function getContractEarnings which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "zuqx9SpP1NWJJbh6wMUTA-7rN5g=",
//                   "bug_id": "SS_272_372",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [270],
//                           "line_nos_start": [268]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract NFTLender was found to be missing these events on the function getContractWithdrawals which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "t93ekasorF6LZZhlfK2IndEyhH0=",
//                   "bug_id": "SS_272_373",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [274],
//                           "line_nos_start": [272]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract NFTLender was found to be missing these events on the function getContractDonates which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "hRExDADFWjEv9LpfWFJt_dqA-kU=",
//                   "bug_id": "SS_272_374",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [281],
//                           "line_nos_start": [276]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract NFTLender was found to be missing these events on the function withdrawToSafe which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "W1tYJZ63_t39SUuXE1JNHWHF-Jw=",
//                   "bug_id": "SS_272_375",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [290],
//                           "line_nos_start": [283]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract NFTLender was found to be missing these events on the function onERC721Received which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "YV-QKEDidsnH0b6aX4_pweRC4Nc=",
//                   "bug_id": "SS_272_376",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [294],
//                           "line_nos_start": [292]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract NFTLender was found to be missing these events on the function  which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "lNKSYuuyiWJFqfupYkYq8bZWDuA=",
//                   "bug_id": "SS_272_377",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [298],
//                           "line_nos_start": [296]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract NFTLender was found to be missing these events on the function  which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "4dndAVU3NEKw0ZVK0pvKnWpOeKE=",
//                   "bug_id": "SS_272_378",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/AtlantisGate.sol",
//                           "line_nos_end": [29],
//                           "line_nos_start": [27]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract AtlantisGate was found to be missing these events on the function balanceOf which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "AyY06t7da3ZEF4tn-eDhTiuInLU=",
//                   "bug_id": "SS_272_379",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/AtlantisGate.sol",
//                           "line_nos_end": [33],
//                           "line_nos_start": [31]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract AtlantisGate was found to be missing these events on the function getContractEarnings which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "EakRrFnTForTs2fza465aAq1TgU=",
//                   "bug_id": "SS_272_380",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/AtlantisGate.sol",
//                           "line_nos_end": [37],
//                           "line_nos_start": [35]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract AtlantisGate was found to be missing these events on the function getContractDonates which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "VG_L_eEU65UJfgJBeSGdtKohBfw=",
//                   "bug_id": "SS_272_381",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/AtlantisGate.sol",
//                           "line_nos_end": [41],
//                           "line_nos_start": [39]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract AtlantisGate was found to be missing these events on the function getContractWithdrawFees which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "XGJ71IGLl8RWUVLV8eTSdZsB8j0=",
//                   "bug_id": "SS_272_382",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/AtlantisGate.sol",
//                           "line_nos_end": [46],
//                           "line_nos_start": [43]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract AtlantisGate was found to be missing these events on the function deposit which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "n6tkaQDCH43AAIiIXXmPQ3fWp_M=",
//                   "bug_id": "SS_272_383",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/AtlantisGate.sol",
//                           "line_nos_end": [55],
//                           "line_nos_start": [48]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract AtlantisGate was found to be missing these events on the function withdraw which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "RHbbjiggZuJ5_VqYlJ_eGFtb1h4=",
//                   "bug_id": "SS_272_384",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/AtlantisGate.sol",
//                           "line_nos_end": [66],
//                           "line_nos_start": [57]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract AtlantisGate was found to be missing these events on the function moveBalance which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "rhdo8kRQvXWKDUKM4TY2RpOIyiQ=",
//                   "bug_id": "SS_272_385",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/AtlantisGate.sol",
//                           "line_nos_end": [73],
//                           "line_nos_start": [68]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract AtlantisGate was found to be missing these events on the function changeWinningsFee which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "QajXi1iY5XexghZP4uy1mZn7uAw=",
//                   "bug_id": "SS_272_386",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/AtlantisGate.sol",
//                           "line_nos_end": [77],
//                           "line_nos_start": [75]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract AtlantisGate was found to be missing these events on the function pause which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "PdnPWoxzhqpSp6H6vCB_g3AeTE8=",
//                   "bug_id": "SS_272_387",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/AtlantisGate.sol",
//                           "line_nos_end": [81],
//                           "line_nos_start": [79]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract AtlantisGate was found to be missing these events on the function unpause which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "8UhngT-1KJxbZM2bWj2Qro9L9Xk=",
//                   "bug_id": "SS_272_388",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/AtlantisGate.sol",
//                           "line_nos_end": [85],
//                           "line_nos_start": [83]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract AtlantisGate was found to be missing these events on the function  which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "opdO8fk5aDytf4oT5IArLWjSLP4=",
//                   "bug_id": "SS_272_389",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/AtlantisGate.sol",
//                           "line_nos_end": [89],
//                           "line_nos_start": [87]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract AtlantisGate was found to be missing these events on the function  which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "noy00d88coDasklTYleEYYQEH9c=",
//                   "bug_id": "SS_272_390",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [117],
//                           "line_nos_start": [93]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract WAHED was found to be missing these events on the function claim which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "jUHucUeJQCP90PraVvxd9ix6eE4=",
//                   "bug_id": "SS_272_391",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [121],
//                           "line_nos_start": [119]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract WAHED was found to be missing these events on the function currentTime which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "TlSkwoC4AXSOSkdkYiRgYfJRt2E=",
//                   "bug_id": "SS_272_392",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [125],
//                           "line_nos_start": [123]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract WAHED was found to be missing these events on the function updateFounderAddress which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "IdlYTquhHqrqXbuS_aIIcllv-2w=",
//                   "bug_id": "SS_272_393",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [133],
//                           "line_nos_start": [130]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract WAHED was found to be missing these events on the function pause which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "uUVlU5OipCmoxtlpPKAcBscw4_0=",
//                   "bug_id": "SS_272_394",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [138],
//                           "line_nos_start": [135]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract WAHED was found to be missing these events on the function unpause which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "rmQoyiyOGzL5vHHKvzsWyyruJh8=",
//                   "bug_id": "SS_272_395",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [146],
//                           "line_nos_start": [144]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract WAHED was found to be missing these events on the function burn which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "ERdsUhK0MUXVkvVCnb8U2hxqyIQ=",
//                   "bug_id": "SS_272_396",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [158],
//                           "line_nos_start": [151]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract WAHED was found to be missing these events on the function mint which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "4R26WSQSFw1m6SDQK5mTbnw993Y=",
//                   "bug_id": "SS_272_397",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [167],
//                           "line_nos_start": [161]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract WAHED was found to be missing these events on the function _beforeTokenTransfer which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "jW-9fcfnu1XvNER21ukGQf7lQM8=",
//                   "bug_id": "SS_272_398",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/Migrations.sol",
//                           "line_nos_end": [18],
//                           "line_nos_start": [16]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract Migrations was found to be missing these events on the function setCompleted which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "4EsRUk5iTuhsqkwIjGcbaaHy8lU=",
//                   "bug_id": "SS_272_399",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/MarathonFlair/Pie.sol",
//                           "line_nos_end": [38],
//                           "line_nos_start": [29]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract Marathon was found to be missing these events on the function _beforeTokenTransfer which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "ahgpLy3WjS7kBh0Vm3bncnicI28=",
//                   "bug_id": "SS_272_400",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/MarathonFlair/Pie.sol",
//                           "line_nos_end": [42],
//                           "line_nos_start": [39]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract Marathon was found to be missing these events on the function clearTokens which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "tOwhnjX70jeQ-VXusBZoRrH_tKU=",
//                   "bug_id": "SS_272_401",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/MarathonFlair/Pie.sol",
//                           "line_nos_end": [45],
//                           "line_nos_start": [43]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract Marathon was found to be missing these events on the function setEnableAntiBot which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "bljpg-zzWH933MXrDHRvj4cPdso=",
//                   "bug_id": "SS_272_402",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TimedCrowdsale.sol",
//                           "line_nos_end": [59],
//                           "line_nos_start": [57]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract TimedCrowdsale was found to be missing these events on the function openingTime which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "NsVNfpTGeF97_pu05-jrnGKoon4=",
//                   "bug_id": "SS_272_403",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TimedCrowdsale.sol",
//                           "line_nos_end": [66],
//                           "line_nos_start": [64]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract TimedCrowdsale was found to be missing these events on the function closingTime which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "4q_MjNwC14oYXQjAyWgopmuo3Xk=",
//                   "bug_id": "SS_272_404",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TimedCrowdsale.sol",
//                           "line_nos_end": [75],
//                           "line_nos_start": [71]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract TimedCrowdsale was found to be missing these events on the function isOpen which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "w0EW3nxdrAqNzvS6pN7fntuWfa8=",
//                   "bug_id": "SS_272_405",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TimedCrowdsale.sol",
//                           "line_nos_end": [84],
//                           "line_nos_start": [81]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract TimedCrowdsale was found to be missing these events on the function hasClosed which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "LG78rS992h2uxtHaKboLJOPcDn8=",
//                   "bug_id": "SS_272_406",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TimedCrowdsale.sol",
//                           "line_nos_end": [99],
//                           "line_nos_start": [91]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract TimedCrowdsale was found to be missing these events on the function _preValidatePurchase which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "7VNtvIH5VhF2y8CBHAuzOqv_t7M=",
//                   "bug_id": "SS_272_407",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Crowdsale.sol",
//                           "line_nos_end": [88],
//                           "line_nos_start": [86]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract Crowdsale was found to be missing these events on the function  which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "BXYIBFTWq7Ve_NFdfCgLS4hoyK8=",
//                   "bug_id": "SS_272_408",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Crowdsale.sol",
//                           "line_nos_end": [95],
//                           "line_nos_start": [93]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract Crowdsale was found to be missing these events on the function token which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "hmK4jqWtMM0zsElCs6fno2Dqk6g=",
//                   "bug_id": "SS_272_409",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Crowdsale.sol",
//                           "line_nos_end": [102],
//                           "line_nos_start": [100]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract Crowdsale was found to be missing these events on the function wallet which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "88hytejAH3tKtltMSO5OLQugYTI=",
//                   "bug_id": "SS_272_410",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Crowdsale.sol",
//                           "line_nos_end": [109],
//                           "line_nos_start": [107]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract Crowdsale was found to be missing these events on the function rate which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "57NekI_Wh57CQ7fX3UTVgLJexyM=",
//                   "bug_id": "SS_272_411",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Crowdsale.sol",
//                           "line_nos_end": [116],
//                           "line_nos_start": [114]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract Crowdsale was found to be missing these events on the function weiRaised which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "dzQeyWJq1-TDT9EZCdpnoI0p4tU=",
//                   "bug_id": "SS_272_412",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Crowdsale.sol",
//                           "line_nos_end": [163],
//                           "line_nos_start": [152]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract Crowdsale was found to be missing these events on the function _preValidatePurchase which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "7pf_u0-5fVAmyvELt0KW-r4CnTU=",
//                   "bug_id": "SS_272_413",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Crowdsale.sol",
//                           "line_nos_end": [176],
//                           "line_nos_start": [171]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract Crowdsale was found to be missing these events on the function _postValidatePurchase which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "TtbXoIX_VUELLZrcyKkg5g9Na8I=",
//                   "bug_id": "SS_272_414",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Crowdsale.sol",
//                           "line_nos_end": [189],
//                           "line_nos_start": [184]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract Crowdsale was found to be missing these events on the function _deliverTokens which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "SvAVfGQAfM7R4L0M7OooVPXG7CA=",
//                   "bug_id": "SS_272_415",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Crowdsale.sol",
//                           "line_nos_end": [201],
//                           "line_nos_start": [197]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract Crowdsale was found to be missing these events on the function _processPurchase which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "nepkJ31735Zcq6gSB_j-TgVorz0=",
//                   "bug_id": "SS_272_416",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Crowdsale.sol",
//                           "line_nos_end": [213],
//                           "line_nos_start": [209]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract Crowdsale was found to be missing these events on the function _updatePurchasingState which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "4qlo6z41w1NNvatum8vOOfWaEwY=",
//                   "bug_id": "SS_272_417",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Crowdsale.sol",
//                           "line_nos_end": [226],
//                           "line_nos_start": [220]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract Crowdsale was found to be missing these events on the function _getTokenAmount which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "ab_0Oau_ofKSLvKF9vAvp7KLJiA=",
//                   "bug_id": "SS_272_418",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Crowdsale.sol",
//                           "line_nos_end": [233],
//                           "line_nos_start": [231]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract Crowdsale was found to be missing these events on the function _forwardFunds which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "0oIAVw-Ecs8B7pYtGkJHbxAqJhQ=",
//                   "bug_id": "SS_272_419",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [78],
//                           "line_nos_start": [78]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract TokenVesting was found to be missing these events on the function  which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "Vwtbln8waW7X7t_l9IK_UPy4NE8=",
//                   "bug_id": "SS_272_420",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [80],
//                           "line_nos_start": [80]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract TokenVesting was found to be missing these events on the function  which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "x6abYElwU-AnGm9h5wceLpwaGSg=",
//                   "bug_id": "SS_272_421",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [91],
//                           "line_nos_start": [86]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract TokenVesting was found to be missing these events on the function getVestingSchedulesCountByBeneficiary which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "YrzLxCekQvsaJEIuMVtZz3eMKMA=",
//                   "bug_id": "SS_272_422",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [103],
//                           "line_nos_start": [97]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract TokenVesting was found to be missing these events on the function getVestingIdAtIndex which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "BssEjpHdd2uhk1yRNNiYxPt1pkU=",
//                   "bug_id": "SS_272_423",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [114],
//                           "line_nos_start": [109]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract TokenVesting was found to be missing these events on the function getVestingScheduleByAddressAndIndex which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "CLe2D-TX_g5gwk_6e2AquZL335U=",
//                   "bug_id": "SS_272_424",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [126],
//                           "line_nos_start": [121]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract TokenVesting was found to be missing these events on the function getVestingSchedulesTotalAmount which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "I0vRvbypi8G_N1XCXIDPjzjdUZY=",
//                   "bug_id": "SS_272_425",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [136],
//                           "line_nos_start": [131]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract TokenVesting was found to be missing these events on the function getToken which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "CHap2-UMMy5b9Kbbp4OwoCLtsnM=",
//                   "bug_id": "SS_272_426",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [184],
//                           "line_nos_start": [148]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract TokenVesting was found to be missing these events on the function createVestingSchedule which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "qUuzQkMXAao7yvHknsoh9HUzgNI=",
//                   "bug_id": "SS_272_427",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [203],
//                           "line_nos_start": [190]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract TokenVesting was found to be missing these events on the function revoke which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "fIncza3C_DN4LFW92tEzlucx7-0=",
//                   "bug_id": "SS_272_428",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [215],
//                           "line_nos_start": [209]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract TokenVesting was found to be missing these events on the function withdraw which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "ikKyujzjOAo5tmXjhVR-JaGjYAU=",
//                   "bug_id": "SS_272_429",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [242],
//                           "line_nos_start": [222]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract TokenVesting was found to be missing these events on the function release which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "Rok6I-vpr1LQZgmG6PvNX44XAoY=",
//                   "bug_id": "SS_272_430",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [253],
//                           "line_nos_start": [248]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract TokenVesting was found to be missing these events on the function getVestingSchedulesCount which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "zeGf1HSmDmmXS8O_etuyvncywD0=",
//                   "bug_id": "SS_272_431",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [266],
//                           "line_nos_start": [259]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract TokenVesting was found to be missing these events on the function computeReleasableAmount which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "QbL1Q1zzWGqXbWIRLyplGl_91-8=",
//                   "bug_id": "SS_272_432",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [277],
//                           "line_nos_start": [272]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract TokenVesting was found to be missing these events on the function getVestingSchedule which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "4HKCJkzSAjk-pc3N7kvpxXLTJuI=",
//                   "bug_id": "SS_272_433",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [288],
//                           "line_nos_start": [283]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract TokenVesting was found to be missing these events on the function getWithdrawableAmount which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "1EpK14THpgZU36zmwlCX9n0o_MA=",
//                   "bug_id": "SS_272_434",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [298],
//                           "line_nos_start": [293]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract TokenVesting was found to be missing these events on the function computeNextVestingScheduleIdForHolder which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "FxRrl69Q6ssrPsDZKYQTDcptikA=",
//                   "bug_id": "SS_272_435",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [308],
//                           "line_nos_start": [303]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract TokenVesting was found to be missing these events on the function getLastVestingScheduleForHolder which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "e-HRToLXt5xCOnDuvMaX8ARFlv4=",
//                   "bug_id": "SS_272_436",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [318],
//                           "line_nos_start": [313]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract TokenVesting was found to be missing these events on the function computeVestingScheduleIdForAddressAndIndex which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "XBnXq4yPsHoXOy6r3c7Y-6lgXDE=",
//                   "bug_id": "SS_272_437",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [342],
//                           "line_nos_start": [324]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract TokenVesting was found to be missing these events on the function _computeReleasableAmount which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "65L6CYaIa1yv87bEEE4DCFXb7CI=",
//                   "bug_id": "SS_272_438",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [350],
//                           "line_nos_start": [344]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract TokenVesting was found to be missing these events on the function getCurrentTime which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "qihAK-vxGzqrQpCo3KKoiq8MFTI=",
//                   "bug_id": "SS_272_439",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/MasterContract.sol",
//                           "line_nos_end": [83],
//                           "line_nos_start": [73]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract MasterContract was found to be missing these events on the function initialize which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "ZxxEVhvEGElAyR7EL4x7LpIic-o=",
//                   "bug_id": "SS_272_440",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/MasterContract.sol",
//                           "line_nos_end": [87],
//                           "line_nos_start": [85]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract MasterContract was found to be missing these events on the function pause which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "_cuL-4J7Sw3PrUCvbwTe0gwPIMQ=",
//                   "bug_id": "SS_272_441",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/MasterContract.sol",
//                           "line_nos_end": [91],
//                           "line_nos_start": [89]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract MasterContract was found to be missing these events on the function unpause which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "nqqig9absSt-GN_8web4F2g28u4=",
//                   "bug_id": "SS_272_442",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/MasterContract.sol",
//                           "line_nos_end": [95],
//                           "line_nos_start": [93]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract MasterContract was found to be missing these events on the function mint which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "ebIVggL13RkC9AuSau4bBP0T6Os=",
//                   "bug_id": "SS_272_443",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/MasterContract.sol",
//                           "line_nos_end": [104],
//                           "line_nos_start": [97]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract MasterContract was found to be missing these events on the function _beforeTokenTransfer which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "vBn_MOqpzYSh6vgtJx7Nuy80xX0=",
//                   "bug_id": "SS_272_444",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/MasterContract.sol",
//                           "line_nos_end": [110],
//                           "line_nos_start": [107]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract MasterContract was found to be missing these events on the function setTaxFee which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "dwr1N9dHZDQV87gLiqVkJ_Akz7s=",
//                   "bug_id": "SS_272_445",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/OTCContract.sol",
//                           "line_nos_end": [17],
//                           "line_nos_start": [14]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract OTCContract was found to be missing these events on the function setCurrentTime which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "9pd2166MSRB2lm43sdfEZ8V0s-M=",
//                   "bug_id": "SS_272_446",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/OTCContract.sol",
//                           "line_nos_end": [26],
//                           "line_nos_start": [19]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract OTCContract was found to be missing these events on the function getCurrentTime which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "pXldjp9JWZbPMxb_2oir9iWb1zs=",
//                   "bug_id": "SS_272_447",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Airdrop.sol",
//                           "line_nos_end": [32],
//                           "line_nos_start": [23]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract Airdrop was found to be missing these events on the function dropTokens which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "tf6EWm-jrCXMWUO_YmudnUC5zrQ=",
//                   "bug_id": "SS_272_448",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Airdrop.sol",
//                           "line_nos_end": [59],
//                           "line_nos_start": [57]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract Airdrop was found to be missing these events on the function updateTokenAddress which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "xidy286wGViljRbdLLzkTkLUI4o=",
//                   "bug_id": "SS_272_449",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Airdrop.sol",
//                           "line_nos_end": [63],
//                           "line_nos_start": [61]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract Airdrop was found to be missing these events on the function withdrawTokens which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "AmP5xxyODg9J_FmP5W608u063dQ=",
//                   "bug_id": "SS_272_450",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Airdrop.sol",
//                           "line_nos_end": [67],
//                           "line_nos_start": [65]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract Airdrop was found to be missing these events on the function withdrawEther which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "UAqhoBCUaLhhJfXSbkbr4H4JLFo=",
//                   "bug_id": "SS_272_451",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/BlockListed.sol",
//                           "line_nos_end": [10],
//                           "line_nos_start": [7]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BlockListed was found to be missing these events on the function blackList which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "f3lnjvwFc5FkHH6LBjnbIPKH9d4=",
//                   "bug_id": "SS_272_452",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/BlockListed.sol",
//                           "line_nos_end": [15],
//                           "line_nos_start": [12]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BlockListed was found to be missing these events on the function removeFromBlacklist which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "CWurldfQfwj41una5Jasxw--WSA=",
//                   "bug_id": "SS_272_453",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/AllowanceCrowdsale.sol",
//                           "line_nos_end": [36],
//                           "line_nos_start": [34]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract AllowanceCrowdsale was found to be missing these events on the function tokenWallet which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "4lq2DRY8l-glo1vAGODyYqw5UEs=",
//                   "bug_id": "SS_272_454",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/AllowanceCrowdsale.sol",
//                           "line_nos_end": [48],
//                           "line_nos_start": [42]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract AllowanceCrowdsale was found to be missing these events on the function remainingTokens which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "Hkn-kEM8gGmoDMUDpPw6ZoREFTY=",
//                   "bug_id": "SS_272_455",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/AllowanceCrowdsale.sol",
//                           "line_nos_end": [61],
//                           "line_nos_start": [55]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract AllowanceCrowdsale was found to be missing these events on the function _deliverTokens which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "tWYsGlie3fDOLRxFMp9Zu7hRlcU=",
//                   "bug_id": "SS_272_456",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/BRZtruffle/contracts/Token.sol",
//                           "line_nos_end": [28],
//                           "line_nos_start": [26]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BRZToken was found to be missing these events on the function decimals which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "-l1fhvqg71JyZBntT4LjQ_rpF_E=",
//                   "bug_id": "SS_272_457",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/BRZtruffle/contracts/Token.sol",
//                           "line_nos_end": [33],
//                           "line_nos_start": [30]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BRZToken was found to be missing these events on the function mint which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "Yr9V_zb_2xrhGc8tQ8Ouo_qzrxk=",
//                   "bug_id": "SS_272_458",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/BRZtruffle/contracts/Token.sol",
//                           "line_nos_end": [38],
//                           "line_nos_start": [35]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BRZToken was found to be missing these events on the function burn which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "uQXuscqXL39hYQCb6saUoSALN-Y=",
//                   "bug_id": "SS_272_459",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/BRZtruffle/contracts/Token.sol",
//                           "line_nos_end": [46],
//                           "line_nos_start": [40]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BRZToken was found to be missing these events on the function burnFrom which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "cH1Gnahp2oAU44uj5eDK7_052dI=",
//                   "bug_id": "SS_272_460",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/BRZtruffle/contracts/Token.sol",
//                           "line_nos_end": [51],
//                           "line_nos_start": [48]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BRZToken was found to be missing these events on the function pause which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "qac6zzcT55RB7QyPl02dRDhNg6I=",
//                   "bug_id": "SS_272_461",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/BRZtruffle/contracts/Token.sol",
//                           "line_nos_end": [56],
//                           "line_nos_start": [53]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BRZToken was found to be missing these events on the function unpause which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "mlo3J3WX3yaUOjLB_DmfwAGotM0=",
//                   "bug_id": "SS_272_462",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/BRZtruffle/contracts/Token.sol",
//                           "line_nos_end": [64],
//                           "line_nos_start": [61]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BRZToken was found to be missing these events on the function tokenBalanceOf which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "oPRMRvWkB_nIMnn86CRibqOI8NA=",
//                   "bug_id": "SS_272_463",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/BRZtruffle/contracts/Token.sol",
//                           "line_nos_end": [71],
//                           "line_nos_start": [66]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract BRZToken was found to be missing these events on the function tokenWithdraw which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "Klj1NF8tljZHOu_AH0FuG3UIxy4=",
//                   "bug_id": "SS_272_464",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/BRZtruffle/contracts/Migrations.sol",
//                           "line_nos_end": [18],
//                           "line_nos_start": [16]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in the transaction’s log — a special data structure in the blockchain. \n\nThese logs are associated with the address of the contract which can then be used by developers and auditors to keep track of the transactions. \n\nThe contract Migrations was found to be missing these events on the function setCompleted which would make it difficult or impossible to track these transactions off-chain.</p>",
//                   "issue_name": "MISSING EVENTS",
//                   "issue_remediation": "<p>Consider emitting events for the functions mentioned above. It is also recommended to have the addresses indexed.</p>",
//                   "severity": "low"
//               }
//           ],
//           "issue_id": "SOLIDITY_MISSING_EVENTS",
//           "issue_name": "MISSING EVENTS"
//       },
//       "SOLIDITY_OUTDATED_COMPILER_VERSION": {
//           "issue_details": [
//               {
//                   "bug_hash": "-TY8G_mPWfuhHza-ff_ZPqlqQuc=",
//                   "bug_id": "SS_272_65",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/AtlantisGate.sol",
//                           "line_nos_end": [2],
//                           "line_nos_start": [2]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Using an outdated compiler version can be problematic especially if there are publicly disclosed bugs and issues that affect the current compiler version.</p><p> The following outdated versions were detected:</p><p><code>['/AtlantisTruffle/contracts/AtlantisGate.sol']</code> - <code>^0.8.4</code></p>",
//                   "issue_name": "OUTDATED COMPILER VERSION",
//                   "issue_remediation": "<p>It is recommended to use a recent version of the Solidity compiler that should not be the most recent version, and it should not be an outdated version as well.\n Using very old versions of Solidity prevents the benefits of bug fixes and newer security checks.\n Consider using the solidity version <code>0.8.7</code>, which patches most solidity vulnerabilities. </p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "0TTXdt-8OpMTiiy6H6lmqN8k0FE=",
//                   "bug_id": "SS_272_66",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [1],
//                           "line_nos_start": [1]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Using an outdated compiler version can be problematic especially if there are publicly disclosed bugs and issues that affect the current compiler version.</p><p> The following outdated versions were detected:</p><p><code>['/WahedTruffle/contracts/WAHED.sol']</code> - <code>^0.8.0</code></p>",
//                   "issue_name": "OUTDATED COMPILER VERSION",
//                   "issue_remediation": "<p>It is recommended to use a recent version of the Solidity compiler that should not be the most recent version, and it should not be an outdated version as well.\n Using very old versions of Solidity prevents the benefits of bug fixes and newer security checks.\n Consider using the solidity version <code>0.8.7</code>, which patches most solidity vulnerabilities. </p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "0nzkqmYh3GvDn5Lqv1mT8_ue2O8=",
//                   "bug_id": "SS_272_67",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/MarathonFlair/Pie.sol",
//                           "line_nos_end": [2],
//                           "line_nos_start": [2]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Using an outdated compiler version can be problematic especially if there are publicly disclosed bugs and issues that affect the current compiler version.</p><p> The following outdated versions were detected:</p><p><code>['/MarathonFlair/Pie.sol']</code> - <code>^0.8.0</code></p>",
//                   "issue_name": "OUTDATED COMPILER VERSION",
//                   "issue_remediation": "<p>It is recommended to use a recent version of the Solidity compiler that should not be the most recent version, and it should not be an outdated version as well.\n Using very old versions of Solidity prevents the benefits of bug fixes and newer security checks.\n Consider using the solidity version <code>0.8.7</code>, which patches most solidity vulnerabilities. </p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "es8bxHuOPUGqLSGg6VTWJ-WPCDc=",
//                   "bug_id": "SS_272_68",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TimedCrowdsale.sol",
//                           "line_nos_end": [2],
//                           "line_nos_start": [2]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Using an outdated compiler version can be problematic especially if there are publicly disclosed bugs and issues that affect the current compiler version.</p><p> The following outdated versions were detected:</p><p><code>['/CaliburLand/contracts/TimedCrowdsale.sol']</code> - <code>^0.8.2</code></p>",
//                   "issue_name": "OUTDATED COMPILER VERSION",
//                   "issue_remediation": "<p>It is recommended to use a recent version of the Solidity compiler that should not be the most recent version, and it should not be an outdated version as well.\n Using very old versions of Solidity prevents the benefits of bug fixes and newer security checks.\n Consider using the solidity version <code>0.8.7</code>, which patches most solidity vulnerabilities. </p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "LD8drkmytdzlTRJ2RgOGGDnWFb8=",
//                   "bug_id": "SS_272_69",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Crowdsale.sol",
//                           "line_nos_end": [2],
//                           "line_nos_start": [2]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Using an outdated compiler version can be problematic especially if there are publicly disclosed bugs and issues that affect the current compiler version.</p><p> The following outdated versions were detected:</p><p><code>['/CaliburLand/contracts/Crowdsale.sol']</code> - <code>^0.8.2</code></p>",
//                   "issue_name": "OUTDATED COMPILER VERSION",
//                   "issue_remediation": "<p>It is recommended to use a recent version of the Solidity compiler that should not be the most recent version, and it should not be an outdated version as well.\n Using very old versions of Solidity prevents the benefits of bug fixes and newer security checks.\n Consider using the solidity version <code>0.8.7</code>, which patches most solidity vulnerabilities. </p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "D83FLEBTN1gqbBSshCY8NbzLSu8=",
//                   "bug_id": "SS_272_70",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/MasterContract.sol",
//                           "line_nos_end": [2],
//                           "line_nos_start": [2]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Using an outdated compiler version can be problematic especially if there are publicly disclosed bugs and issues that affect the current compiler version.</p><p> The following outdated versions were detected:</p><p><code>['/CaliburLand/contracts/MasterContract.sol']</code> - <code>^0.8.2</code></p>",
//                   "issue_name": "OUTDATED COMPILER VERSION",
//                   "issue_remediation": "<p>It is recommended to use a recent version of the Solidity compiler that should not be the most recent version, and it should not be an outdated version as well.\n Using very old versions of Solidity prevents the benefits of bug fixes and newer security checks.\n Consider using the solidity version <code>0.8.7</code>, which patches most solidity vulnerabilities. </p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "a80nvri8fT1mqV_AOZ3ZKc9lC6A=",
//                   "bug_id": "SS_272_71",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Airdrop.sol",
//                           "line_nos_end": [1],
//                           "line_nos_start": [1]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Using an outdated compiler version can be problematic especially if there are publicly disclosed bugs and issues that affect the current compiler version.</p><p> The following outdated versions were detected:</p><p><code>['/CaliburLand/contracts/Airdrop.sol']</code> - <code>^0.8.2</code></p>",
//                   "issue_name": "OUTDATED COMPILER VERSION",
//                   "issue_remediation": "<p>It is recommended to use a recent version of the Solidity compiler that should not be the most recent version, and it should not be an outdated version as well.\n Using very old versions of Solidity prevents the benefits of bug fixes and newer security checks.\n Consider using the solidity version <code>0.8.7</code>, which patches most solidity vulnerabilities. </p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "FB7_ID5fmgkYCgRIkwb7VDAlzOc=",
//                   "bug_id": "SS_272_72",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/BlockListed.sol",
//                           "line_nos_end": [2],
//                           "line_nos_start": [2]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Using an outdated compiler version can be problematic especially if there are publicly disclosed bugs and issues that affect the current compiler version.</p><p> The following outdated versions were detected:</p><p><code>['/CaliburLand/contracts/BlockListed.sol']</code> - <code>^0.8.2</code></p>",
//                   "issue_name": "OUTDATED COMPILER VERSION",
//                   "issue_remediation": "<p>It is recommended to use a recent version of the Solidity compiler that should not be the most recent version, and it should not be an outdated version as well.\n Using very old versions of Solidity prevents the benefits of bug fixes and newer security checks.\n Consider using the solidity version <code>0.8.7</code>, which patches most solidity vulnerabilities. </p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "ulobOK7rMXQiQNypmP32O-YVuUQ=",
//                   "bug_id": "SS_272_73",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/AllowanceCrowdsale.sol",
//                           "line_nos_end": [2],
//                           "line_nos_start": [2]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Using an outdated compiler version can be problematic especially if there are publicly disclosed bugs and issues that affect the current compiler version.</p><p> The following outdated versions were detected:</p><p><code>['/CaliburLand/contracts/AllowanceCrowdsale.sol']</code> - <code>^0.8.2</code></p>",
//                   "issue_name": "OUTDATED COMPILER VERSION",
//                   "issue_remediation": "<p>It is recommended to use a recent version of the Solidity compiler that should not be the most recent version, and it should not be an outdated version as well.\n Using very old versions of Solidity prevents the benefits of bug fixes and newer security checks.\n Consider using the solidity version <code>0.8.7</code>, which patches most solidity vulnerabilities. </p>",
//                   "severity": "low"
//               }
//           ],
//           "issue_id": "SOLIDITY_OUTDATED_COMPILER_VERSION",
//           "issue_name": "OUTDATED COMPILER VERSION"
//       },
//       "SOLIDITY_OVERPOWERED_ROLE": {
//           "issue_details": [
//               {
//                   "bug_hash": "cqi51zFSnQVNCwLszOyBnmwhqLk=",
//                   "bug_id": "SS_272_26",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/configuration/ConfigurationManager.sol",
//                           "line_nos_end": [30],
//                           "line_nos_start": [23]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The overpowered owner (i.e., the person who has too much power) is a project design where the contract is tightly coupled to their owner (or owners); only they can manually invoke critical functions.<br />Due to the fact that this function is only accessible from a single address, the system is heavily dependent on the address of the owner. In this case, there are scenarios that may lead to undesirable consequences for investors, e.g., if the private key of this address is compromised, then an attacker can take control of the contract.</p>",
//                   "issue_name": "PRESENCE OF OVERPOWERED ROLE",
//                   "issue_remediation": "<p>We recommend designing contracts in a trust-less manner. For instance, this functionality can be implemented in the contract's constructor. Another option is to use a MultiSig wallet for this address. For systems that are provisioned for a single user, you can use [Ownable.sol](<a href='https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol'>https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol</a>).<br />For systems that require provisioning users in a group, you can use [@openzeppelin/Roles.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/access/Roles.sol) or [@hq20/Whitelist.sol](<a href='https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol'>https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol</a>).</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "k9LRMlRl5P23bwUaAAVKPiBfLy4=",
//                   "bug_id": "SS_272_27",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/configuration/ConfigurationManager.sol",
//                           "line_nos_end": [57],
//                           "line_nos_start": [53]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The overpowered owner (i.e., the person who has too much power) is a project design where the contract is tightly coupled to their owner (or owners); only they can manually invoke critical functions.<br />Due to the fact that this function is only accessible from a single address, the system is heavily dependent on the address of the owner. In this case, there are scenarios that may lead to undesirable consequences for investors, e.g., if the private key of this address is compromised, then an attacker can take control of the contract.</p>",
//                   "issue_name": "PRESENCE OF OVERPOWERED ROLE",
//                   "issue_remediation": "<p>We recommend designing contracts in a trust-less manner. For instance, this functionality can be implemented in the contract's constructor. Another option is to use a MultiSig wallet for this address. For systems that are provisioned for a single user, you can use [Ownable.sol](<a href='https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol'>https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol</a>).<br />For systems that require provisioning users in a group, you can use [@openzeppelin/Roles.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/access/Roles.sol) or [@hq20/Whitelist.sol](<a href='https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol'>https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol</a>).</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "BRHerGzAs6C6qb4UanLhTtfQ9Lk=",
//                   "bug_id": "SS_272_28",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [142],
//                           "line_nos_start": [142]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The overpowered owner (i.e., the person who has too much power) is a project design where the contract is tightly coupled to their owner (or owners); only they can manually invoke critical functions.<br />Due to the fact that this function is only accessible from a single address, the system is heavily dependent on the address of the owner. In this case, there are scenarios that may lead to undesirable consequences for investors, e.g., if the private key of this address is compromised, then an attacker can take control of the contract.</p>",
//                   "issue_name": "PRESENCE OF OVERPOWERED ROLE",
//                   "issue_remediation": "<p>We recommend designing contracts in a trust-less manner. For instance, this functionality can be implemented in the contract's constructor. Another option is to use a MultiSig wallet for this address. For systems that are provisioned for a single user, you can use [Ownable.sol](<a href='https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol'>https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol</a>).<br />For systems that require provisioning users in a group, you can use [@openzeppelin/Roles.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/access/Roles.sol) or [@hq20/Whitelist.sol](<a href='https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol'>https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol</a>).</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "PvxSlAyv3vdVA8sturagSbEDuHE=",
//                   "bug_id": "SS_272_29",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [187],
//                           "line_nos_start": [187]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The overpowered owner (i.e., the person who has too much power) is a project design where the contract is tightly coupled to their owner (or owners); only they can manually invoke critical functions.<br />Due to the fact that this function is only accessible from a single address, the system is heavily dependent on the address of the owner. In this case, there are scenarios that may lead to undesirable consequences for investors, e.g., if the private key of this address is compromised, then an attacker can take control of the contract.</p>",
//                   "issue_name": "PRESENCE OF OVERPOWERED ROLE",
//                   "issue_remediation": "<p>We recommend designing contracts in a trust-less manner. For instance, this functionality can be implemented in the contract's constructor. Another option is to use a MultiSig wallet for this address. For systems that are provisioned for a single user, you can use [Ownable.sol](<a href='https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol'>https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol</a>).<br />For systems that require provisioning users in a group, you can use [@openzeppelin/Roles.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/access/Roles.sol) or [@hq20/Whitelist.sol](<a href='https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol'>https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol</a>).</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "rQTTo6nxocNFrdvcr2IvI_pEBlI=",
//                   "bug_id": "SS_272_30",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [226],
//                           "line_nos_start": [226]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The overpowered owner (i.e., the person who has too much power) is a project design where the contract is tightly coupled to their owner (or owners); only they can manually invoke critical functions.<br />Due to the fact that this function is only accessible from a single address, the system is heavily dependent on the address of the owner. In this case, there are scenarios that may lead to undesirable consequences for investors, e.g., if the private key of this address is compromised, then an attacker can take control of the contract.</p>",
//                   "issue_name": "PRESENCE OF OVERPOWERED ROLE",
//                   "issue_remediation": "<p>We recommend designing contracts in a trust-less manner. For instance, this functionality can be implemented in the contract's constructor. Another option is to use a MultiSig wallet for this address. For systems that are provisioned for a single user, you can use [Ownable.sol](<a href='https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol'>https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol</a>).<br />For systems that require provisioning users in a group, you can use [@openzeppelin/Roles.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/access/Roles.sol) or [@hq20/Whitelist.sol](<a href='https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol'>https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol</a>).</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "lVRtRFJ1Oxwxf1zx1soU_NsjVc8=",
//                   "bug_id": "SS_272_31",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [241],
//                           "line_nos_start": [241]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The overpowered owner (i.e., the person who has too much power) is a project design where the contract is tightly coupled to their owner (or owners); only they can manually invoke critical functions.<br />Due to the fact that this function is only accessible from a single address, the system is heavily dependent on the address of the owner. In this case, there are scenarios that may lead to undesirable consequences for investors, e.g., if the private key of this address is compromised, then an attacker can take control of the contract.</p>",
//                   "issue_name": "PRESENCE OF OVERPOWERED ROLE",
//                   "issue_remediation": "<p>We recommend designing contracts in a trust-less manner. For instance, this functionality can be implemented in the contract's constructor. Another option is to use a MultiSig wallet for this address. For systems that are provisioned for a single user, you can use [Ownable.sol](<a href='https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol'>https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol</a>).<br />For systems that require provisioning users in a group, you can use [@openzeppelin/Roles.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/access/Roles.sol) or [@hq20/Whitelist.sol](<a href='https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol'>https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol</a>).</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "N1Np1_Hgq3C6qPRx-_8PTvDPSHM=",
//                   "bug_id": "SS_272_32",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [252],
//                           "line_nos_start": [252]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The overpowered owner (i.e., the person who has too much power) is a project design where the contract is tightly coupled to their owner (or owners); only they can manually invoke critical functions.<br />Due to the fact that this function is only accessible from a single address, the system is heavily dependent on the address of the owner. In this case, there are scenarios that may lead to undesirable consequences for investors, e.g., if the private key of this address is compromised, then an attacker can take control of the contract.</p>",
//                   "issue_name": "PRESENCE OF OVERPOWERED ROLE",
//                   "issue_remediation": "<p>We recommend designing contracts in a trust-less manner. For instance, this functionality can be implemented in the contract's constructor. Another option is to use a MultiSig wallet for this address. For systems that are provisioned for a single user, you can use [Ownable.sol](<a href='https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol'>https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol</a>).<br />For systems that require provisioning users in a group, you can use [@openzeppelin/Roles.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/access/Roles.sol) or [@hq20/Whitelist.sol](<a href='https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol'>https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol</a>).</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "90K2Lkhzj7pHocBdLO2MkNOzLh8=",
//                   "bug_id": "SS_272_33",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [277],
//                           "line_nos_start": [277]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The overpowered owner (i.e., the person who has too much power) is a project design where the contract is tightly coupled to their owner (or owners); only they can manually invoke critical functions.<br />Due to the fact that this function is only accessible from a single address, the system is heavily dependent on the address of the owner. In this case, there are scenarios that may lead to undesirable consequences for investors, e.g., if the private key of this address is compromised, then an attacker can take control of the contract.</p>",
//                   "issue_name": "PRESENCE OF OVERPOWERED ROLE",
//                   "issue_remediation": "<p>We recommend designing contracts in a trust-less manner. For instance, this functionality can be implemented in the contract's constructor. Another option is to use a MultiSig wallet for this address. For systems that are provisioned for a single user, you can use [Ownable.sol](<a href='https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol'>https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol</a>).<br />For systems that require provisioning users in a group, you can use [@openzeppelin/Roles.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/access/Roles.sol) or [@hq20/Whitelist.sol](<a href='https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol'>https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol</a>).</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "hs1Hgpy4VRE_7s6DL3v_p5jzgN8=",
//                   "bug_id": "SS_272_34",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [98],
//                           "line_nos_start": [98]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The overpowered owner (i.e., the person who has too much power) is a project design where the contract is tightly coupled to their owner (or owners); only they can manually invoke critical functions.<br />Due to the fact that this function is only accessible from a single address, the system is heavily dependent on the address of the owner. In this case, there are scenarios that may lead to undesirable consequences for investors, e.g., if the private key of this address is compromised, then an attacker can take control of the contract.</p>",
//                   "issue_name": "PRESENCE OF OVERPOWERED ROLE",
//                   "issue_remediation": "<p>We recommend designing contracts in a trust-less manner. For instance, this functionality can be implemented in the contract's constructor. Another option is to use a MultiSig wallet for this address. For systems that are provisioned for a single user, you can use [Ownable.sol](<a href='https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol'>https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol</a>).<br />For systems that require provisioning users in a group, you can use [@openzeppelin/Roles.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/access/Roles.sol) or [@hq20/Whitelist.sol](<a href='https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol'>https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol</a>).</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "7wvyUjkhT9jOa1dxgu6cgbk6H6c=",
//                   "bug_id": "SS_272_35",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [125],
//                           "line_nos_start": [123]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The overpowered owner (i.e., the person who has too much power) is a project design where the contract is tightly coupled to their owner (or owners); only they can manually invoke critical functions.<br />Due to the fact that this function is only accessible from a single address, the system is heavily dependent on the address of the owner. In this case, there are scenarios that may lead to undesirable consequences for investors, e.g., if the private key of this address is compromised, then an attacker can take control of the contract.</p>",
//                   "issue_name": "PRESENCE OF OVERPOWERED ROLE",
//                   "issue_remediation": "<p>We recommend designing contracts in a trust-less manner. For instance, this functionality can be implemented in the contract's constructor. Another option is to use a MultiSig wallet for this address. For systems that are provisioned for a single user, you can use [Ownable.sol](<a href='https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol'>https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol</a>).<br />For systems that require provisioning users in a group, you can use [@openzeppelin/Roles.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/access/Roles.sol) or [@hq20/Whitelist.sol](<a href='https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol'>https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol</a>).</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "nY5_36zlpJZGgB3es_2rBcONP9c=",
//                   "bug_id": "SS_272_36",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [133],
//                           "line_nos_start": [130]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The overpowered owner (i.e., the person who has too much power) is a project design where the contract is tightly coupled to their owner (or owners); only they can manually invoke critical functions.<br />Due to the fact that this function is only accessible from a single address, the system is heavily dependent on the address of the owner. In this case, there are scenarios that may lead to undesirable consequences for investors, e.g., if the private key of this address is compromised, then an attacker can take control of the contract.</p>",
//                   "issue_name": "PRESENCE OF OVERPOWERED ROLE",
//                   "issue_remediation": "<p>We recommend designing contracts in a trust-less manner. For instance, this functionality can be implemented in the contract's constructor. Another option is to use a MultiSig wallet for this address. For systems that are provisioned for a single user, you can use [Ownable.sol](<a href='https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol'>https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol</a>).<br />For systems that require provisioning users in a group, you can use [@openzeppelin/Roles.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/access/Roles.sol) or [@hq20/Whitelist.sol](<a href='https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol'>https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol</a>).</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "AvSEO1ZiopJRdFpnSvsUF0bZyK0=",
//                   "bug_id": "SS_272_37",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [138],
//                           "line_nos_start": [135]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The overpowered owner (i.e., the person who has too much power) is a project design where the contract is tightly coupled to their owner (or owners); only they can manually invoke critical functions.<br />Due to the fact that this function is only accessible from a single address, the system is heavily dependent on the address of the owner. In this case, there are scenarios that may lead to undesirable consequences for investors, e.g., if the private key of this address is compromised, then an attacker can take control of the contract.</p>",
//                   "issue_name": "PRESENCE OF OVERPOWERED ROLE",
//                   "issue_remediation": "<p>We recommend designing contracts in a trust-less manner. For instance, this functionality can be implemented in the contract's constructor. Another option is to use a MultiSig wallet for this address. For systems that are provisioned for a single user, you can use [Ownable.sol](<a href='https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol'>https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol</a>).<br />For systems that require provisioning users in a group, you can use [@openzeppelin/Roles.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/access/Roles.sol) or [@hq20/Whitelist.sol](<a href='https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol'>https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol</a>).</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "GfWAi4ZcZSjZKjvLWcVnuv3bS7I=",
//                   "bug_id": "SS_272_38",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [146],
//                           "line_nos_start": [144]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The overpowered owner (i.e., the person who has too much power) is a project design where the contract is tightly coupled to their owner (or owners); only they can manually invoke critical functions.<br />Due to the fact that this function is only accessible from a single address, the system is heavily dependent on the address of the owner. In this case, there are scenarios that may lead to undesirable consequences for investors, e.g., if the private key of this address is compromised, then an attacker can take control of the contract.</p>",
//                   "issue_name": "PRESENCE OF OVERPOWERED ROLE",
//                   "issue_remediation": "<p>We recommend designing contracts in a trust-less manner. For instance, this functionality can be implemented in the contract's constructor. Another option is to use a MultiSig wallet for this address. For systems that are provisioned for a single user, you can use [Ownable.sol](<a href='https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol'>https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol</a>).<br />For systems that require provisioning users in a group, you can use [@openzeppelin/Roles.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/access/Roles.sol) or [@hq20/Whitelist.sol](<a href='https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol'>https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol</a>).</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "QwblacVWWUpRldhAo_wbwrm9lH4=",
//                   "bug_id": "SS_272_39",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [158],
//                           "line_nos_start": [151]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The overpowered owner (i.e., the person who has too much power) is a project design where the contract is tightly coupled to their owner (or owners); only they can manually invoke critical functions.<br />Due to the fact that this function is only accessible from a single address, the system is heavily dependent on the address of the owner. In this case, there are scenarios that may lead to undesirable consequences for investors, e.g., if the private key of this address is compromised, then an attacker can take control of the contract.</p>",
//                   "issue_name": "PRESENCE OF OVERPOWERED ROLE",
//                   "issue_remediation": "<p>We recommend designing contracts in a trust-less manner. For instance, this functionality can be implemented in the contract's constructor. Another option is to use a MultiSig wallet for this address. For systems that are provisioned for a single user, you can use [Ownable.sol](<a href='https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol'>https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol</a>).<br />For systems that require provisioning users in a group, you can use [@openzeppelin/Roles.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/access/Roles.sol) or [@hq20/Whitelist.sol](<a href='https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol'>https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol</a>).</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "au585Xy02Qc_o5a27gZWmJ1IBNs=",
//                   "bug_id": "SS_272_40",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/MarathonFlair/Pie.sol",
//                           "line_nos_end": [42],
//                           "line_nos_start": [39]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The overpowered owner (i.e., the person who has too much power) is a project design where the contract is tightly coupled to their owner (or owners); only they can manually invoke critical functions.<br />Due to the fact that this function is only accessible from a single address, the system is heavily dependent on the address of the owner. In this case, there are scenarios that may lead to undesirable consequences for investors, e.g., if the private key of this address is compromised, then an attacker can take control of the contract.</p>",
//                   "issue_name": "PRESENCE OF OVERPOWERED ROLE",
//                   "issue_remediation": "<p>We recommend designing contracts in a trust-less manner. For instance, this functionality can be implemented in the contract's constructor. Another option is to use a MultiSig wallet for this address. For systems that are provisioned for a single user, you can use [Ownable.sol](<a href='https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol'>https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol</a>).<br />For systems that require provisioning users in a group, you can use [@openzeppelin/Roles.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/access/Roles.sol) or [@hq20/Whitelist.sol](<a href='https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol'>https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol</a>).</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "oCER6O2GWb_qgQ2qt0rIpdHBEt0=",
//                   "bug_id": "SS_272_41",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/MarathonFlair/Pie.sol",
//                           "line_nos_end": [45],
//                           "line_nos_start": [43]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The overpowered owner (i.e., the person who has too much power) is a project design where the contract is tightly coupled to their owner (or owners); only they can manually invoke critical functions.<br />Due to the fact that this function is only accessible from a single address, the system is heavily dependent on the address of the owner. In this case, there are scenarios that may lead to undesirable consequences for investors, e.g., if the private key of this address is compromised, then an attacker can take control of the contract.</p>",
//                   "issue_name": "PRESENCE OF OVERPOWERED ROLE",
//                   "issue_remediation": "<p>We recommend designing contracts in a trust-less manner. For instance, this functionality can be implemented in the contract's constructor. Another option is to use a MultiSig wallet for this address. For systems that are provisioned for a single user, you can use [Ownable.sol](<a href='https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol'>https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol</a>).<br />For systems that require provisioning users in a group, you can use [@openzeppelin/Roles.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/access/Roles.sol) or [@hq20/Whitelist.sol](<a href='https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol'>https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol</a>).</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "lNMZVd6W36raMeOkfImbGw-IXQo=",
//                   "bug_id": "SS_272_42",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [184],
//                           "line_nos_start": [148]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The overpowered owner (i.e., the person who has too much power) is a project design where the contract is tightly coupled to their owner (or owners); only they can manually invoke critical functions.<br />Due to the fact that this function is only accessible from a single address, the system is heavily dependent on the address of the owner. In this case, there are scenarios that may lead to undesirable consequences for investors, e.g., if the private key of this address is compromised, then an attacker can take control of the contract.</p>",
//                   "issue_name": "PRESENCE OF OVERPOWERED ROLE",
//                   "issue_remediation": "<p>We recommend designing contracts in a trust-less manner. For instance, this functionality can be implemented in the contract's constructor. Another option is to use a MultiSig wallet for this address. For systems that are provisioned for a single user, you can use [Ownable.sol](<a href='https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol'>https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol</a>).<br />For systems that require provisioning users in a group, you can use [@openzeppelin/Roles.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/access/Roles.sol) or [@hq20/Whitelist.sol](<a href='https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol'>https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol</a>).</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "lKct30nI5TLomktPiJpjR2ctPwQ=",
//                   "bug_id": "SS_272_43",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [203],
//                           "line_nos_start": [190]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The overpowered owner (i.e., the person who has too much power) is a project design where the contract is tightly coupled to their owner (or owners); only they can manually invoke critical functions.<br />Due to the fact that this function is only accessible from a single address, the system is heavily dependent on the address of the owner. In this case, there are scenarios that may lead to undesirable consequences for investors, e.g., if the private key of this address is compromised, then an attacker can take control of the contract.</p>",
//                   "issue_name": "PRESENCE OF OVERPOWERED ROLE",
//                   "issue_remediation": "<p>We recommend designing contracts in a trust-less manner. For instance, this functionality can be implemented in the contract's constructor. Another option is to use a MultiSig wallet for this address. For systems that are provisioned for a single user, you can use [Ownable.sol](<a href='https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol'>https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol</a>).<br />For systems that require provisioning users in a group, you can use [@openzeppelin/Roles.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/access/Roles.sol) or [@hq20/Whitelist.sol](<a href='https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol'>https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol</a>).</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "szGj8gdXLRV1yLXLmiMdnUB3jR4=",
//                   "bug_id": "SS_272_44",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [215],
//                           "line_nos_start": [209]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The overpowered owner (i.e., the person who has too much power) is a project design where the contract is tightly coupled to their owner (or owners); only they can manually invoke critical functions.<br />Due to the fact that this function is only accessible from a single address, the system is heavily dependent on the address of the owner. In this case, there are scenarios that may lead to undesirable consequences for investors, e.g., if the private key of this address is compromised, then an attacker can take control of the contract.</p>",
//                   "issue_name": "PRESENCE OF OVERPOWERED ROLE",
//                   "issue_remediation": "<p>We recommend designing contracts in a trust-less manner. For instance, this functionality can be implemented in the contract's constructor. Another option is to use a MultiSig wallet for this address. For systems that are provisioned for a single user, you can use [Ownable.sol](<a href='https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol'>https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol</a>).<br />For systems that require provisioning users in a group, you can use [@openzeppelin/Roles.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/access/Roles.sol) or [@hq20/Whitelist.sol](<a href='https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol'>https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol</a>).</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "sqI_qYzC3E1EHm-lB-q68qkfIj8=",
//                   "bug_id": "SS_272_45",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Airdrop.sol",
//                           "line_nos_end": [32],
//                           "line_nos_start": [23]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The overpowered owner (i.e., the person who has too much power) is a project design where the contract is tightly coupled to their owner (or owners); only they can manually invoke critical functions.<br />Due to the fact that this function is only accessible from a single address, the system is heavily dependent on the address of the owner. In this case, there are scenarios that may lead to undesirable consequences for investors, e.g., if the private key of this address is compromised, then an attacker can take control of the contract.</p>",
//                   "issue_name": "PRESENCE OF OVERPOWERED ROLE",
//                   "issue_remediation": "<p>We recommend designing contracts in a trust-less manner. For instance, this functionality can be implemented in the contract's constructor. Another option is to use a MultiSig wallet for this address. For systems that are provisioned for a single user, you can use [Ownable.sol](<a href='https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol'>https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol</a>).<br />For systems that require provisioning users in a group, you can use [@openzeppelin/Roles.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/access/Roles.sol) or [@hq20/Whitelist.sol](<a href='https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol'>https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol</a>).</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "qbc4V8qAlnANWSFpkO78BM2W9NU=",
//                   "bug_id": "SS_272_46",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Airdrop.sol",
//                           "line_nos_end": [55],
//                           "line_nos_start": [34]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The overpowered owner (i.e., the person who has too much power) is a project design where the contract is tightly coupled to their owner (or owners); only they can manually invoke critical functions.<br />Due to the fact that this function is only accessible from a single address, the system is heavily dependent on the address of the owner. In this case, there are scenarios that may lead to undesirable consequences for investors, e.g., if the private key of this address is compromised, then an attacker can take control of the contract.</p>",
//                   "issue_name": "PRESENCE OF OVERPOWERED ROLE",
//                   "issue_remediation": "<p>We recommend designing contracts in a trust-less manner. For instance, this functionality can be implemented in the contract's constructor. Another option is to use a MultiSig wallet for this address. For systems that are provisioned for a single user, you can use [Ownable.sol](<a href='https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol'>https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol</a>).<br />For systems that require provisioning users in a group, you can use [@openzeppelin/Roles.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/access/Roles.sol) or [@hq20/Whitelist.sol](<a href='https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol'>https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol</a>).</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "yErxba6ihmSC4JK1fs3XApbLAZc=",
//                   "bug_id": "SS_272_47",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Airdrop.sol",
//                           "line_nos_end": [59],
//                           "line_nos_start": [57]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The overpowered owner (i.e., the person who has too much power) is a project design where the contract is tightly coupled to their owner (or owners); only they can manually invoke critical functions.<br />Due to the fact that this function is only accessible from a single address, the system is heavily dependent on the address of the owner. In this case, there are scenarios that may lead to undesirable consequences for investors, e.g., if the private key of this address is compromised, then an attacker can take control of the contract.</p>",
//                   "issue_name": "PRESENCE OF OVERPOWERED ROLE",
//                   "issue_remediation": "<p>We recommend designing contracts in a trust-less manner. For instance, this functionality can be implemented in the contract's constructor. Another option is to use a MultiSig wallet for this address. For systems that are provisioned for a single user, you can use [Ownable.sol](<a href='https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol'>https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol</a>).<br />For systems that require provisioning users in a group, you can use [@openzeppelin/Roles.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/access/Roles.sol) or [@hq20/Whitelist.sol](<a href='https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol'>https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol</a>).</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "vK2ddqMd5b33uqy8Baqgj5EFo9o=",
//                   "bug_id": "SS_272_48",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Airdrop.sol",
//                           "line_nos_end": [63],
//                           "line_nos_start": [61]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The overpowered owner (i.e., the person who has too much power) is a project design where the contract is tightly coupled to their owner (or owners); only they can manually invoke critical functions.<br />Due to the fact that this function is only accessible from a single address, the system is heavily dependent on the address of the owner. In this case, there are scenarios that may lead to undesirable consequences for investors, e.g., if the private key of this address is compromised, then an attacker can take control of the contract.</p>",
//                   "issue_name": "PRESENCE OF OVERPOWERED ROLE",
//                   "issue_remediation": "<p>We recommend designing contracts in a trust-less manner. For instance, this functionality can be implemented in the contract's constructor. Another option is to use a MultiSig wallet for this address. For systems that are provisioned for a single user, you can use [Ownable.sol](<a href='https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol'>https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol</a>).<br />For systems that require provisioning users in a group, you can use [@openzeppelin/Roles.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/access/Roles.sol) or [@hq20/Whitelist.sol](<a href='https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol'>https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol</a>).</p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "0r70zX4OfDgH35weqpZ2eICgNeA=",
//                   "bug_id": "SS_272_49",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Airdrop.sol",
//                           "line_nos_end": [67],
//                           "line_nos_start": [65]
//                       }
//                   ],
//                   "issue_confidence": "1",
//                   "issue_description": "<p>The overpowered owner (i.e., the person who has too much power) is a project design where the contract is tightly coupled to their owner (or owners); only they can manually invoke critical functions.<br />Due to the fact that this function is only accessible from a single address, the system is heavily dependent on the address of the owner. In this case, there are scenarios that may lead to undesirable consequences for investors, e.g., if the private key of this address is compromised, then an attacker can take control of the contract.</p>",
//                   "issue_name": "PRESENCE OF OVERPOWERED ROLE",
//                   "issue_remediation": "<p>We recommend designing contracts in a trust-less manner. For instance, this functionality can be implemented in the contract's constructor. Another option is to use a MultiSig wallet for this address. For systems that are provisioned for a single user, you can use [Ownable.sol](<a href='https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol'>https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/ownership/Ownable.sol</a>).<br />For systems that require provisioning users in a group, you can use [@openzeppelin/Roles.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/access/Roles.sol) or [@hq20/Whitelist.sol](<a href='https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol'>https://github.com/HQ20/contracts/blob/v0.0.2/contracts/access/Whitelist.sol</a>).</p>",
//                   "severity": "informational"
//               }
//           ],
//           "issue_id": "SOLIDITY_OVERPOWERED_ROLE",
//           "issue_name": "PRESENCE OF OVERPOWERED ROLE"
//       },
//       "SOLIDITY_PRAGMA_VERSION": {
//           "issue_details": [
//               {
//                   "bug_hash": "aMDeyml14WxKx0yxIkVEa8myzh8=",
//                   "bug_id": "SS_272_130",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [9],
//                           "line_nos_start": [9]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Solidity source files indicate the versions of the compiler they can be compiled with using a pragma directive at the top of the solidity file. This can either be a floating pragma or a specific compiler version.</p><p>The contract was found to be using a floating pragma which is not considered safe as it can be compiled with all the versions described.</p>",
//                   "issue_name": "SOLIDITY PRAGMA VERSION",
//                   "issue_remediation": "<p>^0.4.24 pragma version was found in the above solidity file. Please update the version to >=0.8.6 which is mostly used across the project.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "FSAeGFop1Ez8Q2nSw3tAJnstOZM=",
//                   "bug_id": "SS_272_131",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [2],
//                           "line_nos_start": [2]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Solidity source files indicate the versions of the compiler they can be compiled with using a pragma directive at the top of the solidity file. This can either be a floating pragma or a specific compiler version.</p><p>The contract was found to be using a floating pragma which is not considered safe as it can be compiled with all the versions described.</p>",
//                   "issue_name": "SOLIDITY PRAGMA VERSION",
//                   "issue_remediation": "<p>>=0.7.0 <0.9.0 pragma version was found in the above solidity file. Please update the version to >=0.8.6 which is mostly used across the project.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "0pn1zeDVIyQmwCWq3t9gwAbthHw=",
//                   "bug_id": "SS_272_132",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/AtlantisGate.sol",
//                           "line_nos_end": [2],
//                           "line_nos_start": [2]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Solidity source files indicate the versions of the compiler they can be compiled with using a pragma directive at the top of the solidity file. This can either be a floating pragma or a specific compiler version.</p><p>The contract was found to be using a floating pragma which is not considered safe as it can be compiled with all the versions described.</p>",
//                   "issue_name": "SOLIDITY PRAGMA VERSION",
//                   "issue_remediation": "<p>^0.8.4 pragma version was found in the above solidity file. Please update the version to >=0.8.6 which is mostly used across the project.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "ukFfFhMt9eaKhAfmH04lTCDzsh0=",
//                   "bug_id": "SS_272_133",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/MoonrayToken/SandwichTokenTestHarness.sol",
//                           "line_nos_end": [2],
//                           "line_nos_start": [2]
//                       },
//                       {
//                           "file_path": "/MoonrayToken/MoonrayToken.sol",
//                           "line_nos_end": [2],
//                           "line_nos_start": [2]
//                       },
//                       {
//                           "file_path": "/MoonrayToken/MoonrayTokenBase.sol",
//                           "line_nos_end": [2],
//                           "line_nos_start": [2]
//                       },
//                       {
//                           "file_path": "/MoonrayToken/SandwichToken.sol",
//                           "line_nos_end": [2],
//                           "line_nos_start": [2]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Solidity source files indicate the versions of the compiler they can be compiled with using a pragma directive at the top of the solidity file. This can either be a floating pragma or a specific compiler version.</p><p>The contract was found to be using a floating pragma which is not considered safe as it can be compiled with all the versions described.</p>",
//                   "issue_name": "SOLIDITY PRAGMA VERSION",
//                   "issue_remediation": "<p>^0.8.11 pragma version was found in the above solidity file. Please update the version to >=0.8.6 which is mostly used across the project.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "slaZtVTDFmEPvJ6TgWfwA_GiJFI=",
//                   "bug_id": "SS_272_134",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [1],
//                           "line_nos_start": [1]
//                       },
//                       {
//                           "file_path": "/MarathonFlair/Pie.sol",
//                           "line_nos_end": [2],
//                           "line_nos_start": [2]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Solidity source files indicate the versions of the compiler they can be compiled with using a pragma directive at the top of the solidity file. This can either be a floating pragma or a specific compiler version.</p><p>The contract was found to be using a floating pragma which is not considered safe as it can be compiled with all the versions described.</p>",
//                   "issue_name": "SOLIDITY PRAGMA VERSION",
//                   "issue_remediation": "<p>^0.8.0 pragma version was found in the above solidity file. Please update the version to >=0.8.6 which is mostly used across the project.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "UZoupAGCz_nzFCTFqBvncTlCvTk=",
//                   "bug_id": "SS_272_135",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/Migrations.sol",
//                           "line_nos_end": [2],
//                           "line_nos_start": [2]
//                       },
//                       {
//                           "file_path": "/BRZtruffle/contracts/Migrations.sol",
//                           "line_nos_end": [2],
//                           "line_nos_start": [2]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Solidity source files indicate the versions of the compiler they can be compiled with using a pragma directive at the top of the solidity file. This can either be a floating pragma or a specific compiler version.</p><p>The contract was found to be using a floating pragma which is not considered safe as it can be compiled with all the versions described.</p>",
//                   "issue_name": "SOLIDITY PRAGMA VERSION",
//                   "issue_remediation": "<p>>=0.4.22 <0.9.0 pragma version was found in the above solidity file. Please update the version to >=0.8.6 which is mostly used across the project.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "l7nRnul3gw1CYgylbpQ8NhT_BoA=",
//                   "bug_id": "SS_272_136",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TimedCrowdsale.sol",
//                           "line_nos_end": [2],
//                           "line_nos_start": [2]
//                       },
//                       {
//                           "file_path": "/CaliburLand/contracts/Crowdsale.sol",
//                           "line_nos_end": [2],
//                           "line_nos_start": [2]
//                       },
//                       {
//                           "file_path": "/CaliburLand/contracts/MasterContract.sol",
//                           "line_nos_end": [2],
//                           "line_nos_start": [2]
//                       },
//                       {
//                           "file_path": "/CaliburLand/contracts/Airdrop.sol",
//                           "line_nos_end": [1],
//                           "line_nos_start": [1]
//                       },
//                       {
//                           "file_path": "/CaliburLand/contracts/BlockListed.sol",
//                           "line_nos_end": [2],
//                           "line_nos_start": [2]
//                       },
//                       {
//                           "file_path": "/CaliburLand/contracts/AllowanceCrowdsale.sol",
//                           "line_nos_end": [2],
//                           "line_nos_start": [2]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Solidity source files indicate the versions of the compiler they can be compiled with using a pragma directive at the top of the solidity file. This can either be a floating pragma or a specific compiler version.</p><p>The contract was found to be using a floating pragma which is not considered safe as it can be compiled with all the versions described.</p>",
//                   "issue_name": "SOLIDITY PRAGMA VERSION",
//                   "issue_remediation": "<p>^0.8.2 pragma version was found in the above solidity file. Please update the version to >=0.8.6 which is mostly used across the project.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "5JillrxdpOAi3-EjcQX7UZ_WCAQ=",
//                   "bug_id": "SS_272_137",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [3],
//                           "line_nos_start": [3]
//                       },
//                       {
//                           "file_path": "/CaliburLand/contracts/OTCContract.sol",
//                           "line_nos_end": [3],
//                           "line_nos_start": [3]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Solidity source files indicate the versions of the compiler they can be compiled with using a pragma directive at the top of the solidity file. This can either be a floating pragma or a specific compiler version.</p><p>The contract was found to be using a floating pragma which is not considered safe as it can be compiled with all the versions described.</p>",
//                   "issue_name": "SOLIDITY PRAGMA VERSION",
//                   "issue_remediation": "<p>0.8.2 pragma version was found in the above solidity file. Please update the version to >=0.8.6 which is mostly used across the project.</p>",
//                   "severity": "low"
//               },
//               {
//                   "bug_hash": "HkPZGXAWt8C9cdz-GB1DMNEZxBc=",
//                   "bug_id": "SS_272_138",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/BRZtruffle/contracts/Token.sol",
//                           "line_nos_end": [1],
//                           "line_nos_start": [1]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Solidity source files indicate the versions of the compiler they can be compiled with using a pragma directive at the top of the solidity file. This can either be a floating pragma or a specific compiler version.</p><p>The contract was found to be using a floating pragma which is not considered safe as it can be compiled with all the versions described.</p>",
//                   "issue_name": "SOLIDITY PRAGMA VERSION",
//                   "issue_remediation": "<p>0.8.4 pragma version was found in the above solidity file. Please update the version to >=0.8.6 which is mostly used across the project.</p>",
//                   "severity": "low"
//               }
//           ],
//           "issue_id": "SOLIDITY_PRAGMA_VERSION",
//           "issue_name": "SOLIDITY PRAGMA VERSION"
//       },
//       "SOLIDITY_REQUIRE_WITH_EMPTY_MESSAGE": {
//           "issue_details": [
//               {
//                   "bug_hash": "AOvTfLIybjF00DVLC648TWZiQlo=",
//                   "bug_id": "SS_272_511",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [66],
//                           "line_nos_start": [66]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A <code>require</code> statement was detected with an empty message. It takes two parameters and the message part is optional. This is shown to the user when and if the <code>require</code> statement evaluates to <code>false</code>.\nThis message gives more information about the statement and why it gave a <code>false</code> response.</p>",
//                   "issue_name": "REQUIRE WITH EMPTY MESSAGE",
//                   "issue_remediation": "<p>It is recommended to add a descriptive message, no longer than <code>32 bytes</code>, inside the <code>require</code> statement to give more detail to the user about why the condition failed. </p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "AnyC07JRZHmBAbhczoOpZG4oXZI=",
//                   "bug_id": "SS_272_512",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [75],
//                           "line_nos_start": [75]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A <code>require</code> statement was detected with an empty message. It takes two parameters and the message part is optional. This is shown to the user when and if the <code>require</code> statement evaluates to <code>false</code>.\nThis message gives more information about the statement and why it gave a <code>false</code> response.</p>",
//                   "issue_name": "REQUIRE WITH EMPTY MESSAGE",
//                   "issue_remediation": "<p>It is recommended to add a descriptive message, no longer than <code>32 bytes</code>, inside the <code>require</code> statement to give more detail to the user about why the condition failed. </p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "vyZk6xhcPJV1lB8q_453DfGXp5M=",
//                   "bug_id": "SS_272_513",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [86],
//                           "line_nos_start": [86]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A <code>require</code> statement was detected with an empty message. It takes two parameters and the message part is optional. This is shown to the user when and if the <code>require</code> statement evaluates to <code>false</code>.\nThis message gives more information about the statement and why it gave a <code>false</code> response.</p>",
//                   "issue_name": "REQUIRE WITH EMPTY MESSAGE",
//                   "issue_remediation": "<p>It is recommended to add a descriptive message, no longer than <code>32 bytes</code>, inside the <code>require</code> statement to give more detail to the user about why the condition failed. </p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "RPVjGZFDL3WfrFm3oDKxMYcfKQE=",
//                   "bug_id": "SS_272_514",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [97],
//                           "line_nos_start": [97]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A <code>require</code> statement was detected with an empty message. It takes two parameters and the message part is optional. This is shown to the user when and if the <code>require</code> statement evaluates to <code>false</code>.\nThis message gives more information about the statement and why it gave a <code>false</code> response.</p>",
//                   "issue_name": "REQUIRE WITH EMPTY MESSAGE",
//                   "issue_remediation": "<p>It is recommended to add a descriptive message, no longer than <code>32 bytes</code>, inside the <code>require</code> statement to give more detail to the user about why the condition failed. </p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "sXSQnpxXSwAVwrqLoAB_JIjpBZI=",
//                   "bug_id": "SS_272_515",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [107],
//                           "line_nos_start": [107]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A <code>require</code> statement was detected with an empty message. It takes two parameters and the message part is optional. This is shown to the user when and if the <code>require</code> statement evaluates to <code>false</code>.\nThis message gives more information about the statement and why it gave a <code>false</code> response.</p>",
//                   "issue_name": "REQUIRE WITH EMPTY MESSAGE",
//                   "issue_remediation": "<p>It is recommended to add a descriptive message, no longer than <code>32 bytes</code>, inside the <code>require</code> statement to give more detail to the user about why the condition failed. </p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "UikFGiUv-zx5-FmnG53NV8bDkZU=",
//                   "bug_id": "SS_272_516",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [183],
//                           "line_nos_start": [183]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A <code>require</code> statement was detected with an empty message. It takes two parameters and the message part is optional. This is shown to the user when and if the <code>require</code> statement evaluates to <code>false</code>.\nThis message gives more information about the statement and why it gave a <code>false</code> response.</p>",
//                   "issue_name": "REQUIRE WITH EMPTY MESSAGE",
//                   "issue_remediation": "<p>It is recommended to add a descriptive message, no longer than <code>32 bytes</code>, inside the <code>require</code> statement to give more detail to the user about why the condition failed. </p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "NJbnDTkgCZBcYlrHE1h884Iehko=",
//                   "bug_id": "SS_272_517",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [204],
//                           "line_nos_start": [204]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A <code>require</code> statement was detected with an empty message. It takes two parameters and the message part is optional. This is shown to the user when and if the <code>require</code> statement evaluates to <code>false</code>.\nThis message gives more information about the statement and why it gave a <code>false</code> response.</p>",
//                   "issue_name": "REQUIRE WITH EMPTY MESSAGE",
//                   "issue_remediation": "<p>It is recommended to add a descriptive message, no longer than <code>32 bytes</code>, inside the <code>require</code> statement to give more detail to the user about why the condition failed. </p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "UikFGiUv-zx5-FmnG53NV8bDkZU=",
//                   "bug_id": "SS_272_516",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [227],
//                           "line_nos_start": [227]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A <code>require</code> statement was detected with an empty message. It takes two parameters and the message part is optional. This is shown to the user when and if the <code>require</code> statement evaluates to <code>false</code>.\nThis message gives more information about the statement and why it gave a <code>false</code> response.</p>",
//                   "issue_name": "REQUIRE WITH EMPTY MESSAGE",
//                   "issue_remediation": "<p>It is recommended to add a descriptive message, no longer than <code>32 bytes</code>, inside the <code>require</code> statement to give more detail to the user about why the condition failed. </p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "UikFGiUv-zx5-FmnG53NV8bDkZU=",
//                   "bug_id": "SS_272_516",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [251],
//                           "line_nos_start": [251]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A <code>require</code> statement was detected with an empty message. It takes two parameters and the message part is optional. This is shown to the user when and if the <code>require</code> statement evaluates to <code>false</code>.\nThis message gives more information about the statement and why it gave a <code>false</code> response.</p>",
//                   "issue_name": "REQUIRE WITH EMPTY MESSAGE",
//                   "issue_remediation": "<p>It is recommended to add a descriptive message, no longer than <code>32 bytes</code>, inside the <code>require</code> statement to give more detail to the user about why the condition failed. </p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "6AlL7uhJAwldPhR9sjQLWpnsuOY=",
//                   "bug_id": "SS_272_518",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [266],
//                           "line_nos_start": [266]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A <code>require</code> statement was detected with an empty message. It takes two parameters and the message part is optional. This is shown to the user when and if the <code>require</code> statement evaluates to <code>false</code>.\nThis message gives more information about the statement and why it gave a <code>false</code> response.</p>",
//                   "issue_name": "REQUIRE WITH EMPTY MESSAGE",
//                   "issue_remediation": "<p>It is recommended to add a descriptive message, no longer than <code>32 bytes</code>, inside the <code>require</code> statement to give more detail to the user about why the condition failed. </p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "8M4HCHWB4andFwuLI41QaGtwS8o=",
//                   "bug_id": "SS_272_519",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [267],
//                           "line_nos_start": [267]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A <code>require</code> statement was detected with an empty message. It takes two parameters and the message part is optional. This is shown to the user when and if the <code>require</code> statement evaluates to <code>false</code>.\nThis message gives more information about the statement and why it gave a <code>false</code> response.</p>",
//                   "issue_name": "REQUIRE WITH EMPTY MESSAGE",
//                   "issue_remediation": "<p>It is recommended to add a descriptive message, no longer than <code>32 bytes</code>, inside the <code>require</code> statement to give more detail to the user about why the condition failed. </p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "mTdT7Wj8cSDZAKkpaOvz2d1Z1Ho=",
//                   "bug_id": "SS_272_520",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [282],
//                           "line_nos_start": [282]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A <code>require</code> statement was detected with an empty message. It takes two parameters and the message part is optional. This is shown to the user when and if the <code>require</code> statement evaluates to <code>false</code>.\nThis message gives more information about the statement and why it gave a <code>false</code> response.</p>",
//                   "issue_name": "REQUIRE WITH EMPTY MESSAGE",
//                   "issue_remediation": "<p>It is recommended to add a descriptive message, no longer than <code>32 bytes</code>, inside the <code>require</code> statement to give more detail to the user about why the condition failed. </p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "wTkdG-wQLEhsKVUrFJzCb2SWy8A=",
//                   "bug_id": "SS_272_521",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [295],
//                           "line_nos_start": [295]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A <code>require</code> statement was detected with an empty message. It takes two parameters and the message part is optional. This is shown to the user when and if the <code>require</code> statement evaluates to <code>false</code>.\nThis message gives more information about the statement and why it gave a <code>false</code> response.</p>",
//                   "issue_name": "REQUIRE WITH EMPTY MESSAGE",
//                   "issue_remediation": "<p>It is recommended to add a descriptive message, no longer than <code>32 bytes</code>, inside the <code>require</code> statement to give more detail to the user about why the condition failed. </p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "B7ZSKeaMljBr7Iooze07Q2HFP-o=",
//                   "bug_id": "SS_272_522",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [296],
//                           "line_nos_start": [296]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A <code>require</code> statement was detected with an empty message. It takes two parameters and the message part is optional. This is shown to the user when and if the <code>require</code> statement evaluates to <code>false</code>.\nThis message gives more information about the statement and why it gave a <code>false</code> response.</p>",
//                   "issue_name": "REQUIRE WITH EMPTY MESSAGE",
//                   "issue_remediation": "<p>It is recommended to add a descriptive message, no longer than <code>32 bytes</code>, inside the <code>require</code> statement to give more detail to the user about why the condition failed. </p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "gZq0hgrM7eO2wafQGMBjQwEGaSM=",
//                   "bug_id": "SS_272_523",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [311],
//                           "line_nos_start": [311]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A <code>require</code> statement was detected with an empty message. It takes two parameters and the message part is optional. This is shown to the user when and if the <code>require</code> statement evaluates to <code>false</code>.\nThis message gives more information about the statement and why it gave a <code>false</code> response.</p>",
//                   "issue_name": "REQUIRE WITH EMPTY MESSAGE",
//                   "issue_remediation": "<p>It is recommended to add a descriptive message, no longer than <code>32 bytes</code>, inside the <code>require</code> statement to give more detail to the user about why the condition failed. </p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "AHj5dqBT3ZLuvLm1Lipn2ap250M=",
//                   "bug_id": "SS_272_524",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/AtlantisGate.sol",
//                           "line_nos_end": [49],
//                           "line_nos_start": [49]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A <code>require</code> statement was detected with an empty message. It takes two parameters and the message part is optional. This is shown to the user when and if the <code>require</code> statement evaluates to <code>false</code>.\nThis message gives more information about the statement and why it gave a <code>false</code> response.</p>",
//                   "issue_name": "REQUIRE WITH EMPTY MESSAGE",
//                   "issue_remediation": "<p>It is recommended to add a descriptive message, no longer than <code>32 bytes</code>, inside the <code>require</code> statement to give more detail to the user about why the condition failed. </p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "82UcoMkFL2out-ZWKA4QlkC_k7o=",
//                   "bug_id": "SS_272_525",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/AtlantisGate.sol",
//                           "line_nos_end": [58],
//                           "line_nos_start": [58]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A <code>require</code> statement was detected with an empty message. It takes two parameters and the message part is optional. This is shown to the user when and if the <code>require</code> statement evaluates to <code>false</code>.\nThis message gives more information about the statement and why it gave a <code>false</code> response.</p>",
//                   "issue_name": "REQUIRE WITH EMPTY MESSAGE",
//                   "issue_remediation": "<p>It is recommended to add a descriptive message, no longer than <code>32 bytes</code>, inside the <code>require</code> statement to give more detail to the user about why the condition failed. </p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "nY9_ydlSNnjJ-qoNYar5I0rLqLM=",
//                   "bug_id": "SS_272_526",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/AtlantisGate.sol",
//                           "line_nos_end": [69],
//                           "line_nos_start": [69]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A <code>require</code> statement was detected with an empty message. It takes two parameters and the message part is optional. This is shown to the user when and if the <code>require</code> statement evaluates to <code>false</code>.\nThis message gives more information about the statement and why it gave a <code>false</code> response.</p>",
//                   "issue_name": "REQUIRE WITH EMPTY MESSAGE",
//                   "issue_remediation": "<p>It is recommended to add a descriptive message, no longer than <code>32 bytes</code>, inside the <code>require</code> statement to give more detail to the user about why the condition failed. </p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "ypatDrz8bNcJp_9ml7Ul0kh60lY=",
//                   "bug_id": "SS_272_527",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [74],
//                           "line_nos_start": [74]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A <code>require</code> statement was detected with an empty message. It takes two parameters and the message part is optional. This is shown to the user when and if the <code>require</code> statement evaluates to <code>false</code>.\nThis message gives more information about the statement and why it gave a <code>false</code> response.</p>",
//                   "issue_name": "REQUIRE WITH EMPTY MESSAGE",
//                   "issue_remediation": "<p>It is recommended to add a descriptive message, no longer than <code>32 bytes</code>, inside the <code>require</code> statement to give more detail to the user about why the condition failed. </p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "xKwZi7iAgxDxq5ZfUT5ILyDz3kw=",
//                   "bug_id": "SS_272_528",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Airdrop.sol",
//                           "line_nos_end": [26],
//                           "line_nos_start": [26]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A <code>require</code> statement was detected with an empty message. It takes two parameters and the message part is optional. This is shown to the user when and if the <code>require</code> statement evaluates to <code>false</code>.\nThis message gives more information about the statement and why it gave a <code>false</code> response.</p>",
//                   "issue_name": "REQUIRE WITH EMPTY MESSAGE",
//                   "issue_remediation": "<p>It is recommended to add a descriptive message, no longer than <code>32 bytes</code>, inside the <code>require</code> statement to give more detail to the user about why the condition failed. </p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "vgUzHaJfI1xn7yqmVtZq8lnoMiY=",
//                   "bug_id": "SS_272_529",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Airdrop.sol",
//                           "line_nos_end": [28],
//                           "line_nos_start": [28]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A <code>require</code> statement was detected with an empty message. It takes two parameters and the message part is optional. This is shown to the user when and if the <code>require</code> statement evaluates to <code>false</code>.\nThis message gives more information about the statement and why it gave a <code>false</code> response.</p>",
//                   "issue_name": "REQUIRE WITH EMPTY MESSAGE",
//                   "issue_remediation": "<p>It is recommended to add a descriptive message, no longer than <code>32 bytes</code>, inside the <code>require</code> statement to give more detail to the user about why the condition failed. </p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "NB2SKcvROcnHJPuwVBfdSIGiI4w=",
//                   "bug_id": "SS_272_530",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Airdrop.sol",
//                           "line_nos_end": [41],
//                           "line_nos_start": [41]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A <code>require</code> statement was detected with an empty message. It takes two parameters and the message part is optional. This is shown to the user when and if the <code>require</code> statement evaluates to <code>false</code>.\nThis message gives more information about the statement and why it gave a <code>false</code> response.</p>",
//                   "issue_name": "REQUIRE WITH EMPTY MESSAGE",
//                   "issue_remediation": "<p>It is recommended to add a descriptive message, no longer than <code>32 bytes</code>, inside the <code>require</code> statement to give more detail to the user about why the condition failed. </p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "BlfnqSqfi3Z3lDLVbrBCUNmG-QI=",
//                   "bug_id": "SS_272_531",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Airdrop.sol",
//                           "line_nos_end": [42],
//                           "line_nos_start": [42]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A <code>require</code> statement was detected with an empty message. It takes two parameters and the message part is optional. This is shown to the user when and if the <code>require</code> statement evaluates to <code>false</code>.\nThis message gives more information about the statement and why it gave a <code>false</code> response.</p>",
//                   "issue_name": "REQUIRE WITH EMPTY MESSAGE",
//                   "issue_remediation": "<p>It is recommended to add a descriptive message, no longer than <code>32 bytes</code>, inside the <code>require</code> statement to give more detail to the user about why the condition failed. </p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "xKwZi7iAgxDxq5ZfUT5ILyDz3kw=",
//                   "bug_id": "SS_272_528",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Airdrop.sol",
//                           "line_nos_end": [46],
//                           "line_nos_start": [46]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A <code>require</code> statement was detected with an empty message. It takes two parameters and the message part is optional. This is shown to the user when and if the <code>require</code> statement evaluates to <code>false</code>.\nThis message gives more information about the statement and why it gave a <code>false</code> response.</p>",
//                   "issue_name": "REQUIRE WITH EMPTY MESSAGE",
//                   "issue_remediation": "<p>It is recommended to add a descriptive message, no longer than <code>32 bytes</code>, inside the <code>require</code> statement to give more detail to the user about why the condition failed. </p>",
//                   "severity": "informational"
//               },
//               {
//                   "bug_hash": "JqxgVAHC7xqStm8yYW45DSyyUGE=",
//                   "bug_id": "SS_272_532",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Airdrop.sol",
//                           "line_nos_end": [62],
//                           "line_nos_start": [62]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A <code>require</code> statement was detected with an empty message. It takes two parameters and the message part is optional. This is shown to the user when and if the <code>require</code> statement evaluates to <code>false</code>.\nThis message gives more information about the statement and why it gave a <code>false</code> response.</p>",
//                   "issue_name": "REQUIRE WITH EMPTY MESSAGE",
//                   "issue_remediation": "<p>It is recommended to add a descriptive message, no longer than <code>32 bytes</code>, inside the <code>require</code> statement to give more detail to the user about why the condition failed. </p>",
//                   "severity": "informational"
//               }
//           ],
//           "issue_id": "SOLIDITY_REQUIRE_WITH_EMPTY_MESSAGE",
//           "issue_name": "REQUIRE WITH EMPTY MESSAGE"
//       },
//       "SOLIDITY_SAFEMATH": {
//           "issue_details": [
//               {
//                   "bug_hash": "Qz5uTN4lEowUP4oR-n89aD3aeaY=",
//                   "bug_id": "SS_272_200",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [122],
//                           "line_nos_start": [122]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p><code>SafeMath</code> library is found to be used in the contract. This increases gas consumption than traditional methods and validations if done manually.</p><p>Also, Solidity <code>0.8.0</code> includes checked arithmetic operations by default, and this renders <code>SafeMath</code> unnecessary.</p>",
//                   "issue_name": "USE OF SAFEMATH LIBRARY",
//                   "issue_remediation": "<p>We do not recommend using <code>SafeMath</code> library for all arithmetic operations. It is good practice to use explicit checks where it is really needed and to avoid extra checks where overflow/underflow is impossible.</p><p>The compiler should be upgraded to Solidity version <code>0.8.0+</code> which automatically checks for overflows and underflows.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "Kt0i8dzwU5Kl22BKCQHsM1528kg=",
//                   "bug_id": "SS_272_201",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [17],
//                           "line_nos_start": [17]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p><code>SafeMath</code> library is found to be used in the contract. This increases gas consumption than traditional methods and validations if done manually.</p><p>Also, Solidity <code>0.8.0</code> includes checked arithmetic operations by default, and this renders <code>SafeMath</code> unnecessary.</p>",
//                   "issue_name": "USE OF SAFEMATH LIBRARY",
//                   "issue_remediation": "<p>We do not recommend using <code>SafeMath</code> library for all arithmetic operations. It is good practice to use explicit checks where it is really needed and to avoid extra checks where overflow/underflow is impossible.</p><p>The compiler should be upgraded to Solidity version <code>0.8.0+</code> which automatically checks for overflows and underflows.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "4B5hwD5c_0SzNmI3Z_ZbHzpDOXw=",
//                   "bug_id": "SS_272_202",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/MasterContract.sol",
//                           "line_nos_end": [14],
//                           "line_nos_start": [14]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p><code>SafeMath</code> library is found to be used in the contract. This increases gas consumption than traditional methods and validations if done manually.</p><p>Also, Solidity <code>0.8.0</code> includes checked arithmetic operations by default, and this renders <code>SafeMath</code> unnecessary.</p>",
//                   "issue_name": "USE OF SAFEMATH LIBRARY",
//                   "issue_remediation": "<p>We do not recommend using <code>SafeMath</code> library for all arithmetic operations. It is good practice to use explicit checks where it is really needed and to avoid extra checks where overflow/underflow is impossible.</p><p>The compiler should be upgraded to Solidity version <code>0.8.0+</code> which automatically checks for overflows and underflows.</p>",
//                   "severity": "gas"
//               },
//               {
//                   "bug_hash": "IMt0j3Jei95fqe2UFaPzBb-_NPc=",
//                   "bug_id": "SS_272_203",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Airdrop.sol",
//                           "line_nos_end": [11],
//                           "line_nos_start": [11]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p><code>SafeMath</code> library is found to be used in the contract. This increases gas consumption than traditional methods and validations if done manually.</p><p>Also, Solidity <code>0.8.0</code> includes checked arithmetic operations by default, and this renders <code>SafeMath</code> unnecessary.</p>",
//                   "issue_name": "USE OF SAFEMATH LIBRARY",
//                   "issue_remediation": "<p>We do not recommend using <code>SafeMath</code> library for all arithmetic operations. It is good practice to use explicit checks where it is really needed and to avoid extra checks where overflow/underflow is impossible.</p><p>The compiler should be upgraded to Solidity version <code>0.8.0+</code> which automatically checks for overflows and underflows.</p>",
//                   "severity": "gas"
//               }
//           ],
//           "issue_id": "SOLIDITY_SAFEMATH",
//           "issue_name": "USE OF SAFEMATH LIBRARY"
//       },
//       "SOLIDITY_UNUSED_FUNCTION_SHOULD_BE_EXTERNAL": {
//           "issue_details": [
//               {
//                   "bug_hash": "3DI2xse0TUzG8-AF7KM4WE9Xldg=",
//                   "bug_id": "SS_272_140",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/test/invariants/STETHVaultInvariants.sol",
//                           "line_nos_end": [79],
//                           "line_nos_start": [75]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "gB7U2DeSFf0DmTT3koh2NU0mXU4=",
//                   "bug_id": "SS_272_139",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [209],
//                           "line_nos_start": [196]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "__dEqRnjwhGQwugI9b6sy1XxPzU=",
//                   "bug_id": "SS_272_149",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/test/invariants/STETHVaultInvariants.sol",
//                           "line_nos_end": [102],
//                           "line_nos_start": [98]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "YYb1HLYuEh5RYW_4P7t9PEc-ye4=",
//                   "bug_id": "SS_272_146",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/test/invariants/STETHVaultInvariants.sol",
//                           "line_nos_end": [90],
//                           "line_nos_start": [82]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "eU6zdJfC1SQwO24MshLbQaNj80U=",
//                   "bug_id": "SS_272_147",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/test/invariants/STETHVaultInvariants.sol",
//                           "line_nos_end": [73],
//                           "line_nos_start": [71]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "B7Ka8blNHKGPsBiAPzDIv6D2-5g=",
//                   "bug_id": "SS_272_145",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/test/invariants/STETHVaultInvariants.sol",
//                           "line_nos_end": [69],
//                           "line_nos_start": [67]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "eSAUJyZ7SmPcCXECSaW9xWui8HU=",
//                   "bug_id": "SS_272_141",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/BaseVault.sol",
//                           "line_nos_end": [150],
//                           "line_nos_start": [126]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "UKZiIVU5Q9Jk6fmwleLZvCIbwlY=",
//                   "bug_id": "SS_272_143",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/BaseVault.sol",
//                           "line_nos_end": [121],
//                           "line_nos_start": [95]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "hYnpgYUHQOrp_pwNmxvFae-xSMA=",
//                   "bug_id": "SS_272_144",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/STETHVault.sol",
//                           "line_nos_end": [84],
//                           "line_nos_start": [75]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "z0MdxZEuJ9lwg9rLQHWBIxJJ3VQ=",
//                   "bug_id": "SS_272_142",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [171],
//                           "line_nos_start": [168]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "SyujfuLvAJSOMPG0GuNgIJ36eNk=",
//                   "bug_id": "SS_272_148",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/STETHVault.sol",
//                           "line_nos_end": [70],
//                           "line_nos_start": [59]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "azo2gK1PEBzpz9EVnhFfEw8Askg=",
//                   "bug_id": "SS_272_150",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/configuration/ConfigurationManager.sol",
//                           "line_nos_end": [30],
//                           "line_nos_start": [23]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "n9s9zCYzrYBQTjPA3b_pvR1fqlM=",
//                   "bug_id": "SS_272_153",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/BaseVault.sol",
//                           "line_nos_end": [317],
//                           "line_nos_start": [306]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "rOgmA4BrlZlxOwUfg6gl9cK8X_Y=",
//                   "bug_id": "SS_272_151",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/BaseVault.sol",
//                           "line_nos_end": [301],
//                           "line_nos_start": [294]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "xFud_L5mc1Hx9Z-MqIlPYu8WcrM=",
//                   "bug_id": "SS_272_152",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/vaults/BaseVault.sol",
//                           "line_nos_end": [289],
//                           "line_nos_start": [281]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "DluAWKeis6EhG6BRmoodQgFJqV4=",
//                   "bug_id": "SS_272_156",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/Asset.sol",
//                           "line_nos_end": [17],
//                           "line_nos_start": [15]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "5hMNRIvVTyj7dsOdvpGAaiYDZh4=",
//                   "bug_id": "SS_272_154",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/BRZtruffle/contracts/Token.sol",
//                           "line_nos_end": [38],
//                           "line_nos_start": [35]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "7XZyH5Dq_kdEhyHNqz1Ex_6-Tcs=",
//                   "bug_id": "SS_272_155",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/mocks/Asset.sol",
//                           "line_nos_end": [13],
//                           "line_nos_start": [11]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "uzqvqb2XVBr91-QRQXj9Gpmm3a0=",
//                   "bug_id": "SS_272_157",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [188],
//                           "line_nos_start": [182]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "gmNuPOwaJqGqwJFJuTzxirGWwQc=",
//                   "bug_id": "SS_272_158",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [233],
//                           "line_nos_start": [220]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "psWxqJmrcULAeNXeP9X9UD4ogDc=",
//                   "bug_id": "SS_272_159",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/america4trump/test.sol",
//                           "line_nos_end": [257],
//                           "line_nos_start": [244]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "4r7ILhsUkPb2uOAVwMGx3X81zRY=",
//                   "bug_id": "SS_272_160",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [254],
//                           "line_nos_start": [251]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "bB2Uo_4PAV5zfqweYq3MX1zJ_m8=",
//                   "bug_id": "SS_272_162",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [193],
//                           "line_nos_start": [184]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "evKBIWDDhtPyFB4xsLNisf6sqGg=",
//                   "bug_id": "SS_272_161",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [235],
//                           "line_nos_start": [221]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "zmbS9PaG7P7T2trJQrE-9Wah4Iw=",
//                   "bug_id": "SS_272_166",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [290],
//                           "line_nos_start": [283]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "yqLqu2pAPKgBznixn6y5JLgkkiA=",
//                   "bug_id": "SS_272_164",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [182],
//                           "line_nos_start": [136]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "4ITosxsnyYGve9B0AOSalcckr-I=",
//                   "bug_id": "SS_272_168",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [281],
//                           "line_nos_start": [276]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "hV3vSkez668o2Ql9p6XHHppMJLc=",
//                   "bug_id": "SS_272_167",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [249],
//                           "line_nos_start": [237]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "oLERW6AB8QNKn2FPx9TVzhHP7qg=",
//                   "bug_id": "SS_272_165",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [213],
//                           "line_nos_start": [195]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "YjvRux9U83G8ve7HloIZQsYqMws=",
//                   "bug_id": "SS_272_163",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/NFTLender.sol",
//                           "line_nos_end": [219],
//                           "line_nos_start": [215]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "BIMzzOu3PhgDELNSHh3fgB2W2xE=",
//                   "bug_id": "SS_272_172",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/AtlantisGate.sol",
//                           "line_nos_end": [66],
//                           "line_nos_start": [57]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "QjcP3tWAGCp-s0hgVayH6z1DIsY=",
//                   "bug_id": "SS_272_173",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/BRZtruffle/contracts/Token.sol",
//                           "line_nos_end": [56],
//                           "line_nos_start": [53]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "fMJWNB52oHzbQSZXIbMeTrbGm1I=",
//                   "bug_id": "SS_272_170",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/BRZtruffle/contracts/Token.sol",
//                           "line_nos_end": [51],
//                           "line_nos_start": [48]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "9D5I90Xmz16p5ZG2SwMVdghZvyw=",
//                   "bug_id": "SS_272_169",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/AtlantisGate.sol",
//                           "line_nos_end": [55],
//                           "line_nos_start": [48]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "5zgL2n0mxK_Sui7-icHHk_4U5WU=",
//                   "bug_id": "SS_272_171",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/AtlantisGate.sol",
//                           "line_nos_end": [73],
//                           "line_nos_start": [68]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "ai_ad5HHllCtjRGCuY6Cl4u9UFU=",
//                   "bug_id": "SS_272_174",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/AtlantisTruffle/contracts/AtlantisGate.sol",
//                           "line_nos_end": [46],
//                           "line_nos_start": [43]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "VFECuUK2mtIyHo2n6Iwnd8rzekA=",
//                   "bug_id": "SS_272_176",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [138],
//                           "line_nos_start": [135]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "dGJPrAf1dyxS4lP5jA1rYiwP2sA=",
//                   "bug_id": "SS_272_177",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [133],
//                           "line_nos_start": [130]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "LFLI94w5zwHme4BCuBz_qbd1zJE=",
//                   "bug_id": "SS_272_175",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/WahedTruffle/contracts/WAHED.sol",
//                           "line_nos_end": [158],
//                           "line_nos_start": [151]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "-dObov1EnN0RAv-nrIFGZPVTauA=",
//                   "bug_id": "SS_272_178",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/BRZtruffle/contracts/Migrations.sol",
//                           "line_nos_end": [18],
//                           "line_nos_start": [16]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "IiWd10vtJzqidAGXVFI5idMiNX0=",
//                   "bug_id": "SS_272_179",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Crowdsale.sol",
//                           "line_nos_end": [141],
//                           "line_nos_start": [124]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "GG5uaOEvPLcWMcPdm0VVCwC6Nmw=",
//                   "bug_id": "SS_272_180",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [203],
//                           "line_nos_start": [190]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "7MJwjt1Y4uJRlQlkgxcshO5Frlk=",
//                   "bug_id": "SS_272_181",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [184],
//                           "line_nos_start": [148]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "2CNyzhk13GiEnbVuc-f4xZBYDHc=",
//                   "bug_id": "SS_272_182",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [215],
//                           "line_nos_start": [209]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "nE13WqK9EGvteCbXZ7Kntm4RdOM=",
//                   "bug_id": "SS_272_183",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/TokenVesting.sol",
//                           "line_nos_end": [242],
//                           "line_nos_start": [222]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "FgfIMTScrlQbY6V1w1xd_ekcSr0=",
//                   "bug_id": "SS_272_186",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/MasterContract.sol",
//                           "line_nos_end": [110],
//                           "line_nos_start": [107]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "AbJ1-rcOV_kE_SFpBMVOVX5jWY8=",
//                   "bug_id": "SS_272_187",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/MasterContract.sol",
//                           "line_nos_end": [83],
//                           "line_nos_start": [73]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "ZVYxutg2AN1mq96kOcXfrfGj4l0=",
//                   "bug_id": "SS_272_185",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/BRZtruffle/contracts/Token.sol",
//                           "line_nos_end": [33],
//                           "line_nos_start": [30]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "GKux5X8D4zEomVekgwSIffw_07M=",
//                   "bug_id": "SS_272_184",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/MasterContract.sol",
//                           "line_nos_end": [117],
//                           "line_nos_start": [112]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "kjNJ9Kv1E7uX3mV97VWDsiOn--w=",
//                   "bug_id": "SS_272_191",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Airdrop.sol",
//                           "line_nos_end": [55],
//                           "line_nos_start": [34]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "z6hf8VYGnPZaj_J8YVO8VcfGoMk=",
//                   "bug_id": "SS_272_188",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Airdrop.sol",
//                           "line_nos_end": [32],
//                           "line_nos_start": [23]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "Xp1_l7dpMf1kUgkHB6uV_s4bb4s=",
//                   "bug_id": "SS_272_189",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Airdrop.sol",
//                           "line_nos_end": [63],
//                           "line_nos_start": [61]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "6h2P3zOGK9AJ5iJLE8kF4JvhCTw=",
//                   "bug_id": "SS_272_190",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Airdrop.sol",
//                           "line_nos_end": [59],
//                           "line_nos_start": [57]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "KjueZLSOZE1Tm98ttMQfcl5lxeQ=",
//                   "bug_id": "SS_272_192",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/Airdrop.sol",
//                           "line_nos_end": [67],
//                           "line_nos_start": [65]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "20wgFO7GkwSBPQJO4GVpm6SoIUc=",
//                   "bug_id": "SS_272_193",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/BlockListed.sol",
//                           "line_nos_end": [10],
//                           "line_nos_start": [7]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "errXjp6woVW1WQ-Mz55Xoo8yE0I=",
//                   "bug_id": "SS_272_194",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/CaliburLand/contracts/BlockListed.sol",
//                           "line_nos_end": [15],
//                           "line_nos_start": [12]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "gaHZLMrtlGy06TWvOWGVa-XS2Lg=",
//                   "bug_id": "SS_272_195",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/BRZtruffle/contracts/Token.sol",
//                           "line_nos_end": [46],
//                           "line_nos_start": [40]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               },
//               {
//                   "bug_hash": "AREMiiP7yEWRTjhXKxmam8g-ajQ=",
//                   "bug_id": "SS_272_196",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/BRZtruffle/contracts/Token.sol",
//                           "line_nos_end": [71],
//                           "line_nos_start": [66]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>A function with <code>public</code> visibility modifier was detected that is not called internally.</p><p><code>public</code> and <code>external</code> differs in terms of gas usage. The former use more than the latter when used with large arrays of data. This is due to the fact that Solidity copies arguments to memory on a <code>public</code> function while <code>external</code> read from calldata which a cheaper than memory allocation.</p>",
//                   "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL",
//                   "issue_remediation": "<p>If you know the function you create only allows for <code>external</code> calls, use the <code>external</code> visibility modifier instead of <code>public</code>. It provides performance benefits and you will save on gas.</p>",
//                   "severity": "high"
//               }
//           ],
//           "issue_id": "SOLIDITY_UNUSED_FUNCTION_SHOULD_BE_EXTERNAL",
//           "issue_name": "UNUSED FUNCTION SHOULD BE EXTERNAL"
//       },
//       "SOLIDITY_USING_INLINE_ASSEMBLY": {
//           "issue_details": [
//               {
//                   "bug_hash": "A9lr_Okaj43l-vRiYGFupdaBHTk=",
//                   "bug_id": "SS_272_25",
//                   "bug_status": "discovered",
//                   "findings": [
//                       {
//                           "file_path": "/Pods/contracts/libs/CastUint.sol",
//                           "line_nos_end": [13],
//                           "line_nos_start": [13]
//                       }
//                   ],
//                   "issue_confidence": "2",
//                   "issue_description": "<p>Inline assembly is a way to access the Ethereum Virtual Machine at a low level. This bypasses several important safety features and checks of Solidity. This should only be used for tasks that need it and if there is confidence in using it.</p><br /><p>Multiple vulnerabilities have been detected previously when the assembly is not properly used within the Solidity code; therefore, caution should be exercised while using them.</p>",
//                   "issue_name": "IN-LINE ASSEMBLY DETECTED",
//                   "issue_remediation": "<p>Avoid using inline assembly instructions if possible because it might introduce certain issues in the code if not dealt with properly because it bypasses several safety features that are already implemented in Solidity.</p>",
//                   "severity": "informational"
//               }
//           ],
//           "issue_id": "SOLIDITY_USING_INLINE_ASSEMBLY",
//           "issue_name": "IN-LINE ASSEMBLY DETECTED"
//       }
//   }
// }
