var currentOrders = {

    /**
     * Key holding an Array specifying the current orders
     */
    orders: ['energise', Game.spawns['Spawn1']], //'build','upgrade'

    /**
     * get - get the current minion orders
     *
     * @return {Object}  An array with the order, and the target
     */
    get: function() {
        return this.orders;
    },

    /**
     * set - sets new orders for the minions
     *
     * @param  {String} command The command issued to the minions
     * @param  {Object} target  The target specified to act on
     */
    set: function(command, target) {
        if (this.orders[0] != command) {
            console.log("New orders have been issued by the Overlord: " + command);
        }
        this.orders = [command, target];
    }
};

module.exports = currentOrders;