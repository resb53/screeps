var currentOrders = require('current.orders');
var randomNames = require('random.names');

var actionSpawn = {

    /**
     * Hash of number of desired living workers
     */
    worker_types: {'minion': 5,
                   'overlord': 1},

    /**
     * Hash of currently living workers
     */
    workers: {},

    /**
     * Flag for whether a spawn has been reported yet
     */
    spawnReported: false,

    /**
     * run - Function to run each tick to see what spawns are needed
     */
    run: function() {
        var types = Object.keys(this.worker_types);
        for (var i in types) {
            this.workers[types[i]] = _.filter(Game.creeps, (creep) => creep.memory.role == types[i]);
            //console.log(JSON.stringify(this.workers));
        }

        // Always have a minion
        if (this.workers['minion'].length < 1) {
            this.spawn('Spawn1', [WORK,CARRY,MOVE,MOVE], {memory: {role: 'minion'}});
        }
        else if (this.workers['overlord'].length < this.worker_types['overlord']) {
            // Promote the minion with the longest left to live if the overlord count drops as long as at least one will remain, else rush a new Overlord
            if (this.workers['minion'].length >= 2) {
                this.workers['minion'].sort(function(a, b){return (b.ticksToLive) - (a.ticksToLive)});
                this.workers['minion'][0].memory.role = 'overlord';
                console.log('An Overlord has perished. Long live ' + this.workers['minion'][0].name + ', promoted as a new Overlord.')
            }
            else {
                if (currentOrders.get()[0] != 'energise') {
                    //Possible bug here? Is there ever a time when they could be energising, but ignoring the spawn?
                    currentOrders.set(['energise', Game.spawns['Spawn1']]);
                }
                //Report (unless we only have 1 minion - reduce early game spam! -- maybe a better way to do this, memory to report things only once?)
                if (this.workers['minion'].length >= 2) {
                    console.log('An Overlord has perished. Long live the new Overlord');
                }
                this.spawn('Spawn1', [WORK,CARRY,MOVE,MOVE], {memory: {role: 'overlord'}});
            }
        }

        else if (this.workers['minion'].length < this.worker_types['minion']) {
            this.spawn('Spawn1', [WORK,CARRY,MOVE,MOVE], {memory: {role: 'minion'}});
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
            //Report new spawn once
            if (!this.spawnReported) {
                this.spawnReported = true;
                console.log('Spawning a new ' + spawningCreep.memory.role + ': ' + spawningCreep.name);
            }
        }
        else {
            this.spawnReported = false;
        }
    },

    /**
     * spawn - Spawn a certain creep at a certain spawn
     *
     * @param  {String} Spawn The spawn name
     * @param  {String[]} build The build of the creep
     * @param  {Object} [opts]  Options
     */
    spawn: function(Spawn, build, opts) {
        if (opts) {
            while (Game.spawns[Spawn].spawnCreep(build, randomNames.get(), opts) == ERR_NAME_EXISTS) {}
        }
        else{
            while (Game.spawns[Spawn].spawnCreep(build, randomNames.get()) == ERR_NAME_EXISTS) {}
        }
    }
};

module.exports = actionSpawn;