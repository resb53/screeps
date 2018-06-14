var actionHarvest = {

    /**
     * nearest - Orders the creep to harvest from the nearest source.
     *
     * @param  {Creep} creep The creep that will harvest
     */     
    nearest: function(creep) {
        // Find the closest source that has enough energy for a full refil
        var source = creep.pos.findClosestByPath(FIND_SOURCES, {filter: (source) => source.energy >= creep.carryCapacity});
        if(source && creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ff8888'}});
        }
    }
};

module.exports = actionHarvest;