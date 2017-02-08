import {Component, Input, Output, EventEmitter} from '@angular/core';

export interface ITreeNode {
  id?: string;
  text: string;
  icon?: string;
  children?: Array<ITreeNode>;
}

@Component({
  selector: 'tree-node',
  styleUrls: ['./tree-node.component.scss'],
  template: `
        <div class="tree-node-header" (click)="toggle()">
            <span *ngIf="content.children && content.children.length" class="tree-toggler"
                [ngClass]="{'collapsed app-icon-chevron-right': collapsed, 'expanded app-icon-chevron-down': !collapsed}"></span>
            <div>{{content.text | translate}}</div>
            <span *ngIf="content.icon" [ngClass]="content.icon" class="tree-node-icon"></span>
        </div>
        <div *ngIf="content.children && content.children.length" class="tree-node-list" [ngClass]="{'collapsed': collapsed}">
            <tree-node #t *ngFor="let node of content.children" [selected]="selected" 
              [content]="node" (click)="onNodeSelect(t)"></tree-node>
        </div>
    `,
  host: {
    'class': 'tree-node',
    '[class.selected]': 'this.content.id && this.content.id === selected'
  }
})
export class TreeNode {
  @Input() content: ITreeNode;
  @Input() collapsed: boolean;
  @Input() selected: string;
  @Output() nodeClick = new EventEmitter();

  constructor() {
    this.collapsed = false;
  }

  /**
   * select the node and
   * propagates the event to the observer
   * @param treeNode
   */
  onNodeSelect(treeNode: TreeNode) {
    this.nodeClick.emit({node: treeNode.content});
  }

  toggle() {
    this.collapsed = !this.collapsed;
  }
}
