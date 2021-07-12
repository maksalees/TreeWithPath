/**
 * A node that is more convenient to store in JSON
 */
declare interface NodeJson {
    name: string;
    data: any;
    children: NodeJson[];
}

/**
 * The class of the TreeWithPath tree
 */
declare class Tree {
    /**
     * Creates a tree
     *
     * @param data Tree root node data. The name of the root node is always root
     * @constructor
     * @example
     * const Tree = require("treewithpath");
     * const tree = new Tree({ text: "Hello, world!", "otherText": "hoI!" });
     */
    public constructor(data: any);

    /**
     * Root node of this tree
     * 
     * @returns {Node} Root node
     * @this {Tree}
     */
    public get root(): Node;

    /**
     * Adds a node to the tree and returns it
     *
     * @param {string} name The name of the node to add
     * @param data The data of the node to be created
     * @param {string} path The path to the parent of the node to create
     * @this {Tree} Tree
     * @return {Node} Created node
     * @throws {TreeError} In case the node already exists
     * @example
     * tree.add("node2", { text: "Hello, world!", "otherText": "hoI!" }, "/node1");
     */
    public add(name: string, data: any, path: string): Node;

    /**
     * Gets the node at the specified path
     *
     * @param {string} path The path to the node to receive
     * @param {boolean} error Optional parameter. The default is true. If true, an exception will be thrown if the path is incorrect. Otherwise, null will be returned
     * @this {Tree} Tree
     * @returns {Node | null} The resulting node or null if error = false and node not found
     * @throws {TreeError} In case the node is not found and error = true
     * @example
     * tree.get("/node1");
     */
    public get(path: string, error: boolean = true): Node | null;
    
    /**
     * Deletes the node and returns it at the specified path
     *
     * @param {string} path The path to the node to be deleted
     * @this {Tree} Tree
     * @returns {Node} A deleted node that no longer contains children. Children are permanently deleted
     * @throws {TreeError} In case the node is not found
     * @example
     * tree.remove("/node1");
     */
    public remove(path: string): Node;
    
    /**
     * Calls a callback for each node in the tree
     *
     * @param {Function} callback A function called for each node of the tree. The node in the first argument is passed to the function
     * @this {Tree} Tree
     * @example
     * tree.traverse(node => {
     *   console.log(node.name);
     * });
     */
    public traverse(callback: (node: Node) => void): void;
    
    /**
     * Returns a tree object suitable for storage in JSON format. This method is mainly used by the JSON.stringify function
     *
     * @this {Tree} Tree
     * @returns {object} A tree object suitable for storage in JSON format
     * @example
     * tree.toJSON(); // { name: "root", data: { text: "Hello, world!", "otherText": "hoI!" }, children: [{ name: "node1", data: { text: "Hello, world!", "otherText": "hoI!" }, children: [{ name: "node2", data: {text: "Hello, world!", "otherText": "hoI!" }, children: [] }] }
     */
    public toJSON(): NodeJson;
    
    /**
     * Checks a node for existence in a tree
     * 
     * @param {string} path The path to the node to check
     * @returns {boolean} True if the node exists and false if it does not exist
     * @this {Tree} Tree
     * @example
     * tree.has("/notExists/child") // false
     * tree.has("/exists") // true
     */
    public has(path: string): boolean;
    
    /**
     * Creates a tree from an object that returns the toJSON() method
     *
     * @param {object} json A tree object suitable for storage in JSON format
     * @returns {Tree} Created tree
     * @example
     * const tree = Tree.fromJSON({ name: "root", data: { text: "Hello, world!", "otherText": "hoI!" }, children: [{name: "node1", data: {text: "Hello, world!", "otherText": "hoI!"}, children: [{name: "node2", data: {text: "Hello, world!", "otherText": "hoI!"}, children: [] }] });
     */
    public static fromJSON(json: NodeJson): Tree;
    
    /**
     * Connects the two specified paths into one.
     *
     * @param {string} firstPath First path
     * @param {sting} secondPath Second path
     * @returns {string} United path
     * @example
     * Tree.joinPath("/node1", "node2") // /node1/node2
     */
    public static joinPath(firstPath: string, secondPath: string): string;
}

/**
 * Node class
 */
declare class Node {
    /**
     * Creates an instance of a node. Do not use this constructor yourself. To add nodes, use the add and addChild methods
     * 
     * @param {string} name The name of the node
     * @param data Node data
     * @param {Tree} tree The tree to which the node will belong
     * @constructor
     */
    public constructor(name: string, data: any, tree: Tree);

    /**
     * Name of this node
     */
    public name: string;

    /**
     * Data of this node
     */
    public data: any;

    /**
     * The tree to which the node will belong
     * 
     * @returns {Tree} Tree to which the node will belong
     * @this {Node}
     */
    public get tree(): Tree;

    /**
     * Getter to get the path to this node
     * 
     * @returns {string} The path to this node
     * @this {Node} Node
     * @throws {TreeError} In case this node does not belong to any tree
     */
    public get path(): string;

    /**
     * Getter to get the parent of this node
     * 
     * @returns {Node} Parent of this node
     * @this {Node} Node
     * @throws {TreeError} In case this node does not belong to any tree
     */
    public get parent(): Node;

    /**
     * A getter that returns an array of children of the given node
     *
     * @this {Node} Node
     * @returns {Array} Array of children for this node
     */
    public get children(): Node[];

    /**
     * Deletes the given node and its children
     * 
     * @this {Node} Node
     * @throws {TreeError} In case this node does not belong to any tree
     * @throws {TreeError} If this node is the root
     */
    public remove(): void;

    /**
     * Adds a child to this node
     * 
     * @param {string} name The name of the node to add
     * @param data The data of the node being added
     * @this {Node} Node
     * @throws {TreeError} In case this node does not belong to any tree
     * @throws {TreeError} In case the node already exists
     */
    public addChild(name: string, data: any): Node;

    /**
     * Returns a node object suitable for storage in JSON format. This method is mainly used by the JSON.stringify function
     *
     * @this {Node} Node
     * @returns {object} A node object suitable for storage in JSON format
     * @example
     * node.toJSON(); // { name: "root", data: { text: "Hello, world!", "otherText": "hoI!" }, children: [{ name: "node1", data: {text: "Hello, world!", "otherText": "hoI!" }, children: [{ name: "node2", data: { text: "Hello, world!", "otherText": "hoI!" }, children: [] }] }
     */
    public toJSON(): NodeJson;

    /**
     * Calls a callback for each child node of this node
     *
     * @param {Function} callback A function called for child node of this node The node in the first argument is passed to the function
     * @this {Node} Node
     * @example
     * node.traverse(node => {
     *   console.log(node.name);
     * });
     */
    public traverse(callback: (node: Node) => void): void;
}