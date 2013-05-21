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
    	
    	
    	// 'click #truncateSkills': function(){
    	// 	Skills.remove({});
    	// }
    });

    //skill events
    Template.skill.events({
    	// 'dblclick': function () {
    	//  	console.log('skill'+this._id+' editing');
   		//  },
   		 'dblclick' : function () {
   		 	$(domain).attr('value',this.domain);
        $(sector).attr('value',this.sector);
        $(skill).attr('value',this.name);
        $(score).attr('value',parseInt(this.score));
        $(idSkill).attr('value',this._id);
   		 },
   		 // 'mouseover' : function(){
   		 // 	$(this).addClass('active');
    	 // 	console.log(this._id+' - '+this.name+' hover');
   		 // },
   		 // 'mouseout' : function(){
   		 // 	$(this).removeClass('active');
    	 //  	console.log(this._id+' - '+this.name+' out');
   		 // },
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

    Template.skillUpdate.domains = function(){
      var domainList = ['"Art"', '"Drive"', '"Guns"'];
      return domainList;
    }
    Template.skillUpdate.sectors = function(){
      var domainList = ['"Art"', '"Drive"', '"Guns"'];
      return domainList;
    }
    Template.skillUpdate.skills = function(){
      var domainList = ['"Art"', '"Drive"', '"Guns"'];
      return domainList;
    }

    Template.skillUpdate.events({
      'submit': function(e){
        e.preventDefault();
      },
      'click #addSkill' : function(){
        Skills.insert({domain: domain.value, sector: sector.value, name: skill.value, score: parseInt(score.value)});
        formSkill.reset();
        console.log("submit");
        console.log(formSkill);
       },
      'click #updSkill' : function(){
        console.log("update"+idSkill.value);
        Skills.update(idSkill.value,{$set: {domain: domain.value, sector: sector.value, name: skill.value, score: parseInt(score.value)}});
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