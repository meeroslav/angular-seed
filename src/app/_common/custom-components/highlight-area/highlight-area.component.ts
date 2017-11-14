import { Component, forwardRef, Input, ElementRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IHighlightMarker, IRangePosition, INodeIndex } from './highlight-area.interface';

const ENTER_CHAR = '\n';

@Component({
  selector: 'highlightarea',
  styleUrls: [ './highlight-area.component.scss' ],
  template: '',
  providers: [ {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => HighlightAreaComponent),
    multi: true
  } ],
  host: {
    'class': 'highlight-area',
    'contenteditable': 'true',
    '(input)': 'updateValue($event)',
    '(paste)': 'pasteValue($event)'
  }
})
export class HighlightAreaComponent implements ControlValueAccessor, OnInit {
  @Input() markerCallback: (value: string) => Array<IHighlightMarker>;
  @Input() maxLength: number = 0;
  @Input() tagClass: string = 'badge badge-success';
  @Input() tagDuplicateClass: string = 'badge badge-danger';
  _value: string;

  private textArea: HTMLElement;
  private newLineRegex: RegExp;

  /**
   * CTOR
   */
  constructor(private elementRef: ElementRef) {
    this._value = '';
    this.newLineRegex = new RegExp('\n', 'g');
  }

  /**
   * Get pointer to native element
   */
  ngOnInit() {
    this.textArea = this.elementRef.nativeElement;
  }

  /**
   * Get value from HTML element and pass to control value accessor
   * @param  {Event} event
   */
  updateValue(event: Event) {
    this.value = (event.target as HTMLDivElement).innerText;
  }

  /**
   * Paste text instead of HTML
   */
  pasteValue(event: ClipboardEvent) {
    event.preventDefault();

    let text = event.clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, text);
  }

  /**
   * Value getter
   * @returns string
   */
  get value(): string {
    return this._value;
  }

  /**
   * Value setter
   * @param  {string} value
   */
  set value(value: string) {
    if (value !== this._value) {
      this.writeValue(value);
    }
  }

  /**
   * Pass value to parent form and render the new content
   * @param  {string} value
   */
  writeValue(value: string) {
    let isTrimmed = false;
    // trim text if it exceeds max length
    if (this.maxLength && value.length > this.maxLength) {
      value = value.substring(0, this.maxLength);
      isTrimmed = true;
    }
    this._value = this.elementRef.nativeElement.value = value;
    this.onChange(value);
    this.triggerOnChange(this.elementRef.nativeElement);
    this.renderContent(value, isTrimmed);
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

  onChange = (_) => { /**/
  }
  onTouched = () => { /**/
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Render new content of area
   * @param  {string} value
   * @param isTrimmed
   */
  private renderContent(value: string, isTrimmed: boolean) {
    let selection = window.getSelection();
    let caretPos = this.getCaretPosition(value ? selection : null);
    this.textArea.innerHTML = this.injectTags(value).replace(this.newLineRegex, '<br>');
    if (caretPos.position !== null) {
      selection.removeAllRanges();
      if (isTrimmed) {  // reduce position if trimmed
        caretPos.position--;
      }
      this.setCaretPosition(selection, caretPos);
    }
  }

  /**
   * Get current caret position and node information at the caret's position
   * @param  {Selection} selection?
   * @returns IRangePosition
   */
  private getCaretPosition(selection?: Selection): IRangePosition {
    let result = { position: null, node: null };

    if (selection && selection.rangeCount > 0) {
      let range = selection.getRangeAt(0);

      // check if selection is on typingArea
      if (range.startContainer.parentNode === this.textArea ||
        range.startContainer.parentNode.parentNode === this.textArea) {

        result.position = range.startOffset;
        // if it's same as parent = it was enter
        if (range.startContainer !== this.textArea) {
          result.node = this.getCaretsNodeInfo(range);
        }
      }
      // enter on typing area, move to next position
      if (range.startContainer === this.textArea &&
        range.startContainer.childNodes.length === range.startOffset + 1
      ) {
        result.position = range.startOffset + 1;
      }
    }
    return result;
  }

  /**
   * Get caret's node index, previous node's length and whether its highlighted area
   * @param  {Range} range
   * @returns INodeIndex
   */
  private getCaretsNodeInfo(range: Range): INodeIndex {
    let index = 0;
    let childNodes = this.textArea.childNodes;
    while (index < childNodes.length) {
      // match plain text
      if (childNodes[ index ] === range.startContainer) {
        if (childNodes[ index ].childNodes.length) { // has children -> it was enter
          return null;
        }
        return {
          index: index,
          isMultiLinePaste: (childNodes[ index ] as Text).wholeText.indexOf(ENTER_CHAR) !== -1,
          previousLength: 0
        };
      }
      if (childNodes[ index ].firstChild) {
        let wholeText = (childNodes[ index ].firstChild as Text).wholeText;
        let doubleEnterMatch = wholeText.match(/\n\n/g);
        let enterMatch = wholeText.match(/\n/g);
        let enterCount = enterMatch && enterMatch.length;
        // enter in span is recorded as double enter
        if (doubleEnterMatch || enterCount === 1) {
          return {
            index: index + 2,
            isHighlight: true,
            previousLength: 0
          };
        }
        // is it multiline paste?
        if (enterCount > 1) {
          return {
            index: index,
            isMultiLinePaste: true,
            previousLength: 0
          };
        }
        // match child element
        if (childNodes[ index ].firstChild === range.startContainer) {
          return {
            index: index,
            isHighlight: true,
            previousLength: index > 0 && childNodes[ index - 1 ].nodeValue && childNodes[ index - 1 ].nodeValue.length || 0
          };
        }
      }
      index++;
    }
    // not found, return null
    return null;
  }

  /**
   * Move caret to the new position
   * @param  {Selection} selection
   * @param  {IRangePosition} input
   */
  private setCaretPosition(selection: Selection, input: IRangePosition) {
    let range = this.getRange(input);
    selection.addRange(range);
    range.collapse(true);
  }

  /**
   * Generate range based on previous position, caret's node information and state of nodes
   * @param  {IRangePosition} input
   * @returns Range
   */
  private getRange(input: IRangePosition): Range {
    let range = document.createRange();
    // initial state or on enter
    if (input.node === null) {
      try {
        range.setStart(this.textArea, input.position);
        return range;
      } catch (e) {
        return range;
      }
    }
    let index = input.node.index;
    let isChild = false;
    let position = input.position;

    if (input.node.isMultiLinePaste) { // it's multi-line paste, move to end of it
      let delta = position - this.getNodeLength(this.textArea.childNodes[ index ]);
      while (delta > 0) {
        index += 1;
        position = delta;
        delta = position - this.getNodeLength(this.textArea.childNodes[ index ]);
      }
      isChild = !this.textArea.childNodes[ index ].nodeValue;
    } else if (input.node.isHighlight) {
      if (this.textArea.childNodes.length <= index || !this.textArea.childNodes[ index ]) { // broken child, combine it with prev text
        index -= 1;
        position += input.node.previousLength;
      } else if (this.textArea.childNodes[ index ].firstChild) { // still is child
        let delta = position - this.textArea.childNodes[ index ].firstChild.nodeValue.length;
        if (delta > 0) { // position is longer than child, break out
          index += 1;
          position = delta;
        } else { // still child
          isChild = true;
        }
      }
    } else if (this.textArea.childNodes[ index ].nodeValue) { // has node value -> it's not child
      let delta = position - this.textArea.childNodes[ index ].nodeValue.length;
      if (delta > 0) { // position is longer than text -> has multiple elements
        index += 1;
        position = delta; // move position to next node
        let newDelta = position - this.textArea.childNodes[ index ].firstChild.nodeValue.length;
        if (newDelta > 0) { // position is longer than first child, select next child with new delta position
          index += 1;
          position = newDelta; // move position to next node
        } else { // it's a child element
          isChild = true;
        }
      }
    } else { // switch text to child
      let newDelta = position - this.textArea.childNodes[ index ].firstChild.nodeValue.length;
      if (newDelta > 0) { // position is longer than first child, select next child with new delta position
        index += 1;
        position = newDelta; // move position to next node
      } else {
        isChild = true;
      }
    }
    // return result
    range.setStart(isChild ? this.textArea.childNodes[ index ].firstChild : this.textArea.childNodes[ index ],
      position);
    return range;
  }

  private getNodeLength(node: Node): number {
    if (node.nodeName === 'BR') {
      return 1;
    }
    if (node.nodeValue) {
      return node.nodeValue.length;
    }
    return node.firstChild.nodeValue.length;
  }

  /**
   * Inject tags into specific location in text
   * Uses markerCallback to get markers
   * @param  {string} input
   * @returns string
   */
  private injectTags(input: string): string {
    // if it's trivial
    if (!input || input.length === 0) {
      return input;
    }
    let markers = this.markerCallback ? this.markerCallback(input) : [];
    let output = '';
    let lastPos = 0;

    // inject tags at marker places
    markers.forEach((marker: IHighlightMarker) => {
      let prefix = input.slice(lastPos, marker.start);
      let body = input.slice(marker.start, marker.end);
      output += `${prefix}${this.generateTag(marker, body)}`;
      lastPos = marker.end;
    });
    output += input.slice(lastPos, input.length);
    return output;
  }

  /**
   * Generate tag markup
   * @param marker
   * @param body
   * @returns {string}
   */
  private generateTag(marker: IHighlightMarker, body: string): string {
    return `<span class="${marker.special ? this.tagDuplicateClass : this.tagClass}">${body}</span>`;
  }
}
