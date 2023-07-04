import { type } from "os";

export type Severity = "high" | "medium" | "low";

export type Profile = {
  name: string;
  email: string;
  promo_code?: string;
  contact_number: string;
  credits: number;
  public_address?: string;
  company_name: string;
  current_package: string;
  billing_cycle: string;
  email_verified: boolean;
  verification_email_sent: boolean;
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

  actions_supported?: {
    file_scan: boolean;
    view_report: boolean;
    github_public: boolean;
    github_private: boolean;
    generate_report: boolean;
    publishable_report: boolean;
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
    multi_file_scan_status: string;
    scan_message: string;
    multi_file_scan_summary: MultiFileScanSummary;
  };
};

export type ProjectList = {
  data: Project[];
  page: Page;
};

export type ScanList = {
  data: Scan[];
  page: Page;
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
  project_url?: string;
  project_branch?: string;
  project_name?: string;
  project_id: string;
  file_url_list?: string[];
  webhooks_enabled?: boolean;
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
  report_regeneration_enabled: boolean;
  scan_type: string;
  scan_id: string;
  scan_init_time: string;
  scan_status: string;
  scan_message: string;
  beta_scan_status: string;
  scan_summary?: ScanSummary;
  scan_details?: ScanDetail[];
  reporting_status: string;
  details_enabled: boolean;
  _created: string;
  _updated: string;
  multi_file_scan_details: MultiFileScanDetail[];
  multi_file_scan_status: string;
  multi_file_scan_summary: MultiFileScanSummary;
  project_skip_files?: string[];
  skip_file_paths?: string[];
};

export type MultiFileScanDetail = {
  issue_id: string;
  template_details: MultiFileTemplateDetail;
  no_of_findings: number;
  metric_wise_aggregated_findings: MetricWiseAggregatedFinding[];
};

export type MultiFileTemplateDetail = {
  additional_meta: string;
  aggregation_key: string;
  description_keys: string[];
  issue_confidence: string;
  issue_id: string;
  issue_name: string;
  issue_severity: string;
  multi_file_supported: string;
  type: string;
  version: string;
};

export type MultiFileScanSummary = {
  count_files_analyzed: number;
  issue_severity_distribution: IssueSeverityDistribution;
  issues_count: number;
  lines_analyzed_count: number;
  scan_time_taken: number;
  scans_ran: string[];
  score: string;
  score_v2: string;
  threat_score: string;
};

export type MetricWiseAggregatedFinding = {
  description_details: any;
  bug_hash: string;
  bug_status: string;
  findings: Finding[];
  bug_id: string;
  comment?: string;
  scan_id: string;
  issue_description?: string;
  issue_remediation?: string;
};

export type PricingData = {
  pricing_data: {
    [key: string]: {
      [plan: string]: Plan;
    };
  };
  pricing_table_data: {
    title: string;
    data: {
      beginner: boolean | string | number;
      custom: boolean | string | number;
      intermediate: boolean | string | number;
      ondemand: boolean | string | number;
      pro: boolean | string | number;
      title: string;
      trial: boolean | string | number;
    }[];
  }[];
};

export type TreeItem = {
  name: string;
  path: string;
  tree: TreeItem[];
  blobs: string[];
};

export type TreeItemUP = {
  name: string;
  path: string;
  tree: TreeItemUP[];
  isChildCheck: boolean;
  checked: boolean;
  blobs: {
    path: string;
    checked: boolean;
    name: string;
  }[];
};

export type ScanMeta = {
  scan_id: string;
  scan_time: string;
  scan_status: string;
  scan_message: string;
  reporting_status: string;
  project_id: string;
  scan_score: string;
  scan_score_v2: string;
  scan_name: string;
  latest_report_id: string;
  skip_file_paths?: string[];
};

export type ScanSummary = {
  bug_id_hash_vs_bug_id: {
    [key: string]: string[];
  };
  count_files_analyzed: number;
  issue_severity_distribution: IssueSeverityDistribution;
  score: string;
  score_v2: string;
  issues_count: number;
  lines_analyzed_count: number;
  latest_bug_count: number;
  scan_time_taken: number;
  false_positive: [];
  fixed: [];
  wont_fix: [];
  scans_ran: string[];
};

export type ScanSummaryItem = {
  count_files_analyzed: number;
  issue_severity_distribution: IssueSeverityDistribution;
  score: string;
  score_v2: string;
  issues_count: number;
  lines_analyzed_count: number;
  scan_time_taken: number;
  false_positive_count: number;
  fixed_count: number;
  wont_fix_count: number;
  scans_ran: string[];
  scan_time: string;
  pending_fix_count: number;
};

export type IssueSeverityDistribution = {
  critical: number;
  high: number;
  medium: number;
  low: number;
  informational: number;
  gas: number;
};

export type ScanDetail = {
  issue_id: string;
  findings: Finding[];
  template_details: TemplateDetails;
};

export type Finding = {
  file_path: string;
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
  issue_count_gas: number;
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

export type IssueDetailObject = {
  issue_details: IssueItem[];
  common_comments_map: {
    [key: string]: string[];
  };
  is_issue_description_dynamic?: boolean;
  issue_id: string;
  issue_name: string;
};

export interface Report {
  issues: {
    [key: string]: IssueDetailObject;
  };
  git_commit_hash: string;
  project_summary_report: {
    git_commit_hash?: string;
    project_id: string;
    project_name?: string;
    project_url?: string;
    last_project_report_update_time: string;
    last_scan_triggered_time: string;
    website?: string;
    report_owner?: string;
    contract_address?: string;
    contract_chain?: string;
    contract_url?: string;
    contract_name?: string;
    contract_platform?: string;
    organization: string;
    date_published: string;
    email: string;
  };
  scan_summary: ScanSummaryItem[];
}

export type IssueItem = {
  bug_hash: string;
  bug_id: string;
  bug_status: string;
  findings: Finding[];
  issue_confidence: string;
  issue_description: string;
  issue_name: string;
  issue_remediation: string;
  severity: string;
  comment?: string;
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

export type Page = {
  count: number;
  per_page: number;
  total_pages: number;
};

export type Pagination = {
  pageNo: number;
  perPageCount: number;
  totalPages?: number;
};

export type Transaction = {
  date: string;
  package: string;
  billing_cycle: string;
  currency: string;
  amount: string;
  order_id: string;
  payment_status: string;
  payment_platform: string;
  payment_type: string;
  invoice_url?: string;
  download_invoice_status?: string;
};

export type TransactionList = {
  data: Transaction[];
  page: Page;
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

export type QuickScanResult = {
  contract_address?: string;
  contract_platform?: string;
  compilerversion?: string;
  contract_url?: string;
  contractname?: string;
  evmversion?: string;
  licensetype?: string;
  contract_chain?: string;
  currency?: string;
  is_approved: boolean;
  latest_report_id: string;
  published_date: string;
  quick_file_scan_details: QuickFileScanDetail[];
  multi_file_scan_status: string;
  multi_file_scan_summary: MultiFileScanSummary;
};

export type QuickFileScanDetail = {
  issue_id: string;
  issue_name: string;
  issue_description: string;
  issue_inference: string;
  issue_status: string;
};

export type FilesState = {
  description_details: any;
  findings: Finding[];
  bug_id: string;
  bug_hash: string;
  bug_status: string;
  issue_id: string;
  comment?: string;
  template_details: MultiFileTemplateDetail;
  issue_description: string | undefined;
  issue_remediation: string | undefined;
};

export type RecentQSItem = {
  contract_address: string;
  contract_platform: string;
  contract_url: string;
  is_report_approved: boolean;
  scanner_reference_url: string;
  score: string;
  threat_score: string;
};

export type DetectorItemProp = {
  attackCategory: string;
  swc: string[];
  nod: number;
  description: string;
};

export type FileState = {
  file_path: string;
  line_nos_start: number[];
  line_nos_end: number[];
};
