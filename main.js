var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

HARVESTERS_MIN = 2;
UPGRADERS_MIN = 2;
BUILDERS_MIN = 2;

module.exports.loop = function () {
    //Garbage collection
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory: ', name);
        }
    }

    // Rationalise these building blocks further?
    var worker_types = ['harvester', 'upgrader', 'builder'];
    var workers = {};

    for (var i in worker_types) {
        workers[worker_types[i]] = _.filter(Game.creeps, (creep) => creep.memory.role == worker_types[i]);
        //console.log(JSON.stringify(workers));
    }
    
    if (workers['harvester'].length < HARVESTERS_MIN) {
        var newName = 'Harvester' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName, {memory: {role: 'harvester'}});
    }

    else if (workers['upgrader'].length < UPGRADERS_MIN) {
        var newName = 'Upgrader' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName, {memory: {role: 'upgrader'}});
    }

    else if (workers['builder'].length < BUILDERS_MIN) {
        var newName = 'Builder' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName, {memory: {role: 'builder'}});
    }
    // END

    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️ ' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8}
        );
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        switch(creep.memory.role) {
            case 'harvester':
                roleHarvester.run(creep);
                break;
            case 'upgrader':
                roleUpgrader.run(creep);
                break;
            case 'builder':
                roleBuilder.run(creep);
                break;
            default:
                console.log("No AI applied to creep with role: ", creep.memory.role);
        }
    }
}