import { Injectable, TemplateRef } from '@angular/core';

export type OverLayer = {
  template: TemplateRef<any>;
  context: any;
}
@Injectable({
  providedIn: 'root'
})
export class OverLayerService {

  overLayers: OverLayer[] =  [];

  constructor() {}

  public add(template: TemplateRef<any>, context: any): void {
    this.overLayers.push({
      template: template,
      context: context
    });
  }

  public remove(template: TemplateRef<any>): void {
    this.overLayers = this.overLayers.filter(layer => layer.template !== template);
  }
}
