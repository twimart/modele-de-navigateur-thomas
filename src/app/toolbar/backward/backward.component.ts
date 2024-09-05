import { Component } from '@angular/core';
import { BrowserService } from '../../services/browser.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-backward',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './backward.component.html',
  styleUrl: './backward.component.css'
})
export class BackwardComponent {
  constructor(
    public browserService :BrowserService
  ) {

  }
}
