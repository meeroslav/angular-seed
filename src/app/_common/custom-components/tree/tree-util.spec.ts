/*
 File:     tree-uitl.spec.ts
 Author:   Radu Woinaroski
 Date:     29.05.2017
 Abstract: tests for tree-util
 */


import {ITreeNode} from './tree-node.component';
import {findPathById, pathOnly} from './tree-util';
import * as R from 'ramda';


describe('tree-util', () => {
  function pathToString(path: ITreeNode[]) {
    if (path === null)
      return '';

    return R.reduce((path, node) => `${path}/${node.id}`, '', path);
  }

  const tree: ITreeNode[] = [
    {
      text: '1', id: '1',
      children: [
        {
          text: '1.1', id: '1.1',
          children: [
            {text: '1.1.1', id: '1.1.1'},
            {text: '1.1.2', id: '1.1.2'}
          ]
        },
        {
          text: '1.2', id: '1.2',
          children: [
            {text: '1.2.1', id: '1.2.1'},
            {text: '1.2.2', id: '1.2.2'}
          ]
        }
      ]

    },
    {
      text: '2', id: '2',
      children: [
        {
          text: '2.1', id: '2.1',
          children: [
            {text: '2.1.1', id: '2.1.1'},
            {text: '2.1.2', id: '2.1.2'}
          ]
        },
        {
          text: '2.2', id: '2.2',
          children: [
            {text: '2.2.1', id: '2.2.1'},
            {text: '2.2.2', id: '2.2.2'}
          ]
        }
      ]
    }
  ];

  describe('findPathById', () => {
    all('should find existing paths at different depths',
      [
        ['2.2.1', '/2/2.2/2.2.1'],
        ['2.2', '/2/2.2'],
        ['2', '/2'],
      ],
      (id: string, pathString: string) => {
        const path = findPathById(tree, id);

        expect(pathToString(path)).toBe(pathString);
      });
    it('findPathById should return an empty path if node id is not found', () => {
      const path = findPathById(tree, 'nonExistingNode');
      expect(path).toEqual([]);
    });
    it('should tolerate null parameters', () => {
      let path = findPathById(tree, null);
      expect(path).toEqual([]);
      path = findPathById(null, '2.1');
      expect(path).toEqual([]);
      path = findPathById(null, 'nonExistingNode');
      expect(path).toEqual([]);
      path = findPathById(null, null);
      expect(path).toEqual([]);
    });
  });

  describe('pathOnly', () => {

    all('should strip the children of any nodes but the ones in path',
      [
        '2.2.1',
        '2.2',
        '1',
      ],
      (nodeId: string) => {
        const path = findPathById(tree, nodeId);

        let currentElm = pathOnly(path);
        while (currentElm !== null) {
          const children = currentElm.children;
          if (children !== null && children.length > 0) {
            expect(children.length).toBe(1);
            currentElm = children[0];
          } else
            break;
        }
      });

    all('should clone the path nodes faithfully',
      [
        ['2.2.1',['2', '2.2', '2.2.1']],
        ['2.2',['2', '2.2']],
        ['2',['2']],
      ],
      (nodeId:string, ids:string[]) => {
      const path = findPathById(tree, nodeId);
      const currentElm = pathOnly(path);

      function verifyNode(node: ITreeNode, path: string[]) {
        expect(node.id).toEqual(path[0]);
        expect(node.text).toEqual(path[0]);
        if (path.length === 1) {
          expect(node.children === null || node.children.length === 0);
        } else {
          expect(node.children.length).toBe(1);
          verifyNode(node.children[0], R.drop(1, path));
        }
      }

      verifyNode(currentElm, ids);

    });
  });

});



