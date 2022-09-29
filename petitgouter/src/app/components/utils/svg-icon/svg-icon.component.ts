import { Component, Input, OnInit } from '@angular/core';
import { SvgIcon } from 'src/app/model/utils/svg-icon.model';
import { SvgIconService } from 'src/app/services/utils/svg-icon.service';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss']
})
export class SvgIconComponent implements OnInit {
  
  @Input() icon!: SvgIcon;
  location: string;

  constructor(
    private svgLoader: SvgIconService
  ) { }

  ngOnInit(): void {
    this.location = this.svgLoader.getSvgFileFor(this.icon);
  }

}
