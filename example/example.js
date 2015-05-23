var Pouch = require('pouchdb');
var update = require('../');

var db;
require('little-pouch-db')( new Pouch('pouch-test') )
  .then(function(pouch) {
    db = pouch;
    return pouch.allDocs({
      include_docs: true
    });
  }).then(function(resp) {
    var docs = resp.rows.map(function(row) {
      return row.doc;
    });
    setInterval(function() {
      // default updateFn returns promise from pouch.put()
      update(db, docs).then(function(resp) {
        console.log(resp);
      });
    }, 3000);
  })
;

