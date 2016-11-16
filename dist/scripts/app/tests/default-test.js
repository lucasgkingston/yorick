define(["underscore","jquery","parse","../models/Vampire","backbone","marionette","../models/Troupe","../models/SimpleTrait","../testsiteconfig","../models/Werewolf"],function(e,t,n,i,o,c,a,r,s,p){jasmine.DEFAULT_TIMEOUT_INTERVAL=6e4;var u=function(){n.$=t,n.initialize("APPLICATION_ID","yymp8UWnJ7Va32Y2Q4uzvWxfPTYuDvZSA8kdhmdR"),n.serverURL=s.serverURL},g=[{name:"Vampire",template:i},{name:"Werewolf",template:p}];describe("A suite",function(){it("contains spec with an expectation",function(){expect(!0).toBe(!0)})});var _=function(){return u(),e.eq(n.User.current().get("username"),"devuser")?n.Promise.as(n.User.current()):n.User.logIn("devuser","thedumbness")},f=function(){return u(),e.eq(n.User.current().get("username"),"sampmem")?n.Promise.as(n.User.current()):n.User.logIn("sampmem","sampmem")},d=function(){return u(),e.eq(n.User.current().get("username"),"sampast")?n.Promise.as(n.User.current()):n.User.logIn("sampast","sampast")};describe("Parse",function(){beforeAll(function(){u(),n.User.current()&&n.User.logOut()}),it("isn't logged in",function(){expect(n.User.current()).toBe(null)}),it("can fail to log in",function(e){n.User.logIn("devuser","thewrongness").then(function(t){e.fail("Logged in with bad password")},function(t,n){e(n)})}),it("can log in",function(e){n.User.logIn("devuser","thedumbness").then(function(t){e()},function(t,n){e.fail(n)})})}),e.each(g,function(t){describe("A "+t.name+"'s traits",function(){var i,o;beforeAll(function(e){_().then(function(){return t.template.create_test_character("vampiretraits")}).then(function(e){return o=5,t.template.get_character(e.id)}).then(function(t){i=t,e()},function(t){e.fail(t)})}),it("show up in the history",function(e){i.get_recorded_changes().done(function(e){return expect(e.models.length).toBe(o),i.update_trait("Haven",1,"backgrounds",0,!0)}).done(function(e){return o++,i.get_recorded_changes()}).done(function(e){return expect(e.models.length).toBe(o),i.update_trait("Haven",1,"backgrounds",0,!0)}).done(function(e){return i.get_recorded_changes()}).done(function(e){return expect(e.models.length).toBe(o),i.update_trait("Haven",2,"backgrounds",0,!0)}).done(function(e){return o++,i.get_recorded_changes()}).done(function(t){expect(t.models.length).toBe(o),e()}).fail(function(t){e.fail(t)})}),it("can be renamed",function(t){var n=o;i.update_trait("Retainers",1,"backgrounds",0,!0).done(function(e){return o++,e.set("name","Retainers: Specialized Now"),i.update_trait(e)}).done(function(e){return o++,e.set("name","Retainers: Specialized Again"),e.set("value",4),i.update_trait(e)}).done(function(e){return o++,e.set("value",5),i.update_trait(e)}).done(function(){return o++,i.update_trait("Retainers: Specialized Now",2,"backgrounds",0,!0)}).done(function(){return o++,i.update_trait("Retainers",3,"backgrounds",0,!0)}).done(function(){return o++,i.update_trait("Retainers: Specialized Now",4,"backgrounds",0,!0)}).done(function(){return o++,i.update_trait("Retainers",4,"backgrounds",0,!0)}).done(function(){return o++,i.get_recorded_changes()}).done(function(t){expect(t.models.length).toBe(o),e(t.models).slice(n,t.length).each(function(t,n){expect(t.get("name")).not.toBe(void 0);var i=t.get("name"),o=e.startsWith(i,"Retainers");o&&(0==n?(expect(t.get("type")).toBe("define"),expect(t.get("value")).toBe(1),expect(t.get("cost")).toBe(1)):1==n?(expect(t.get("type")).toBe("update"),expect(t.get("value")).toBe(1),expect(t.get("cost")).toBe(1),expect(t.get("name")).toBe("Retainers: Specialized Now"),expect(t.get("old_text")).toBe("Retainers")):2==n?(expect(t.get("type")).toBe("update"),expect(t.get("value")).toBe(4),expect(t.get("cost")).toBe(10),expect(t.get("name")).toBe("Retainers: Specialized Again"),expect(t.get("old_text")).toBe("Retainers: Specialized Now")):3==n?(expect(t.get("type")).toBe("update"),expect(t.get("old_value")).toBe(4),expect(t.get("value")).toBe(5),expect(t.get("old_cost")).toBe(10),expect(t.get("cost")).toBe(15),expect(t.get("name")).toBe("Retainers: Specialized Again"),expect(t.get("old_text")).toBe("Retainers: Specialized Again")):4==n?(expect(t.get("type")).toBe("define"),expect(t.get("value")).toBe(2),expect(t.get("cost")).toBe(3),expect(t.get("name")).toBe("Retainers: Specialized Now")):5==n?(expect(t.get("type")).toBe("define"),expect(t.get("value")).toBe(3),expect(t.get("cost")).toBe(6),expect(t.get("name")).toBe("Retainers")):6==n?(expect(t.get("type")).toBe("update"),expect(t.get("value")).toBe(4),expect(t.get("old_value")).toBe(2),expect(t.get("old_cost")).toBe(3),expect(t.get("cost")).toBe(10),expect(t.get("name")).toBe("Retainers: Specialized Now"),expect(t.get("old_text")).toBe("Retainers: Specialized Now")):7==n&&(expect(t.get("type")).toBe("update"),expect(t.get("value")).toBe(4),expect(t.get("old_value")).toBe(3),expect(t.get("old_cost")).toBe(6),expect(t.get("cost")).toBe(10),expect(t.get("name")).toBe("Retainers"),expect(t.get("old_text")).toBe("Retainers")))})}).done(function(){t()}).fail(function(e){t.fail(e)})}),it("can't be renamed to collide",function(e){var t,n;i.update_trait("Retainers: Classic",1,"backgrounds",0,!0).done(function(e){return t=e,i.update_trait("Retainers: Not Classic",2,"backgrounds",0,!0)}).done(function(e){return n=e,n.set("name","Retainers: Classic"),i.update_trait(n)}).done(function(){e.fail("Allowed the rename to be persisted")}).fail(function(t){expect(t.code).toBe(1),expect(n.get("name")).toBe("Retainers: Not Classic"),e()})}),it("can fail to be removed",function(e){var t=r.prototype.destroy;r.prototype.destroy=function(){return n.Promise.error({})},i.get_trait_by_name("backgrounds","Haven").then(function(n){return i.remove_trait(n).then(function(){r.prototype.destroy=t,e.fail("Successfully removed a trait while destroy was broken")},function(n){r.prototype.destroy=t,i.get_trait_by_name("backgrounds","Haven").then(function(t){expect(t.get("value")).toBe(2),expect(t.get("free_value")).toBe(0),e()},function(t){e.fail(t)})})})}),it("can be removed",function(e){i.get_trait_by_name("backgrounds","Haven").then(function(e){return expect(e).toBeDefined(),expect(e.id).toBeDefined(),i.remove_trait(e)}).then(function(){return i.get_trait_by_name("backgrounds","Haven")}).then(function(t){expect(t).toBeUndefined(),e()}).fail(function(t){e.fail("Failed to remove the trait "+JSON.stringify(t))})})})}),describe("A Vampire's creation",function(){var t;beforeAll(function(e){_().then(function(){return i.create_test_character("vampirecreation")}).then(function(e){return i.get_character(e.id)}).then(function(n){t=n,e()},function(t){e.fail(t)})}),it("can pick a clan",function(e){t.update_text("clan","TestClan").then(function(){expect(t.get("clan")).toBe("TestClan"),e()},function(t){e.fail(t)})}),it("can repick a clan",function(e){t.update_text("clan","DifferentClan").then(function(){expect(t.get("clan")).toBe("DifferentClan"),e()},function(t){e.fail(t)})}),it("can pick Physical as a primary attribute",function(e){var n=t.get("creation");expect(n.get("attributes_7_remaining")).toBe(1),expect(n.get("attributes_7_picks")).toBe(void 0),t.update_trait("Physical",7,"attributes",7,!0).then(function(e){return expect(t.get("creation").get("attributes_7_remaining")).toBe(0),expect(t.get("creation").get("attributes_7_picks").length).toBe(1),expect(t.get("creation").get("attributes_7_picks")[0].get("name")).toBe("Physical"),expect(t.get("creation").get("attributes_7_picks")[0].get("value")).toBe(7),t.get_trait("attributes",e.id||e.cid)}).then(function(t){expect(t).not.toBe(void 0),expect(t.get("name")).toBe("Physical"),expect(t.get("value")).toBe(7),e()},function(t){e.fail(t)})}),it("can unpick Physical as a primary attribute",function(n){expect(t.get("creation").get("attributes_7_remaining")).toBe(0),expect(t.get("creation").get("attributes_7_picks").length).toBe(1);var i=e.first(t.get("creation").get("attributes_7_picks"));t.get_trait("attributes",i.id).then(function(e){return expect(e.get("name")).toBe("Physical"),expect(e.get("value")).toBe(7),t.unpick_from_creation("attributes",i.id,7,!0)}).then(function(){expect(t.get("creation").get("attributes_7_remaining")).toBe(1),expect(t.get("creation").get("attributes_7_picks").length).toBe(0),expect(t.get("attributes").length).toBe(0),n()},function(e){n.fail(e)})}),it("can pick a Physical focus",function(e){var n=t.get("creation");expect(n.get("focus_physicals_1_remaining")).toBe(1),expect(n.get("focus_physicals_1_picks")).toBe(void 0),t.update_trait("Dexterity",1,"focus_physicals",1,!0).then(function(e){return expect(t.get("creation").get("focus_physicals_1_remaining")).toBe(0),expect(t.get("creation").get("focus_physicals_1_picks").length).toBe(1),expect(t.get("creation").get("focus_physicals_1_picks")[0].get("name")).toBe("Dexterity"),expect(t.get("creation").get("focus_physicals_1_picks")[0].get("value")).toBe(1),t.get_trait("focus_physicals",e)}).then(function(t){expect(t).not.toBe(void 0),expect(t.get("name")).toBe("Dexterity"),expect(t.get("value")).toBe(1),console.log(JSON.stringify(t._saving)),e()},function(t){e.fail(t)})}),it("can repick a Physical focus",function(n){expect(t.get("creation").get("focus_physicals_1_remaining")).toBe(0),expect(t.get("creation").get("focus_physicals_1_picks").length).toBe(1);var i=e.first(t.get("creation").get("focus_physicals_1_picks"));t.get_trait("focus_physicals",i).then(function(e){return expect(e.get("name")).toBe("Dexterity"),expect(e.get("value")).toBe(1),t.unpick_from_creation("focus_physicals",e,1,!0)}).then(function(){return expect(t.get("creation").get("focus_physicals_1_remaining")).toBe(1),expect(t.get("creation").get("focus_physicals_1_picks").length).toBe(0),expect(t.get("focus_physicals").length).toBe(0),t.update_trait("Stamina",1,"focus_physicals",1,!0)}).then(function(e){return expect(t.get("creation").get("focus_physicals_1_remaining")).toBe(0),expect(t.get("creation").get("focus_physicals_1_picks").length).toBe(1),expect(t.get("creation").get("focus_physicals_1_picks")[0].get("name")).toBe("Stamina"),expect(t.get("creation").get("focus_physicals_1_picks")[0].get("value")).toBe(1),t.get_trait("focus_physicals",e)}).then(function(e){expect(e).not.toBe(void 0),expect(e.get("name")).toBe("Stamina"),expect(e.get("value")).toBe(1),n()},function(e){n.fail(e)})}),it("can unpick a Physical focus",function(n){expect(t.get("creation").get("focus_physicals_1_remaining")).toBe(0),expect(t.get("creation").get("focus_physicals_1_picks").length).toBe(1);var i=e.first(t.get("creation").get("focus_physicals_1_picks"));t.get_trait("focus_physicals",i).then(function(e){return expect(e.get("name")).toBe("Stamina"),expect(e.get("value")).toBe(1),t.unpick_from_creation("focus_physicals",e,1,!0)}).then(function(){expect(t.get("creation").get("focus_physicals_1_remaining")).toBe(1),expect(t.get("creation").get("focus_physicals_1_picks").length).toBe(0),expect(t.get("focus_physicals").length).toBe(0),n()},function(e){n.fail(e)})}),it("can pick a merit",function(e){var n=t.get("creation");expect(n.get("merits_0_remaining")).toBe(7),expect(n.get("merits_0_picks")).toBe(void 0),t.update_trait("Bloodline: Coyote",2,"merits",0,!0).then(function(e){return expect(t.get("creation").get("merits_0_remaining")).toBe(5),expect(t.get("creation").get("merits_0_picks").length).toBe(1),expect(t.get("creation").get("merits_0_picks")[0].get("name")).toBe("Bloodline: Coyote"),expect(t.get("creation").get("merits_0_picks")[0].get("value")).toBe(2),t.get_trait("merits",e)}).then(function(t){expect(t).not.toBe(void 0),expect(t.get("name")).toBe("Bloodline: Coyote"),expect(t.get("value")).toBe(2),e()},function(t){e.fail(t)})}),it("can change the value of a picked merit",function(e){var n=t.get("creation");expect(n.get("merits_0_remaining")).toBe(5),expect(n.get("merits_0_picks").length).toBe(1),t.update_trait("Bloodline: Coyote",3,"merits",0,!0).then(function(e){return expect(t.get("creation").get("merits_0_remaining")).toBe(4),expect(t.get("creation").get("merits_0_picks").length).toBe(1),expect(t.get("creation").get("merits_0_picks")[0].get("name")).toBe("Bloodline: Coyote"),expect(t.get("creation").get("merits_0_picks")[0].get("value")).toBe(3),t.get_trait("merits",e)}).then(function(t){expect(t).not.toBe(void 0),expect(t.get("name")).toBe("Bloodline: Coyote"),expect(t.get("value")).toBe(3),e()},function(t){e.fail(t)})}),it("can unpick a merit with a changed value",function(n){expect(t.get("creation").get("merits_0_remaining")).toBe(4),expect(t.get("creation").get("merits_0_picks").length).toBe(1);var i=e.first(t.get("creation").get("merits_0_picks"));t.get_trait("merits",i).then(function(e){return expect(e.get("name")).toBe("Bloodline: Coyote"),expect(e.get("value")).toBe(3),t.unpick_from_creation("merits",e,0,!0)}).then(function(){expect(t.get("creation").get("merits_0_remaining")).toBe(7),expect(t.get("creation").get("merits_0_picks").length).toBe(0),expect(t.get("merits").length).toBe(0),n()},function(e){n.fail(e)})})}),describe("A Werewolf's creation",function(){var t;beforeAll(function(e){_().then(function(){return p.create_test_character("vampirecreation")}).then(function(e){return p.get_character(e.id)}).then(function(n){t=n,e()},function(t){e.fail(t)})}),it("can pick a clan",function(e){t.update_text("clan","TestClan").then(function(){expect(t.get("clan")).toBe("TestClan"),e()},function(t){e.fail(t)})}),it("can pick a merit",function(e){var n=t.get("creation");expect(n.get("wta_merits_0_remaining")).toBe(7),expect(n.get("wta_merits_0_picks")).toBe(void 0),t.update_trait("Bloodline: Coyote",2,"wta_merits",0,!0).then(function(e){return expect(t.get("creation").get("wta_merits_0_remaining")).toBe(5),expect(t.get("creation").get("wta_merits_0_picks").length).toBe(1),expect(t.get("creation").get("wta_merits_0_picks")[0].get("name")).toBe("Bloodline: Coyote"),expect(t.get("creation").get("wta_merits_0_picks")[0].get("value")).toBe(2),t.get_trait("wta_merits",e)}).then(function(t){expect(t).not.toBe(void 0),expect(t.get("name")).toBe("Bloodline: Coyote"),expect(t.get("value")).toBe(2),e()},function(t){e.fail(t)})}),it("can change the value of a picked merit",function(e){var n=t.get("creation");expect(n.get("wta_merits_0_remaining")).toBe(5),expect(n.get("wta_merits_0_picks").length).toBe(1),t.update_trait("Bloodline: Coyote",3,"wta_merits",0,!0).then(function(e){return expect(t.get("creation").get("wta_merits_0_remaining")).toBe(4),expect(t.get("creation").get("wta_merits_0_picks").length).toBe(1),expect(t.get("creation").get("wta_merits_0_picks")[0].get("name")).toBe("Bloodline: Coyote"),expect(t.get("creation").get("wta_merits_0_picks")[0].get("value")).toBe(3),t.get_trait("wta_merits",e)}).then(function(t){expect(t).not.toBe(void 0),expect(t.get("name")).toBe("Bloodline: Coyote"),expect(t.get("value")).toBe(3),e()},function(t){e.fail(t)})}),it("can unpick a merit with a changed value",function(n){expect(t.get("creation").get("wta_merits_0_remaining")).toBe(4),expect(t.get("creation").get("wta_merits_0_picks").length).toBe(1);var i=e.first(t.get("creation").get("wta_merits_0_picks"));t.get_trait("wta_merits",i).then(function(e){return expect(e.get("name")).toBe("Bloodline: Coyote"),expect(e.get("value")).toBe(3),t.unpick_from_creation("wta_merits",e,0,!0)}).then(function(){expect(t.get("creation").get("wta_merits_0_remaining")).toBe(7),expect(t.get("creation").get("wta_merits_0_picks").length).toBe(0),expect(t.get("wta_merits").length).toBe(0),n()},function(e){n.fail(e)})})}),e.each(g,function(t){describe("A "+t.name+"'s experience history",function(){var i;beforeAll(function(e){_().then(function(){return t.template.create_test_character("experiencehistory")}).then(function(e){return t.template.get_character(e.id)}).then(function(t){i=t,e()},function(t){e.fail(t)})}),it("got initial xp",function(t){i.get_experience_notations().then(function(n){var i=e.last(n.models);expect(i.get("reason")).toBe("Character Creation XP"),expect(i.get("alteration_earned")).toBe(30),t()})}),it("reports initial xp",function(){expect(i.experience_available()).toBe(30),expect(i.get("experience_earned")).toBe(30),expect(i.get("experience_spent")).toBe(0)}),it("updates listeners on add",function(t){var n=o.View.extend({initialize:function(){e.bindAll(this,"finish")},finish:function(n){var o=this;expect(n.get("reason")).toBe("meet hands"),expect(n.get("alteration_earned")).toBe(24),i.get_experience_notations().then(function(n){var i=e.first(n.models);expect(i.get("reason")).toBe("meet hands"),expect(i.get("alteration_earned")).toBe(24),expect(i.get("earned")).toBe(54),o.stopListening(),t()})}});l=new n,i.get_experience_notations(function(e){l.listenTo(e,"add",l.finish),i.add_experience_notation({reason:"meet hands",alteration_earned:24})})}),it("can be quickly sequential",function(t){var o=e.map(e.range(1,20),function(e){return i.add_experience_notation({alteration_earned:e,alteration_spent:e})});n.Promise.when(o).then(function(){i.get_experience_notations().then(function(n){var o=(e.map(n.models,"attributes.alteration_earned"),e.dropRight(n.models,2)),c=54,a=c,r=1;e.eachRight(o,function(e){c+=r,expect(e.get("alteration_earned")).toBe(r),expect(e.get("alteration_spent")).toBe(r),expect(e.get("earned")).toBe(c),expect(e.get("spent")).toBe(c-a),r+=1}),expect(i.experience_available()).toBe(a),expect(i.get("experience_earned")).toBe(c),expect(i.get("experience_spent")).toBe(c-a),t()})},function(n){e.each(n,function(e){console.log("Failed to add experience notations"+e.message)}),t.fail()})}),it("can remove the top most",function(e){i.get_experience_notations().then(function(e){return i.remove_experience_notation(e.at(0))}).then(function(){return expect(i.experience_available()).toBe(54),expect(i.get("experience_earned")).toBe(225),expect(i.get("experience_spent")).toBe(171),i.fetch_experience_notations()}).then(function(t){expect(t.at(0).get("alteration_earned")).toBe(18),expect(t.at(0).get("alteration_spent")).toBe(18),e()},function(t){e.fail(t.message)})}),it("can remove a middle one",function(e){i.get_experience_notations().then(function(e){return i.remove_experience_notation(e.at(e.models.length-3))}).then(function(){expect(i.experience_available()).toBe(54),expect(i.get("experience_earned")).toBe(224),expect(i.get("experience_spent")).toBe(170),e()},function(t){e.fail(t.message)})}),it("can remove a middle one by trigger",function(t){var n=o.View.extend({initialize:function(){e.bindAll(this,"finish")},finish:function(){var e=this;e.stopListening(),expect(i.experience_available()).toBe(54),expect(i.get("experience_earned")).toBe(222),expect(i.get("experience_spent")).toBe(168),t()}});l=new n,l.listenTo(i,"finish_experience_notation_propagation",l.finish),i.get_experience_notations().then(function(e){return i.remove_experience_notation(e.at(e.models.length-3))},function(e){t.fail(e.message)})}),it("can update a middle one by trigger",function(t){var n=o.View.extend({initialize:function(){e.bindAll(this,"finish")},finish:function(){var e=this;e.stopListening(),expect(i.experience_available()).toBe(54),expect(i.get("experience_earned")).toBe(221),expect(i.get("experience_spent")).toBe(167),t()}});l=new n,l.listenTo(i,"finish_experience_notation_propagation",l.finish),i.get_experience_notations().then(function(t){console.log(e.map(t.models,"attributes.earned"));var n=t.at(t.models.length-3);return n.save({alteration_spent:2,alteration_earned:2})},function(e){t.fail(e.message)})}),it("can add a middle one",function(){})})}),e.each(g,function(t){describe("A "+t.name+" Troupe Member",function(){var o,c=s.SAMPLE_TROUPE_ID;beforeAll(function(e){f().then(function(){return expect(n.User.current().get("username")).toBe("sampmem"),t.template.create_test_character("troupemember")}).then(function(e){return t.template.get_character(e.id)}).then(function(t){o=t,e()},function(t){e.fail(t)})}),it("can add a vampire",function(t){var n=new a({id:c});console.log("Created the troupe object with id "+c),n.fetch().then(function(n){return console.log("Found the troupe. Making the vampire join the troupe."),o.join_troupe(n).then(function(){console.log("Joined the troupe. Getting the ACL");var e=o.get_me_acl();console.log("Checking the ACLs"),expect(e.getRoleWriteAccess("LST_"+c)).toBe(!0),expect(e.getRoleReadAccess("LST_"+c)).toBe(!0),expect(e.getRoleWriteAccess("AST_"+c)).toBe(!0),expect(e.getRoleReadAccess("AST_"+c)).toBe(!0),t()},function(n){e.isString(n)?t.fail(n):t.fail(n.message)})})}),it("shows her vampire to the AST",function(t){d().then(function(){return i.get_character(o.id)}).then(function(e){var n=e.get_me_acl();expect(n.getRoleWriteAccess("LST_"+c)).toBe(!0),expect(n.getRoleReadAccess("LST_"+c)).toBe(!0),expect(n.getRoleWriteAccess("AST_"+c)).toBe(!0),expect(n.getRoleReadAccess("AST_"+c)).toBe(!0),t()},function(n){e.isString(n)?t.fail(n):t.fail(n.message)})}),it("doesn't show her vampire to everybody",function(e){_().then(function(){return t.template.get_character(o.id)}).then(function(t){e.fail("Fetched the vampire as devuser")},function(t){e()})}),it("can remove a vampire",function(t){f().then(function(){var e=new a({id:c});return e.fetch()}).then(function(n){return o.leave_troupe(n).then(function(){var e=o.get_me_acl();expect(e.getRoleWriteAccess("LST_"+c)).toBe(!1),expect(e.getRoleReadAccess("LST_"+c)).toBe(!1),expect(e.getRoleWriteAccess("AST_"+c)).toBe(!1),expect(e.getRoleReadAccess("AST_"+c)).toBe(!1),t()},function(n){e.isString(n)?t.fail(n):t.fail(n.message)})})}),it("doesn't show her vampire to the AST",function(e){d().then(function(){return t.template.get_character(o.id)}).then(function(t){e.fail("Can still fetch vampire after remvoal")},function(t){expect(t.code).toBe(n.Error.OBJECT_NOT_FOUND),e()})}),it("still doesn't show her vampire to everybody",function(e){_().then(function(){return t.template.get_character(o.id)}).then(function(t){e.fail("Fetched the vampire as devuser")},function(t){e()})}),it("can add and then remove a vampire",function(t){var n;f().then(function(){return new a({id:c}).fetch()}).then(function(e){return n=e,console.log("Joining a troupe"),o.join_troupe(n)}).then(function(e){return console.log("Joined a troupe"),console.log("Leaving a troupe"),o.leave_troupe(n)}).then(function(e){console.log("Left a troupe"),t()}).fail(function(n){e.isString(n)?t.fail(n):t.fail(n.message)})})})})});