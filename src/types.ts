export interface EdgeState {
  to: string;
  cost: number;
}

export interface NodeState {
  name: string;
  h: number;
  g: number;
  f: number;
  visited: boolean;
  parent: string;
  edges: EdgeState[];
}

export interface CppLine {
  text: string;
  desc: string;
}

export interface SimulationStep {
  lineIndex: number;
  terminal: string;
  nodes: NodeState[];
  activeNode: string | null;
  activeNeighbors?: string[];
  highlightedEdge?: { from: string; to: string } | null;
  optimalPath: string[];
  explanation: string;
  phase: 'init' | 'edges' | 'search' | 'reconstruct' | 'done';
}
