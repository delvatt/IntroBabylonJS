/* Intro to BabylonJS (version 0.1.0)
 *
 * molecule.js: Moleule definition and management function.
 * For the sake of simplicity, Molecules definitions are
 * hardcoded. A more realistic approach could be to
 * have each molecule definition in its own JSON file
 * to be loaded in the 3D mol viewer (via an Ajax
 * request for exemple) or directly from any Rest
 * service that may provide such a functionality.
 */

Molecule = function(name, type, position, scene) {

    //Hardcoded molecules definitions :-)
    var molsdef = {
        Ethanol: {
            label: "C2H6O",
            type: "Ethanol",
            nb: 9,
            atoms: [
                ['H', -2.0801425360, 0.4329727646, 0.0722817289],
                ['C', -1.2129704155, -0.2295285634, -0.0097156258],
                ['H', -1.2655910941, -0.9539857247, 0.8097953440],
                ['C', 0.0849758188, 0.5590385475, 0.0510545434],
                ['O', 1.2322305822, -0.2731895077, -0.1276123902],
                ['H', 0.1506137362, 1.1200249874, 0.9943015309],
                ['H', 1.2473876659, -0.8998737590, 0.6150681570],
                ['H', 0.1316093068, 1.2841805400, -0.7645223601],
                ['H', -1.2737541560, -0.7748626513, -0.9540587845]
            ],
            bounds: [
                [0, 1],
                [1, 2],
                [1, 3],
                [3, 4],
                [1, 8],
                [4, 6],
                [3, 7],
                [3, 5]
            ]
        },
        Water: {
            label: "H2O",
            type: "Water",
            nb: 3,
            atoms: [
                ['H', -2.0801425360, 0.4329727646, 0.0722817289],
                ['O', -1.2129704155, -0.2295285634, -0.0097156258],
                ['H', -1.2655910941, -0.9539857247, 0.8097953440]
            ],
            bounds: [
                [0, 1],
                [2, 1]
            ]
        }
    };

    this.moldata = molsdef[type];

    BABYLON.Mesh.call(this, "Molecule", scene);


    this.id = name;
    this.position.x = position.x;
    this.position.z = position.y;
    this.position.y = position.z;
    this.label = this.moldata.label;
    this.type = this.moldata.type;
    this.nbAtom = this.moldata.nb;


    this.atoms = [];
    this.bounds = [];

// Put the mol in a "Ball" representation
    this.viewMode = BALL_VIEW_MODE;

    for (var i = 0; i < this.moldata.atoms.length; i++) {
        var atm = new Atom(this.type + ": " + this.moldata.atoms[i][0] + i, this.moldata.atoms[i][0], new BABYLON.Vector3(this.moldata.atoms[i][1], this.moldata.atoms[i][2], this.moldata.atoms[i][3]), scene);
        atm.parent = this;
        this.atoms.push(atm);
    }
    this.scaleUp(INIT_BALL_SCALE_VALUE);
};

Molecule.prototype = Object.create(BABYLON.Mesh.prototype);
Molecule.prototype.constructor = Molecule;

// This function increases the distance between each atoms while keeping the
// molecule's 3D structure and shape coherent
Molecule.prototype.scaleUp = function(scaleValue) {
    // Scale up and shift everything
    var dims = ['x', 'y', 'z'];
    for (var d = 0; d < 3; d++) {
        // Find mean values for each dimension
        var meanValue = 0;
        var dimension = dims[d];
        for (i = 0; i < this.atoms.length; i++) {
            meanValue += this.atoms[i].position[dimension];
        }
        meanValue /= this.atoms.length;
        for (i = 0; i < this.atoms.length; i++) {
            this.atoms[i].position[dimension] = scaleValue * (this.atoms[i].position[dimension] - meanValue);
        }
        console.log(this.atoms.length);
    }
};

// This function decreases the distance between each atoms while keeping the
// molecule's 3D structure and shape coherent
Molecule.prototype.scaleDown = function(scaleValue) {
    // Scale Down and shift everything
    var dims = ['x', 'y', 'z'];
    for (var d = 0; d < 3; d++) {
        // Find mean values for each dimension
        var meanValue = 0;
        var dimension = dims[d];
        for (i = 0; i < this.atoms.length; i++) {
            meanValue += this.atoms[i].position[dimension];
        }
        meanValue /= this.atoms.length;

        for (i = 0; i < this.atoms.length; i++) {
            this.atoms[i].position[dimension] = (this.atoms[i].position[dimension] / scaleValue) + meanValue;
        }
        console.log(this.atoms.length);
    }
};


// Switch 3D representation from 'Ball' to 'Stick and Ball'
Molecule.prototype.fromBallToStickBall = function(scaleValue, scene) {
    // Build the Stick & Ball view from a Ball view
    if ((this.viewMode != BALL_VIEW_MODE) || scaleValue != BALL_AND_STICK_SCALE_VALUE) {
        console.log("fromBallToStickBall: you passed a wrong scaleValue or scaling from a wong viewMode");
        return ; // please, consider throwing an exception instead ! :)
    }

    this.scaleUp(scaleValue) ;
    for (var i = 0; i < this.moldata.bounds.length; i++) {
        var vstart = new BABYLON.Vector3(this.atoms[this.moldata.bounds[i][0]].position.x, this.atoms[this.moldata.bounds[i][0]].position.y, this.atoms[this.moldata.bounds[i][0]].position.z);
        var vend   = new BABYLON.Vector3(this.atoms[this.moldata.bounds[i][1]].position.x, this.atoms[this.moldata.bounds[i][1]].position.y, this.atoms[this.moldata.bounds[i][1]].position.z);
        var bds = new Bound(this.type + ": " + this.atoms[this.moldata.bounds[i][0]] + "-" +this.atoms[this.moldata.bounds[i][1]], vstart, vend, scene);
        bds.parent = this;
        this.bounds.push(bds);
    }
    this.viewMode = BALL_AND_STICK_VIEW_MODE;


};

// Switch 3D representation from 'Stick and Ball' to 'Ball'
Molecule.prototype.fromStickBallToBall = function(scaleValue, scene) {
    // Build the Stick & Ball view from a Ball view
    if ((this.viewMode != BALL_AND_STICK_VIEW_MODE ) || scaleValue != BALL_AND_STICK_SCALE_VALUE) {
        console.log("fromBallToStickBall: you passed a wrong scaleValue or scaling from a wong viewMode");
        return ; // please, consider throwing an exception instead ! :)
    }
    for (var i = 0; i < this.bounds.length; i++) {
    this.bounds[i].dispose() ;
    }
    this.bounds = [] ;
    this.scaleDown(scaleValue) ;
    this.viewMode = BALL_VIEW_MODE ;
};


Molecule.prototype._initMovement = function() {
    var onKeyDown = function(evt) {
        console.log(evt.keyCode);
        if (evt.keyCode == 37) {
            Molecule.moveLeft = true;
            Molecule.moveRight = false;
        } else if (evt.keyCode == 39) {
            Molecule.moveRight = true;
            Molecule.moveLeft = false;
        }
    };

    var onKeyUp = function(evt) {
        Molecule.moveRight = false;
        Molecule.moveLeft = false;
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

Molecule.prototype.move = function() {
    if (Molecule.moveRight) {
        Molecule.position.x += 1;
    }
    if (Molecule.moveLeft) {
        Molecule.position.x += -1;
    }
};
