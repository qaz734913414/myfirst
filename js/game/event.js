var evtps = {
	events:{},
	pub:function (topic,args,context) {
		var evtcontext = context || window,
		subs = evtcontext.evtps.events[topic],
		len = subs ? subs.length : 0;
		while (len--) {
		  subs[len].apply(evtcontext, args || []);
		}
	},
    pubs:function (topics,args,context) {
        if(topics instanceof Array) {
            $.each(topics, function(topic) {
                evtps.pub(topic,args,context);
            });
        }else{
            evtps.pub(topic,args,context);
        }
    },
	sub:function (topic,callback) {
		if (!evtps.events[topic]) {
            evtps.events[topic] = [];
		}
        evtps.events[topic].push(callback);
		return [topic, callback]; 
	},
	unsub:function (handle,callback) {
		var subs = evtps.events[callback ? handle : handle[0]],
		callback = callback || handle[1],
		len = subs ? subs.length : 0;
		while (len--) {
			if (subs[len] === callback) {
			subs.splice(len, 1);
			}
		}
	},
    unsub:function (handle,fun,callback) {
        var subs = evtps.events[fun ? handle : handle[0]],
            fun = fun || handle[1],
            len = subs ? subs.length : 0;
        while (len--) {
            if (subs[len] === fun) {
                subs.splice(len, 1);
            }
        }
        if(callback){
            callback();
        }
    }
};
var topic = {
    player_lvl_change:'player/lvl/change',
    player_hp_change:'player/hp/change',
    player_death:'player/death',
    player_armor_change:'player/armor/change',
    player_notice_change:'player/notice/change',
    player_gold_change:'player/gold/change',
    player_exp_change:'player/exp/change',
    player_kill_enemy:'player/kill/enemy'
}