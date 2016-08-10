var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost:28008/", function(err, db) {
  var myDB = db.db("words");
  myDB.collection("word_stats", findItems);//按要求搜寻结果
  myDB.collection("word_stats",countItems);//统计结果数目
  myDB.collection("word_stats",function(err,collection){    //分页浏览
  	pagedResults(err,collection,0,10);
  });
  setTimeout(function(){
    db.close();
  }, 13000);
});

function displaywords(msg,cursor,pretty){
	cursor.toArray(function (err,itemArr) {
		console.log("\n"+msg);
		var wordList=[];
		for (var i = 0; i < itemArr.length; i++) {
			wordList.push(itemArr[i].word);
		}
		console.log(JSON.stringify(wordList,null,pretty));
		// body...
	})
}

function findItems(err,words) {
	words.find({first:{$in:['a','b','c']}},function(err,cursor){
		displaywords("Words starting with a,b, or c :",cursor);
	});
	// body...
}

function countItems(err,words){
	words.count({first:{$in:['a','b','c']}},function(err,count){
		console.log("words starting with a,b or c:"+count);
	})
}

function pagedResults(err,words,startIndex,pageSize){
	words.find({first:'v'},
				{limit:pageSize,skip:startIndex,sort:[['word',1]]},
				function(err,cursor){
					cursor.count(true,function(err,cursorCount){
						displaywords("Pages Starting at "+startIndex,cursor);
						if (cursorCount===pageSize) {
							pagedResults(err,words,startIndex+pageSize,pageSize);
						}
					});
				});
}