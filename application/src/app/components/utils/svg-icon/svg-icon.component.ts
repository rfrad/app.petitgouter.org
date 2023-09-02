import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
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
  size: string;

  constructor(
    private svgLoader: SvgIconService,
    private host: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.location = this.svgLoader.getSvgFileFor(this.icon);
    const style: any = getComputedStyle(this.host.nativeElement);
    this.size = style['font-size'];
    this.renderer.setStyle(this.host.nativeElement, 'height', this.size); 
    this.renderer.setStyle(this.host.nativeElement, 'width', this.size); 
  }

}
