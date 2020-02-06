/**
    * The class of the TreeWithPath tree. / Класс дерева TreeWithPath.
*/
class Tree
{
    /**
        * Creates a tree. / Создает дерево.
        *
        * @param data Tree root node data. The name of the root node is always root. / Данные корневого узла дерева. Имя корневого узла всегда root.
        * @constructor
        * @example
        * const Tree = require("Tree");
        * let tree = new Tree({text: "Hello, world!", "otherText": "hoI!"});
    */
    constructor(data)
    {
        this.root = new Node('root', data, this);
    }

    /**
        * Adds a node to the tree and returns it. / Добавляет узел к дереву и возвращает его.
        *
        * @param {string} name The name of the node to add. / Имя добавляемого узла.
        * @param data The data of the node to be created. / Данные создаваемого узла.
        * @param {string} path The path to the parent of the node to create. / Путь к родителю создаваемого узла.
        * @this {Tree} Tree. / Дерево.
        * @return {Node} Created node. / Созданный узел.
        * @throws {TreeError} In case the node already exists. / В случае если узел уже существует.
        * @example
        * tree.add("node2", {text: "Hello, world!", "otherText": "hoI!"}, "/node1");
    */
    add(name, data, path)
    {
        if (this.has(Tree.joinPath(path, name)))
        {
            throw new TreeError('This node already exists. / Данный узел уже существует.')
        }

        let node = new Node(name, data, this);
        this.get(path)._children.push(node);
        return node;
    }

    /**
        * Gets the node at the specified path. / Получает узел по пути.
        *
        * @param {string} path The path to the node to receive. / Путь к получаемому узлу.
        * @param {boolean} error Optional parameter. The default is true. If true, an exception will be thrown if the path is incorrect. Otherwise, null will be returned. / Не обязательный параметр. По умолчанию true. Если верен то при неверном пути будет вызвано исключение. Иначе будет возвращен null.
        * @this {Tree} Tree. / Дерево.
        * @returns {Node} The resulting node. / Полученный узел.
        * @throws {TreeError} In case the node is not found and error = true. / В случае если узел не найден и error = true.
        * @example
        * tree.get("/node1");
    */
    get(path, error = true)
    {
        let current = [this.root];
        let parsedPath = parsePath(path);
        for (let [index, node] of parsedPath.entries())
        {
            let currentNode = current.find(currentNode => currentNode.name == node);
            if (currentNode != null)
            {
                current = currentNode._children;
                if (index == parsedPath.length - 1)
                {
                    return currentNode;
                }
                continue;
            }
            else
            {
                if (error)
                {
                    throw new TreeError(`${node}: Node not exists / Узел не существует`);
                }
                else
                {
                    return null;
                }
            }
        }
    }

    /**
        * Deletes the node and returns it at the specified path. / Удаляет узел и возвращает его по указанному пути.
        *
        * @param {string} path The path to the node to be deleted. / Путь к удаляемому узлу.
        * @this {Tree} Tree. / Дерево.
        * @returns {Node} A deleted node that no longer contains children. Children are permanently deleted. / Удаленный узел который больше не содержит детей. Дети удаляются безвозвратно.
        * @throws {TreeError} In case the node is not found. / В случае если узел не найден.
        * @example
        * tree.remove("/node1");
    */
    remove(path)
    {
        let node = this.get(path);
        node.remove();
        return node;
    }

    /**
        * Calls a callback for each node in the tree. / Вызывает callback для каждого узла дерева.
        *
        * @param {Function} callback A function called for each node of the tree. The node in the first argument is passed to the function. / Функция вызываемая для каждого узла дерева. Функции передается узел в первом аргументе.
        * @this {Tree} Tree. / Дерево.
        * @example
        * tree.traverse(node => {
        *   console.log(node.name);
        * });
    */
    traverse(callback)
    {
        let recurse = function recurse(node)
        {
            callback(node);
            for (let child of node._children)
            {
                recurse(child);
            }
        }

        recurse(this.root);
    }

    /**
        * Returns a tree object suitable for storage in JSON format. This method is mainly used by the JSON.stringify function. / Возвращает пригодный для хранения в формате JSON объект дерева. В основном данный метод используется функцией JSON.stringify.
        *
        * @this {Tree} Tree. / Дерево.
        * @returns {object} A tree object suitable for storage in JSON format. / Пригодный для хранения в формате JSON объект дерева.
        * @example
        * tree.toJSON(); // {name: "root", data: {text: "Hello, world!", "otherText": "hoI!"}, children: [{name: "node1", data: {text: "Hello, world!", "otherText": "hoI!"}, children: [{name: "node2", data: {text: "Hello, world!", "otherText": "hoI!"}, children: []}]}
    */
    toJSON()
    {
        return this.root.toJSON();
    }

    /**
        * Checks a node for existence in a tree. / Проверяет узел на существование в дереве.
        * 
        * @param {string} path The path to the node to check. / Путь к узлу для проверки.
        * @returns {boolean} True if the node exists and false if it does not exist. / Значение true в случае существования узла и false в случае если он не существует.
        * @this {Tree} Tree. / Дерево.
        * @example
        * tree.has('/notExists/child') // false
        * tree.has('/exists') // true
    */
    has(path)
    {
        let node = this.get(path, false);
        return (node != null);
    }

    /**
        * Checks a node for existence in a tree. / Проверяет узел на существование в дереве.
        * 
        * @param {string} path The path to the node to check. / Путь к узлу для проверки.
        * @returns {boolean} True if the node exists and false if it does not exist. / Значение true в случае существования узла и false в случае если он не существует.
        * @this {Tree} Tree. / Дерево.
        * @example
        * tree.has('/notExists/child') // false
        * tree.has('/exists') // true
    */
    isUniqueName(name)
    {
        let isUnique = true;
        tree.traverse(node => {
            if (node.name == name)
            {
                isUnique = false;
            }
        });
        return isUnique;
    }

    /**
        * Creates a tree from an object that returns the toJSON() method. / Создает дерево из объекта который возвращает метод toJSON().
        *
        * @param {object} json A tree object suitable for storage in JSON format. / Объект дерева пригодный для хранения в формате JSON.
        * @returns {Tree} Created tree. / Созданное дерево.
        * @example
        * let tree = Tree.fromJSON({name: "root", data: {text: "Hello, world!", "otherText": "hoI!"}, children: [{name: "node1", data: {text: "Hello, world!", "otherText": "hoI!"}, children: [{name: "node2", data: {text: "Hello, world!", "otherText": "hoI!"}, children: []}]});
    */
    static fromJSON(json)
    {
        let tree = new Tree(json.data);

        let recurse = function recurse(recurseJson, addTo)
        {
            recurseJson.forEach(node => {
                let newNode = addTo.addChild(node.name, node.data);
                recurse(node.children, newNode);
            });
        }

        recurse(json.children, tree.root);
        return tree;
    }

    /**
        * Connects the two specified paths into one. / Соединяет два указанных путя в один.
        *
        * @param {string} pathOne First path. / Первый путь.
        * @param {sting} pathTwo Second path. / Второй путь.
        * @returns {string} United path. / Соединенный путь.
        * @example
        * Tree.joinPath('/gg', 'gg') // /gg/gg
    */
    static joinPath(pathOne, pathTwo)
    {
        if (pathOne.endsWith('/') || pathTwo.endsWith('/'))
        {
            return pathOne + pathTwo;
        }
        else
        {
            return `${pathOne}/${pathTwo}`;
        }
    }
}

/**
    * Node class. / Класс узла.
*/
class Node
{
    /**
        * Creates an instance of a node. Do not use this constructor yourself. To add nodes, use the add and addChild methods. / Создает экземляр узла. Не используйте данный конструктор самостоятельно. Для добавления узлов используйте методы add и addChild.
        * 
        * @param {string} name The name of the node. / Имя узла.
        * @param data Node data. / Данные узла.
        * @param {Tree} tree The tree to which the node will belong. / Дерево которому будет принадлежать узел.
        * @constructor
    */
    constructor(name, data, tree)
    {
        this.name = name;
        this.data = data;

        /** @private */
        this._children = [];

        this.tree = tree;
    }

    /**
        * Getter to get the path to this node. / Геттер для получения пути к данному узлу.
        * 
        * @returns {string} The path to this node. / Путь к данному узлу.
        * @this {Node} Node. / Узел.
        * @throws {TreeError} In case this node does not belong to any tree. / В случае если данный узел не принадлежит никакому дереву.
    */
    get path()
    {
        if (this.tree == null)
        {
            throw new TreeError("This node does not belong to any tree / Данный узел не принадлежит никакому дереву")
        }

        let parentsArray = [];
        let recurse = function recurse(node)
        {
            if (node != null)
            {
                parentsArray.push(node);
                return recurse(node.parent);
            }
            else
            {
                return parentsArray;
            }
        }

        let pathArray = recurse(this);
        pathArray.pop();
        return `/${pathArray.map(node => node.name).reverse().join('/')}`;
    }

    /**
        * Getter to get the parent of this node. / Геттер для получения родителя данного узла.
        * 
        * @returns {Node} Parent of this node. / Родитель данного узла.
        * @this {Node} Node. / Узел.
        * @throws {TreeError} In case this node does not belong to any tree. / В случае если данный узел не принадлежит никакому дереву.
    */
    get parent()
    {
        if (this.tree == null)
        {
            throw new TreeError("This node does not belong to any tree / Данный узел не принадлежит никакому дереву")
        }

        if (this.tree.root._children.includes(this))
        {
            return this.tree.root;
        }
        
        let recurse = function recurse(children)
        {
            let parent = children.find((item, index, array) => item._children.includes(this));
            if (parent != null)
            {
                return parent;
            }
            else
            {
                for (let child of children)
                {
                    return recurse.call(this, child._children);
                }
            }
        }

        return recurse.call(this, this.tree.root._children);
    }

    /**
        * Deletes the given node and its children. / Удаляет данный узел и его детей.
        * 
        * @this {Node} Node. / Узел.
        * @throws {TreeError} In case this node does not belong to any tree. / В случае если данный узел не принадлежит никакому дереву.
        * @throws {TreeError} If this node is the root. / В случае если данный узел является корневым.
    */
    remove()
    {
        if (this.tree == null)
        {
            throw new TreeError("This node does not belong to any tree / Данный узел не принадлежит никакому дереву")
        }

        if (this.parent == null)
        {
            throw new TreeError("Cannot remove root node / Невозможно удалить корневой узел");
        }
        else
        {
            this.parent._children.splice(this.parent._children.indexOf(this), 1);
            this.tree = null;
            this._children = null;
        }
    }

    /**
        * Adds a child to this node. / Добавляет ребенка к этому узлу.
        * 
        * @param {string} name The name of the node to add. / Имя добавляемого узла.
        * @param data The data of the node being added. / Данные добавляемого узла.
        * @this {Node} Node. / Узел.
        * @throws {TreeError} In case this node does not belong to any tree. / В случае если данный узел не принадлежит никакому дереву.
        * @throws {TreeError} In case the node already exists. / В случае если узел уже существует.
    */
    addChild(name, data)
    {
        if (this.tree == null)
        {
            throw new TreeError("This node does not belong to any tree / Данный узел не принадлежит никакому дереву")
        }

        if (this.tree.has(Tree.joinPath(this.path, name)))
        {
            throw new TreeError('This node already exists. / Данный узел уже существует.')
        }

        let node = new Node(name, data, this.tree);
        this._children.push(node);
        return node;
    }

    /**
        * Returns a node object suitable for storage in JSON format. This method is mainly used by the JSON.stringify function. / Возвращает пригодный для хранения в формате JSON объект узла. В основном данный метод используется функцией JSON.stringify.
        *
        * @this {Node} Node. / Узел.
        * @returns {object} A node object suitable for storage in JSON format. / Пригодный для хранения в формате JSON объект узла.
        * @example
        * node.toJSON(); // {name: "root", data: {text: "Hello, world!", "otherText": "hoI!"}, children: [{name: "node1", data: {text: "Hello, world!", "otherText": "hoI!"}, children: [{name: "node2", data: {text: "Hello, world!", "otherText": "hoI!"}, children: []}]}
    */
    toJSON()
    {
        return {name: this.name, data: this.data, children: this._children};
    }

    /**
        * A getter that returns an array of children of the given node. / Геттер который возвращает массив детей данного узла.
        *
        * @this {Node} Node. / Узел.
        * @returns {Array} Array of children for this node. / Массив детей данного узла.
    */
    get children()
    {
        return this._children;
    }
}

/**
    * It is a TreeWithPath error class. / Является классом ошибки TreeWithPath.
    * @private
*/
class TreeError extends Error
{
    constructor(message)
    {
        super(message);
        this.name = "TreeError";
    }
}

/** @private */
function parsePath(path)
{
    if (path.startsWith('/'))
    {
        let pathArray = path.split('/');
        pathArray[0] = 'root';
        if (pathArray[pathArray.length - 1] == '') pathArray.pop();
        return pathArray;
    }
    else
    {
        throw new TreeError("Wrong path / Неверный путь");
    }
}

module.exports = Tree;