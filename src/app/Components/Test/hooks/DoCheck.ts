import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `
    <p>{{ data }}</p>
  `,
})
export class ExampleComponent implements DoCheck {
  data: string = 'غير محدد';

  ngDoCheck() {
    this.data = 'تم فحص التغييرات';
  }
}