import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {

  url = 'https://amiens.unilasalle.fr';
  canGoBack = false;
  canGoForward = false;

// @ts-ignore
  electronAPI = window.electronAPI;

  constructor() {
  }

  toogleDevTool() {
    this.electronAPI.send('toogle-dev-tool');
  }

  goBack() {
    this.electronAPI.send('go-back');
    this.updateHistory();
  }

  goForward() {
    this.electronAPI.send('go-forward');
    this.updateHistory();
  }

  refresh() {
    this.electronAPI.send('refresh');
  }

  goToPage(url: string) {
    this.electronAPI.invoke('go-to-page', url)
      .then(() => this.updateHistory());
  }

  setToCurrentUrl() {
    this.electronAPI.invoke('current-url')
      .then((url :string) => {
        this.url = url;
      });
  }

  updateHistory() {
    this.setToCurrentUrl();

    this.electronAPI.invoke('can-go-back')
      .then((canGoBack : boolean) => this.canGoBack = canGoBack);

    this.electronAPI.invoke('can-go-forward')
      .then((canGoForward : boolean) => this.canGoForward = canGoForward);
  }
}
