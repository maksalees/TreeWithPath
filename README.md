![Logo](https://raw.githubusercontent.com/maksalees/TreeWithPath/master/images/logo.png)

# TreeWithPath

JavaScript library for working with trees. The main difference from other libraries is that here access to nodes occurs through paths, paths similar to paths in the file systems.

# Paths

The path in TreeWithPath is very similar to the path in Unix. Each tree has its own root. It is indicated in the paths as `/`. Each node also has its own name. The name may be the same if the nodes have different parents. If you try to create a node and this parent already has a node with that name, then there will be an error. It is set at creation. It is like a file name, it is used in paths. For example, create a node `node1` which is a child of the root node (it is called `root`). And the path to the created node will be `/node1`. Now let's create a child for `node1`, and name it `node2`. The path to it will be `/node1/node2`. This way you can create many nodes. Now let's move on to working with the library itself.

# Documentation

The tree and node class documentation can be viewed [here](https://maksalees.github.io/TreeWithPath/2.0.0/Tree.html) and [here](https://maksalees.github.io/TreeWithPath/2.0.0/Node.html).

# Installation

To install, you can type in the terminal `npm install treewithpath`. After that, include the Tree in the desired file using `const Tree = require("treewithpath");` (or how do you import there).
Well, how to use Tree can be found in the documentation (see above).