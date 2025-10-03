export interface ElectronAPI {
  toogleDevTool: () => void;
  goBack: () => void;
  goForward: () => void;
  refresh: () => void;
  goToPage: (url: string) => Promise<void>;
  currentUrl: () => Promise<string>;
  canGoBack: () => Promise<boolean>;
  canGoForward: () => Promise<boolean>;
  onUrlUpdate: (callback: (event: any, url: string) => void) => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

export {};