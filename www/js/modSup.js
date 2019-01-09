document.addEventListener("deviceready", DeviceReady, false);
function DeviceReady(){
    document.getElementById("premodifier").addEventListener("click", this.modifier);
    $("#modifier").on("click", this.modifier);
}

function premodifier(){
    console.log("entra");
    let myDB = window.openDatabase("Events0000000", "1.0", "All Deadlines", 2000000);
    // Insert test
    myDB.transaction(function(t){
        t.executeSql('insert into events values(?,?,?,?,?)',['Prueba','Nimportequoi','vert','2222-12-12','1111-11-11']);
    },
    function(error){
        console.log(error);
    },
    function(){
        alert('insert correct')
    }
    );
}

function modifier(){
    var event=[$('#ipTitle').text(),$('#ipStart').text(),$('#ipEnd').text(),$('#ipDesc').text()];
  
    // Select test
    
    myDB.transaction(function(tx){
        tx.executeSql('Select title from events where id=?',['8'], function(tx, r){   
            console.log(r);   
         alert(r.rows.item(0).title);
        });
    },
    function(error){
        console.log(error);
    },
    function(){
        alert("It works again");
    });
   
    //Update row
   
    myDB.transaction(function(tw){

        tw.executeSql('update events set title = ? where id=?',[event[0],'8'], function(tw, r){   
            console.log(r.rowsAffected);
        });
    },
    function(error){
        console.log(error);
    },
    function(){
        alert('It works');
    });
     

    // Select to see the change

    myDB.transaction(function(ty){
        ty.executeSql('Select title from events where id=?',['8'], function(ty, r){   
            console.log(r);   
         alert(r.rows.item(0).title);
        });
    },
    function(error){
        console.log(error);
    },
    function(){
        alert("It works again");
    });

}