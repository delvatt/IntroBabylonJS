//deuxiem version
//devra privatiser les champs plutar et ajouter des getter et setter !

getTranslationVect = function(vstart, vend) {
    var distance = BABYLON.Vector3.Distance(vstart, vend);
    v1 = vstart.subtract(vend);
    v1.normalize();
    return v1;
}


Bound = function(name, vstart, vend, scene) {

    var distance = BABYLON.Vector3.Distance(vstart, vend);

    BABYLON.Mesh.call(this, "Bound", scene);
    var vd = BABYLON.VertexData.CreateCylinder(distance, 1, 1, 36);

    vd.applyToMesh(this, false);
    // fin lignes mystiques

    this.id = name;

    this.material = new BABYLON.StandardMaterial("kosh", scene);
    this.material.diffuseColor = new BABYLON.Color3(1, 1, 1);

    // First of all we have to set the pivot not in the center of the cylinder:
    this.setPivotMatrix(BABYLON.Matrix.Translation(0, -distance / 2, 0));

    // Then move the cylinder to red sphere
    this.position = vend;

    // Then find the vector between spheres
    var v1 = vend.subtract(vstart);
    v1.normalize();
    var v2 = new BABYLON.Vector3(0, 1, 0);

    // Using cross we will have a vector perpendicular to both vectors
    var axis = BABYLON.Vector3.Cross(v1, v2);
    axis.normalize();
    console.log(axis);

    // Angle between vectors
    var angle = BABYLON.Vector3.Dot(v1, v2);
    console.log("angle: " +angle);

    // Then using axis rotation the result is obvious
    this.rotationQuaternion = BABYLON.Quaternion.RotationAxis(axis, -Math.PI / 2 + angle);

    // Movement attributes
    this.speed = 3;
    this.moveLeft = false;
    this.moveRight = false;

    this._initMovement();

};

Bound.prototype = Object.create(BABYLON.Mesh.prototype);

// une autres ligne mystique
Bound.prototype.constructor = Bound;


Bound.prototype._initMovement = function() {

    var onKeyDown = function(evt) {
        console.log(evt.keyCode);
        if (evt.keyCode == 37) {
            Bound.moveLeft = true;
            Bound.moveRight = false;
        } else if (evt.keyCode == 39) {
            Bound.moveRight = true;
            Bound.moveLeft = false;
        }
    };

    var onKeyUp = function(evt) {
        Bound.moveRight = false;
        Bound.moveLeft = false;
    };

    // Register events
    BABYLON.Tools.RegisterTopRootEvents([{
        name: "keydown",
        handler: onKeyDown
    }, {
        name: "keyup",
        handler: onKeyUp
    }]);
};

Bound.prototype.move = function() {
    if (Bound.moveRight) {
        Bound.position.x += 1;
    }
    if (Bound.moveLeft) {
        Bound.position.x += -1;
    }
};

// The molecular data structure as an undirected Graph

// construct a new molecular graph node (ideally an atom and its further connexion)
var Vertex = function(value) {
    this.value = value;
    this.next = null;
};


// this initialise the  list of adjacent Atoms of the molecule
var AdjacencyList = function() {
    this.head = null;
    this.tail = null;
}

// the molecular graph Data Structure
var Graph = function() {
    this._numOfEdges = 0;
    this._adjacencyLists = {};
};


// Add a new Atom in the list.
AdjacencyList.prototype.add = function(value) {
    var vertex = new Vertex(value);
    if (!this.head && !this.tail) {
        this.head = vertex;
    } else {
        this.tail.next = vertex;
    }
    this.tail = vertex;
};


// Remove the Atom from the list.
AdjacencyList.prototype.remove = function() {
    var detached = null;
    if (this.head === this.tail) {
        return null;
    } else {
        detached = this.head;
        this.head = this.head.next;
        detached.next = null;
        return detached;
    }
};

// Ad a moleular bound between two Atoms
Graph.prototype.addEdge = function(v, w) {
    this._adjacencyLists[v] = this._adjacencyLists[v] ||
        new AdjacencyList();
    this._adjacencyLists[w] = this._adjacencyLists[w] ||
        new AdjacencyList();
    this._adjacencyLists[v].add(w);
    this._adjacencyLists[w].add(v);
    this._numOfEdges++;
};

// return the lists of Atoms within the molecule
Graph.prototype.getVertices = function() {
    return Object.keys(this._adjacencyLists);
};


// Walk Through  the Graph
Graph.prototype.walkGraph = function(atomslist, func) {
    var adjString = '';
    var currentNode = null;
    var vertices = this.getVertices();
        console.log(vertices.length + " vertices, " +
        this._numOfEdges + " edges");
    if (atomslist.length !== vertices.length) {
        return;
    };

    for (var i = 0; i < vertices.length; i++) {
       func(vertices[i],this._adjacencyLists );
    }
};