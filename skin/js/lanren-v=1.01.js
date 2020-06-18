/* ------------------------------------------------------------------------
	www.lanrentuku.com
------------------------------------------------------------------------- */

var n=0;
var showNum = document.getElementById("num");
function Mea(value){
	n=value;
	plays(value);
	}
function plays(value){ 
		 for(i=0;i<3;i++){
			  if(i==value){			  
			  	document.getElementById("pc_"+value).style.display="block";
			  	//alert(document.getElementById("pc_"+value).style.display)
			  }else{
			    document.getElementById("pc_"+i).style.display="none";			    
			  }			
		}	
}


function clearAuto(){clearInterval(autoStart)}
function setAuto(){autoStart=setInterval("auto(n)", 8000)}
function auto(){
	n++;
	if(n>2)n=0;
	Mea(n);
} 
function sub(){
	n--;
	if(n<0)n=2;
	Mea(n);
} 
window.setTimeout("setAuto();",1000); 