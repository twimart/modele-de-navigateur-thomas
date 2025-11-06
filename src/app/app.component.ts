import { Component } from '@angular/core';
import { AddressComponent } from './address/address.component';
import { BackwardComponent } from './backward/backward.component';
import { DebugComponent } from './debug/debug.component';
import { ForwardComponent } from './forward/forward.component';
import { RefreshComponent } from './refresh/refresh.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeButtonComponent } from "./home-button/home-button.component";
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
      MatToolbarModule, 
      RouterModule,
      AddressComponent, 
      BackwardComponent, 
      DebugComponent, 
      ForwardComponent, 
      RefreshComponent, 
      HomeButtonComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'browser-template';

  constructor(private router: Router) {}
  
  openWallet() {
    this.router.navigate(['/wallet']);
  }
}
