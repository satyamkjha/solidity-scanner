class Auth {
  /**
   * Authenticate a user. Save sessionId string in Local Storage
   *
   * @param {string} sessionId
   */
  /* eslint-disable no-undef */
  static authenticateUser(sessionId: string): void {
    localStorage.setItem('sessionId', sessionId);
  }

  /**
   * Check if a user is authenticated - check if sessionId is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated(): boolean {
    return localStorage.getItem('sessionId') !== null;
  }

  /**
   * Deauthenticate a user. Remove sessionId from Local Storage.
   *
   */
  static deauthenticateUser(): void {
    localStorage.removeItem('sessionId');
  }

  /**
   * Get sessionId value.
   *
   * @returns {string}
   */

  static getSessionId(): string | null {
    return localStorage.getItem('sessionId');
  }
}

export default Auth;
