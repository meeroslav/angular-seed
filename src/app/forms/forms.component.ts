import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {User, Colors} from './form.interface';

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
  colors: Array<Colors>;
  private basicControlsForm: FormGroup;

  /**
   * CTOR
   * @param formBuilder
   */
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    this.user = {
      name: '',
      favoriteNumber: 0,
      favoriteColor: '',
      observation: '',
      optin: true,
      newsLetter: true
    };

    this.colors = [
      {id: 1, color: 'Red'},
      {id: 2, color: 'Blue'},
      {id: 3, color: 'Green'}
    ];

    this.buildBasicControlsForm();
  }

  /**
   * Initialize the reactive form
   */
  private buildBasicControlsForm() {
    this.basicControlsForm = this.formBuilder.group({
      name: [this.user.name, [Validators.required]],
      favoriteNumber: [this.user.favoriteNumber, [Validators.required]],
      favoriteColor: [this.user.favoriteColor, [Validators.required]],
      observation: this.user.observation,
      optin: this.user.optin,
      newsLetter: this.user.newsLetter
    });
  }
}
