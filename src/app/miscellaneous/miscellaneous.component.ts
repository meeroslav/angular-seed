import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from '../_common/modal-dialog/modal-dialog.service';
import { SimpleModalComponent } from '../_common/modal-dialog/simple-modal.component';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'misc-page',  // <home></home>

  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './miscellaneous.component.scss' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './miscellaneous.component.html',
  host: {
    'class': 'page'
  }
})
export class MiscComponent implements OnInit {

  constructor (
    private modalDialogService: ModalDialogService,
    private viewContainer: ViewContainerRef) {}

  ngOnInit() {
    console.log('hello `Misc` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  openSimpleModal() {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Simple',
      childComponent: SimpleModalComponent,
      data: {
        text: 'Some text content'
      }
    });
  }
}