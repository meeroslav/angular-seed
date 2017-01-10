import { Component, Input, forwardRef, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectionDispatcher } from '../../dispatcher/selection-dispatcher.service';

export interface ITreeNode {
  id?: string;
  text: string;
  icon?: string;
  children?: Array<ITreeNode>;
}

@Component({
  selector: 'tree-node',
  template: `
        <div class="tree-node-header">
            <span *ngIf="content.children && content.children.length" class="tree-toggler" (click)="toggle()"
                [ngClass]="{'collapsed app-icon-plus': collapsed, 'expanded app-icon-minus': !collapsed}"></span>
            <div>{{content.text | translate}}</div>
            <span *ngIf="content.icon" [ngClass]="content.icon" class="tree-node-icon"></span>
        </div>
        <div *ngIf="content.children && content.children.length" class="tree-node-list" [ngClass]="{'collapsed': collapsed}">
            <tree-node *ngFor="let node of content.children" [content]="node" (click)="onNodeSelect(node)"></tree-node>
        </div>
    `,
  styleUrls: ['./tree-node.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TreeNode),
    multi: true
  }],
  host: {
    'class': 'tree-node',
    '(click)': 'selectNode()'
  }
})
export class TreeNode implements ControlValueAccessor {
  @Input() content: ITreeNode;
  @Input() collapsed: boolean;
  @Input() nodeSelectCallback: (node: any) => any;

  // private collapsed: boolean;
  private _checked: boolean = false;

  constructor(private elementRef: ElementRef, private selectionDispatcher: SelectionDispatcher) {
    this.collapsed = false;
    this._checked = false;

    this.selectionDispatcher.listen((newValue: string, name: string) => {
      if (!newValue) {
        return;
      }
      if (newValue !== this.content.id) {
        this.checked = false;
        this.writeValue(newValue);
      }
    });
  }

  @Input()
  get checked(): boolean { return this._checked; }
  set checked(newCheckedState: boolean) {
    this._checked = newCheckedState;

    if (newCheckedState) {
      this.selectionDispatcher.notify(this.content.id, null);
    }
  }

  /**
   * Select a node from the tree
   * and setup the dispatcher
   */
  selectNode() {
    this.checked = true;
    this.writeValue(this.content.id);
  }

  /**
   * Fires up the callback
   * passed in by the parent component
   * @param id
   */
  onNodeSelect(node: any) {
    if (this.nodeSelectCallback) {
      this.nodeSelectCallback(node);
    }
  }

  /**
   * Applies the Selected css class
   * to nodes
   * @param  {string} value
   */
  writeValue(value: string) {

    // Does not apply for root nodes
    if (!this.content.id) {
      return;
    }

    const checked = this.content.id === value;
    this._checked = checked;
    this.elementRef.nativeElement.classList.toggle('selected', checked);
    if (checked) { this.onChange(value); }
  }

  toggle() {
    this.collapsed = !this.collapsed;
  }

  onChange = (_: any) => { /**/ };
  onTouched = () => { /**/ };
  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
