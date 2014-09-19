//deuxiem version
//devra privatiser les champs plutar et ajouter des getter et setter !


Atom = function(name, label, position, scene) {
    //lignes mystiques
    // temp atomdata definition before we get a decent  AtomDataManager() class

        var atomsdef ={ H : {
                                label : "H",
                                type : "Hydrogen",
                                free_elc : 1,
                                radius : 2.7,
                                color : {r:0.8, g:0.8, b:0.8}
                            } ,
                         C : {
                                label : "C",
                                type : "Carbon",
                                free_elc : 4,
                                radius : 4,
                                color : {r:0.2, g:0.2, b:0.2}
                            } ,
                        N : {
                                label : "N",
                                type : "Azote",
                                free_elc : 4,
                                radius : 4,
                                color : {r:0, g:0, b:1}
                            } ,
                        O : {
                                label : "O",
                                type : "Oxygen",
                                free_elc : 2,
                                radius : 4,
                                color : {r:1, g:0, b:0}
                            }
                        } ;


    var atomdata = atomsdef[label];

    BABYLON.Mesh.call(this, "Atom", scene);
    var vd = BABYLON.VertexData.CreateSphere(36, atomdata.radius);
    vd.applyToMesh(this, false);
    // fin lignes mystiques

    this.id = name;
    this.position.x = position.x ;
    this.position.z = position.y ;
    this.position.y = position.z ;
    this.label =atomdata.label;
    this.type =atomdata.type;
    this.free_elc = atomdata.free_elc;
    this.radius = atomdata.radius;
    this.color = atomdata.color;
    this.view ="ball";

    this.material = new BABYLON.StandardMaterial("kosh", scene);
    this.material.diffuseColor = new BABYLON.Color3(atomdata.color.r, atomdata.color.g, atomdata.color.b);


    // Movement attributes
    this.speed = 3;
    this.moveLeft = false;
    this.moveRight = false;

    this._initMovement();

};

Atom.prototype = Object.create(BABYLON.Mesh.prototype);

// une autres ligne mystique
Atom.prototype.constructor = Atom;


Atom.prototype._initMovement = function() {

    var onKeyDown = function(evt) {
        console.log(evt.keyCode);
        if (evt.keyCode == 37) {
            Atom.moveLeft = true;
            Atom.moveRight = false;
        } else if (evt.keyCode == 39) {
            Atom.moveRight = true;
            Atom.moveLeft = false;
        }
    };

    var onKeyUp = function(evt) {
        Atom.moveRight = false;
        Atom.moveLeft = false;
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

Atom.prototype.move = function() {
    if (Atom.moveRight) {
        Atom.position.x += 1;
    }
    if (Atom.moveLeft) {
        Atom.position.x += -1;
    }
};