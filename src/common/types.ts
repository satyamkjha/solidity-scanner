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
  package_validity: number;
  _integrations: {
    github: IntegrationData;
    slack: IntegrationData;
    jira: IntegrationData;
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
  contract_address?: string;
  contract_platform?: string;
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
    git_commit_hash: string;
    project_id: string;
    project_name: string;
    project_url: string;
    last_project_report_update_time: string;
    last_scan_triggered_time: string;
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
