import { Component, OnInit, ViewChild } from '@angular/core';
import { PopupComponent } from '../../utils/popup/popup.component';

@Component({
  selector: 'app-privacy-policy-popup',
  templateUrl: './privacy-policy-popup.component.html',
  styleUrls: ['./privacy-policy-popup.component.scss']
})
export class PrivacyPolicyPopupComponent implements OnInit {

  @ViewChild(PopupComponent)
  popup: PopupComponent;

  constructor() { }

  ngOnInit(): void {
  }

  open(): void {
    this.popup.open();
  }

  close(): void {
    this.popup.close();
  }

}
