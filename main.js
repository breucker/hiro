/**
* hiro - main.js
* 
*/
//define collections
Skills = new Meteor.Collection('skills');

if (Meteor.isClient) {
    Template.sheet.skills =  function(){
       	return Skills.find({},{sort: {score: -1}}).fetch();
    };
    //sheet events
    Template.sheet.events({
    	'click #addSkill': function(){
    		Skills.insert({domain:'Guns', sector:'Ray', name:'Laser', score: Math.floor(Random.fraction()*10)*5});
    	},
    	'click #removeSkill': function(){
    		//fixme
    		console.log("remove a skill");
    	},
    	'click #truncateSkills': function(){
    		Skills.remove({});
    	}
    });

    //skill events
    Template.skill.events({
    	'dblclick': function () {
    	 	console.log('skill'+this._id+' editing');
   		 },
   		 'click' : function () {
   		 	$(this).addClass('active');
    	  	console.log(this._id+' - '+this.name+' active');
   		 },
   		 'mouseover' : function(){
   		 	$(this).addClass('active');
    	 	console.log(this._id+' - '+this.name+' hover');
   		 },
   		 'mouseout' : function(){
   		 	$(this).removeClass('active');
    	  	console.log(this._id+' - '+this.name+' out');
   		 },
   		 'click .scoreUp' : function(){
   		 	Skills.update(this._id,{$inc: {score: 1}});
   		 },
   		 'click .scoreDown' : function(){
   		 	Skills.update(this._id,{$inc: {score: -1}});
   		 },
   		 'click .skillDelete': function () {
    	  Skills.remove({_id : this._id});
    	  console.log(this._id+' - '+this.name+' removed');
   		 },

  	});
}

//insert test datas
if (Meteor.isServer) {
  Meteor.startup(function () {
  	if(Skills.find({}).count()===0){
	  	Skills.insert({domain:'Guns', sector:'Ray', name:'Laser', score: 8});
	    Skills.insert({domain:'Drive', sector:'Vehicles', name:'Starship', score: 10});
  	}
    
  });
  console.log(Skills.find({}).fetch());
}