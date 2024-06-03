import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `
    <p>{{ data }}</p>
  `,
})
export class ExampleComponent implements OnInit {
  data!: string;

  ngOnInit() {
    this.data = 'تم تهيئة المكون';
  }
}