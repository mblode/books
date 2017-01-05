var token = 'cc664a859e355da6299c34d88c273bf84f806c988c472bd3a54ab89c3d786fc4';
var key = '77005348794f2cec3e53474442ef381b';
var url = 'https://api.trello.com/1/boards/D2rWeR8z/lists?token='+token+'&key='+key;
var listId = [];

function status(response) {  
  if (response.status >= 200 && response.status < 300) {  
    return Promise.resolve(response);
  } else {  
    return Promise.reject(new Error(response.statusText));
  }  
}

function json(response) {
  return response.json();
}

fetch('https://api.trello.com/1/boards/D2rWeR8z/lists?token='+token+'&key='+key, {
	method: 'get'
})
.then(status)  
.then(json)
.then(function(data) {  
  $.each(data, function(i, item) {
    $('<h2>').text(data[i].name).appendTo('#root');
    $('<div>').attr('id', data[i].id).appendTo('#root');
    listId.push(data[i].id);
  });
}).catch(function(errorz) {  
  console.log('Request failed', error);  
});

fetch('https://api.trello.com/1/boards/D2rWeR8z/cards?token='+token+'&key='+key+'&filter=open', {
	method: 'get'
})
.then(status)  
.then(json)
.then(function(data) {
  $.each(data, function(i, item) {
    for(var j = 0; j < listId.length; j++) {
      if (listId[j] == data[i].idList) {
        $("<div class='col--book' id="+i+"><div class='bookwrapper l"+ data[i].idLabels +"\'><a class='book'><div class='book__back'></div></a></div></div>").appendTo("#"+listId[j]);
        $("<div class='book__spine'></div>").appendTo("#"+i+" .book");
        $("<div class='book__front'></div>").appendTo("#"+i+" .book");
        $("<div class='book__inner'></div>").appendTo("#"+i+" .book__front");
        $("<span class='book__title'>"+data[i].name+"</span>").appendTo("#"+i+" .book__inner");
        $("<span class='book__author'>"+data[i].desc+"</span>").appendTo("#"+i+" .book__inner");
      }
    }
  });
}).catch(function(error) {  
  console.log('Request failed', error);  
});