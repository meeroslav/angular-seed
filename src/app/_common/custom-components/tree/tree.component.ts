import {Component, OnInit, Input} from '@angular/core';
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
