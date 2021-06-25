export type Severity = "high" | "medium" | "low";

export type Profile = {
  name: string;
  email: string;
  contact_number: string;
  credits: number;
  company_name: string;
};
export type ProjectSummary = {
  project_name: string;
  task_status: string;
  task_id: string;
  last_updated: number;
  task_added: number;
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
  scan_id: number;
  scan_init_time: string;
  scan_status: string;
  scan_summary?: ScanSummary;
  scan_details?: ScanDetail[];
  _created: string;
  _updated: string;
};

export type ScanSummary = {
  count_files_analyzed: number;
  issue_severity_distribution: IssueSeverityDistribution;
  issues_count: number;
  lines_analyzed_count: number;
  scan_time_taken: number;
  scans_ran: string[];
};

export type IssueSeverityDistribution = {
  high: number;
  medium: number;
  low: number;
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
