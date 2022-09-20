import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'translate'})
export class MockTranslatePipe implements PipeTransform {
    transform(value: any): any {
        return 'MOCK_VALUE';
    }
}