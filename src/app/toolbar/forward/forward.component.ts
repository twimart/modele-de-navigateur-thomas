import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BrowserService } from '../../services/browser.service';

@Component({
  selector: 'app-forward',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './forward.component.html',
  styleUrl: './forward.component.css'
})
export class ForwardComponent {
  constructor(
    public browserService :BrowserService
  ) {

  }
}
