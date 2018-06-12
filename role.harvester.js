var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            //Update to find the CLOSEST, non-depleted source (beyond a certain sensible limit (carrymax x2?))
            //Also breakout into a separate function so this can be controlled in one place for all creeps wanting energy?
            //var sources = creep.room.find(FIND_SOURCES);
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if(source && creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ff8888'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION 
                             || structure.structureType == STRUCTURE_SPAWN) 
                             && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#88ff88'}});
                }
            }
        }
    }
};

module.exports = roleHarvester;