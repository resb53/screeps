var currentOrders = {
    orders: ['energise', Game.spawns['Spawn1']], //'build','upgrade'
    get: function() {
        return this.orders;
    },
    /** @param {String} command 
     *  @param {Structure} target **/
    set: function(command, target) {
        this.orders = [command, target];
    }
};

module.exports = currentOrders;