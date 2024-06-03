import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-child',
    template: `
    <p>{{ inputData }}</p>
  `,
})
export class ChildComponent {
    @Input() inputData: string = "Amer";

    ngOnChanges(changes: SimpleChanges) {
        console.log('تغيير في الإدخال:', changes.inputData.currentValue);
    }
}