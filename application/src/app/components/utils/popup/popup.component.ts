import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { OverLayerService } from 'src/app/services/utils/over-layer.service';

@Component({
  selector: 'pg-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {

  @ViewChild('popup', { static: true })
  popup: TemplateRef<any>;

  @Input('title')
  title: TemplateRef<any>
  
  @Input('primaryButton')
  primaryButton: string = 'VALIDACIÓN';

  @Output('primaryAction')
  primaryAction: EventEmitter<any> = new EventEmitter();
  
  @Input('secondaryButton')
  secondaryButton: string;

  @Output('secondaryAction')
  secondaryAction: EventEmitter<any> = new EventEmitter();

  constructor(
    private overLayer: OverLayerService
  ) {}

  primaryCall(): void {
    this.primaryAction.emit();
    this.close();
  }

  secondaryCall(): void {
    this.secondaryAction.emit();
    this.close();
  }

  open(): void {
    this.overLayer.add(this.popup, {});
  }

  close(): void {
    this.overLayer.remove(this.popup);
  }
}
