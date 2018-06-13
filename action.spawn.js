/// <reference path=".\ScreepsAutocomplete\_references.js" />
var currentOrders = require('current.orders');

var actionSpawn = {
    // Reported on console by: JSON.stringify(require('action.spawn')['worker_types']) -- build a module to make nice probe queries?
    worker_types: {'minion': 5, 
                   'overlord': 1},
    workers: {},

    spawn: function() {
        var types = Object.keys(this.worker_types);
        for (var i in types) {
            this.workers[types[i]] = _.filter(Game.creeps, (creep) => creep.memory.role == types[i]);
            //console.log(JSON.stringify(this.workers));
        }

        // Always have a minion
        if (this.workers['minion'].length < 1) {
            var newName = 'Minion' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName, {memory: {role: 'minion'}});
        }
        else if (this.workers['overlord'].length < this.worker_types['overlord']) {
            // Promote the minion with the longest left to live if the overlord count drops as long as at least one will remain, else rush a new Overlord
            if (this.workers['minion'].length >= 2) {
                this.workers['minion'].sort(function(a, b){return (b.ticksToLive) - (a.ticksToLive)});
                this.workers['minion'][0].memory.role = 'overlord';
                console.log('An Overlord has perished. Long live ' + this.workers['minion'][0].name + ', promoted as a new Overlord.')
            }
            else {
                if (currentOrders.get() != ['energise', Game.spawns['Spawn1']]) {
                    currentOrders.set(['energise', Game.spawns['Spawn1']]);
                }
                var newName = 'Overlord' + Game.time;
                Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName, {memory: {role: 'overlord'}});
                console.log('An Overlord has perished. Long live the new Overlord');
            }
        }

        else if (this.workers['minion'].length < this.worker_types['minion']) {
            var newName = 'Minion' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName, {memory: {role: 'minion'}});
        }

        // Display spawn text
        if (Game.spawns['Spawn1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️ ' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.8}
            );
        }
    }
};

module.exports = actionSpawn;