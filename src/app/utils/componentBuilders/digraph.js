export class GraphNode {
  ngbs;
  text;
  constructor(text = "", ngbs = []) {
    this.ngbs = ngbs;
    this.text = text;
  }
}

export class AdjacencyList {
  constructor(list) {
    const tmp = [];

    for (const ls of list) {
      const { title, ngbtitles } = ls;

      const newNode = new GraphNode(title);

      for (const ngbtitle of ngbtitles) {
        const ngb = new GraphNode(ngbtitle);
        newNode.ngbs.push(ngb);
      }

      tmp.push(newNode);
    }

    this.list = tmp;
  }

  bfs() {
    const queue = [];
    const bfsres = [];
    const visited = new Set();
    queue.push(this.root);
    bfsres.push(this.root);
    while (queue.length) {
      const node = queue.shift();
      for (const ngb of node.ngbs) {
        if (visited.has(ngb)) continue;
        queue.push(ngb);
        bfsres.push(ngb);
      }
    }
    return bfsres;
  }
}
