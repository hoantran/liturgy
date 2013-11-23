define(["jquery","db/lineups","views/navigation","views/lineup","db/liturgy","views/medium","db/medium","views/liturgy","views/about","views/editliturgy","views/duplicateliturgy","db/simplifiedliturgy"],function(e,t,n,r,i,s,o,u,a,f,l,c){var h=Backbone.Router.extend({routes:{"":"home",home:"home",about:"about","duplicate/:id":"duplicateLiturgy","edit/:id":"editLiturgy","liturgies/:id":"getLiturgy"},initialize:function(){var e=new o({medium:"guitar",mediumList:["red","green","blue"]}),i=new s({model:e});i.render(),this.lineups=new t,this.lineups.fetch({reset:!0,success:function(e,t){},error:function(e){console.log(e)}}),this.navigationView=new n(this),this.lineupView=new r({collection:this.lineups,router:this}),this.aboutView=new a,this.listenTo(this.lineups,"reset",this.home)},deselectNavigationButtons:function(){e(".navigation-button").removeClass("active")},selectNavigationButton:function(t){this.deselectNavigationButtons(),e(t).addClass("active")},home:function(){var t=e("#navigation");t.empty(),t.append(this.navigationView.render().el);var n=e("#contents");n.empty(),n.append(this.lineupView.render().el)},about:function(){var t=e("#contents");t.empty(),t.append(this.aboutView.render().el)},editLiturgy:function(t){console.log("Router:Edit Lit:",t);var n=new c(t),r=new f({model:n}),i=e("#contents");i.empty(),i.append(r.render().el),this.listenTo(r,"done",this.goHome)},goHome:function(){this.navigate("home",{trigger:!0})},duplicateLiturgy:function(t){console.log("Router:Duplicate Lit:",t);var n=new c(t),r=new l({model:n}),i=e("#contents");i.empty(),i.append(r.render().el),this.listenTo(r,"done",this.goHome)},getLiturgy:function(e){this.liturgy=new i({id:e}),this.liturgy.fetch({success:function(e,t){},error:function(e){}}),this.liturgyView=new u({model:this.liturgy})}});return h});