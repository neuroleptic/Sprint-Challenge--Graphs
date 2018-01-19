/**
 * Edge class
 */
class Edge {
	constructor(destination, weight=1) {
		this.destination = destination;
		this.weight = weight;
	}
}

/**
 * Vertex class
 */
class Vertex {
	constructor(value='vertex') {
		this.value = value;
    this.edges = [];
    this.color = "white";
    this.parent = null;
	}
}

/**
 * Graph class
 */
class Graph {
	constructor() {
		this.vertexes = [];
	}

	/**
	 * Breadth-First search from a starting vertex
	 */
	bfs(start) {
    const queue = [];
		start.color = "gray";
		queue.push(start);
		while (queue.length > 0) {
      const head = queue.shift();
      for(let i = 0; i < head.edges.length; i++) {
        const neighbor =  head.edges[i].destination;
        if(neighbor.color === "white") {
          neighbor.color = "gray";
          neighbor.parent = head;
          queue.push(neighbor);
        }
      }
      head.color = "black";
		}
	}

	/**
	 * Find a vertex by its value
	 * 
	 * Return null if the vertex isn't found
	 */
	findVertex(value) {
    // !!! IMPLEMENT ME
    for(let i = 0; i < this.vertexes.length; i++) {
      if(this.vertexes[i].value === value) {
        return this.vertexes[i]
      }
    }
    return null;
	}

	/**
	 * Print out the route from the start vert back along the parent
	 * pointers (set in the previous BFS)
	 */
	route(start, end) {
    // !!! IMPLEMENT ME
    let currentNode = start;
    let output = currentNode.value + " --> ";
    while(currentNode.value !== end.value){
      currentNode = currentNode.parent;
      output += currentNode.value + " --> ";
    }
    console.log(output.slice(0, -5));
	}
}

/**
 * Helper function to add bidirectional edges
 */
function addEdge(v0, v1) {
	v0.edges.push(new Edge(v1));
	v1.edges.push(new Edge(v0));
}

/**
 * Main
 */

// Test for valid command line
const args = process.argv.slice(2);

if (args.length != 2) {
	console.error('usage: routing hostA hostB');
	process.exit(1);
}

// Build the entire Internet
// (it's only a model)
const graph = new Graph();
const vertA = new Vertex('HostA');
const vertB = new Vertex('HostB');
const vertC = new Vertex('HostC');
const vertD = new Vertex('HostD');
const vertE = new Vertex('HostE');
const vertF = new Vertex('HostF');
const vertG = new Vertex('HostG');
const vertH = new Vertex('HostH');

addEdge(vertA, vertB);
addEdge(vertB, vertD);
addEdge(vertA, vertC);
addEdge(vertC, vertD);
addEdge(vertC, vertF);
addEdge(vertG, vertF);
addEdge(vertE, vertF);
addEdge(vertH, vertF);
addEdge(vertH, vertE);

graph.vertexes.push(vertA);
graph.vertexes.push(vertB);
graph.vertexes.push(vertC);
graph.vertexes.push(vertD);
graph.vertexes.push(vertE);
graph.vertexes.push(vertF);
graph.vertexes.push(vertG);
graph.vertexes.push(vertH);

// Look up the hosts passed on the command line by name to see if we can
// find them.

const hostAVert = graph.findVertex(args[0]);

if (hostAVert === null) {
	console.error('routing: could not find host: ' + args[0]);
	process.exit(2);
}

const hostBVert = graph.findVertex(args[1]);

if (hostBVert === null) {
	console.error('routing: could not find host: ' + args[1]);
	process.exit(2);
}

// Route from one host to another

graph.bfs(hostBVert);

graph.route(hostAVert, hostBVert);
