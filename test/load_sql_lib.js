module.exports = function(sqlLibraryType){
    // Use sql-wasm.js by default
    let sqlJsLib = sqlLibraryType ? "../dist/sql-"+sqlLibraryType+".js" : "../dist/sql-wasm.js";
    begin = new Date();
    let initSqlJs = require(sqlJsLib);
    return initSqlJs().then((sql)=>{
        end = new Date();
        console.log(`Loaded and inited ${sqlJsLib} in ${end -begin}ms`);
        return sql;
    });
}
