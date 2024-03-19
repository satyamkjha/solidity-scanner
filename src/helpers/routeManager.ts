export const API_PATH = {
  //CONFIGS
  API_GET_CONFIGS: "/api-client-configs/",

  //AUTH
  API_LOGOUT: "/api-logout/",
  API_LOGIN: "/api-login/",
  API_METAMASK_LOGIN: "/api-metamask-login/",
  API_REGISTER: "/api-register/",
  API_FORGOT_PASSWORD: "/api-forgot-password/",
  API_VERIFY_EMAIL: "/api-verify-email/",
  API_CHANGE_PASSWORD: "/api-change-password/",
  API_SEND_EMAIL: "/api-send-email/",
  API_ORG_LOGIN: "/organization/api-login/",

  //2FA
  API_2FA_SETUP: "/api-2fa-setup/",
  API_2FA_VERIFY: "/api-2fa-verify/",
  API_2FA_DISABLE: "/api-2fa-disable/",

  //PROFILE
  API_PROFILE: "/api-profile/",
  API_UPDATE_PROFILE: "/api-update-profile/",
  API_UPDATE_EMAIL: "/api-update-email/",
  API_GET_USER_OVERVIEW: "/api-get-user-overview/",
  API_DELETE_ACCOUNT: "/api-delete-account/",

  //START_SCAN
  API_GET_PROJECTS_BETA: "/api-get-projects-beta/",
  API_GET_TASK_STATUS: "/api-get-task-status/",
  API_START_SCAN_BLOCK: "/api-start-scan-block/",
  API_PROJECT_SCAN: "/api-project-scan/",
  API_GET_CONTRACT_STATUS: "/api-get-contract-status/",
  API_GET_PREASSIGNED_URL: "/api-get-presigned-url/",
  API_GET_SUPPORTED_CHAINS: "/api-get-supported-chains/",
  API_GET_BRANCHES: "/api-get-branches/",
  API_GET_REPO_PERMISSIONS: "api-get-repo-permissions/",
  API_GET_PLATFORM_CHAINS_STATUS: "/api-get-platform-chain-status/",

  //SCAN
  API_GET_ALL_SCANS: "/api-get-all-scans/",
  API_GET_SCANS: "/api-get-scans/",
  API_GET_SCAN_DETAILS: "/api-get-scan-details/",
  API_GET_FILE_CONTENT: "/api-get-file-content/",
  API_GET_FILE_CONTENT_BLOCK: "/api-get-file-content-block/",
  API_GET_ISSUE_DETAILS: "/api-get-issue-details/",
  API_UPDATE_BUG_STATUS: "/api-update-bug-status/",
  API_TOGGLE_PROJECT_SYNCHRONIZATION: "/api-toggle-project-synchronization/",
  API_REPO_TREE: "/api-repo-tree/",
  API_UPDATE_SKIP_FILE_PATHS: "/api-update-skip-file-paths/",
  API_DELETE_PROJECT: "/api-delete-project/",
  API_DELETE_BLOCK: "/api-delete-block/",
  API_CREATE_BUGS_ISSUE: "/api-create-oauth-bugs-issue/",

  //QUICKSCAN
  API_GET_LATEST_QS: "/api-latest-qs/",
  API_QUICK_SCAN_SSE: "/api-quick-scan-sse/",

  //REPORT
  API_GENERATE_REPORT: "/api-generate-report/",
  API_GET_REPORTS: "/api-get-reports/",
  API_GET_REPORT: "/api-get-report/",
  API_GET_PUBLISHED_REPORT: "/api-get-published-report/",
  API_GET_QS_REPORT: "/api-get-qs-report/",
  API_GET_REPORT_VIA_TOKEN: "/api-get-report-via-token/",
  API_PUBLISH_REPORT: "/api-publish-report/",
  API_GET_PUBLIC_FILE_CONTENT: "/api-get-public-file-content/",
  API_GET_PUBLIC_FILE_CONTENT_BLOCK: "/api-get-public-file-content-block/",
  API_GET_CHECKOUT_PUBLIC_FILE_CONTENT:
    "/api-get-checkout-public-file-content/",
  API_GET_REPORT_PDF: "/api-get-report-pdf/",
  API_GET_QUICK_SCAN_REPORT_PDF: "/api-get-quick-scan-report-pdf/",

  //INTEGRATIONS
  API_AUTHENTICATE_INTEGRATIONS: "/api-authenticate-oauth-provider/",
  API_DELETE_INTEGRATIONS: "/api-delete-oauth-provider/",

  //PRIVATE API
  API_GET_ACCESS_KEY: "/private/api-get-access-key/",
  API_CREATE_ACCESS_KEY: "/private/api-create-access-key/",
  API_REGENERATE_ACCESS_KEY: "/private/api-regenerate-access-key/",
  API_REVOKE_ACCESS_KEY: "/private/api-revoke-access-key/",

  //BILLING
  API_GET_PRICING: "/api-get-prices/",
  API_GET_DETECTORS_DATA: "/api-get-detectors-data/",
  API_GET_ACCEPTED_COINS: "/api-get-accepted-coins/",
  API_CREATE_STRIPE_SUBSCRIPTION_BETA: "/api-create-stripe-subscription-beta/",
  API_CANCEL_STRIPE_SUBSCRIPTION_BETA: "/api-cancel-stripe-subscription-beta/",
  API_CREATE_QUICK_SCAN_CHECKOUT: "/api-create-quick-scan-checkout/",
  API_GET_CHECKOUT_TRANSACTION_STATUS: "/api-get-checkout-transaction-status/",
  API_INVALIDATE_ORDER_BETA: "/api-invalidate-order-beta/",
  API_CREATE_ORDER_CP: "api-create-order-cp/",
  API_GET_TRANSACTION: "/api-get-transactions-beta/",
  API_GET_INVOICES: "/api-get-invoices-beta/",
  API_GET_DOWNLOAD_INVOICE_URL: "/api-get-download-invoice-url/",

  //ORGANISATION
  API_CREATE_ORGANISATION: "/api-create-organization/",
  API_ADD_ORGANISATION_USERS: "/api-add-organization-users/",
  API_REMOVE_ORGANISATION_USERS: "/api-remove-organization-users/",
  API_LIST_ORGANISATION_USERS: "/api-list-organization-users/",
  API_UPDATE_ORGANISATION_USERS_ROLE: "/api-update-organization-user-roles/",
  API_RESEND_ORGANISATION_USERS_INVITE:
    "/api-resend-organization-users-invite/",
  API_CHECK_ORGANISATION_NAME_AVAILABILITY:
    "/api-check-organization-name-availability/",
  API_ACCEPT_ORGANISATION_REQUEST: "/api-accept-organization-request/",
  API_REJECT_ORGANISATION_REQUEST: "/api-reject-organization-request/",
  API_UPDATE_USER_ORGANISATION_PROFILE:
    "/organization/api-update-user-organization-profile/",
  API_GET_USER_ORGANISATIONS: "/organization/api-get-user-organizations/",
  API_GET_ORGANISATION_PROFILE: " /api-get-organization-profile/",
  API_GET_USER_ORGANISATION_PROFILE: "/api-get-user-organization-profile/",
  API_VALIDATE_INVITE_LINK: "/api-validate-invite-link/",

  //HACKERBOARD
  API_GET_ATTACKS_OVERVIEW: "/api-get-attacks-overview/",
  API_GET_ATTACKS_AGGREGATED: "/api-get-attacks-aggregated/",
  API_GET_ATTACKS: "/api-get-attacks/",
  API_DELETE_ORGANISATION: "/api-delete-organization/",
  API_LEAVE_ORGANISATION: "/organization/api-leave-organization/",

  //FIREBASE
  API_CREATE_FIREBASE_TOKEN: "/api-create-firebase-custom-token/",
};
