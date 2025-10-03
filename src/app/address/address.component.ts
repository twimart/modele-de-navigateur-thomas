import { Component, ElementRef, inject, ViewChild, OnInit, NgZone } from '@angular/core';
import { BrowserService } from '../browser.service';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-address',
    imports: [MatIconModule, FormsModule, MatInputModule, MatButtonModule],
    templateUrl: './address.component.html',
    styleUrl: './address.component.css'
})
export class AddressComponent implements OnInit {
  @ViewChild('search') searchElement: ElementRef = new ElementRef({});

  public browserService = inject(BrowserService);
  private ngZone = inject(NgZone);

  onKeyDownEvent(e: any) {
    if (e.key === 'Escape') {
      e.currentTarget.blur();
      this.browserService.setToCurrentUrl();
    } else if (e.key === 'Enter') {
      const value = e.currentTarget.value;
      e.currentTarget.blur();
      this.goToPage(value);
    }
  }

  onMouseDown(e: any) {
    this.searchElement.nativeElement.select();
  }

  goToPage(url: string) {
    this.browserService.goToPage(url);
  }

  ngOnInit() {
    window.electronAPI.onUrlUpdate((event, url) => {
      // Envelopper dans NgZone.run() pour déclencher la détection de changement
      this.ngZone.run(() => {
        this.browserService.url = url;
      });
    });
  }
}
