var db;

$('#reposHome').bind('pageinit', function (event){
    db = window.openDatabase("repodb", "0.1", "Github Repo DB", 1000);
    db.transaction(createDB, txError, txSuccess);
});

function createDB(tx){
    tx.executeSql("DROP TABLE IF EXISTS repos");
    tx.executeSql("CREATE TABLE repos(user, name)");
};

function txError(Error){
    console.log(Error);
    console.log("Database Error : " + Error);
}

function txSuccess(){
    console.log("DB Success.");
}

function saveFave(){
    db = window.openDatabase("repodb", "0.1", "Github Repo DB", 1000);
    db.transaction(saveFaveDB, txError, txSuccessFave);
}

function saveFaveDB(tx){
    var owner = getUrlVars().owner;
    var name = getUrlVars().name;
    
    tx.executeSql("INSERT INTO repos(user, name) VALUES (?, ?)", [owner, name]);
}

function txSuccessFave(){
    console.log("Favorited !");
    
    disableSaveButton();
}

function disableSaveButton() {
    // change button style
    var ctx = $('#saveBtn').closest('.ui-btn');
    $(ctx).removeClass('ui-alt-icon');
    
    $('#saveBtn').unbind('click', saveFave);
}

function checkFaveDB(tx){
    var owner = getUrlVars().owner;
    var name = getUrlVars().name;
    
    tx.executeSql("SELECT * FROM repos WHERE user = ? AND name = ?", [owner, name], txSuccessCheckFave);
}

function txSuccessCheckFave(tx, results){
    console.log("Read Success");
    console.log(results);
    
    if (results.rows.length)
        disableSaveButton();
}