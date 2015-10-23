angular.module('dateClient.services', [])
.factory('FindADate', function ($http, $location, $window) {
  return {
    sendDateData: function(surveyData, callback){
      console.log("The sendTags factory method works.");
      return $http({
        method: 'POST',
        url: '/tags/sendDateData/',
        data: surveyData
      })
      .then(function (resp) {
        console.log(resp.data.ideaArray);
        callback(resp.data.ideaArray);
      });
    },
  };
})
.factory('DateData', function ($http, $location, $window){
  return {

    tags: [],
    logistics: {},
    dateIdeas: {},

    appendTags: function (tags){
      console.log("Appending tags", tags);
      for (tag in tags){
        if (tags[tag] === 1){
          this.tags.push(tag);
        }
      }
    },
    getTags: function (){
      return this.tags;
    },


    appendLogistics: function (logistics){
      console.log("Appending logistics", logistics);
      for (logistic in logistics){
        this.logistics[logistic] = logistics[logistic];
      }
      console.log("Logistics are now", this.logistics);
    },
    getLogistics: function (){
      return this.logistics;
    },


    setDateIdeas: function (ideas){
      this.dateIdeas = ideas;
    },
    getDateIdeas: function (){
      console.log("Getting date ideas");
      return this.dateIdeas;
    },
    getConcatenatedData: function () {
      return {tags: this.tags, logistics: this.logistics}
    },


    clearData: function () {
      this.tags = [];
      this.logistics = {};
      this.dateIdeas = {};
    }

  };
})
;
