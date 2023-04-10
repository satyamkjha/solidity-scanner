

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export default class ReCaptcha {
  siteKey: string;
  action: string;

  constructor(siteKey: string, action: string) {
    this.siteKey = siteKey;
    this.action = action;
  }

  async loadScript(): Promise<void> {
    if (!window.grecaptcha) {
      const script = document.createElement("script");
      script.src = `https://www.recaptcha.net/recaptcha/api.js?render=${this.siteKey}`;
      document.body.appendChild(script);
      return new Promise((resolve) => {
        script.onload = () => resolve();
      });
    }
  }

  async getToken(): Promise<string> {
    // Load the reCAPTCHA script if it hasn't been loaded yet
    await this.loadScript();

    // Execute the reCAPTCHA and return the token
    const token = await new Promise<string>((resolve, reject) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(this.siteKey, { action: this.action })
          .then((token: string) => {
            resolve(token);
          })
          .catch((error: any) => {
            reject(error);
          });
      });
    });

    return token;
  }
}

