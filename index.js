module.exports = function(db, docs, updateFn) {

  updateFn = updateFn || function (doc) {
    if (!doc.updatedCount) {
      doc.updatedCount = 0;
    }
    doc.updatedCount++;
    return db.put(doc);
  };

  if (!docs.length) {
    return;
  }
  var randomDoc = docs[Math.floor(Math.random() * docs.length)];
  return db.get(randomDoc._id)
    .then(updateFn)
    .catch(console.log.bind(console));

};
