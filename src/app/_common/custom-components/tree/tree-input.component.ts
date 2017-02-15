import {Component, Input, forwardRef, Output, EventEmitter, ElementRef, Inject} from '@angular/core';
import {ITreeNode} from './tree-node.component';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'tree',
  styleUrls: ['./tree-input.component.scss'],
  template: `
      <tree-node *ngFor="let node of content" 
      [content]="node" 
      [collapsed]="collapsed" 
      [selected]="selectedNode"      
      (nodeClick)="onNodeClick($event)"></tree-node>
      `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TreeInputComponent),
    multi: true
  }]
})
export class TreeInputComponent implements ControlValueAccessor {
  @Input() content: ITreeNode[];
  @Input() collapsed: boolean;
  @Output() nodeClick = new EventEmitter();

  _value: any;
  selectedNode: string;

  constructor(@Inject(ElementRef) private elementRef: ElementRef) {
    this.selectedNode = '';
  }

  /**
   * click fired by tree-node child
   * @param event
   */
  onNodeClick(event: any) {
    this.selectedNode = event.node.id;
    this.value = event.node;

    // Emmit click to the parent component as well
    this.nodeClick.emit(event.node);
  }

  get value(): any {
    return this._value;
  }

  set value(value: any) {
    if (value !== this._value) {
      this.writeValue(value);
    }
  }

  writeValue(value: string) {
    this._value = value;
    this.onChange(value);
    this.elementRef.nativeElement.value = value;
    this.triggerOnChange(this.elementRef.nativeElement); // trigger on change event

    // set the selectedNode in edit mode
    if (!this.selectedNode && value) {
      this.selectedNode = value;
    }
  }

  triggerOnChange(element: any) {
    if ('createEvent' in document) {
      let evt = document.createEvent('HTMLEvents');
      evt.initEvent('change', false, true);
      element.dispatchEvent(evt);
    } else {
      element.fireEvent('onchange');
    }
  }

  onChange = (_) => { /**/ };
  onTouched = () => { /**/ };
  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}

