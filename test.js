const Tree = require("./treewithpath");
const assert = require("assert");

const tree = new Tree({ text: "Hello, world!", "otherText": "hoI!" });

describe("Tree", function() {
    describe("#get()", function() {
        it("should return root Node when the path is /", function() {
            assert.strictEqual(tree.get("/"), tree.root);
        });
    });

    describe("#add()", function() {
        it("added node is exists", function() {
            const node = tree.add("node1", { text: "Hello, world!", "otherText": "hoI!" }, "/");
            assert.strictEqual(tree.get("/node1"), node);
        });

        it("added child node is exists", function() {
            const node = tree.add("node2", { text: "Hello, world!", "otherText": "hoI!" }, "/node1");
            assert.strictEqual(tree.get("/node1/node2"), node);
        });
    });

    describe("#remove()", function() {
        it("removed node is not exists", function() {
            tree.remove("/node1/node2");
            assert.strictEqual(tree.has("/node1/node2"), false);
        });

        it("parent of removed node is exists", function() {
            assert.strictEqual(tree.has("/node1"), true);
        });

        it("should throw error when trying to remove root node", function() {
            assert.throws(tree.remove.bind(tree, "/"));
        });
    });

    describe("#traverse()", function() {
        it("works", function() {
            tree.add("node2", { text: "Hello, world!", "otherText": "hoI!" }, "/node1");

            const nodes = [];
            tree.traverse(node => {
                nodes.push(node.name);
            });

            assert.deepStrictEqual(nodes, [ "root", "node1", "node2" ]);
        });
    });

    describe("#toJSON()", function() {
        it("JSON.stringify works fine", function() {
            assert.strictEqual(JSON.stringify(tree), '{"name":"root","data":{"text":"Hello, world!","otherText":"hoI!"},"children":[{"name":"node1","data":{"text":"Hello, world!","otherText":"hoI!"},"children":[{"name":"node2","data":{"text":"Hello, world!","otherText":"hoI!"},"children":[]}]}]}');
        });
    });

    describe("#fromJSON()", function() {
        it("works", function() {
            assert.strictEqual(JSON.stringify(tree), JSON.stringify(Tree.fromJSON(JSON.parse(JSON.stringify(tree)))));
        });
    });

    describe("#joinPath()", function() {
        it("/node1 + node2 = /node1/node2", function() {
            assert.strictEqual(Tree.joinPath("/node1", "node2"), "/node1/node2");
        });

        it("/node1 + /node2 = /node1/node2", function() {
            assert.strictEqual(Tree.joinPath("/node1", "/node2"), "/node1/node2");
        });

        it("/node1/ + /node2/ = /node1/node2/", function() {
            assert.strictEqual(Tree.joinPath("/node1/", "/node2/"), "/node1/node2/");
        });
    });
});

describe("Node", function() {
    describe("#path", function() {
        it("works", function() {
            assert.strictEqual(tree.get("/node1/node2/").path, "/node1/node2");
        });
    });

    describe("#parent", function() {
        it("works", function() {
            assert.strictEqual(tree.get("/node1/node2/").parent.path, "/node1");
        });
    });
});