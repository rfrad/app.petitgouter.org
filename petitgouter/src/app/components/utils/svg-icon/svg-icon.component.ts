import { Component, Input, OnInit } from '@angular/core';

export enum IconClass {
  primary = 'primary',
  secondary = 'secondary'
}

// This component has been inspired by a stackoverflow post:
// https://stackoverflow.com/questions/53066823/how-do-i-import-svg-from-file-to-a-component-in-angular-5#answer-71229423

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss']
})
export class SvgIconComponent implements OnInit {
  
  @Input() icon!: string;
  @Input() importance?: IconClass = IconClass.primary;

  constructor() { }

  ngOnInit(): void {
  }

}
