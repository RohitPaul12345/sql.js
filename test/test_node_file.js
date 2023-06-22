exports.test = function(SQL, assert) {
	//Node filesystem module - You know that.
	let fs = require('fs');

	//Ditto, path module
	let path = require('path');

	let filebuffer = fs.readFileSync(path.join(__dirname, 'test.sqlite'));

	//Works
	let db = new SQL.Database(filebuffer);

	//[{"columns":["id","content"],"values":[["0","hello"],["1","world"]]}]
	let res = db.exec("SELECT * FROM test WHERE id = 0");
	assert.deepEqual(res,
									[{"columns":["id","content"],"values":[[0,"hello"]]}],
									"One should be able to read the contents of an SQLite database file read from disk");
	db.close();
}

if (module == require.main) {
	const target_file = process.argv[2];
  const sql_loader = require('./load_sql_lib');
  sql_loader(target_file).then((sql)=>{
    require('test').run({
      'test node file': function(assert){
        exports.test(sql, assert);
      }
    });
  })
  .catch((e)=>{
    console.error(e);
    assert.fail(e);
  });
}
