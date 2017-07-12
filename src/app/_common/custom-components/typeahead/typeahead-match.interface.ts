export interface ITypeaheadMatch {
  value: any;
  // item: any;
  existing?: any[];
}

export interface ITypeheadValue extends ITypeaheadMatch {
  text: string;
}
