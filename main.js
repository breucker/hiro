/**
* hiro - main.js
* 
*/
//define collections
Skills = new Meteor.Collection('skills');
Sectors = new Meteor.Collection('sectors');
Domains = new Meteor.Collection('domains');
Disciplines = new Meteor.Collection('disciplines');

if (Meteor.isClient) {

    Template.sheet.skills =  function(){
       	return Skills.find({},{sort: {name: 1}}).fetch();
    };
    //sheet events
    Template.sheet.events({
    	
    	
    	// 'click #truncateSkills': function(){
    	// 	Skills.remove({});
    	// }
    });

    //skill events
    Template.skill.events({
   		 'dblclick' : function () {
   		 	$(domain).attr('value',this.domain);
        $(sector).attr('value',this.sector);
        $(discipline).attr('value',this.sector);
        $(skill).attr('value',this.name);
        $(score).attr('value',parseInt(this.score));
        $(idSkill).attr('value',this._id);
   		 },
   		 'click .scoreUp' : function(e){
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

    var dataSource = function(collection){
      var source = collection.find({}).fetch();
      //console.log(source);
      var list = new Array();
      source.forEach(function(item){
        list.push('"'+item.name+'"');
      });
      return list;
    }

    Template.skillUpdate.domains = function(){  
     return dataSource(Domains);
    }
    Template.skillUpdate.sectors = function(){      
      return dataSource(Sectors);
    }
    Template.skillUpdate.disciplines = function(){      
      return dataSource(Disciplines);
    }
    Template.skillUpdate.skills = function(){      
      return dataSource(Skills);
    }

    Template.skillUpdate.events({
      'submit': function(e){
        e.preventDefault();
      },
      'click #addSkill' : function(){
        Skills.insert({domain: domain.value, sector: sector.value, discipline: discipline.value, name: skill.value, score: parseInt(score.value)});
        formSkill.reset();
        console.log("submit");
        console.log(formSkill);
        $(domain).focus();
       },
      'click #updSkill' : function(){
        console.log("update"+idSkill.value);
        Skills.update(idSkill.value,{$set: {domain: domain.value, sector: sector.value,  discipline: discipline.value, name: skill.value, score: parseInt(score.value)}});
       },
    });
}

//insert test datas
if (Meteor.isServer) {
  Meteor.startup(function () {
    if(Domains.find({}).count() === 0){
      var source = ["Art", "Drive", "Guns"];

      for(var i = 0 ; i < source.length ; i++)
      {
        Domains.insert({name: source[i]});
      }
    }
    if(Sectors.find({}).count() === 0){
      var source = ["Music", "Flying", "Pistol"];

      for(var i = 0 ; i < source.length ; i++)
      {
        Sectors.insert({name: source[i]});
      }
    }
    if(Disciplines.find({}).count() === 0){
      var source = ["Percussions", "Vehicles", "Laser"];
      for(var i = 0 ; i < source.length ; i++)
      {
        Disciplines.insert({name: source[i]});
      }
    }
    if(Skills.find({}).count()===0){
	  	Skills.insert({domain:'Guns', sector:'Ray',discipline:'Laser', name:'Pistol', score: 8});
      Skills.insert({domain:'Drive', sector:'Vehicles', discipline:'Flying', name:'Starship', score: 10});
      Skills.insert({domain:'Art', sector:'Music', discipline:'Percussions', name:'Drums', score: 10});
  	}
    
  });
  console.log(Domains.find({}).fetch());
  console.log(Sectors.find({}).fetch());
  console.log(Disciplines.find({}).fetch());
  console.log(Skills.find({}).fetch());
}