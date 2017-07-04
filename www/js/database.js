var db;

$('#reposHome').bind('pageinit', function (event){
    db = window.openDatabase("repodb", "0.1", "Github Repo DB", 1000);
    db.transaction(createDB, txError, txSuccess);
});

function createDB(tx){
    tx.executeSql("DROP TABLE IF EXIST repos");
    tx.executeSql("CREATE TABLE repos(user, name)");
};

function txError(Error){
    console.log(Error);
    console.log("Database Error : " + Error);
}

function txSuccess(){
    console.log("DB Success.");
}