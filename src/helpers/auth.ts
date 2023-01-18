import Cookies from 'js-cookie'
class Auth {
  /**
   * Authenticate a user. Save sessionId string in Local Storage
   *
   * @param {string} sessionId
   */
  /* eslint-disable no-undef */
  static authenticateUser(): void {
    localStorage.setItem("authenticated", "true");
  }

  /**
   * Check if a user is authenticated - check if sessionId is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated(): boolean {
    return localStorage.getItem("authenticated") !== null;
  }

  /**
   * Deauthenticate a user. Remove sessionId from Local Storage.
   *
   */
  static deauthenticateUser(): void {
    localStorage.removeItem("authenticated");
    // this.removeCookies();
  }

  static removeCookies(): void {
    const cookies = Cookies.get();
    //iterate over the cookies object and remove each cookie
    Object.keys(cookies).forEach(key => {
      Cookies.remove(key);
    });
  }

  /**
   * Get sessionId value.
   *
   * @returns {string}
   */

  // static getSessionId(): string | null {
  //   return localStorage.getItem('sessionId');
  // }
}

export default Auth;
