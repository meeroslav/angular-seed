import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { User, Colors, Movie, ISWPlanet } from './form.interface';
import { FormsService } from './forms.service';
import { ICountable } from '../table/table.service';
import { ITreeNode } from '../_common/custom-components/tree/tree-node.component';
import { IHighlightMarker } from '../_common/custom-components/highlight-area/highlight-area.interface';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'forms-page',  // <home></home>
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './forms.component.html',
  host: {
    'class': 'page'
  }
})
export class FormsComponent implements OnInit {
  user: User;
  movie: Movie;
  colors: Array<Colors>;
  planets: ISWPlanet[];
  planetNames: string[] = [];
  search: Observable<string>;
  treeData: ITreeNode[];

  private basicControlsForm: FormGroup;
  private advancedControlsForm: FormGroup;
  private page: number;

  /**
   * CTOR
   * @param formBuilder
   * @param service
   */
  constructor(private formBuilder: FormBuilder, private service: FormsService) {
    this.user = {
      name: '',
      favoriteNumber: null,
      favoriteColor: '',
      observation: '',
      optin: null,
      newsLetter: null
    };
    this.movie = {
      firstRate: null,
      secondRate: 2,
      averageRating: 3
    };
    this.colors = [
      { id: 1, color: 'Red' },
      { id: 2, color: 'Blue' },
      { id: 3, color: 'Green' }
    ];

    this.search = Observable.create((observer: any) => {
      observer.next(this.advancedControlsForm.controls['planet'].value);
    }).mergeMap((token: Observable<string>) => this.getPlanetsAsObservable(token));
  }

  ngOnInit() {
    this.page = 1;
    this.getPlanets();
    this.buildBasicControlsForm();
    this.buildAdvancedControlsForm();
  }

  /**
   * Get the planets from the SW api
   */
  getPlanets() {
    this.service.getAllStarships(this.page).subscribe((response: ICountable<ISWPlanet>) => {
      this.planets = response.results;
      this.planetNames = this.planets.map((planet: ISWPlanet) => planet.name);
      this.treeData = this.extendTree(this.planets);
    });
  }

  getFilteredPlanets(event: any) {
    function filterItem(item: string) {
      let itemUsed = event.existing.indexOf(item) !== -1;
      if (itemUsed) {
        return false;
      }
      return item.toLowerCase().indexOf(event.value.toLowerCase()) !== -1;
    }

    this.planetNames = this.planets.map((planet: ISWPlanet) => planet.name).filter(filterItem);
  }

  /**
   * Search method for the typeahed control
   * @param text$
   */

  getPlanetsAsObservable(text$: Observable<string>) {
    return text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map((term: any) => term.length < 2 ? []
        : this.planets.filter((p: any) => new RegExp(term, 'gi').test(p.name)).splice(0, 10));
  }

  /**
   * callback executed when a node
   * is selected on the tree
   * @param node: The node selected
   */
  nodeSelectCallback(node: any) {
    console.debug(node);
  }

  private buildBasicControlsForm() {
    this.basicControlsForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      favoriteNumber: [this.user.favoriteNumber],
      disabledNumber: [{ value: 3, disabled: true }],
      favoriteColor: [this.user.favoriteColor, Validators.required],
      observation: [this.user.observation, Validators.required],
      optin: [this.user.optin, Validators.required],
      newsLetter: [{ value: this.user.newsLetter }]
    });
  }

  private buildAdvancedControlsForm() {
    this.advancedControlsForm = this.formBuilder.group({
      firstRate: [this.movie.firstRate, Validators.required],
      secondRate: [this.movie.secondRate, Validators.required],
      averageRating: [{ value: this.movie.averageRating, disabled: true }],
      planet: [null, Validators.required],
      planet2: [{ value: ['Orange', 'Apple', 'Kiwi'], disabled: true }],
      category: [null, Validators.required],
      randomText: ['', Validators.required]
    });
  }

  private markerCallback(): (value: string) => IHighlightMarker[] {
    return (value: string) => {
      // extract all that match regex
      let regex = new RegExp('angular-\\w*', 'g');
      let found = regex.exec(value);
      let results = [];
      while (found) {
        let result = {
          value: found[0],
          index: found.index,
          duplicate: results.some((r: any) => r.value === found[0])
        };
        results.push(result);
        // get next IP
        found = regex.exec(value);
      }

      return results.map((res: any) => {
        return { start: res.index, end: res.index + res.value.length, special: res.duplicate };
      });
    };
  }

  /**
   * Extend the planets array and returns
   * data in the expected format by the TreeInputComponent
   * @param planets
   * @returns {ITreeNode[]}
   */
  private extendTree(planets: any): ITreeNode[] {
    return planets.map((planet: ISWPlanet) => {
      return {
        text: planet.name,
        children: planet.residents.map((resident: string) => {
          return {
            text: resident,
            id: resident
          };
        })
      };
    });
  }
}
