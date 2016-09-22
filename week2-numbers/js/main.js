var colors=[
	'#E58980',
	'#E47FA8',
	'#D17FF8',
	'#A686FB',
	'#909CFC',
	'#90AFFC',
	'#9ED6FD',
	];
var col=0;
var a=1;
function getNumber(event){

	var val = document.getElementById('theInput').value;

	if(val!=null) callAPI(val,type);
}

function callAPI(num,type){

	$.ajax({
	    url: 'http://numbersapi.com/'+num+'/'+type,
	    type: 'GET',
	    failure: function(err){
	    	return alert ("Could not find that number");
	    },
	    success: function(response) {
	      console.log('the number response is -- >');
	      console.log(response);
	      return addCard(num, response);
	    }
	});
}

function addCard(num,result){

	var htmlToAppend = 
	'<div class="card-container col-md-12">'+
		'<div class="card" style="background-color:'+colors[col]+'">'+
		    '<h1>'+num+'</h1>'+
		    '<h2>'+result+'</h2>'+
	  '</div>'+
	'</div>';
	col+=a;
	if(col>=colors.length-1||col<1) a*=-1;
  return $('#card-holder').prepend(htmlToAppend);
}

document.getElementById('theInput').addEventListener('change', getNumber);
document.getElementById('theSelect').addEventListener('change', getNumber);