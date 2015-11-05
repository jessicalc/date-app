// db.js
// Instance of neo4j db used by all models

var neo4j = require('neo4j');
//http://app42960229:ILOdJGW9N5SoJPBc5qqu@app42960229.sb02.stations.graphenedb.com:24789
//http://neo4j:password@localhost:7474

var db = new neo4j.GraphDatabase({
  // Support specifying database info via environment variables,
  // but assume Neo4j installation defaults.

  url: process.env['NEO4J_URL'] || process.env['GRAPHENEDB_URL'] ||
    'https://app42960229-30345127338065764:WQMxBnRSNJFFKE47Obbe@db-4tmnd64ys6mq8m3sy3vw.graphenedb.com:24780',
  auth: process.env['NEO4J_AUTH']
});

console.log('DB in db module');
console.log(db);

module.exports = db;
