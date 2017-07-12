import {ITreeNode} from './tree-node.component';
import * as R from 'ramda';

/**
 * Returns the first node (at any depth) with the specified Id (it searches depth first)
 * @param root
 * @param id
 * @returns {any}
 */
export function findPathById(root: ITreeNode[] | null, id: string | null): ITreeNode[] {
  if (root === null)
    return [];

  // Create a artificial root (so we don't have to deal with multiple roots)
  const singleRoot: ITreeNode = {text: 'unused', children: root};

  const retVal = nodeFindPathById(singleRoot, id);

  if (retVal.length > 0)
  // drop the artificial root created previously
    return R.drop(1, retVal);

  return []; // nothing found
}

/**
 * Returns the first node (at any depth) with the specified Id (it searches depth first)
 * @param root
 * @param id
 * @returns {any}
 */
function nodeFindPathById(root: ITreeNode | null, id: string | null): ITreeNode[] {

  if (id === null || root === null)
    return [];

  if (root.id === id)
    return [root];

  if (!root.children)
    return [];

  let retVal: ITreeNode[] = [];

  R.find((child: ITreeNode) => {
    // !!! lateral effect !!!
    retVal = nodeFindPathById(child, id);
    return retVal.length > 0;
  }, root.children);

  if (retVal.length > 0)
    return R.prepend(root, retVal);

  return retVal;
}

/**
 * Returns a copy of the root containing only copys of the nodes in the path ( it removes all other nodes)
 * @param path
 * @returns {any}
 */
export function pathOnly(path: ITreeNode[]): ITreeNode | null {

  if (path.length === 0)
    return null;

  return R.reduceRight((elm: ITreeNode, child: ITreeNode | null) => {
    const children: ITreeNode[] = child !== null ? [child] : [];
    return <ITreeNode> R.assoc('children', children, elm);
  }, null, path);

}
