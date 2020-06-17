var s,sn=0,timer,slen,timer2;
function scrollInit(){ 
 s=getid("s1");
 s.scrollTop=0;
 slen=s.innerHTML.split("|");
 s.innerHTML="";
 for(var i=0;i<slen.length;i++){s.innerHTML+=(slen[i]+"<br />");}
 s.innerHTML+=slen[0];
 timer2=setInterval(scrollstart,5000);
 s.onmouseover=function(){clearInterval(timer2);clearInterval(timer);s.style.backgroundColor="#ccc";}
 s.onmouseout=function(){timer2=setInterval(scrollstart,5000);s.style.backgroundColor="#fff";}
}
function scrollstart(){
 if(s.scrollTop>=(slen.length*20)){s.scrollTop=0;}
 timer=setInterval(scrollexec,30); 
 }
function scrollexec(){
 if(sn<20){
  sn++;
  s.scrollTop++;
  }else{
   sn=0;
   clearInterval(timer);
   }  
 }
function getid(id){return document.getElementById(id);}
window.onload=scrollInit;