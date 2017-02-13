export interface IHighlightMarker {
  start: number;
  end: number;
  special?: boolean;
}

export interface IRangePosition {
  position: number;
  node: INodeIndex;
}

export interface INodeIndex {
  index: number;
  isHighlight?: boolean;
  previousLength: number;
  isMultiLinePaste?: boolean;
}
