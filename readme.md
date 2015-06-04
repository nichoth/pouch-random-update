# pouch random update

Update a random doc in pouchdb.

## api

```js
update(db, docs [, updateFn])
```

## install

    $ npm install pouch-random-update

## Example

```js
var Pouch = require('pouchdb');
var update = require('pouch-random-update');

var pouch = new Pouch('some-db');
pouch.allDocs({
  include_docs: true
}).then(function(resp) {
  var docs = resp.rows.map(function(row) {
    return row.doc;
  });
  setInterval(function() {
    // default updateFn returns promise from pouch.put()
    update(pouch, docs).then(function(resp) {
      console.log(resp);
    });
  }, 3000);
});
```
