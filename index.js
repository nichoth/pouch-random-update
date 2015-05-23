module.exports = function updateRandomDoc(db, range, updateFn) {

  range = range || {};

  updateFn = updateFn || function(doc) {
    if (!doc.updatedCount) {
      doc.updatedCount = 0;
    }
    doc.updatedCount++;
    return db.put(doc);
  };

  var opts = {
    include_docs: true,
    limit: 100,
    startkey: range.startkey,
    endkey: range.endkey
  };

  function updater() {

  }

  return db.allDocs(opts)
    .then(function(resp) {

      var docs = resp.rows.map(function(row) {
        return row.doc;
      });

      return function updater(docs) {
        if (!docs.length) {
          return;
        }
        var randomDoc = docs[Math.floor(Math.random() * docs.length)];
        return db.get(randomDoc._id)
          .then(updateFn)
          .catch(console.log.bind(console))
        ;
      };

    })
    .catch(console.log.bind(console))
  ;
};
