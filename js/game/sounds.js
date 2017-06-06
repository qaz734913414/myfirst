var audioManager = Object.extend({
	init: function() {
		this.soundList = {};
		this.enabled = true;
        this.curSoundId = null;
        //evtps.sub(topic.sound_play_id,this.playSoundId);
	},
	toggle: function() {
		if(this.enabled) {
			this.enabled = false;
		
			if(this.currentMusic) {
				this.resetMusic(this.currentMusic);
			}
		} else {
			this.enabled = true;
		
			if(this.currentMusic) {
				this.currentMusic = null;
			}
			this.updateMusic();
		}
	},
	aiPlaySound:function() {
        var self = this;
		if(!self.curSoundId){
            self.curSoundId = Math.floor(Math.random()*7+1);

			if(!self.soundList[self.curSoundId]){
                self.soundList[self.curSoundId]=self.curSoundId;
				me.loader.load({
					name   : self.curSoundId,
					type   : "audio",
					src    : "data/bgm/"
				}, function () {
					me.audio.play(self.curSoundId,false,function(){self.curSoundId = null;window.setTimeout(self.aiPlaySound,15000);},0.1);
				});
			}else{
				me.audio.play(self.curSoundId,false,function(){self.curSoundId = null;window.setTimeout(self.aiPlaySound,15000);},0.1);
			}
		}
	},
	playSoundId:function(sound_id,loop,callback){
		me.audio.play(sound_id,loop,callback);
	},
	stopSound:function(name){
		me.audio.stop(name);
	}
});