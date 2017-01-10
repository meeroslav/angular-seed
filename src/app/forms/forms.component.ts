import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {User, Colors, Movie, ISWPlanet} from './form.interface';
import {FormsService} from './forms.service';
import {ICountable} from '../table/table.service';
import {ITreeNode} from '../_common/custom-components/tree/tree-node.component';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'forms-page',  // <home></home>

  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./forms.component.scss'],
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

  private basicControlsForm: FormGroup;
  private advancedControlsForm: FormGroup;
  private page: number;

  /**
   * CTOR
   * @param formBuilder
   * @param service
   */
  constructor(private formBuilder: FormBuilder, private service: FormsService) {
    this.planets = [];

    this.user = {
      name: '',
      favoriteNumber: null,
      favoriteColor: '',
      observation: '',
      optin: false,
      newsLetter: 'No'
    };
    this.movie = {
      firstRate: 0,
      secondRate: 0,
      averageRating: 0
    };
    this.colors = [
      {id: 1, color: 'Red'},
      {id: 2, color: 'Blue'},
      {id: 3, color: 'Green'}
    ];
  }

  ngOnInit() {
    this.page = 1;
    this.getPlanets();
    this.buildBasicControlsForm();
    this.buildAdvancedControlsForm();
  }

  changeRate() {
    this.movie.averageRating = (this.movie.firstRate + this.movie.secondRate) / 2;
  }


  /**
   * Get the planets from the SW api
   */
  getPlanets() {
    this.service.getAllStarships(this.page).subscribe((response: ICountable<ISWPlanet>) => {
      this.planets = response.results;
    });
  }

  /**
   * Search method for the typeahed control
   * @param text$
   */
  search = (text$: Observable<string>) =>
      text$
          .debounceTime(200)
          .distinctUntilChanged()
          .map((term: any) => term.length < 2 ? []
              : this.planets.filter((p: any) => new RegExp(term, 'gi').test(p.name)).splice(0, 10));

  /**
   * Formatter for the typeahed control
   * Format the result to display.
   * @param result
   */
  formatter = (result: ISWPlanet) => result.name;

  /**
   * callback executed when a node
   * is selected on the tree
   * @param node: The node selected
   */
  nodeSelectCallback(node: any) {
    console.log(node);
  }

  /**
   * callback executed by the TreeComponent
   * Fetch the data and returns in the expected format
   * by the tree
   * @see {ITreeNode}
   */
  getTreeData() {
    return () => {
      return Observable.of(this.extendTree(this.planets));
    };
  }

  private buildBasicControlsForm() {
    this.basicControlsForm = this.formBuilder.group({
      name: [this.user.name, [Validators.required]],
      favoriteNumber: [this.user.favoriteNumber, [Validators.required]],
      favoriteColor: [this.user.favoriteColor, [Validators.required]],
      observation: [this.user.observation, [Validators.required]],
      optin: [this.user.optin, [Validators.required]],
      newsLetter: [this.user.newsLetter, [Validators.required]],
    });
  }

  private buildAdvancedControlsForm() {
    this.advancedControlsForm = this.formBuilder.group({
      firstRate: [this.movie.firstRate, Validators.required],
      secondRate: [this.movie.secondRate, Validators.required],
      planet: '',
      category: ''
    });
  }

  /**
   * Extend the planets array and returns
   * data in the expected format by the TreeComponent
   * @param planets
   * @returns {ITreeNode[]}
   */
  private extendTree(planets: any): ITreeNode[] {
    let tree: ITreeNode[] = [];
    planets.forEach((planet: ISWPlanet) => {

      let node: ITreeNode = {
        text: planet.name,
        children: []
      };

      for (let i = 0; i < planet.residents.length; i++) {
        node.children.push({
          id: i.toString(),
          text: planet.residents[i]
        });
      }
      tree.push(node);
    });
    return tree;
  }
}
