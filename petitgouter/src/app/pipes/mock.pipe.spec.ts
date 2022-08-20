import { Pipe, PipeTransform } from "@angular/core";
import { of } from "rxjs";

@Pipe({name: 'translate'})
export class MockTranslatePipe implements PipeTransform {
    transform(value: any): any {
        return of('MOCK_VALUE');
    }
}