define(["jquery","backbone","backform","marionette"],function(e,l,a,t){var n=t.ItemView.extend({tagName:"form",template:_.template(""),initialize:function(e){var l=this;this.form=new a.Form({el:this.$el,model:l.model,fields:[{name:"font_size",label:"Font Size",control:"select",options:[{label:"50%",value:50},{label:"60%",value:60},{label:"70%",value:70},{label:"80%",value:80},{label:"90%",value:90},{label:"100%",value:100},{label:"110%",value:110},{label:"120%",value:120},{label:"130%",value:130},{label:"140%",value:140},{label:"150%",value:150}]},{name:"exclude_extended",label:"Exclude Extended Print Text",control:"checkbox"}],events:{submit:function(e){e.preventDefault()}}})},onRender:function(){return this.form.render(),this.$el.enhanceWithin(),this}});return n});