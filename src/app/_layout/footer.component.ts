import { Component } from '@angular/core';

@Component( {
  selector: 'footer',
  template: `
        Some info
  `,
  host: {
    'id': 'footer',
    'class': 'navbar navbar-fixed-bottom navbar-inverse'
  }
})
export class FooterComponent {
}
