var inputs="";
function backs(){
	inputs=inputs.substring(0,inputs.length-1);
	document.getElementById("result").innerHTML=inputs;
}
function del(){
	inputs="";
	document.getElementById("result").innerHTML=inputs;
}
function cal(i){
	if("+-*/^".includes(i)){
		if('+-*/^'.includes(inputs[inputs.length-1])){
			inputs=inputs.substring(0,inputs.length-1)+i;
		}
		else{
			inputs+=i;		
		}
	}
	else if(i=='('){
		if('+-*/^'.includes(inputs[inputs.length-1])){
			inputs+=i;
		}
		else{
			inputs+='*'+i;		
		}
	}
	else if(i==')'){
		inputs+=')*';
	}
	else{
		inputs+=i;
	}
	document.getElementById("result").innerHTML=inputs;
}
function equal(){
	while (true){
		if(!(inputs.includes('('))){
			inputs=eval(inputs);
			document.getElementById("result").innerHTML=inputs;
			break;
		}
		else{
			var y = inputs.substring(inputs.lastIndexOf('('),inputs.indexOf(')',inputs.lastIndexOf('('))+1);
			var x = y.substring(1,y.length-1);
			inputs=inputs.replace(y,eval(x));
		}
	}
}
/*
function evals(input){
	return eval(input);	
}
*/
function eval(input){
	console.log(input);
	var num=[];
	var opr="";
	var temp="";
	var j=0;
	var h="",l="",a=[];
	for(var i=0;i<=input.length;i++){
		if (isNaN(input[i]) && (input[i]!='.')){
			if(i!=input.length){
				opr+=input[i];
			}
			num[j++]=parseFloat(temp);
			temp="";
		}
		else{
			temp+=input[i];
		}
	}
	for(var i=0;i<opr.length;i++){
		if(opr[i]=='*' || opr[i]=='^'|| opr[i]=='/'){
			h+=opr[i];
		}
		else{
			l+=opr[i];
		}
		a[i]=opr[i];
	}
	for(var i=0;i<h.length;i++){
		j=a.indexOf(h[i]);
		switch(a[j])
		{
			case '*':
				num[j+1]=num[j]*num[j+1];
				a.splice(j,1);
				num.splice(j,1);
				break;
			case '/':
				num[j+1]=num[j]/num[j+1];
				a.splice(j,1);
				num.splice(j,1);
				break;
			case '^':
				num[j+1]=Math.pow(num[j],num[j+1]);
				a.splice(j,1);
				num.splice(j,1);
				break;	
		}
	}
	for(var i=0;i<l.length;i++){
		j=a.indexOf(l[i]);
		switch(a[j])
		{
			case '+':
				num[j+1]=num[j]+num[j+1];
				a.splice(j,1);
				num.splice(j,1);
				break;
			case '-':
				num[j+1]=num[j]-num[j+1];
				a.splice(j,1);
				num.splice(j,1);
				break;
		}
	}
	return num;
}
function pow2(){
	inputs=(parseInt(eval(inputs))*parseInt(eval(inputs))).toString();
	document.getElementById("result").innerHTML=inputs;
}
function sqrroot(){
	inputs=(Math.sqrt(parseInt(eval(inputs)))).toString();
	document.getElementById("result").innerHTML=inputs;
}
document.addEventListener('keypress',function(event){
	if(event.key=='Enter'){
		equal();
	}
	else if(isFinite(event.key) || '/*-+()'.includes(event.key)){
		cal(event.key);	
	}
});
document.addEventListener('keydown',function(event){
	if(event.key=='Backspace'){
		backs();
	}
	else if(event.key=='c'||event.key=='C'){
		del();
	}
});