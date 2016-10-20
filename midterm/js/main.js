var items=[];

var sum_ny=0;
var sum_sz=0;

var trans_ny=0;
var trans_sz=0;

var total_ny=0;
var total_sz=0;

var rent_ny=0;
var rent_sz=0;

function init(){
	console.log("init run!");
	$.ajax({
		url:'data/data.json',
		type:'GET',

		failure:function(err){
			return console.log("There was an issue getting the data.");		
		},
		success: function(responce){
			for (var prop in responce) {
				items.push(responce[prop]);
			}
			console.log(items);
				var i=0;
				

			items.forEach(display);

			function display(el,i,arr){
				var img=document.createElement("img");
				img.src=items[i].img;
				img.className="img-responsive center-block";
				// $( "h2" ).insertBefore( $( ".container" ) );
				// list.insertBefore(newItem, list.childNodes[0]); 
				// var fig=document.getElementById("a"+i).getElementsByTagName('figure')[0];
				// fig.appendChild(img);
				var div=document.getElementById("a"+i);
				// div.appendChild(img);
				div.insertBefore(img,div.childNodes[0]);//appendChild(img);

				var text_ny=document.getElementById("a"+i).getElementsByTagName('p')[0].getElementsByTagName('span')[0];
				text_ny.innerHTML=items[i].ny;
				var text_ny_unit=document.getElementById("a"+i).getElementsByTagName('p')[0].getElementsByTagName('span')[1];
				text_ny_unit.innerHTML=items[i].unit;
				// document.getElementById(i+1).appendChild(text_ny);
				// text_ny.className="text-center";

				var text_sz=document.getElementById("a"+i).getElementsByTagName('p')[1].getElementsByTagName('span')[0];
				text_sz.innerHTML=items[i].sz;
				var text_sz_unit=document.getElementById("a"+i).getElementsByTagName('p')[1].getElementsByTagName('span')[1];
				text_sz_unit.innerHTML=items[i].unit;
				// document.getElementById(i+1).appendChild(text_sz);
				// text_sz.className="text-center";
			}
		}
	});
	setChartDefaults();
	buildBarChart_trans();
	buildBarChart_rent();
	buildBarChart_result();
}

function setChartDefaults(){
	// make it responsive
	Chart.defaults.global.responsive = true;
	// set the font color
	Chart.defaults.global.defaultFontColor = '#222';
	// set the font family
	Chart.defaults.global.defaultFontFamily = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
	// Chart.defaults.global.legend.display = false;
}

function buildBarChart_trans(){
	// console.log("bar chart!");
	// a chart can take 2 objects:
	// 1. data - the data/information (required)
	// 2. options - chart options (optional)

	var data = {
	    // chart labels
	    labels: ["One-way Ticket", "Monthly Pass"],
	    // array of datasets to plot
	    // could be only 1 if there's just 1 dataset
	    datasets: [
	        {
	            label: "NYC",
	            backgroundColor: "#EA385F",
	            data: [2.75,116.5]
	        },
	        {
	            label: "Suzhou",
	            backgroundColor: "#1F4062",
	            data: [0.30,22.33]
	        }
	    ]
	};

	// create chart options (this is optional)
	// see list of options:
	// http://www.chartjs.org/docs/#bar-chart-chart-options
	var options = {
		scales:{
			xAxes:[{
				display:false,
			}],
			yAxes: [{
                display: false,
                barThickness:40,
                categoryPercentage:0.8,
				barPercentage:0.5
            }],
		}
	} 

	// first, get the context of the canvas where we're drawing the chart
	var ctx = document.getElementById("oneTix").getContext("2d");
	
	// now, create the bar chart, passing in:
	// 1. the type (required)
	// 2. the data (required)
	// 3. chart options (optional)
	var myBarChart = new Chart(ctx, {
	    type: 'horizontalBar',
	    // type: 'horizontalBar', // horizontal bards
	    data: data,
	    options: options
	});
}

function buildBarChart_rent(){
	// console.log("bar chart!");
	// a chart can take 2 objects:
	// 1. data - the data/information (required)
	// 2. options - chart options (optional)

	var data = {
	    // chart labels
	    labels: ["City Center", "Outside of Center"],
	    // array of datasets to plot
	    // could be only 1 if there's just 1 dataset
	    datasets: [
	        {
	            label: "NYC",
	            backgroundColor: "#EA385F",
	            data: [2923.90,1829.62]
	        },
	        {
	            label: "Suzhou",
	            backgroundColor: "#1F4062",
	            data: [455.07,204.48]
	        }
	    ]
	};

	// create chart options (this is optional)
	// see list of options:
	// http://www.chartjs.org/docs/#bar-chart-chart-options
	var options = {
		scales:{
			xAxes:[{
				display:false,
			}],
			yAxes: [{
                display: false,
                barThickness:40,
                categoryPercentage:0.8,
				barPercentage:0.5
            }],
		}
	} 

	// first, get the context of the canvas where we're drawing the chart
	var ctx = document.getElementById("rentBar").getContext("2d");
	
	// now, create the bar chart, passing in:
	// 1. the type (required)
	// 2. the data (required)
	// 3. chart options (optional)
	var myBarChart = new Chart(ctx, {
	    type: 'horizontalBar',
	    // type: 'horizontalBar', // horizontal bards
	    data: data,
	    options: options
	});
}

function buildBarChart_result(){

	total_ny=sum_ny+trans_ny+rent_ny;
	total_sz=sum_sz+trans_sz+rent_sz;
	// a chart can take 2 objects:
	// 1. data - the data/information (required)
	// 2. options - chart options (optional)
	var e=document.getElementById("result_bar").getElementsByTagName("div")[0];
	var c=document.getElementById("resultBar");
	e.removeChild(c);
	c=document.createElement("canvas");
	c.id="resultBar";
	e.appendChild(c);
	c.height="150";
	c.width="1200";
	var data = {
	    // chart labels
	    labels: ["Total"],
	    // array of datasets to plot
	    // could be only 1 if there's just 1 dataset
	    datasets: [
	        {
	            label: "NYC",
	            backgroundColor: "#D8A3AC",
	            data: [total_ny]
	        },{
	            label: "Suzhou",
	            backgroundColor: "#9CD9EB",
	            data: [total_sz]
	        }
	    ]
	};

	// create chart options (this is optional)
	// see list of options:
	// http://www.chartjs.org/docs/#bar-chart-chart-options
	var options = {
		legend:{
			labels:{
				fontColor:"#fff"
			}
		},
		scales:{

			xAxes:[{
				gridLines: {
 					color:"rgba(255,255,255,0.5)"
 				}
			}],
			yAxes: [{
				gridLines: {
 					color:"rgba(255,255,255,0.5)"
 				},
 				scaleLabel:{
 					color:"rgba(255,255,255,0.5)"
 				},
 				barThickness:20,
                categoryPercentage:0.8,
				barPercentage:1
            }]
		}
	} 

	// first, get the context of the canvas where we're drawing the chart
	var ctx = c.getContext("2d");
	
	// now, create the bar chart, passing in:
	// 1. the type (required)
	// 2. the data (required)
	// 3. chart options (optional)
	var myBarChart = new Chart(ctx, {
	    type: 'horizontalBar',
	    // type: 'horizontalBar', // horizontal bards
	    data: data,
	    options: options
	});

	buildPieChart_ny();
	buildPieChart_sz();
}

function buildPieChart_ny(){

	// a chart can take 2 objects:
	// 1. data - the data/information (required)
	// 2. options - chart options (optional)

	var e=document.getElementById("result").getElementsByTagName("div")[0];
	var c=document.getElementById("pieChart_ny");
	e.removeChild(c);
	c=document.createElement("canvas");
	c.id="pieChart_ny";
	e.appendChild(c);
	var data = {
	    labels: [
	        "Market",
	        "Transportation",
	        "Monthly Rent"
	    ],
	    datasets: [
	        {
	            data: [sum_ny,trans_ny,rent_ny],
	            backgroundColor: [
	                "#FF6384",
	                "#36A2EB",
	                "#DBD054"
	            ],
	            hoverBackgroundColor: [
	                "#FF6384",
	                "#36A2EB",
	                "#DBD054"
	            ]
	        }]
	};

	// create chart options (this is optional)
	// see list of options:
	// http://www.chartjs.org/docs/#doughnut-pie-chart-chart-options
	var options = {
    tooltips: {
        backgroundColor: 'black',
    },		
    animation:{
        animateRotate:true
    },
    legend:{
			labels:{
				fontColor:"#fff"
			}
		},
	} 

	// first, get the context of the canvas where we're drawing the chart
	var ctx = c.getContext("2d");
	
	// now, create the pie chart, passing in:
	// 1. the type (required)
	// 2. the data (required)
	// 3. chart options (optional)
	var myPieChart = new Chart(ctx,{
	    type: 'pie',
	    data: data,
	    options: options
	});	
}

function buildPieChart_sz(){

	// a chart can take 2 objects:
	// 1. data - the data/information (required)
	// 2. options - chart options (optional)
	var e=document.getElementById("result").getElementsByTagName("div")[1];
	var c=document.getElementById("pieChart_sz");
	e.removeChild(c);
	c=document.createElement("canvas");
	c.id="pieChart_sz";
	e.appendChild(c);
	var data = {
	    labels: [
	        "Market",
	        "Transportation",
	        "Monthly Rent"
	    ],
	    datasets: [
	        {
	            data: [sum_sz,trans_sz,rent_sz],
	            backgroundColor: [
	                "#FF6384",
	                "#36A2EB",
	                "#DBD054"
	            ],
	            hoverBackgroundColor: [
	                "#FF6384",
	                "#36A2EB",
	                "#DBD054"
	            ]
	        }]
	};

	// create chart options (this is optional)
	// see list of options:
	// http://www.chartjs.org/docs/#doughnut-pie-chart-chart-options
	var options = {
    tooltips: {
        backgroundColor: 'black',
    },		
    animation:{
        animateRotate:true
    },
    		legend:{
			labels:{
				fontColor:"#fff"
			}
		},
	} 

	// first, get the context of the canvas where we're drawing the chart
	var ctx = c.getContext("2d");
	
	// now, create the pie chart, passing in:
	// 1. the type (required)
	// 2. the data (required)
	// 3. chart options (optional)
	var myPieChart = new Chart(ctx,{
	    type: 'pie',
	    data: data,
	    options: options
	});	
}


function toCart0(){
	sum_ny+=items[0].ny;
	sum_sz+=items[0].sz;
	console.log("NYC:"+sum_ny);
	console.log("Suzhou:"+sum_sz);
	buildBarChart_result();
}

function toCart1(){
	sum_ny+=items[1].ny;
	sum_sz+=items[1].sz;
	console.log("NYC:"+sum_ny);
	console.log("Suzhou:"+sum_sz);
	buildBarChart_result();
}

function toCart2(){
	sum_ny+=items[2].ny;
	sum_sz+=items[2].sz;
	console.log("NYC:"+sum_ny);
	console.log("Suzhou:"+sum_sz);
	buildBarChart_result();
}

function toCart3(){
	sum_ny+=items[3].ny;
	sum_sz+=items[3].sz;
	console.log("NYC:"+sum_ny);
	console.log("Suzhou:"+sum_sz);
	buildBarChart_result();
}

function toCart4(){
	sum_ny+=items[4].ny;
	sum_sz+=items[4].sz;
	console.log("NYC:"+sum_ny);
	console.log("Suzhou:"+sum_sz);
	buildBarChart_result();
}

function toCart5(){
	sum_ny+=items[5].ny;
	sum_sz+=items[5].sz;
	console.log("NYC:"+sum_ny);
	console.log("Suzhou:"+sum_sz);
	buildBarChart_result();
}

function toCart6(){
	sum_ny+=items[6].ny;
	sum_sz+=items[6].sz;
	console.log("NYC:"+sum_ny);
	console.log("Suzhou:"+sum_sz);
	buildBarChart_result();
}

function toCart7(){
	sum_ny+=items[7].ny;
	sum_sz+=items[7].sz;
	console.log("NYC:"+sum_ny);
	console.log("Suzhou:"+sum_sz);
	buildBarChart_result();
}

function toCart8(){
	sum_ny+=items[8].ny;
	sum_sz+=items[8].sz;
	console.log("NYC:"+sum_ny);
	console.log("Suzhou:"+sum_sz);
	buildBarChart_result();
}

function toCart9(){
	sum_ny+=items[9].ny;
	sum_sz+=items[9].sz;
	console.log("NYC:"+sum_ny);
	console.log("Suzhou:"+sum_sz);
	buildBarChart_result();
}

function toCart10(){
	sum_ny+=items[10].ny;
	sum_sz+=items[10].sz;
	console.log("NYC:"+sum_ny);
	console.log("Suzhou:"+sum_sz);
	buildBarChart_result();
}

function toCart11(){
	sum_ny+=items[11].ny;
	sum_sz+=items[11].sz;
	console.log("NYC:"+sum_ny);
	console.log("Suzhou:"+sum_sz);
	buildBarChart_result();
}

function toCart12(){
	sum_ny+=items[12].ny;
	sum_sz+=items[12].sz;
	console.log("NYC:"+sum_ny);
	console.log("Suzhou:"+sum_sz);
	buildBarChart_result();
}

function toCart13(){
	sum_ny+=items[13].ny;
	sum_sz+=items[13].sz;
	console.log("NYC:"+sum_ny);
	console.log("Suzhou:"+sum_sz);
	buildBarChart_result();
}

function toCart14(){
	sum_ny+=items[14].ny;
	sum_sz+=items[14].sz;
	console.log("NYC:"+sum_ny);
	console.log("Suzhou:"+sum_sz);
	buildBarChart_result();
}

function toCart15(){
	trans_ny+=2.75;
	trans_sz+=0.3;
	console.log("NYC:"+sum_ny);
	console.log("Suzhou:"+sum_sz);
	buildBarChart_result();
}

function toCart16(){
	trans_ny+=116.5;
	trans_sz+=22.33;
	console.log("NYC:"+sum_ny);
	console.log("Suzhou:"+sum_sz);
	buildBarChart_result();
}



// --------rent--------
function toCart17(){
	rent_ny+=2923.90;
	rent_sz+=455.07;
	console.log("NYC:"+sum_ny);
	console.log("Suzhou:"+sum_sz);
	buildBarChart_result();
}

function toCart18(){
	rent_ny+=1820.62;
	rent_sz+=204.48;
	console.log("NYC:"+sum_ny);
	console.log("Suzhou:"+sum_sz);
	buildBarChart_result();
}

function showResult(){
	// var re=document.getElementById("result0");
	// console.log(re.style.display);
	// if(re.style.display=="none"){
		// re.style.display = "block";
		var el = document.getElementById("myNav");
		dynamics.animate(el, {
		  height: 600
		}, {
		  type: dynamics.spring,
		  frequency: 200,
		  friction: 200,
		  duration: 1500
		});

		var ele=document.getElementById("result")
		dynamics.animate(ele, {
			opacity:1
		}, {
		  type: dynamics.easeInOut,
		});
	// }
}




function hideResult(){
	document.getElementById("myNav").removeEventListener("click",showResult);
	var el = document.getElementById("myNav");
	dynamics.animate(el, {
	  height: 150
	}, {
	  type: dynamics.spring,
	  frequency: 200,
	  friction: 200,
	  duration: 1500
	});

	var ele=document.getElementById("result")
	dynamics.animate(ele, {
		opacity:0
	}, {
	  type: dynamics.easeInOut,
	});

	// document.getElementById("result0").style.display = "none";
	// console.log("hide!")
}
	
window.onscroll = function() {
	document.getElementById("myNav").addEventListener("click",showResult);
};


document.getElementById("close").addEventListener("click",hideResult);
document.getElementById("myNav").addEventListener("click",showResult);

document.getElementById("a0").addEventListener("click",toCart0);
document.getElementById("a1").addEventListener("click",toCart1);
document.getElementById("a2").addEventListener("click",toCart2);
document.getElementById("a3").addEventListener("click",toCart3);
document.getElementById("a4").addEventListener("click",toCart4);
document.getElementById("a5").addEventListener("click",toCart5);
document.getElementById("a6").addEventListener("click",toCart6);
document.getElementById("a7").addEventListener("click",toCart7);
document.getElementById("a8").addEventListener("click",toCart8);
document.getElementById("a9").addEventListener("click",toCart9);
document.getElementById("a10").addEventListener("click",toCart10);
document.getElementById("a11").addEventListener("click",toCart11);
document.getElementById("a12").addEventListener("click",toCart12);
document.getElementById("a13").addEventListener("click",toCart13);
document.getElementById("a14").addEventListener("click",toCart14);
document.getElementById("oneway").addEventListener("click",toCart15);
document.getElementById("monthpass").addEventListener("click",toCart16);
document.getElementById("citycenter").addEventListener("click",toCart17);
document.getElementById("outside").addEventListener("click",toCart18);

window.addEventListener('load', init);
