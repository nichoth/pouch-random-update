var Pouch = require('pouchdb');
var update = require('../');
require('little-pouch-db')( new Pouch('pouch-test') )
  .then(function(pouch) {
    update(pouch).then(function(updater) {
      setInterval(updater, 3000);
    });
  })
;

