var dialogContainer = me.Container.extend({
    init: function(content,callback) {
        storage.dlging = true;
        storage.stopped = true;
        this.parentobj = this._super(me.Container, 'init');
        this.isPersistent = true;
        // make sure we use screen coordinates
        this.floating = true;
        // make sure our object is always draw first
        this.z = Infinity;
        this.name = "dialog-quest";
        this.id= me.utils.createGUID();
        this.dlgSpr = this.addChild(new me.Sprite(30,500,{image: me.loader.getImage('dialog')}));
        this.dlgObj = this.addChild(new dialogObject(10, 500,780,100,content,callback,this));
        me.game.world.addChild(this,10);
    },
    closedlg:function(){
        this.removeChildNow(this.dlgSpr);
        this.removeChildNow(this.dlgObj);
        storage.dlging = false;
        storage.stopped = false;
    }
});

var dialogObject = me.Renderable.extend({
    init: function(x, y,w,h,content,callback,parentobj) {
        this._super(me.Renderable, 'init', [x, y,w,h]);
        this.font = new me.Font("宋体", 16, "#fff");
        this.content = content;
        this.callback = callback;
        this.currentRow = 0;
        this.parentobj = parentobj;
    },

    update : function () {
        if (me.input.isKeyPressed('action')) {
            if (++this.currentRow >= this.content.length) {
                this.currentRow = 0;
                if ($.isFunction(this.callback)) {
                    this.callback();
                }
                this.parentobj.closedlg();
            }
            return true;
        }
        return false;
    },

    draw : function (renderer) {
        var textArr = [];
        var textstr = this.content[this.currentRow];
        var texts = this.content[this.currentRow].split('');
        var tl = texts.length;
        var w = 0;
        var start = 0;
        for(var i=0;i<tl;i++){
            var tmpw = this.font.measureText(renderer,texts[i]).width;
            w += tmpw;
            if(w >710){
                textArr.push(textstr.substr(start,i));
                start = i;
                w = 0;
            }
            if(i == (tl-1) && w >0){
                textArr.push(textstr.substr(start));
                w = 0;
            }
        }

        var ah = 0;
        for(var i=0;i<textArr.length;i++){
            this.font.draw(renderer,textArr[i], 40, 510+ah);
            ah +=25;
        }
    }
});
