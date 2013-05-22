/**
* hiro - main.js
* 
*/
//define collections
Skills = new Meteor.Collection('skills');

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

    Template.skillUpdate.dataSource = function(fieldName){
      console.log(fieldName);
      var list = new Array();
      var source = _.pluck(Skills.find({}).fetch(),fieldName);
      console.log(source);
      var source = _.uniq(source);
      source.forEach(function(value){
         list.push('"'+value+'"');
      });
      return list;
    }

    var upsert = function(collection, selector, document, idTypeahead)
    {
      //console.log(collection.find(selector).fetch());
      if(collection.find(selector).count()==0)
      {
        collection.insert(document);
      }
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
    if(Skills.find({}).count()===0){
	  	Skills.insert({domain:'Guns', sector:'Ray',discipline:'Laser', name:'Pistol', score: 8});
      Skills.insert({domain:'Drive', sector:'Vehicles', discipline:'Flying', name:'Starship', score: 10});
      Skills.insert({domain:'Art', sector:'Music', discipline:'Percussions', name:'Drums', score: 10});
  	}
    
  });
  
  console.log(Skills.find({}).fetch());
}