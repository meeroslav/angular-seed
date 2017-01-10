import {Component, OnInit, Input, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable} from 'rxjs/observable';
import {ITreeNode} from './tree-node.component';

@Component({
  selector: 'tree',
  template: `<div *ngFor="let node of content">
                <tree-node [collapsed]="true" [content]="node"
                           [nodeSelectCallback]=nodeSelectCallback></tree-node>
            </div>`,
  host: {'class': 'form-control'},
})
export class TreeComponent implements OnInit {
  content: ITreeNode[];
  @Input() collapsed: boolean;
  @Input() nodeSelectCallback: (node: any) => any;
  @Input() treeDataCallback: () => Observable<ITreeNode[]>;

  constructor() {
  }

  ngOnInit(): void {
    this.getContent();
  }

  /**
   * Fetch tree data
   */
  private getContent(): void {
    this.treeDataCallback().subscribe((results: ITreeNode[]) => {
      this.content = results;
    });
  }
}