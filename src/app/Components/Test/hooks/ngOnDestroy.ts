import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `
    <p>مكون قابل للتدمير</p>
  `,
})
export class ExampleComponent implements OnDestroy {
  ngOnDestroy() {
    console.log('تم تدمير المكون');
  }
}