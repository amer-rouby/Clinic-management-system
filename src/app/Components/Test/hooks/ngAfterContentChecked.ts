import { Component, AfterContentChecked, ContentChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `
    <div #contentChild>
      محتوى المكون
    </div>
  `,
})
export class ExampleComponent implements AfterContentChecked {
  @ContentChild('contentChild', { static: false }) contentChild: ElementRef;

  ngAfterContentChecked() {
    console.log('تم فحص المحتوى:', this.contentChild.nativeElement.textContent);
  }
}