var roleMinion = require('role.minion');
var roleOverlord = require('role.overlord');
var currentOrders = require('current.orders');

OVERLORDS_MIN = 1;
MINIONS_MIN = 5;

module.exports.loop = function () {
    //Garbage collection
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory: ', name);
        }
    }

    // Rationalise these building blocks further?
    var worker_types = ['minion', 'overlord'];
    var workers = {};

    for (var i in worker_types) {
        workers[worker_types[i]] = _.filter(Game.creeps, (creep) => creep.memory.role == worker_types[i]);
        //console.log(JSON.stringify(workers));
    }

    // Always have a minion
    if (workers['minion'].length < 1) {
        var newName = 'Minion' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName, {memory: {role: 'minion'}});
    }
    else if (workers['overlord'].length < OVERLORDS_MIN) {
        // Force workers to spawn a new Overlord if not already
        if (currentOrders.get() != ['energise', Game.spawns['Spawn1']]) {
            currentOrders.set(['energise', Game.spawns['Spawn1']]);
            console.log('An Overlord has perished. Long live the new Overlord');
        }
        var newName = 'Overlord' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName, {memory: {role: 'overlord'}});
    }

    else if (workers['minion'].length < MINIONS_MIN) {
        var newName = 'Minion' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName, {memory: {role: 'minion'}});
    }

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
            case 'minion':
                roleMinion.run(creep);
                break;
            case 'overlord':
                roleOverlord.run(creep);
                break;
            default:
                console.log("No AI applied to creep with role: ", creep.memory.role);
        }
    }
}