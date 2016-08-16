define(["jquery","backbone","../models/Vampire"],function(e,t,i){var a=t.View.extend({initialize:function(e){_.bindAll(this,"remove","update_value","save_clicked"),this.redirectRemove=e.redirectRemove||"#characters?all",this.redirectRemove=_.template(this.redirectRemove),this.redirectSave=e.redirectSave||"#character?<%= self.model.id %>",this.redirectSave=_.template(this.redirectSave)},events:{"click .cancel":"cancel",change:"update_value","click .save":"save_clicked",submit:"save_clicked"},cancel:function(t,i,a){var c=this;return e.mobile.loading("show"),window.location.hash=c.redirectRemove({self:c}),!1},update_value:function(e,t,i){var a=this.$(e.target).val();this.model.set("name",a)},save_clicked:function(t,a,c){var r=this,l=r.$el.find('input[name="characterName"]').val();return e.mobile.loading("show"),i.create(l).then(function(e){r.model=e,window.location.hash=r.redirectSave({self:r})},function(e){console.log("Failed to save a character",e.message)}),!1},render:function(){return this.template=_.template(e("script#characterNewView").html())({model:this.model}),this.$el.find("div[role='main']").html(this.template),this.$el.enhanceWithin(),this}});return a});