import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `
    <div #viewChild>
      عنصر عرض المكون
    </div>
  `,
})
export class ExampleComponent implements AfterViewInit {
  @ViewChild('viewChild', { static: false }) viewChild: ElementRef;

  ngAfterViewInit() {
    console.log('تم تهيئة عرض المكون:', this.viewChild.nativeElement.textContent);
  }
}