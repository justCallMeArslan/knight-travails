// Graph for reference 

//    0, 1, 2. 3, 4, 5, 6. 7
// 0 [0, 0, 0, 0, 0, 0, 0, 0]
// 1 [0, 0, 0, 0, 0, 0, 0, 0]
// 2 [0, 0, 0, 0, 0, 0, 0, 0]
// 3 [0, 0, 0, 0, 0, 0, 0, 0]
// 4 [0, 0, 0, 0, 0, 0, 0, 0]
// 5 [0, 0, 0, 0, 0, 0, 0, 0]
// 6 [0, 0, 0, 0, 0, 0, 0, 0]
// 7 [0, 0, 0, 0, 0, 0, 0, 0]



function travail(start, target) {
    const boardSize = 8;
    const startKey = `${start[0]}, ${start[1]}`
    let queue = [start];
    let visited = new Set();
    let parent = new Map();

    visited.add(startKey);
    parent.set(startKey, null);


    while (queue.length > 0) {
        let node = queue.shift();

        if (node[0] === target[0] && node[1] === target[1]) {
            let targetedPath = getPath(parent, target);
            const distance = targetedPath.length - 1;
            return { targetedPath, distance };
        }

        let neighbors = getNeighbors(node[0], node[1], boardSize);
        for (let neighbor of neighbors) {
            let neighborKey = `${neighbor[0]}, ${neighbor[1]}`
            let nodeKey = `${node[0]}, ${node[1]}`
            if (!visited.has(neighborKey)) {
                visited.add(neighborKey);
                parent.set(neighborKey, nodeKey);
                queue.push(neighbor);
            }
        }
    }
    return null;
}


function getNeighbors(row, col, boardSize) {
    let moves = [ // enforcing movement rules of knight (chess horse)
        [2, 1],
        [2, -1],
        [-2, 1],
        [-2, -1],
        [1, 2],
        [1, -2],
        [-1, 2],
        [-1, -2]
    ];

    let neighbors = [];

    for (let [a, b] of moves) {
        let newA = row + a;
        let newB = col + b;

        if (newA >= 0 && newA < boardSize &&
            newB >= 0 && newB < boardSize) {
            neighbors.push([newA, newB]);
        }
    }

    return neighbors;
}

function getPath(parent, target) {
    let path = [];
    let current = `${target[0]}, ${target[1]}`

    while (current !== null) {
        let [row, col] = current.split(", ").map(Number);
        path.push([row, col]);
        current = parent.get(current);
    }

    return path.reverse();

}

console.log(travail([0, 0], [3, 3]));
console.log(travail([0, 0], [7, 7]));
