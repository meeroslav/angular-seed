import { Component, ElementRef, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ModalDialogService, SimpleModalComponent } from 'ngx-modal-dialog';
import { ICoordinate, IMapChange, WorldMapComponent } from '../_common/custom-components/world-map';
import { ITreeNode } from '../_common/custom-components/tree';
import { LoadingIndicatorService } from '../_common/shared/loading-indicator';
import { FeedbackService } from '../_common/shared/feedback';
import { CustomModalComponent } from './custom-modal.component';
import { BsLocaleService } from 'ngx-bootstrap';

const tree = [
  { text: 'Category 1', children: [{ id: '1', text: 'Sub-Category1' }, { id: '2', text: 'Sub-Category2' }] },
  { text: 'Category 2', children: [{ id: '1', text: 'Sub-Category1' }] },
  {
    text: 'Category 3', children: [
    { id: '1', text: 'Sub-Category1' },
    { id: '2', text: 'Sub-Category2' },
    { id: '3', text: 'Sub-Category3' }
  ]
  }
];

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'misc-page',  // <home></home>

  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./miscellaneous.component.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './miscellaneous.component.html',
  host: {
    'class': 'page'
  }
})
export class MiscComponent implements OnInit {
  // tree node related
  selectedTreeNode: any;

  // date picker related
  tomorrow: Date;
  dateDisabled: { date: Date, mode: string }[] = [];
  dt: Date = new Date();

  treeData: ITreeNode[];
  treeDataMultiLevel: ITreeNode[];
  treeDataMultiLevelWithIcons: ITreeNode[];

  constructor(private modalDialogService: ModalDialogService,
              private loadingIndicator: LoadingIndicatorService,
              private viewContainer: ViewContainerRef,
              private element: ElementRef,
              private feedbackService: FeedbackService,
              localeService: BsLocaleService) {
    (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
    this.dateDisabled = [{ date: this.tomorrow, mode: 'day' }];
    localeService.use('de');
  }

//   export interface ITreeNode {
//   id?: string;
//   text: string;
//   icon?: string;
//   children?: Array<ITreeNode>;
// }

  ngOnInit() {
    this.selectedTreeNode = {};

    this.treeData = [{ text: 'Element One' }, { text: 'Element Two' }];
    this.treeDataMultiLevel = [{
      text: 'Element One',
      children: [{ text: 'child 11', children: [{ text: 'child 111' }] }, { text: 'child 12' }]
    }, {
      text: 'Element Two',
      children: [{ text: 'child 21' }, { text: 'child 22', children: [{ text: 'child 221' }] }]
    }];
    this.treeDataMultiLevelWithIcons = [{
      text: 'Element One', icon: 'theme-icon-star',
      children: [{
        text: 'child 11',
        icon: 'theme-icon-list',
        children: [{ text: 'child 111', icon: 'theme-icon-notification' }]
      }, { text: 'child 12' }]
    }, {
      text: 'Element Two', icon: 'theme-icon-question',
      children: [{ text: 'child 21', icon: 'theme-icon-cards' }, {
        text: 'child 22',
        icon: 'theme-icon-zoom-in',
        children: [{ text: 'child 221' }]
      }]
    }];
  }

  openSimpleModal() {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Simple',
      childComponent: SimpleModalComponent,
      settings: {
        closeButtonClass: 'close theme-icon-close'
      },
      data: {
        text: 'Some text content'
      }
    });
  }

  openSimpleModalWithCallback() {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Simple',
      childComponent: SimpleModalComponent,
      data: {
        text: 'Some text content. It will close after 1 sec.'
      },
      settings: {
        closeButtonClass: 'close theme-icon-close'
      },
      onClose: () => new Promise((resolve: any) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      })
    });
  }

  openPromptModal() {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Simple',
      childComponent: SimpleModalComponent,
      data: {
        text: 'Not so simple modal dialog. Do you agree?\n(It will close on Fine but fail on close)'
      },
      settings: {
        closeButtonClass: 'close theme-icon-close'
      },
      actionButtons: [
        {
          text: 'Im fine, thanks',
          onAction: () => new Promise((resolve: any) => {
            setTimeout(() => {
              resolve();
            }, 20);
          })
        },
        {
          text: 'Brake, please',
          onAction: () => new Promise((resolve: any, reject: any) => {
            setTimeout(() => {
              reject();
            }, 20);
          })
        }
      ]
    });
  }

  openCustomModal() {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Custom',
      childComponent: CustomModalComponent,
      settings: {
        closeButtonClass: 'close theme-icon-close'
      },
      data: `Hey, I'm parent!`
    });
  }

  repositionTheDot(data: IMapChange) {
    let dot = this.element.nativeElement.querySelector('#dot');
    // position of Vienna
    let cords: ICoordinate = WorldMapComponent.GetPercentagePosition(data, 16.363553, 48.186928);

    dot.style.left = `${cords.x}%`;
    dot.style.top = `${cords.y}%`;
  }

  /**
   * callback executed by the TreeInputComponent
   * Fetch the data and returns to the tree
   * @see {ITreeNode}
   */
  getTreeData() {
    return () => {
      return Observable.of(tree);
    };
  }

  /**
   * callback executed when a node
   * is selected on the tree
   * @param node: The node selected
   */
  nodeSelectCallback(node: any) {
    if (node) {
      this.selectedTreeNode = node;
    }
  }

  showLoadingIndicator() {
    this.loadingIndicator.start();
    setTimeout(() => {
      this.loadingIndicator.done();
    }, 2000);
  }

  fireToast(type?: number) {
    if (!type) {
      this.feedbackService.notify({ heading: 'A random toaster', type: 'success' });
      return;
    }
    if (type === 1) {
      this.feedbackService.notify({
        heading: 'A random toaster with action', action: {
          text: 'My action', callback: () => {
            alert('this is action');
          }
        }
      });
    }
    if (type === 2) {
      this.feedbackService.notify(
        { heading: 'A random toaster with body', type: 'danger', body: 'This is some body text' });
    }
    if (type === 3) {
      this.feedbackService.notify({
        heading: 'A random toaster with action and body',
        type: 'warning',
        body: 'This is some body text',
        action: {
          text: 'My action', callback: () => {
            alert('this is action');
          }
        }
      });
    }
  }
}
