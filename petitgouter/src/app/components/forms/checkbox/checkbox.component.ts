import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  selected: boolean

  constructor() { }

  ngOnInit(): void {
  }

  toggle(): void {
    this.selected = !this.selected;
  }
}
