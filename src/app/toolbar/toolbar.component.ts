import { Component } from '@angular/core';
import { AddressComponent } from './address/address.component';
import { BackwardComponent } from './backward/backward.component';
import { DebugComponent } from './debug/debug.component';
import { ForwardComponent } from './forward/forward.component';
import { RefreshComponent } from './refresh/refresh.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [AddressComponent, BackwardComponent, DebugComponent, ForwardComponent, RefreshComponent],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {

}
