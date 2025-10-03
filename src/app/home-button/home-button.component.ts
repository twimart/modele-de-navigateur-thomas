import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserService } from '../browser.service';

@Component({
  selector: 'app-home-button',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './home-button.component.html',
  styleUrl: './home-button.component.css'
})
export class HomeButtonComponent {
  sayHello(){
    alert("coucou")
  }
  public browserService = inject(BrowserService);
}
