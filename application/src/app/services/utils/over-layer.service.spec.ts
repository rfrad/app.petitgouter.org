import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverLayerService } from './over-layer.service';

describe('OverLayerService', () => {
  @Component({
    selector: 'overLayer-tester',
    template: `
      <ng-template #tp1>TP1</ng-template>
      <ng-template #tp2>TP2</ng-template>
      <ng-template #tp3>TP3</ng-template>
    `
  })
  class OverLayerTester {
    @ViewChild('tp1', { static: true })
    tp1: TemplateRef<any>;
    @ViewChild('tp2', { static: true })
    tp2: TemplateRef<any>;
    @ViewChild('tp3', { static: true })
    tp3: TemplateRef<any>;  
  }
  
  let service: OverLayerService;
  let fixture: ComponentFixture<OverLayerTester>;
  let templates: OverLayerTester;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverLayerTester ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverLayerTester);
    templates = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.inject(OverLayerService);   
  });

  it('should have no layers by default', () => {
    expect(service.overLayers).toEqual([]);
  });

  describe('add()', () => {
    it('should store layers', () => {
      // Given layers are added
      service.add(templates.tp1, { context: 1 });
      service.add(templates.tp2, { context: 2 });
      service.add(templates.tp3, { context: 3 });

      // Then they should all be there
      expect(service.overLayers).toEqual([
        { template: templates.tp1, context: { context: 1 }},
        { template: templates.tp2, context: { context: 2 }},
        { template: templates.tp3, context: { context: 3 }},
      ]);
    });

    it('should store layers multiple times', () => {
      // Given layers are added multiple times
      service.add(templates.tp1, { context: 1.1 });
      service.add(templates.tp2, { context: 2 });
      service.add(templates.tp1, { context: 1.2 });

      // Then they should all be added
      expect(service.overLayers).toEqual([
        { template: templates.tp1, context: { context: 1.1 }},
        { template: templates.tp2, context: { context: 2 }},
        { template: templates.tp1, context: { context: 1.2 }},
      ]);
    });
  });

  describe('remove()', () => {
    it('should remove a layer', () => {
      // Given layers are added
      service.add(templates.tp1, { context: 1 });
      service.add(templates.tp2, { context: 2 });
      service.add(templates.tp3, { context: 3 });

      // When removing a layer
      service.remove(templates.tp2);

      // Then it should be removed
      expect(service.overLayers).toEqual([
        { template: templates.tp1, context: { context: 1 }},
        { template: templates.tp3, context: { context: 3 }},
      ]);
    });

    it('should remove layers added multiple times', () => {
      // Given layers are added
      service.add(templates.tp1, { context: 1.1 });
      service.add(templates.tp2, { context: 2 });
      service.add(templates.tp1, { context: 1.2 });

      // When removing a layer added multiple times
      service.remove(templates.tp1);

      // Then all occurences should be removed
      expect(service.overLayers).toEqual([
        { template: templates.tp2, context: { context: 2 }},
      ]);
    });

    it('should ignore when removing a layer not added', () => {
      // Given layers are added
      service.add(templates.tp1, { context: 1.1 });
      service.add(templates.tp2, { context: 2 });
      service.add(templates.tp1, { context: 1.2 });

      // When removing a layer that is not there
      service.remove(templates.tp3);

      // Then no layer should be removed
      expect(service.overLayers).toEqual([
        { template: templates.tp1, context: { context: 1.1 }},
        { template: templates.tp2, context: { context: 2 }},
        { template: templates.tp1, context: { context: 1.2 }},
      ]);
    });
  });
});
