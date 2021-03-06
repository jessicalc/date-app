var DateIdeaSQL = require('../models/dateIdeaSQL')
var DateBlacklistSQL = require('../models/dateBlacklistSQL');

/*--------------------SQL---------------*/

exports.createDateIdeaSQL = function(req, res, next){
  DateIdeaSQL.post(req.body.dateIdeaName, req.body.eventID, req.body.venueID)
  .then(function(idea){
    res.status(201).send(idea);
  });
}

exports.blacklistDateIdeaSQL = function(req, res, next){
  console.log("Blacklisting the dateIdea", req.body.dateIdeaID);
  DateBlacklistSQL.post(req.body.dateIdeaID, req.body.approveFlag)
  .then(function(dateIdea){
    res.status(200).send();
  })
}

exports.getBlacklistedDatesSQL = function(req, res, next){

}