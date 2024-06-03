import { Component, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `
    <div #viewChild>
      عنصر عرض المكون
    </div>
  `,
})
export class ExampleComponent implements AfterViewChecked {
  @ViewChild('viewChild', { static: false }) viewChild: ElementRef;

  ngAfterViewChecked() {
    console.log('تم فحص عرض المكون:', this.viewChild.nativeElement.textContent);
  }
}