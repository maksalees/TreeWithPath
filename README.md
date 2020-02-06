## English version of Readme

WARNING! All documentation and this Readme have been translated into English using Google Translate. If you find a mistake in the translation, send a Pull Request to [GitHub](https://github.com/TheMiksHacker/TreeWithPath).

# TreeWithPath

JavaScript library for working with trees. The main difference from other libraries is that here access to nodes occurs through paths, paths similar to paths in the FS.

# Paths

The path in Tree is very similar to the path in Unix. Each tree has its own root. It is indicated in the paths as `/`. Each node also has its own name. The name may be the same if the nodes have different parents. If you try to create a node and this parent already has a node with that name, then there will be an error. It is set at creation. It is like a file name, it is used in paths. For example, create a node `node1` which is a child of the root node (it is called `root`). And the path to the created node will be `/node1`. Now let's create a child for `node1`, and name it `node2`. The path to it will be `/node1/node2`. This way you can create many nodes. Now let's move on to working with the library itself.

# Documentation

The tree and node class documentation can be viewed [here](https://themikshacker.github.io/TreeWithPath/Tree.html) and [here](https://themikshacker.github.io/TreeWithPath/Node.html).

# Installation

To install, you can type in the terminal `npm install treewithpath`. After that, include the Tree in the desired file using `const Tree = require("treewithpath");`.
Well, how to use Tree can be found in the documentation (see above).

## Русская версия Readme

# TreeWithPath

Библиотека JavaScript для работы с деревьями. Основное отличие от других библиотек, в том что тут доступ к узлам происходит через пути, пути похожие на пути в ФС.

# Пути

Путь в Tree очень похож на пути в ОС Unix. У каждого дерева есть свой корень. Он в путях обозначается `/`. Также у каждого узла есть свое имя. Имя может быть одинаковое если узлы имееют разных родителей. Если попытатся создать узел а у этого родителя уже есть узел с таким именем то будет ошибка.
Оно задается при создании. Это как имя файла, оно используется в путях. Например создадим узел `node1` который является ребенком корневого узла (он называется `root`).
И путь к созданному узлу будет `/node1`. А теперь давайте создамим ребенка для `node1`, и назовем его `node2`. Путь к нему получится `/node1/node2`. Таким образом можно создавать много узлов. Теперь перейдем к работе с самой библиотекой.

# Документация

Документацию по классу дерева и узла можно посмотреть [тут](https://themikshacker.github.io/TreeWithPath/Tree.html) и [тут](https://themikshacker.github.io/TreeWithPath/Node.html).

# Установка

Чтобы установить Вы можете набрать в терминал `npm install treewithpath`. После этого подключите Tree в нужном файле используя `const Tree = require("treewithpath");`.
Ну а об том как использовать Tree Вы можете найти в документации (смотрите выше).