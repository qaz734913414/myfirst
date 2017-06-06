var doorEntity = me.Entity.extend({
    "init" : function (x,y,settings) {
        this._super(me.Entity, 'init', [x, y , settings]);
        this.body.collisionType = me.collision.types.ACTION_OBJECT;
        this.body.gravity = 0;
        this.to = settings.to;
        this.location = settings.location;
        this.dir_name = settings.dir_name;
    },
    onCollision : function (response, other) {
        var self = this;
        switch (other.body.collisionType) {
            case me.collision.types.PLAYER_OBJECT:
                self.body.setCollisionMask(me.collision.types.NO_OBJECT);
                storage.setMap(self.to);
                me.game.onLevelLoaded = function onLevelLoaded() {
                    self.onLevelLoaded();
                };
                me.levelDirector.loadLevel(self.to);
                return true;
            default:
                return false;
        }
    },
    onLevelLoaded : function() {
        var taoist = me.game.world.getChildByProp('id','taoist')[0];
        if(taoist){
            if(this.location){
                var p = this.location.split(",").map(function map(value) {
                    return +value.trim();
                });
                taoist.pos._x = p[0];
                taoist.pos._y = p[1];
            }
            if(this.dir_name){
                taoist.renderable.setCurrentAnimation("stand_" + this.dir_name);
            }
        }
    }
});