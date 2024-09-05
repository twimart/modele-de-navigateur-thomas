import { Component } from '@angular/core';
import { BrowserService } from '../../services/browser.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-debug',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './debug.component.html',
  styleUrl: './debug.component.css'
})
export class DebugComponent {
  constructor(
    public browserService :BrowserService
  ) {

  }
}
