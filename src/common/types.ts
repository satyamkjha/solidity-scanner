import { type } from "os";

export type Severity = "high" | "medium" | "low";

export type Profile = {
  name: string;
  email: string;
  contact_number: string;
  credits: number;
  company_name: string;
  current_package: string;
  projects_remaining: number;
  package_recharge_date: string;
  package_end_date: string;
  package_validity: number;
  _integrations: {
    github: IntegrationData;
    slack: IntegrationData;
    jira: IntegrationData;
  };
  is_cancellable: boolean;
  payment_method: string;
  subscription?: {
    end_date: string;
    start_date: string;
    renewal_date: string;
  };
  payment_type: string;
  payment_via: string;
  payment_details?: {
    brand: string;
    last_4_digits: string;
    exp_year: number;
    exp_month: number;
  };
};

export type IntegrationData = {
  allowed: boolean;
  status: string;
};

export type Project = {
  project_id: string;
  project_name: string;
  project_url: string;
  project_visibility: string;
  date_created: string;
  date_updated: string;
  scans_remaining: number;
  _latest_scan: {
    scan_id: string;
    scan_status: string;
    scan_message: string;
    scan_summary: ScanSummary;
  };
};

export type AuthResponse = {
  status: string;
  message: string;
  sessionid: string;
  csrf_token: string;
};

export type Scan = {
  client_id: number;
  latest_report_id: string;
  project_url: string;
  project_name: string;
  project_id: string;
  file_url_list?: string[];
  contract_address?: string;
  contract_platform?: string;
  compilerversion?: string;
  contract_url?: string;
  contractname?: string;
  evmversion?: string;
  licensetype?: string;
  contract_chain?: string;
  value?: string;
  currency?: string;
  scan_type: string;
  scan_id: string;
  scan_init_time: string;
  scan_status: string;
  scan_message: string;
  beta_scan_status: string;
  scan_summary?: ScanSummary;
  scan_details?: ScanDetail[];
  reporting_status: string;
  _created: string;
  _updated: string;
};

export type MultiFileScanDetail = {
    issue_id: string,
    "template_details": {
        "additional_meta": string,
        "aggregation_key": string,
        "description_keys": string[],
        "issue_confidence": string,
        "issue_id": string,
        "issue_name": string,
        "issue_severity": string,
        "multi_file_supported": string,
        "type": string,
        "version": string
    }
    metric_wise_aggregated_findings: MetricWiseAggregatedFinding[]
}

export type MetricWiseAggregatedFinding = {
    [key: string]: {
        description_details: {
            context_version: string
            mostly_used_version: string
            version_file_count: string
            findings: Finding[]
        }
    }
}

{
  "scan_report": {
      "client_id": 23,
      "latest_report_id": "76d0329ec571c986",
      "multi_file_scan_details": [
          {
              "issue_id": "SOLIDITY_PRAGMA_VERSION",
              "metric_wise_aggregated_findings": [
                  {
                      "0.7.5": {
                          "description_details": { "context_version": "0.7.5", "mostly_used_version": ">=0.7.5", "version_file_count": 26 },
                          "findings": [
                              { "file_path": "/test/dapp_test/src/OlympusERC20Token.t.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/test/dapp_test/src/Staking.t.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/test/dapp_test/src/OlympusAuthority.t.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/test/dapp_test/src/util/Hevm.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/vesting/Investor.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/vesting/Genesis.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/types/Guardable.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/migration/OlympusTokenMigrator.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/migration/LiquidityMigrator.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/migration/CrossChainMigrator.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/allocators/ConvexAllocator.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/allocators/GroAllocator.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/allocators/RewardHarvestor.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/allocators/AaveAllocator.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/allocators/FraxSharesAllocatorVNext.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/allocators/FraxSharesAllocator.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/allocators/OnsenAllocator.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/OLD/OLDwsOHM.sol", "line_nos_end": [6], "line_nos_start": [6] },
                              { "file_path": "/contracts/mocks/DAI.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/mocks/Frax.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/mocks/AccessControlledMock.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/testnet/OhmFaucet.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/interfaces/ITokemakManager.sol", "line_nos_end": [3], "line_nos_start": [3] },
                              { "file_path": "/contracts/interfaces/ICustomTreasury.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/custom/CustomTreasury.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/custom/CustomBond.sol", "line_nos_end": [2], "line_nos_start": [2] }
                          ]
                      }
                  },
                  {
                      ">=0.7.0 <0.8.0": {
                          "description_details": { "context_version": ">=0.7.0 <0.8.0", "mostly_used_version": ">=0.7.5", "version_file_count": 1 },
                          "findings": [{ "file_path": "/test/dapp_test/src/util/MockContract.sol", "line_nos_end": [4], "line_nos_start": [4] }]
                      }
                  },
                  {
                      "^0.7.5": {
                          "description_details": { "context_version": "^0.7.5", "mostly_used_version": ">=0.7.5", "version_file_count": 13 },
                          "findings": [
                              { "file_path": "/contracts/sOlympusERC20.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/StakingDistributor.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/Treasury.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/OlympusERC20.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/StandardBondingCalculator.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/Staking.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/governance/gOHM.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/cryptography/ECDSA.sol", "line_nos_end": [3], "line_nos_start": [3] },
                              { "file_path": "/contracts/cryptography/EIP712.sol", "line_nos_end": [3], "line_nos_start": [3] },
                              { "file_path": "/contracts/libraries/Counters.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/libraries/FullMath.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/libraries/FixedPoint.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/libraries/SafeMath.sol", "line_nos_end": [2], "line_nos_start": [2] }
                          ]
                      }
                  },
                  {
                      "^0.8.10": {
                          "description_details": { "context_version": "^0.8.10", "mostly_used_version": ">=0.7.5", "version_file_count": 8 },
                          "findings": [
                              { "file_path": "/contracts/BondDepository.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/peripheral/YieldDirector.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/types/NoteKeeper.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/types/FrontEndRewarder.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/migration/BalancerLiquidityMigrator.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/allocators/LUSDAllocator.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/allocators/MetaGovernanceAllocator.sol", "line_nos_end": [2], "line_nos_start": [2] },
                              { "file_path": "/contracts/mocks/MockGohm.sol", "line_nos_end": [2], "line_nos_start": [2] }
                          ]
                      }
                  },
                  {
                      "^0.5.16": {
                          "description_details": { "context_version": "^0.5.16", "mostly_used_version": ">=0.7.5", "version_file_count": 5 },
                          "findings": [
                              { "file_path": "/contracts/governance/GovernorOHMegaDelegator.sol", "line_nos_end": [1], "line_nos_start": [1] },
                              { "file_path": "/contracts/governance/GovernorOHMegaDelegate.sol", "line_nos_end": [1], "line_nos_start": [1] },
                              { "file_path": "/contracts/governance/GovernorOHMegaInterfaces.sol", "line_nos_end": [1], "line_nos_start": [1] },
                              { "file_path": "/contracts/governance/Timelock.sol", "line_nos_end": [1], "line_nos_start": [1] },
                              { "file_path": "/contracts/governance/GovernorAlpha.sol", "line_nos_end": [1], "line_nos_start": [1] }
                          ]
                      }
                  },
                  {
                      "0.8.10": {
                          "description_details": { "context_version": "0.8.10", "mostly_used_version": ">=0.7.5", "version_file_count": 1 },
                          "findings": [{ "file_path": "/contracts/allocators/alchemixAllocator.sol", "line_nos_end": [2], "line_nos_start": [2] }]
                      }
                  },
                  {
                      "": {
                          "description_details": { "context_version": "", "mostly_used_version": ">=0.7.5", "version_file_count": 1 },
                          "findings": [{ "file_path": "/contracts/allocators/interfaces/LiquityInterfaces.sol", "line_nos_end": [], "line_nos_start": [] }]
                      }
                  },
                  {
                      "^0.8.9": {
                          "description_details": { "context_version": "^0.8.9", "mostly_used_version": ">=0.7.5", "version_file_count": 1 },
                          "findings": [{ "file_path": "/contracts/mocks/MockSOHM.sol", "line_nos_end": [2], "line_nos_start": [2] }]
                      }
                  },
                  {
                      ">=0.8.0": {
                          "description_details": { "context_version": ">=0.8.0", "mostly_used_version": ">=0.7.5", "version_file_count": 1 },
                          "findings": [{ "file_path": "/contracts/mocks/MockERC20.sol", "line_nos_end": [2], "line_nos_start": [2] }]
                      }
                  }
              ],
              "template_details": {
                  "additional_meta": {},
                  "aggregation_key": "version",
                  "description_keys": ["mostly_used_version", "context_version", "version_file_count"],
                  "issue_confidence": "2",
                  "issue_id": "SOLIDITY_PRAGMA_VERSION",
                  "issue_name": "PRAGMA_VERSION",
                  "issue_severity": "low",
                  "multi_file_supported": "true",
                  "type": "ast_parsed",
                  "version": "1"
              }
          },
          {
              "issue_id": "SOLIDITY_EXTERNAL_FUNCTION",
              "metric_wise_aggregated_findings": [
                  {
                      "test_erc20() returns()": {
                          "description_details": { "function_name": "test_erc20() returns()" },
                          "findings": [{ "file_path": "/test/dapp_test/src/OlympusERC20Token.t.sol", "line_nos_end": [22], "line_nos_start": [16] }]
                      }
                  },
                  {
                      "test_burn(uint256,uint256) returns()": {
                          "description_details": { "function_name": "test_burn(uint256,uint256) returns()" },
                          "findings": [{ "file_path": "/test/dapp_test/src/OlympusERC20Token.t.sol", "line_nos_end": [65], "line_nos_start": [48] }]
                      }
                  },
                  {
                      "testCannot_mint() returns()": {
                          "description_details": { "function_name": "testCannot_mint() returns()" },
                          "findings": [{ "file_path": "/test/dapp_test/src/OlympusERC20Token.t.sol", "line_nos_end": [34], "line_nos_start": [24] }]
                      }
                  },
                  {
                      "test_mint(uint256) returns()": {
                          "description_details": { "function_name": "test_mint(uint256) returns()" },
                          "findings": [{ "file_path": "/test/dapp_test/src/OlympusERC20Token.t.sol", "line_nos_end": [45], "line_nos_start": [37] }]
                      }
                  },
                  {
                      "testUnstakeAtRebaseFromGohm() returns()": {
                          "description_details": { "function_name": "testUnstakeAtRebaseFromGohm() returns()" },
                          "findings": [{ "file_path": "/test/dapp_test/src/Staking.t.sol", "line_nos_end": [236], "line_nos_start": [204] }]
                      }
                  },
                  {
                      "testUnstakeAtRebase() returns()": {
                          "description_details": { "function_name": "testUnstakeAtRebase() returns()" },
                          "findings": [{ "file_path": "/test/dapp_test/src/Staking.t.sol", "line_nos_end": [202], "line_nos_start": [171] }]
                      }
                  },
                  {
                      "testStakeNoBalance() returns()": {
                          "description_details": { "function_name": "testStakeNoBalance() returns()" },
                          "findings": [{ "file_path": "/test/dapp_test/src/Staking.t.sol", "line_nos_end": [101], "line_nos_start": [94] }]
                      }
                  },
                  { "setUp() returns()": { "description_details": { "function_name": "setUp() returns()" }, "findings": [{ "file_path": "/test/dapp_test/src/Staking.t.sol", "line_nos_end": [92], "line_nos_start": [45] }] } },
                  {
                      "testStakeAtRebase() returns()": {
                          "description_details": { "function_name": "testStakeAtRebase() returns()" },
                          "findings": [{ "file_path": "/test/dapp_test/src/Staking.t.sol", "line_nos_end": [141], "line_nos_start": [130] }]
                      }
                  },
                  {
                      "testStakeAtRebaseToGohm() returns()": {
                          "description_details": { "function_name": "testStakeAtRebaseToGohm() returns()" },
                          "findings": [{ "file_path": "/test/dapp_test/src/Staking.t.sol", "line_nos_end": [128], "line_nos_start": [117] }]
                      }
                  },
                  {
                      "testStakeWithoutAllowance() returns()": {
                          "description_details": { "function_name": "testStakeWithoutAllowance() returns()" },
                          "findings": [{ "file_path": "/test/dapp_test/src/Staking.t.sol", "line_nos_end": [109], "line_nos_start": [103] }]
                      }
                  },
                  { "testStake() returns()": { "description_details": { "function_name": "testStake() returns()" }, "findings": [{ "file_path": "/test/dapp_test/src/Staking.t.sol", "line_nos_end": [115], "line_nos_start": [111] }] } },
                  {
                      "testUnstake() returns()": { "description_details": { "function_name": "testUnstake() returns()" }, "findings": [{ "file_path": "/test/dapp_test/src/Staking.t.sol", "line_nos_end": [169], "line_nos_start": [143] }] }
                  },
                  {
                      "test_onlyGuardian_not_authorized() returns()": {
                          "description_details": { "function_name": "test_onlyGuardian_not_authorized() returns()" },
                          "findings": [{ "file_path": "/test/dapp_test/src/OlympusAuthority.t.sol", "line_nos_end": [38], "line_nos_start": [30] }]
                      }
                  },
                  {
                      "test_onlyGovernor_authorized() returns()": {
                          "description_details": { "function_name": "test_onlyGovernor_authorized() returns()" },
                          "findings": [{ "file_path": "/test/dapp_test/src/OlympusAuthority.t.sol", "line_nos_end": [28], "line_nos_start": [24] }]
                      }
                  },
                  {
                      "test_onlyPolicy_authorized() returns()": {
                          "description_details": { "function_name": "test_onlyPolicy_authorized() returns()" },
                          "findings": [{ "file_path": "/test/dapp_test/src/OlympusAuthority.t.sol", "line_nos_end": [60], "line_nos_start": [56] }]
                      }
                  },
                  {
                      "test_onlyVault_not_authorized() returns()": {
                          "description_details": { "function_name": "test_onlyVault_not_authorized() returns()" },
                          "findings": [{ "file_path": "/test/dapp_test/src/OlympusAuthority.t.sol", "line_nos_end": [70], "line_nos_start": [62] }]
                      }
                  },
                  {
                      "test_pushRole_authorized() returns()": {
                          "description_details": { "function_name": "test_pushRole_authorized() returns()" },
                          "findings": [{ "file_path": "/test/dapp_test/src/OlympusAuthority.t.sol", "line_nos_end": [142], "line_nos_start": [137] }]
                      }
                  },
                  {
                      "test_onlyGuardian_authorized() returns()": {
                          "description_details": { "function_name": "test_onlyGuardian_authorized() returns()" },
                          "findings": [{ "file_path": "/test/dapp_test/src/OlympusAuthority.t.sol", "line_nos_end": [44], "line_nos_start": [40] }]
                      }
                  },
                  {
                      "test_pushRole_not_authorized() returns()": {
                          "description_details": { "function_name": "test_pushRole_not_authorized() returns()" },
                          "findings": [{ "file_path": "/test/dapp_test/src/OlympusAuthority.t.sol", "line_nos_end": [135], "line_nos_start": [126] }]
                      }
                  },
                  {
                      "test_onlyVault_authorized() returns()": {
                          "description_details": { "function_name": "test_onlyVault_authorized() returns()" },
                          "findings": [{ "file_path": "/test/dapp_test/src/OlympusAuthority.t.sol", "line_nos_end": [76], "line_nos_start": [72] }]
                      }
                  },
                  {
                      "test_pullRole_authorized() returns()": {
                          "description_details": { "function_name": "test_pullRole_authorized() returns()" },
                          "findings": [{ "file_path": "/test/dapp_test/src/OlympusAuthority.t.sol", "line_nos_end": [91], "line_nos_start": [80] }]
                      }
                  },
                  {
                      "test_onlyPolicy_not_authorized() returns()": {
                          "description_details": { "function_name": "test_onlyPolicy_not_authorized() returns()" },
                          "findings": [{ "file_path": "/test/dapp_test/src/OlympusAuthority.t.sol", "line_nos_end": [54], "line_nos_start": [46] }]
                      }
                  },
                  {
                      "test_pullRole_not_authorized() returns()": {
                          "description_details": { "function_name": "test_pullRole_not_authorized() returns()" },
                          "findings": [{ "file_path": "/test/dapp_test/src/OlympusAuthority.t.sol", "line_nos_end": [124], "line_nos_start": [93] }]
                      }
                  },
                  {
                      "test_onlyGovernor_not_authorized() returns()": {
                          "description_details": { "function_name": "test_onlyGovernor_not_authorized() returns()" },
                          "findings": [{ "file_path": "/test/dapp_test/src/OlympusAuthority.t.sol", "line_nos_end": [22], "line_nos_start": [14] }]
                      }
                  },
                  {
                      "updateInvocationCount(bytes4,bytes) returns()": {
                          "description_details": { "function_name": "updateInvocationCount(bytes4,bytes) returns()" },
                          "findings": [{ "file_path": "/test/dapp_test/src/util/MockContract.sol", "line_nos_end": [350], "line_nos_start": [345] }]
                      }
                  },
                  { "roll(uint256) returns()": { "description_details": { "function_name": "roll(uint256) returns()" }, "findings": [{ "file_path": "/test/dapp_test/src/util/Hevm.sol", "line_nos_end": [11], "line_nos_start": [11] }] } },
                  { "warp(uint256) returns()": { "description_details": { "function_name": "warp(uint256) returns()" }, "findings": [{ "file_path": "/test/dapp_test/src/util/Hevm.sol", "line_nos_end": [8], "line_nos_start": [8] }] } },
                  {
                      "transferFrom(address,address,uint256) returns(bool)": {
                          "description_details": { "function_name": "transferFrom(address,address,uint256) returns(bool)" },
                          "findings": [{ "file_path": "/contracts/mocks/Frax.sol", "line_nos_end": [172], "line_nos_start": [158] }]
                      }
                  },
                  {
                      "approve(address,uint256) returns(bool)": {
                          "description_details": { "function_name": "approve(address,uint256) returns(bool)" },
                          "findings": [{ "file_path": "/contracts/mocks/MockSOHM.sol", "line_nos_end": [35], "line_nos_start": [32] }]
                      }
                  },
                  {
                      "rebase(uint256,uint256) returns(uint256)": {
                          "description_details": { "function_name": "rebase(uint256,uint256) returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/sOlympusERC20.sol", "line_nos_end": [143], "line_nos_start": [119] }]
                      }
                  },
                  {
                      "decreaseAllowance(address,uint256) returns(bool)": {
                          "description_details": { "function_name": "decreaseAllowance(address,uint256) returns(bool)" },
                          "findings": [{ "file_path": "/contracts/OLD/OLDwsOHM.sol", "line_nos_end": [531], "line_nos_start": [524] }]
                      }
                  },
                  {
                      "transfer(address,uint256) returns(bool)": {
                          "description_details": { "function_name": "transfer(address,uint256) returns(bool)" },
                          "findings": [{ "file_path": "/contracts/mocks/MockSOHM.sol", "line_nos_end": [51], "line_nos_start": [46] }]
                      }
                  },
                  {
                      "allowance(address,address) returns(uint256)": {
                          "description_details": { "function_name": "allowance(address,address) returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/OLD/OLDwsOHM.sol", "line_nos_end": [453], "line_nos_start": [451] }]
                      }
                  },
                  {
                      "increaseAllowance(address,uint256) returns(bool)": {
                          "description_details": { "function_name": "increaseAllowance(address,uint256) returns(bool)" },
                          "findings": [{ "file_path": "/contracts/OLD/OLDwsOHM.sol", "line_nos_end": [508], "line_nos_start": [505] }]
                      }
                  },
                  {
                      "circulatingSupply() returns(uint256)": {
                          "description_details": { "function_name": "circulatingSupply() returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/vesting/Genesis.sol", "line_nos_end": [183], "line_nos_start": [181] }]
                      }
                  },
                  {
                      "gonsForBalance(uint256) returns(uint256)": {
                          "description_details": { "function_name": "gonsForBalance(uint256) returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/sOlympusERC20.sol", "line_nos_end": [259], "line_nos_start": [257] }]
                      }
                  },
                  {
                      "balanceForGons(uint256) returns(uint256)": {
                          "description_details": { "function_name": "balanceForGons(uint256) returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/sOlympusERC20.sol", "line_nos_end": [263], "line_nos_start": [261] }]
                      }
                  },
                  {
                      "balanceOf(address) returns(uint256)": {
                          "description_details": { "function_name": "balanceOf(address) returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/mocks/MockSOHM.sol", "line_nos_end": [81], "line_nos_start": [79] }]
                      }
                  },
                  { "index() returns(uint256)": { "description_details": { "function_name": "index() returns(uint256)" }, "findings": [{ "file_path": "/contracts/mocks/MockSOHM.sol", "line_nos_end": [100], "line_nos_start": [98] }] } },
                  {
                      "nextRewardFor(address) returns(uint256)": {
                          "description_details": { "function_name": "nextRewardFor(address) returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/StakingDistributor.sol", "line_nos_end": [144], "line_nos_start": [136] }]
                      }
                  },
                  {
                      "nextRewardAt(uint256) returns(uint256)": {
                          "description_details": { "function_name": "nextRewardAt(uint256) returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/StakingDistributor.sol", "line_nos_end": [129], "line_nos_start": [127] }]
                      }
                  },
                  {
                      "debtDecay(uint256) returns(uint64)": {
                          "description_details": { "function_name": "debtDecay(uint256) returns(uint64)" },
                          "findings": [{ "file_path": "/contracts/BondDepository.sol", "line_nos_end": [457], "line_nos_start": [451] }]
                      }
                  },
                  {
                      "currentControlVariable(uint256) returns(uint256)": {
                          "description_details": { "function_name": "currentControlVariable(uint256) returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/BondDepository.sol", "line_nos_end": [468], "line_nos_start": [465] }]
                      }
                  },
                  {
                      "marketPrice(uint256) returns(uint256)": {
                          "description_details": { "function_name": "marketPrice(uint256) returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/BondDepository.sol", "line_nos_end": [410], "line_nos_start": [408] }]
                      }
                  },
                  {
                      "isLive(uint256) returns(bool)": {
                          "description_details": { "function_name": "isLive(uint256) returns(bool)" },
                          "findings": [{ "file_path": "/contracts/BondDepository.sol", "line_nos_end": [476], "line_nos_start": [474] }]
                      }
                  },
                  {
                      "debtRatio(uint256) returns(uint256)": {
                          "description_details": { "function_name": "debtRatio(uint256) returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/BondDepository.sol", "line_nos_end": [434], "line_nos_start": [432] }]
                      }
                  },
                  {
                      "currentDebt(uint256) returns(uint256)": {
                          "description_details": { "function_name": "currentDebt(uint256) returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/BondDepository.sol", "line_nos_end": [444], "line_nos_start": [442] }]
                      }
                  },
                  {
                      "indexInRegistry(address,None) returns(bool,uint256)": {
                          "description_details": { "function_name": "indexInRegistry(address,None) returns(bool,uint256)" },
                          "findings": [{ "file_path": "/contracts/Treasury.sol", "line_nos_end": [355], "line_nos_start": [347] }]
                      }
                  },
                  {
                      "tokenValue(address,uint256) returns(uint256)": {
                          "description_details": { "function_name": "tokenValue(address,uint256) returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/Treasury.sol", "line_nos_end": [486], "line_nos_start": [480] }]
                      }
                  },
                  {
                      "excessReserves() returns(uint256)": {
                          "description_details": { "function_name": "excessReserves() returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/Treasury.sol", "line_nos_end": [472], "line_nos_start": [470] }]
                      }
                  },
                  {
                      "getKValue(address) returns(uint256)": {
                          "description_details": { "function_name": "getKValue(address) returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/StandardBondingCalculator.sol", "line_nos_end": [33], "line_nos_start": [26] }]
                      }
                  },
                  {
                      "getTotalValue(address) returns(uint256)": {
                          "description_details": { "function_name": "getTotalValue(address) returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/StandardBondingCalculator.sol", "line_nos_end": [37], "line_nos_start": [35] }]
                      }
                  },
                  { "rebase() returns(uint256)": { "description_details": { "function_name": "rebase() returns(uint256)" }, "findings": [{ "file_path": "/contracts/Staking.sol", "line_nos_end": [242], "line_nos_start": [221] }] } },
                  {
                      "supplyInWarmup() returns(uint256)": {
                          "description_details": { "function_name": "supplyInWarmup() returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/Staking.sol", "line_nos_end": [281], "line_nos_start": [279] }]
                      }
                  },
                  {
                      "claim(address,bool) returns(uint256)": {
                          "description_details": { "function_name": "claim(address,bool) returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/Staking.sol", "line_nos_end": [138], "line_nos_start": [123] }]
                      }
                  },
                  {
                      "redeemableFor(address) returns(uint256)": {
                          "description_details": { "function_name": "redeemableFor(address) returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/vesting/Genesis.sol", "line_nos_end": [165], "line_nos_start": [160] }]
                      }
                  },
                  {
                      "setTerms(address,uint256,uint256,uint256) returns()": {
                          "description_details": { "function_name": "setTerms(address,uint256,uint256,uint256) returns()" },
                          "findings": [{ "file_path": "/contracts/vesting/Investor.sol", "line_nos_end": [210], "line_nos_start": [200] }]
                      }
                  },
                  {
                      "claimed(address) returns(uint256)": {
                          "description_details": { "function_name": "claimed(address) returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/vesting/Genesis.sol", "line_nos_end": [174], "line_nos_start": [172] }]
                      }
                  },
                  {
                      "setTerms(address,uint256,uint256,uint256,uint256) returns()": {
                          "description_details": { "function_name": "setTerms(address,uint256,uint256,uint256,uint256) returns()" },
                          "findings": [{ "file_path": "/contracts/vesting/Genesis.sol", "line_nos_end": [218], "line_nos_start": [207] }]
                      }
                  },
                  {
                      "_setImplementation(address) returns()": {
                          "description_details": { "function_name": "_setImplementation(address) returns()" },
                          "findings": [{ "file_path": "/contracts/governance/GovernorOHMegaDelegator.sol", "line_nos_end": [54], "line_nos_start": [43] }]
                      }
                  },
                  {
                      "balanceFrom(uint256) returns(uint256)": {
                          "description_details": { "function_name": "balanceFrom(uint256) returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/mocks/MockGohm.sol", "line_nos_end": [21], "line_nos_start": [19] }]
                      }
                  },
                  {
                      "balanceTo(uint256) returns(uint256)": {
                          "description_details": { "function_name": "balanceTo(uint256) returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/mocks/MockGohm.sol", "line_nos_end": [25], "line_nos_start": [23] }]
                      }
                  },
                  {
                      "propose(address,uint256,string,bytes,string) returns(uint256)": {
                          "description_details": { "function_name": "propose(address,uint256,string,bytes,string) returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/governance/GovernorAlpha.sol", "line_nos_end": [197], "line_nos_start": [154] }]
                      }
                  },
                  {
                      "initialize(address,address,address,uint256,uint256,uint256) returns()": {
                          "description_details": { "function_name": "initialize(address,address,address,uint256,uint256,uint256) returns()" },
                          "findings": [{ "file_path": "/contracts/governance/GovernorOHMegaDelegate.sol", "line_nos_end": [70], "line_nos_start": [53] }]
                      }
                  },
                  {
                      "getVotesFromPercentOfsOHMSupply(uint256) returns(uint256)": {
                          "description_details": { "function_name": "getVotesFromPercentOfsOHMSupply(uint256) returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/governance/GovernorAlpha.sol", "line_nos_end": [254], "line_nos_start": [252] }]
                      }
                  },
                  {
                      "state(uint256) returns(None)": {
                          "description_details": { "function_name": "state(uint256) returns(None)" },
                          "findings": [{ "file_path": "/contracts/governance/GovernorAlpha.sol", "line_nos_end": [281], "line_nos_start": [260] }]
                      }
                  },
                  {
                      "acceptAdmin() returns()": {
                          "description_details": { "function_name": "acceptAdmin() returns()" },
                          "findings": [{ "file_path": "/contracts/governance/Timelock.sol", "line_nos_end": [131], "line_nos_start": [125] }]
                      }
                  },
                  {
                      "executeTransaction(address,uint256,string,bytes,uint256) returns(bytes)": {
                          "description_details": { "function_name": "executeTransaction(address,uint256,string,bytes,uint256) returns(bytes)" },
                          "findings": [{ "file_path": "/contracts/governance/Timelock.sol", "line_nos_end": [206], "line_nos_start": [175] }]
                      }
                  },
                  {
                      "cancelTransaction(address,uint256,string,bytes,uint256) returns()": {
                          "description_details": { "function_name": "cancelTransaction(address,uint256,string,bytes,uint256) returns()" },
                          "findings": [{ "file_path": "/contracts/governance/Timelock.sol", "line_nos_end": [173], "line_nos_start": [160] }]
                      }
                  },
                  {
                      "setPendingAdmin(address) returns()": {
                          "description_details": { "function_name": "setPendingAdmin(address) returns()" },
                          "findings": [{ "file_path": "/contracts/governance/Timelock.sol", "line_nos_end": [138], "line_nos_start": [133] }]
                      }
                  },
                  {
                      "setDelay(uint256) returns()": {
                          "description_details": { "function_name": "setDelay(uint256) returns()" },
                          "findings": [{ "file_path": "/contracts/governance/Timelock.sol", "line_nos_end": [123], "line_nos_start": [116] }]
                      }
                  },
                  {
                      "queueTransaction(address,uint256,string,bytes,uint256) returns(bytes32)": {
                          "description_details": { "function_name": "queueTransaction(address,uint256,string,bytes,uint256) returns(bytes32)" },
                          "findings": [{ "file_path": "/contracts/governance/Timelock.sol", "line_nos_end": [158], "line_nos_start": [140] }]
                      }
                  },
                  {
                      "votingPeriod() returns(uint256)": {
                          "description_details": { "function_name": "votingPeriod() returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/governance/GovernorAlpha.sol", "line_nos_end": [23], "line_nos_start": [23] }]
                      }
                  },
                  {
                      "queue(uint256) returns()": {
                          "description_details": { "function_name": "queue(uint256) returns()" },
                          "findings": [{ "file_path": "/contracts/governance/GovernorAlpha.sol", "line_nos_end": [208], "line_nos_start": [199] }]
                      }
                  },
                  {
                      "castVoteBySig(uint256,bool,uint8,bytes32,bytes32) returns()": {
                          "description_details": { "function_name": "castVoteBySig(uint256,bool,uint8,bytes32,bytes32) returns()" },
                          "findings": [{ "file_path": "/contracts/governance/GovernorAlpha.sol", "line_nos_end": [294], "line_nos_start": [287] }]
                      }
                  },
                  {
                      "__abdicate() returns()": {
                          "description_details": { "function_name": "__abdicate() returns()" },
                          "findings": [{ "file_path": "/contracts/governance/GovernorAlpha.sol", "line_nos_end": [325], "line_nos_start": [322] }]
                      }
                  },
                  {
                      "quorumPercent() returns(uint256)": {
                          "description_details": { "function_name": "quorumPercent() returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/governance/GovernorAlpha.sol", "line_nos_end": [10], "line_nos_start": [10] }]
                      }
                  },
                  {
                      "getReceipt(uint256,address) returns(None)": {
                          "description_details": { "function_name": "getReceipt(uint256,address) returns(None)" },
                          "findings": [{ "file_path": "/contracts/governance/GovernorAlpha.sol", "line_nos_end": [258], "line_nos_start": [256] }]
                      }
                  },
                  {
                      "getActions(uint256) returns(address,uint256,string,bytes)": {
                          "description_details": { "function_name": "getActions(uint256) returns(address,uint256,string,bytes)" },
                          "findings": [{ "file_path": "/contracts/governance/GovernorAlpha.sol", "line_nos_end": [244], "line_nos_start": [241] }]
                      }
                  },
                  {
                      "cancel(uint256) returns()": {
                          "description_details": { "function_name": "cancel(uint256) returns()" },
                          "findings": [{ "file_path": "/contracts/governance/GovernorAlpha.sol", "line_nos_end": [239], "line_nos_start": [225] }]
                      }
                  },
                  {
                      "__acceptAdmin() returns()": {
                          "description_details": { "function_name": "__acceptAdmin() returns()" },
                          "findings": [{ "file_path": "/contracts/governance/GovernorAlpha.sol", "line_nos_end": [320], "line_nos_start": [317] }]
                      }
                  },
                  {
                      "votingDelay() returns(uint256)": {
                          "description_details": { "function_name": "votingDelay() returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/governance/GovernorAlpha.sol", "line_nos_end": [20], "line_nos_start": [20] }]
                      }
                  },
                  {
                      "__queueSetTimelockPendingAdmin(address,uint256) returns()": {
                          "description_details": { "function_name": "__queueSetTimelockPendingAdmin(address,uint256) returns()" },
                          "findings": [{ "file_path": "/contracts/governance/GovernorAlpha.sol", "line_nos_end": [330], "line_nos_start": [327] }]
                      }
                  },
                  {
                      "proposalMaxOperations() returns(uint256)": {
                          "description_details": { "function_name": "proposalMaxOperations() returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/governance/GovernorAlpha.sol", "line_nos_end": [17], "line_nos_start": [17] }]
                      }
                  },
                  {
                      "execute(uint256) returns()": {
                          "description_details": { "function_name": "execute(uint256) returns()" },
                          "findings": [{ "file_path": "/contracts/governance/GovernorAlpha.sol", "line_nos_end": [223], "line_nos_start": [215] }]
                      }
                  },
                  {
                      "proposalThresholdPercent() returns(uint256)": {
                          "description_details": { "function_name": "proposalThresholdPercent() returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/governance/GovernorAlpha.sol", "line_nos_end": [14], "line_nos_start": [14] }]
                      }
                  },
                  {
                      "castVote(uint256,bool) returns()": {
                          "description_details": { "function_name": "castVote(uint256,bool) returns()" },
                          "findings": [{ "file_path": "/contracts/governance/GovernorAlpha.sol", "line_nos_end": [285], "line_nos_start": [283] }]
                      }
                  },
                  {
                      "__executeSetTimelockPendingAdmin(address,uint256) returns()": {
                          "description_details": { "function_name": "__executeSetTimelockPendingAdmin(address,uint256) returns()" },
                          "findings": [{ "file_path": "/contracts/governance/GovernorAlpha.sol", "line_nos_end": [335], "line_nos_start": [332] }]
                      }
                  },
                  {
                      "redeemableBalance(address) returns(uint256)": {
                          "description_details": { "function_name": "redeemableBalance(address) returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/peripheral/YieldDirector.sol", "line_nos_end": [278], "line_nos_start": [275] }]
                      }
                  },
                  {
                      "permit(address,address,uint256,uint256,uint8,bytes32,bytes32) returns()": {
                          "description_details": { "function_name": "permit(address,address,uint256,uint256,uint8,bytes32,bytes32) returns()" },
                          "findings": [{ "file_path": "/contracts/types/ERC20Permit.sol", "line_nos_end": [58], "line_nos_start": [39] }]
                      }
                  },
                  {
                      "nonces(address) returns(uint256)": {
                          "description_details": { "function_name": "nonces(address) returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/types/ERC20Permit.sol", "line_nos_end": [65], "line_nos_start": [63] }]
                      }
                  },
                  {
                      "redeem(address,uint256,bool) returns(uint256)": {
                          "description_details": { "function_name": "redeem(address,uint256,bool) returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/types/NoteKeeper.sol", "line_nos_end": [113], "line_nos_start": [92] }]
                      }
                  },
                  {
                      "pendingFor(address,uint256) returns(uint256,bool)": {
                          "description_details": { "function_name": "pendingFor(address,uint256) returns(uint256,bool)" },
                          "findings": [{ "file_path": "/contracts/types/NoteKeeper.sol", "line_nos_end": [195], "line_nos_start": [190] }]
                      }
                  },
                  {
                      "indexesFor(address) returns(uint256)": {
                          "description_details": { "function_name": "indexesFor(address) returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/types/NoteKeeper.sol", "line_nos_end": [181], "line_nos_start": [162] }]
                      }
                  },
                  { "owner() returns(address)": { "description_details": { "function_name": "owner() returns(address)" }, "findings": [{ "file_path": "/contracts/types/Ownable.sol", "line_nos_end": [20], "line_nos_start": [18] }] } },
                  {
                      "renounceManagement() returns()": {
                          "description_details": { "function_name": "renounceManagement() returns()" },
                          "findings": [{ "file_path": "/contracts/types/Ownable.sol", "line_nos_end": [31], "line_nos_start": [27] }]
                      }
                  },
                  {
                      "pushManagement(address) returns()": {
                          "description_details": { "function_name": "pushManagement(address) returns()" },
                          "findings": [{ "file_path": "/contracts/types/Ownable.sol", "line_nos_end": [36], "line_nos_start": [33] }]
                      }
                  },
                  { "pullManagement() returns()": { "description_details": { "function_name": "pullManagement() returns()" }, "findings": [{ "file_path": "/contracts/types/Ownable.sol", "line_nos_end": [43], "line_nos_start": [38] }] } },
                  {
                      "renounceGovernor() returns()": {
                          "description_details": { "function_name": "renounceGovernor() returns()" },
                          "findings": [{ "file_path": "/contracts/types/Governable.sol", "line_nos_end": [33], "line_nos_start": [29] }]
                      }
                  },
                  {
                      "governor() returns(address)": {
                          "description_details": { "function_name": "governor() returns(address)" },
                          "findings": [{ "file_path": "/contracts/types/Governable.sol", "line_nos_end": [22], "line_nos_start": [20] }]
                      }
                  },
                  { "pullGovernor() returns()": { "description_details": { "function_name": "pullGovernor() returns()" }, "findings": [{ "file_path": "/contracts/types/Governable.sol", "line_nos_end": [45], "line_nos_start": [40] }] } },
                  {
                      "pushGovernor(address) returns()": {
                          "description_details": { "function_name": "pushGovernor(address) returns()" },
                          "findings": [{ "file_path": "/contracts/types/Governable.sol", "line_nos_end": [38], "line_nos_start": [35] }]
                      }
                  },
                  {
                      "pushGuardian(address) returns()": {
                          "description_details": { "function_name": "pushGuardian(address) returns()" },
                          "findings": [{ "file_path": "/contracts/types/Guardable.sol", "line_nos_end": [36], "line_nos_start": [33] }]
                      }
                  },
                  { "pullGuardian() returns()": { "description_details": { "function_name": "pullGuardian() returns()" }, "findings": [{ "file_path": "/contracts/types/Guardable.sol", "line_nos_end": [43], "line_nos_start": [38] }] } },
                  {
                      "guardian() returns(address)": {
                          "description_details": { "function_name": "guardian() returns(address)" },
                          "findings": [{ "file_path": "/contracts/types/Guardable.sol", "line_nos_end": [20], "line_nos_start": [18] }]
                      }
                  },
                  {
                      "renounceGuardian() returns()": {
                          "description_details": { "function_name": "renounceGuardian() returns()" },
                          "findings": [{ "file_path": "/contracts/types/Guardable.sol", "line_nos_end": [31], "line_nos_start": [27] }]
                      }
                  },
                  { "vault() returns(address)": { "description_details": { "function_name": "vault() returns(address)" }, "findings": [{ "file_path": "/contracts/types/VaultOwned.sol", "line_nos_end": [17], "line_nos_start": [15] }] } },
                  { "decimals() returns(uint8)": { "description_details": { "function_name": "decimals() returns(uint8)" }, "findings": [{ "file_path": "/contracts/mocks/MockSOHM.sol", "line_nos_end": [30], "line_nos_start": [28] }] } },
                  { "symbol() returns(string)": { "description_details": { "function_name": "symbol() returns(string)" }, "findings": [{ "file_path": "/contracts/OLD/OLDwsOHM.sol", "line_nos_end": [402], "line_nos_start": [400] }] } },
                  { "name() returns(string)": { "description_details": { "function_name": "name() returns(string)" }, "findings": [{ "file_path": "/contracts/OLD/OLDwsOHM.sol", "line_nos_end": [394], "line_nos_start": [392] }] } },
                  {
                      "totalSupply() returns(uint256)": {
                          "description_details": { "function_name": "totalSupply() returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/mocks/MockSOHM.sol", "line_nos_end": [85], "line_nos_start": [83] }]
                      }
                  },
                  {
                      "deposit(uint256,uint256,bool) returns()": {
                          "description_details": { "function_name": "deposit(uint256,uint256,bool) returns()" },
                          "findings": [{ "file_path": "/contracts/allocators/alchemixAllocator.sol", "line_nos_end": [122], "line_nos_start": [105] }]
                      }
                  },
                  {
                      "getRequestedWithdrawalInfo() returns(uint256,uint256)": {
                          "description_details": { "function_name": "getRequestedWithdrawalInfo() returns(uint256,uint256)" },
                          "findings": [{ "file_path": "/contracts/allocators/alchemixAllocator.sol", "line_nos_end": [196], "line_nos_start": [194] }]
                      }
                  },
                  {
                      "deposit(address,uint256,uint256,uint256) returns()": {
                          "description_details": { "function_name": "deposit(address,uint256,uint256,uint256) returns()" },
                          "findings": [{ "file_path": "/contracts/allocators/ConvexAllocator.sol", "line_nos_end": [156], "line_nos_start": [133] }]
                      }
                  },
                  {
                      "exceedsLimit(address,uint256) returns(bool)": {
                          "description_details": { "function_name": "exceedsLimit(address,uint256) returns(bool)" },
                          "findings": [{ "file_path": "/contracts/allocators/AaveAllocator.sol", "line_nos_end": [253], "line_nos_start": [250] }]
                      }
                  },
                  {
                      "withdraw(address,uint256,uint256,bool) returns()": {
                          "description_details": { "function_name": "withdraw(address,uint256,uint256,bool) returns()" },
                          "findings": [{ "file_path": "/contracts/allocators/ConvexAllocator.sol", "line_nos_end": [187], "line_nos_start": [161] }]
                      }
                  },
                  {
                      "deposit(uint256,uint256) returns()": {
                          "description_details": { "function_name": "deposit(uint256,uint256) returns()" },
                          "findings": [{ "file_path": "/contracts/allocators/GroAllocator.sol", "line_nos_end": [102], "line_nos_start": [90] }]
                      }
                  },
                  {
                      "exceedsLimit(uint256) returns(bool)": {
                          "description_details": { "function_name": "exceedsLimit(uint256) returns(bool)" },
                          "findings": [{ "file_path": "/contracts/allocators/GroAllocator.sol", "line_nos_end": [196], "line_nos_start": [192] }]
                      }
                  },
                  {
                      "withdraw(uint256) returns()": {
                          "description_details": { "function_name": "withdraw(uint256) returns()" },
                          "findings": [{ "file_path": "/contracts/allocators/GroAllocator.sol", "line_nos_end": [119], "line_nos_start": [108] }]
                      }
                  },
                  {
                      "getLQTYRewards() returns(uint256)": {
                          "description_details": { "function_name": "getLQTYRewards() returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/allocators/LUSDAllocator.sol", "line_nos_end": [311], "line_nos_start": [309] }]
                      }
                  },
                  {
                      "harvest(uint256) returns(bool)": {
                          "description_details": { "function_name": "harvest(uint256) returns(bool)" },
                          "findings": [{ "file_path": "/contracts/allocators/LUSDAllocator.sol", "line_nos_end": [205], "line_nos_start": [139] }]
                      }
                  },
                  {
                      "getETHRewards() returns(uint256)": {
                          "description_details": { "function_name": "getETHRewards() returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/allocators/LUSDAllocator.sol", "line_nos_end": [303], "line_nos_start": [301] }]
                      }
                  },
                  {
                      "updateTreasury() returns()": {
                          "description_details": { "function_name": "updateTreasury() returns()" },
                          "findings": [{ "file_path": "/contracts/allocators/LUSDAllocator.sol", "line_nos_end": [127], "line_nos_start": [123] }]
                      }
                  },
                  {
                      "deposit(address,uint256) returns()": {
                          "description_details": { "function_name": "deposit(address,uint256) returns()" },
                          "findings": [{ "file_path": "/contracts/allocators/AaveAllocator.sol", "line_nos_end": [126], "line_nos_start": [114] }]
                      }
                  },
                  { "harvest() returns()": { "description_details": { "function_name": "harvest() returns()" }, "findings": [{ "file_path": "/contracts/allocators/AaveAllocator.sol", "line_nos_end": [100], "line_nos_start": [98] }] } },
                  {
                      "rewardsPendingFor(address) returns(uint256)": {
                          "description_details": { "function_name": "rewardsPendingFor(address) returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/allocators/AaveAllocator.sol", "line_nos_end": [245], "line_nos_start": [243] }]
                      }
                  },
                  {
                      "rewardsPending() returns(uint256)": {
                          "description_details": { "function_name": "rewardsPending() returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/allocators/AaveAllocator.sol", "line_nos_end": [238], "line_nos_start": [236] }]
                      }
                  },
                  {
                      "withdraw(address,uint256) returns()": {
                          "description_details": { "function_name": "withdraw(address,uint256) returns()" },
                          "findings": [{ "file_path": "/contracts/allocators/AaveAllocator.sol", "line_nos_end": [145], "line_nos_start": [131] }]
                      }
                  },
                  {
                      "initialize(address,address,address,address) returns()": {
                          "description_details": { "function_name": "initialize(address,address,address,address) returns()" },
                          "findings": [{ "file_path": "/contracts/allocators/FraxSharesAllocator.sol", "line_nos_end": [118], "line_nos_start": [96] }]
                      }
                  },
                  {
                      "getPendingRewards() returns(uint256)": {
                          "description_details": { "function_name": "getPendingRewards() returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/allocators/FraxSharesAllocator.sol", "line_nos_end": [172], "line_nos_start": [170] }]
                      }
                  },
                  {
                      "wOHMTosOHM(uint256) returns(uint256)": {
                          "description_details": { "function_name": "wOHMTosOHM(uint256) returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/OLD/OLDwsOHM.sol", "line_nos_end": [802], "line_nos_start": [800] }]
                      }
                  },
                  {
                      "sOHMTowOHM(uint256) returns(uint256)": {
                          "description_details": { "function_name": "sOHMTowOHM(uint256) returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/OLD/OLDwsOHM.sol", "line_nos_end": [811], "line_nos_start": [809] }]
                      }
                  },
                  {
                      "mint(address,uint256) returns(uint256)": {
                          "description_details": { "function_name": "mint(address,uint256) returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/mocks/MockSOHM.sol", "line_nos_end": [44], "line_nos_start": [37] }]
                      }
                  },
                  {
                      "mint(address,uint256) returns()": {
                          "description_details": { "function_name": "mint(address,uint256) returns()" },
                          "findings": [{ "file_path": "/contracts/mocks/MockERC20.sol", "line_nos_end": [15], "line_nos_start": [13] }]
                      }
                  },
                  {
                      "burn(address,uint256) returns()": {
                          "description_details": { "function_name": "burn(address,uint256) returns()" },
                          "findings": [{ "file_path": "/contracts/mocks/MockERC20.sol", "line_nos_end": [19], "line_nos_start": [17] }]
                      }
                  },
                  {
                      "valueOfToken(address,uint256) returns(uint256)": {
                          "description_details": { "function_name": "valueOfToken(address,uint256) returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/custom/CustomTreasury.sol", "line_nos_end": [65], "line_nos_start": [62] }]
                      }
                  },
                  {
                      "percentVestedFor(address) returns(uint256)": {
                          "description_details": { "function_name": "percentVestedFor(address) returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/custom/CustomBond.sol", "line_nos_end": [400], "line_nos_start": [390] }]
                      }
                  },
                  {
                      "debtDecay() returns(uint256)": {
                          "description_details": { "function_name": "debtDecay() returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/custom/CustomBond.sol", "line_nos_end": [382], "line_nos_start": [376] }]
                      }
                  },
                  {
                      "maxPayout() returns(uint256)": {
                          "description_details": { "function_name": "maxPayout() returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/custom/CustomBond.sol", "line_nos_end": [331], "line_nos_start": [329] }]
                      }
                  },
                  {
                      "debtRatio() returns(uint256)": {
                          "description_details": { "function_name": "debtRatio() returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/custom/CustomBond.sol", "line_nos_end": [362], "line_nos_start": [357] }]
                      }
                  },
                  {
                      "bondPrice() returns(uint256)": {
                          "description_details": { "function_name": "bondPrice() returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/custom/CustomBond.sol", "line_nos_end": [315], "line_nos_start": [310] }]
                      }
                  },
                  {
                      "trueBondPrice() returns(uint256)": {
                          "description_details": { "function_name": "trueBondPrice() returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/custom/CustomBond.sol", "line_nos_end": [323], "line_nos_start": [321] }]
                      }
                  },
                  {
                      "currentDebt() returns(uint256)": {
                          "description_details": { "function_name": "currentDebt() returns(uint256)" },
                          "findings": [{ "file_path": "/contracts/custom/CustomBond.sol", "line_nos_end": [370], "line_nos_start": [368] }]
                      }
                  }
              ],
              "template_details": {
                  "additional_meta": {},
                  "aggregation_key": "function",
                  "description_keys": ["function_name"],
                  "issue_confidence": "2",
                  "issue_id": "SOLIDITY_EXTERNAL_FUNCTION",
                  "issue_name": "EXTERNAL_FUNCTION",
                  "issue_severity": "high",
                  "multi_file_supported": "true",
                  "type": "contracts",
                  "version": "1"
              }
          }
      ],
      "multi_file_scan_status": "scan_done",
      "multi_file_scan_summary": {
          "count_files_analyzed": 95,
          "issue_severity_distribution": { "critical": 0, "high": 144, "informational": 0, "low": 9, "medium": 0 },
          "issues_count": 0,
          "lines_analyzed_count": 12726,
          "scan_time_taken": 7,
          "scans_ran": ["static_template_based"],
          "score": "2.12"
      },
      "project_id": "71e110b85f03bafc470204d15d06c699",
      "project_name": "NAOS Test",
      "project_url": "https://github.com/NAOS-Finance/olympus-contracts",
      "reporting_status": "report_generated",
      "scan_id": "1233e22aaa1da591",
      "scan_init_time": "2022-04-07T14:41:26.660269",
      "scan_status": "scan_done",
      "scan_summary": {
          "count_files_analyzed": 95,
          "issue_severity_distribution": { "critical": 0, "high": 32, "informational": 296, "low": 226, "medium": 173 },
          "issues_count": 727,
          "lines_analyzed_count": 12726,
          "scan_time_taken": 82,
          "scans_ran": ["static_template_based"],
          "score": "4.08"
      },
      "scan_type": "project"
  }
}


export type ScanMeta = {
  scan_id: string;
  scan_time: string;
  scan_status: string;
  scan_message: string;
  reporting_status: string;
  project_id: string;
  scan_score: string;
  scan_name: string;
};

export type ScanSummary = {
  count_files_analyzed: number;
  issue_severity_distribution: IssueSeverityDistribution;
  score: string;
  issues_count: number;
  lines_analyzed_count: number;
  scan_time_taken: number;
  scans_ran: string[];
};

export type IssueSeverityDistribution = {
  critical: number;
  high: number;
  medium: number;
  low: number;
  informational: number;
};

export type ScanDetail = {
  issue_id: string;
  findings: Finding[];
  template_details: TemplateDetails;
};

export type Finding = {
  file_path: string;
  description: string;
  line_nos_start: number[];
  line_nos_end: number[];
};

export type TemplateDetails = {
  issue_id: string;
  issue_name: string;
  issue_severity: string;
  issue_confidence: string;
  type: string;
  version: string;
};

export type IssueDetails = {
  issue_details: {
    issue_description: string;
    issue_name: string;
    issue_remediation: string;
  };
};

export type Overview = {
  issue_count_critical: number;
  issue_count_high: number;
  issue_count_informational: number;
  issue_count_medium: number;
  issue_count_low: number;
  issue_count_total: number;
  total_issues_open: number;
  total_lines_scanner: number;
  total_projects_monitored: number;
  upcoming_scan: string;
};

export type IssueItem = {
  bug_id: string;
  file_path: string;
  issue_hash: string;
  issue_name: string;
  line_number_end: string;
  line_number_start: string;
  severity: string;
  status: string;
};

export type Report = {
  git_commit_hash: string;
  issues: {
    [key: string]: IssueItem[];
  };
  report_id: string;
  project_summary_report: {
    git_commit_hash?: string;
    project_id: string;
    project_name?: string;
    project_url?: string;
    last_project_report_update_time: string;
    last_scan_triggered_time: string;
    website?: string;
    publishers_name?: string;
    contract_address?: string;
    contract_chain?: string;
    contract_url?: string;
    contract_name?: string;
    contract_platform?: string;
  };
  scan_summary: ScanItem[];
};

export type ReportsListItem = {
  project_id: string;
  report_id: string;
  date_published: string;
  is_public: boolean;
  is_approved: boolean;
};

export type ScanItem = {
  count_files_analyzed: number;
  issue_severity_distribution: IssueSeverityDistribution;
  score: string;
  issues_count: number;
  lines_analyzed_count: number;
  scan_time_taken: number;
  scan_time: string;
  scans_ran: string[];
};

export type Plan = {
  name: string;
  description: string;
  discount: string | null;
  scan_count: number;
  amount: string;
  github: boolean;
  report: boolean;
  publishable_report: boolean;
};

export type Transaction = {
  date: string;
  package: string;
  currency: string;
  amount: string;
  order_id: string;
  payment_status: string;
  payment_platform: string;
  payment_type: string;
  invoice_url?: string;
};

export type TransactionList = {
  data: Transaction[];
};

export type InvoiceList = {
  data: Invoice[];
};

export type Invoice = {
  invoice_id: string;
  date: string;
  invoice_status: string;
  subscription: string;
};
