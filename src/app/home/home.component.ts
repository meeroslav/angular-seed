import { Component, OnInit, ElementRef } from '@angular/core';
import { IMapChange, ICoordinate, WorldMapComponent } from '../_common/custom-components/world-map/world-map.component';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>

  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./home.component.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html',
  host: {
    'class': 'page'
  }
})
export class HomeComponent implements OnInit {

  constructor(private element: ElementRef) {
    /** */
  }

  ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  repositionTheDot(data: IMapChange) {
    let dot = this.element.nativeElement.querySelector('#dot');
    // position of Vienna
    let cords: ICoordinate = WorldMapComponent.GetPercentagePosition(data, 16.363553, 48.186928);

    dot.style.left = `${cords.x}%`;
    dot.style.top = `${cords.y}%`;
  }
}
