var donnees=[];
let db = window.openDatabase("Events00000000", "1.0", "All Deadlines", 2000000);

    db.transaction(function (tx) {
        tx.executeSql('Select * from events', [], function (tx, result) {
            for(let i=0; i<result.rows.length; i++){                      
                donnees.push(result.rows[i]);
                donnees.sort(function(a,b){
                    if(a.start<b.start){
                        return -1;
                    }
                    if(a.start>b.start){
                        return 1;
                    }
                    return 0;
                })
            }                               
        });
    }, function (error) {
        console.log('Transaction ERROR: ' + error.message);
    }, function () {   
        console.log(donnees)
    });









// fichier csv
var stockData=[ ];
function convertArrayOfObjectsToCSV(args){  
        var result,ctr,keys,columnDelimiter,lineDelimiter,data;

        data=args.data||null;
        if (data==null||!data.length){
            return null
        }

        columnDelimiter = args.columnDelimiter || ',   ';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;
/*elle parcourt l'un des obj pour creer une ligne d'en-tete, 
suivie d'une nouvelle ligne*/
        data.forEach(function(item){
            ctr = 0;
  /*ensuite je parcours chaque objet avec les valeurs de chaque propriete*/
            keys.forEach(function(key){
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }


/* J'ai créé une fonction qui prend en param
le data et le retourne en fichier csv pour telecharger
*/

	function downloadCSV(args){
		var data,filename,link; 
		var csv = convertArrayOfObjectsToCSV({
			data: stockData
		}); 

		if(csv == null) return; 

		filename = args.filename || 'export.csv'; 
			//
		if(!csv.match(/^data:text\/csv/i)) {
			csv = 'data:text/csv;charset=utf-8,' + csv;
		}
		data = encodeURI(csv); 
		link = document.createElement('a');
		
		link.setAttribute('href', data);
		
		link.setAttribute('download', filename); 
		link.click(); 
	}

