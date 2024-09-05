import { Component, ElementRef, ViewChild } from '@angular/core';
import { BrowserService } from '../../services/browser.service';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [MatIconModule, FormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {
  @ViewChild('search') searchElement: ElementRef = new ElementRef({});

  constructor(
    public browserService :BrowserService
  ) {

  }

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
  };

  goToPage(url: string) {
    this.browserService.goToPage(url);
  }
}
