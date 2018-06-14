var actionConstruct = {

    /**
     * Hash of currently available sites that can be placed.
     */
    structures_available: {},

    /** Returns array of structureTypes and how many can be built */

    /**
     * getAvailable - gets a hash of the max number of sites that can be placed.
     *
     * @return {Object}  Hash with structureTypes and number of sites that can be placed.
     */
    getAvailable: function() {
        return this.structures_available;
    },

    /**
     * updateAvailable - update the current count of what sites can be placed
     */
    updateAvailable: function() {
        // Check current room controller level
        let room = Game.spawns['Spawn1'].room;
        let level = room.controller.level;

        // Get the maximum number available for each structure
        let buildable = {};
        for (let type in CONTROLLER_STRUCTURES) {
            buildable[type] = CONTROLLER_STRUCTURES[type][level];
        }

        // Subtract any already constructing or built
        let structures = room.find(FIND_MY_STRUCTURES, { filter: (structure) => structure.room == room });
        let constructions = room.find(FIND_MY_CONSTRUCTION_SITES, { filter: (site) => site.room == room });

        for (let i in structures) {
            let item = structures[i];
            if (item.structureType in buildable) {
                buildable[item.structureType]--;
            }
        }

        for (let item in constructions) {
            let item = constructions[i];
            if (item.structureType in buildable) {
                buildable[item.structureType]--;
            }
        }

        this.structures_available = buildable;
    }
};

module.exports = actionConstruct;