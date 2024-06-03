import { Component, AfterContentInit, ContentChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-example',
    template: `
    <div #contentChild>
      محتوى المكون
    </div>
  `,
})
export class ExampleComponent implements AfterContentInit {
    @ContentChild('contentChild', { static: false }) contentChild: ElementRef;

    ngAfterContentInit() {
        console.log('تم إدخال المحتوى:', this.contentChild.nativeElement.textContent);
    }
}