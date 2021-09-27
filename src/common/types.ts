export type Severity = "high" | "medium" | "low";

export type Profile = {
  name: string;
  email: string;
  contact_number: string;
  credits: number;
  company_name: string;
  current_package: string;
  projects_remaining: number;
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
  project_url: string;
  project_name: string;
  contract_address?: string;
  contract_platform?: string;
  scan_type: string;
  scan_id: number;
  scan_init_time: string;
  scan_status: string;
  scan_summary?: ScanSummary;
  scan_details?: ScanDetail[];
  _created: string;
  _updated: string;
};

export type ScanMeta = {
  scan_id: string;
  scan_time: string;
  project_id: string;
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
