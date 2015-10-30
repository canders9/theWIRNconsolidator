//REPEATEDLY USED FUNCTIONS:
var findThenDo = function(string, callback){
  for(key in obj){
    if(key == string){
      callback()
    }
  }
}//runs through an array of 'obj' keys and if string == one of the keys, performs callback
var addTextBar=function(string, str){
  document.getElementById(string).innerHTML=document.getElementById(string).innerHTML+('<br><input type="text" class="form-control" id="'+str+'" placeholder="action not performed" id="addedBar">')
}
var findWIRN=function(object, ID, callback){
  for(key in object){
    var element=object[key]
    var WIRNvalue=document.getElementById(ID).value
    for(i=0;i<element.length;i++){
      if(element[i] == WIRNvalue[0] && element[i+1] == WIRNvalue[1] && element[i+2] == WIRNvalue[2] && element[i+3] == WIRNvalue[3] && element[i+4] == WIRNvalue[4] && element[i+5] == WIRNvalue[5]
      && element[i+6] == WIRNvalue[6] && element[i+7] == WIRNvalue[7] && element[i+8] == WIRNvalue[8]){
        WIRNsearchResults=element.split("_")
        commaKiller(WIRNsearchResults)
        WIRNkeeper=WIRNvalue
        callback()
      }//end if statement
    }//end for loop
  }//end for-in loop
}//end findWIRN
var commaKiller=function(array){
  for(x=0;x<array.length;x++){
    if(array[x][array[x].length-1] == ","){
      array[x]=array[x].substring(0,array[x].length-1);
      commaKiller(array)
    }
    else{
      array=array
    }
  }
}
var digitCounter=function(string,callback){
  if(string.length == 0||string.length == 9){
    callback()
  }
}




//CONFIRM NUMBER GENERATOR:
var obj={}//object where all confirmation numbers will be stored with their WIRNs
var WIRNkeeper=""
document.getElementById("submitButton").onclick=function(){
  document.getElementById("FAconfirmNumberPrint").innerHTML=" "
  var confirmNumber= "CN"+Math.floor(Math.random()*1e8)//generates random 8 digit number prefixed with 'CN'
  var generateConfirmNumber= function(){
    var confirmNumber= "CN"+Math.floor(Math.random()*1e8)
    findThenDo(confirmNumber,generateConfirmNumber)
  }//redefines 'confirmNumber' with new 8 digit number prefixed with 'CN'
  findThenDo(confirmNumber, generateConfirmNumber)
  //searches to see if confirmation number already exists in 'obj', if it does the callback function will
  //generate a new CN and repeat search for duplication. Should work, but needs a way to be tested
  var alertConfirmNumber=function(){
    document.getElementById("confirmNumberPrint").innerHTML=("Confirmation Number: "+ confirmNumber)
  }
  alertConfirmNumber()
  //generate random number and return it as confirm number
  var theDate=new Date()
  var theMonth=theDate.getMonth()+1
  var dayOfMonth=theDate.getDate()
  var theYear=theDate.getFullYear()
  var fullDate=theMonth + '/' +dayOfMonth +'/' +theYear
  var CNcallback=function(){
    document.getElementById("confirmNumberPrint").innerHTML="The WIRN " + WIRNkeeper + " has already been stored, please verify your input is correct and move it to the comment field"
  }
  findWIRN(obj, "sell", CNcallback)
  findWIRN(obj, "buy", CNcallback)
  findWIRN(obj, "exchange", CNcallback)
  findWIRN(obj, "phoneChange", CNcallback)
  findWIRN(obj, "addressChange", CNcallback)
  findWIRN(obj, "emailChange", CNcallback)
  var CNprint=document.getElementById("confirmNumberPrint").innerHTML
  var Dsell="nope"
  var Dbuy="nope"
  var Dexchange="nope"
  var DphoneChange="nope"
  var DaddressChange="nope"
  var DemailChange="nope"
  if(CNprint[0] != "T"){
    document.getElementById("confirmNumberPrint").innerHTML="All WIRNs are 9 digit numbers, please verify all numbers are 9 digits"
    digitCounter(document.getElementById("sell").value,function(){Dsell="good"})
    digitCounter(document.getElementById("buy").value,function(){Dbuy="good"})
    digitCounter(document.getElementById("exchange").value,function(){Dexchange="good"})
    digitCounter(document.getElementById("phoneChange").value,function(){DphoneChange="good"})
    digitCounter(document.getElementById("addressChange").value,function(){DaddressChange="good"})
    digitCounter(document.getElementById("emailChange").value,function(){DemailChange="good"})
    console.log(Dbuy)
    if(Dsell == "good" && Dbuy == "good" && Dexchange == "good" && DphoneChange == "good" && DaddressChange == "good" && DemailChange == "good"){
      obj[confirmNumber]=
        "date:" + fullDate
        +"_sell:" + document.getElementById("sell").value
        +"_buy:"+ document.getElementById("buy").value
        +"_exchange:" +document.getElementById("exchange").value
        +"_phone number change:" +document.getElementById("phoneChange").value
        +"_address change:"+document.getElementById("addressChange").value
        +"_email change:"+document.getElementById("emailChange").value
        +"_Comments:"+document.getElementById("additionalComments").value
      //add confirm number to obj as key with textbox values as key value
      sell.value=""
      buy.value=""
      exchange.value=""
      phoneChange.value=""
      addressChange.value=""
      emailChange.value=""
      additionalComments.value=""
      document.getElementById("confirmNumberPrint").innerHTML=("Confirmation Number: "+ confirmNumber)
    }
  }
}//empties text box values after they've been saved to 'obj'


//SIMPLE SEARCH RESULTS:
document.getElementById("searchFunction").onclick = function(){
  document.getElementById("FAconfirmNumberPrint").innerHTML=" "
  document.getElementById("confirmNumberPrint").innerHTML="Confirmation Number not Found"
  var CNnumber= document.getElementById("searchBar").value;//stores entered CN number
  var addToHTML=function(){
    var searchResult=obj[CNnumber].split("_");//splits desired element into array of WIRNs
    var finalSearchResult=[]//defines 'finalSearchResult' as empty array
    for(i=0;i<searchResult.length;i++){
      commaKiller(searchResult)
      if(searchResult[i].indexOf(':') != searchResult[i].length-1){
        finalSearchResult.push(searchResult[i])
      } //for loop goes through each element of 'searchResult' and adds each element that doesn't
        //end in ':'(i.e. that is storing a WIRN) to 'finalSearchResult'
    }
    commaKiller(finalSearchResult)
    document.getElementById("confirmNumberPrint").innerHTML= "Search Results: "+ "<br>" + finalSearchResult.join("<br>");
    //above line rejoins the elements of 'finalSearchResult' using line breaks(displays better) and adds them to the HTML
  }//function explained line by line above
  findThenDo(CNnumber, addToHTML)
  document.getElementById("FAconfirmNumberPrint").innerHTML=" "
  //clears out "FAconfirmNumberPrint"
  document.getElementById("disapearAfterAnswered").innerHTML="<div class='input-group'><span class='input-group-btn'><button class='btn btn-default' type='button' id='howManyClientsButton'>Submit</button></span><input id='FAquestionBar' type='text' class='form-control' placeholder='How many clients will the Financial Advisor be working with today?'></div>"
  //reverts "disaperafteranswered"
  return false;
}

//FA CONFIRM NUMBER GENERATOR
var counter=1
var addMultipleTextBars=function(){
  counter = counter+1
  addTextBar("addText1","Csell"+counter.toString());
  addTextBar("addText2","Cbuy"+counter.toString());
  addTextBar("addText3","Cexchange"+counter.toString());
  addTextBar("addText4","CphoneChange"+counter.toString());
  addTextBar("addText5","CaddressChange"+counter.toString());
  addTextBar("addText6","CemailChange"+counter.toString());
}
document.getElementById("howManyClientsButton").onclick=function(){
  document.getElementById("addText1").innerHTML=" "
  document.getElementById("addText2").innerHTML=" "
  document.getElementById("addText3").innerHTML=" "
  document.getElementById("addText4").innerHTML=" "
  document.getElementById("addText5").innerHTML=" "
  document.getElementById("addText6").innerHTML=" "
  var clientNumber=document.getElementById("FAquestionBar").value.toString();
  for(i=1;i<clientNumber;i++){
    console.log(i);
    addMultipleTextBars();
    document.getElementById("disapearAfterAnswered").innerHTML=" "
  }
}
document.getElementById("addClientButton").onclick=function(){
  addMultipleTextBars();
  document.getElementById("FAconfirmNumberPrint").innerHTML=" "
  //clears out "FAconfirmNumberPrint"
}
document.getElementById("FAsubmitButton").onclick=function(){
  document.getElementById("confirmNumberPrint").innerHTML=""
  // document.location+='#FAgenerator';
  // return false;
  var confirmNumber= "FA"+Math.floor(Math.random()*1e8)
  var generateFAConfirmNumber= function(){
    var confirmNumber= "FA"+Math.floor(Math.random()*1e8)
    findThenDo(confirmNumber, generateFAConfirmNumber)
  }
  findThenDo(confirmNumber, generateFAConfirmNumber)
  //generates FA confirm number and verifies it has not already been stored as a key

  var alertFAConfirmNumber=function(){
    document.getElementById("FAconfirmNumberPrint").innerHTML=("Confirmation Number:"+ confirmNumber)
  }
  alertFAConfirmNumber()


  var theDate=new Date()
  var theMonth=theDate.getMonth()+1
  var dayOfMonth=theDate.getDate()
  var theYear=theDate.getFullYear()
  var fullDate=theMonth + '/' +dayOfMonth +'/' +theYear
  //generates date and stores it in correct format under 'fullDate'

  var CsellArr=[]
  var CbuyArr=[]
  var CexchangeArr=[]
  var CphoneChangeArr=[]
  var CaddressChangeArr=[]
  var CemailChangeArr=[]
  var storeMultipleAccount=function(string,arr){
    for(i=2;i<=counter;i++){
      arr.push(document.getElementById(string+i.toString()).value)
    }
  }
  storeMultipleAccount("Csell",CsellArr)
  storeMultipleAccount("Cbuy",CbuyArr)
  storeMultipleAccount("Cexchange",CexchangeArr)
  storeMultipleAccount("CphoneChange",CphoneChangeArr)
  storeMultipleAccount("CaddressChange",CaddressChangeArr)
  storeMultipleAccount("CemailChange",CemailChangeArr)
  var FAcallback=function(){
    document.getElementById("disapearAfterAnswered").innerHTML=" ";//clears away 'disaperafteranswered'
    document.getElementById("FAconfirmNumberPrint").innerHTML="The WIRN " + WIRNkeeper + " has already been stored, please verify your input is correct and move it to the comment field"
  }
  findWIRN(obj,"FAphoneChange",FAcallback)
  findWIRN(obj,"FAaddressChange",FAcallback)
  findWIRN(obj,"FAemailChange",FAcallback)
  findWIRN(obj,"Csell",FAcallback)
  for(k=2;k<=counter;k++){
    findWIRN(obj,"Csell"+k.toString(),FAcallback)
  }
  findWIRN(obj,"Cbuy",FAcallback)
  for(k=2;k<=counter;k++){
    findWIRN(obj,"Cbuy"+k.toString(),FAcallback)
  }
  findWIRN(obj,"Cexchange",FAcallback)
  for(k=2;k<=counter;k++){
    findWIRN(obj,"Cexchange"+k.toString(),FAcallback)
  }
  findWIRN(obj,"CphoneChange",FAcallback)
  for(k=2;k<=counter;k++){
    findWIRN(obj,"CphoneChange"+k.toString(),FAcallback)
  }
  findWIRN(obj,"CaddressChange",FAcallback)
  for(k=2;k<=counter;k++){
    findWIRN(obj,"CaddressChange"+k.toString(),FAcallback)
  }
  findWIRN(obj,"CemailChange",FAcallback)
  for(k=2;k<=counter;k++){
    findWIRN(obj,"CemailChange"+k.toString(),FAcallback)
  }
  var FADphoneChange="nope";
  var FADaddressChange="nope";
  var FADemailChange="nope";
  var CDsell="nope";
  var CDsell1=0;
  var CDbuy="nope";
  var CDbuy1=0;
  var CDexchange="nope";
  var CDexchange1=0;
  var CDphoneChange="nope";
  var CDphoneChange1=0;
  var CDaddressChange="nope";
  var CDaddressChange1=0;
  var CDemailChange="nope";
  var CDemailChange1=0;
  var FAprint=document.getElementById("FAconfirmNumberPrint").innerHTML
  if(FAprint[0] != "T"){
    document.getElementById("disapearAfterAnswered").innerHTML=" "
    document.getElementById("FAconfirmNumberPrint").innerHTML="All WIRNs are 9 digit numbers, please verify all numbers are 9 digits"
    digitCounter(document.getElementById("FAphoneChange").value,function(){FADphoneChange="good"});
    digitCounter(document.getElementById("FAaddressChange").value,function(){FADaddressChange="good"});
    digitCounter(document.getElementById("FAemailChange").value,function(){FADemailChange="good"});
    digitCounter(document.getElementById("Csell").value,function(){CDsell="good"});
    digitCounter(document.getElementById("Cbuy").value,function(){CDbuy="good"});
    digitCounter(document.getElementById("Cexchange").value,function(){CDexchange="good"});
    digitCounter(document.getElementById("CphoneChange").value,function(){CDphoneChange="good"});
    digitCounter(document.getElementById("CaddressChange").value,function(){CDaddressChange="good"});
    digitCounter(document.getElementById("CemailChange").value,function(){CDemailChange="good"});
    for(x=2;x<=counter;x++){
      digitCounter(document.getElementById("Csell"+x.toString()).value,function(){CDsell1=CDsell1+1});
      digitCounter(document.getElementById("Cbuy"+x.toString()).value,function(){CDbuy1=CDbuy1+1});
      digitCounter(document.getElementById("Cexchange"+x.toString()).value,function(){CDexchange1=CDexchange1+1});
      digitCounter(document.getElementById("CphoneChange"+x.toString()).value,function(){CDphoneChange1=CDphoneChange1+1});
      digitCounter(document.getElementById("CaddressChange"+x.toString()).value,function(){CDaddressChange1=CDaddressChange1+1});
      digitCounter(document.getElementById("CemailChange"+x.toString()).value,function(){CDemailChange1=CDemailChange1+1});
    }
    if(CDsell1 == counter-1 && CDbuy1 == counter-1 && CDexchange1 == counter-1 && CDphoneChange1 == counter-1 && CDaddressChange1 == counter-1 && CDemailChange1 == counter-1
    && FADphoneChange=="good" && FADaddressChange == "good" && FADemailChange == "good" && CDsell == "good" && CDbuy == "good" && CDexchange == "good" && CDphoneChange == "good" && CDaddressChange == "good" && CDemailChange == "good"){
      obj[confirmNumber]=
        "date:" + fullDate
        +"_Financial Advisor Phone Number Change:" + document.getElementById("FAphoneChange").value
        +"_Financial Advisor Address Change:" +document.getElementById("FAaddressChange").value
        +"_Financial Advisor Email Change:"+ document.getElementById("FAemailChange").value
        +"_sell:" + document.getElementById("Csell").value
        +','+CsellArr.toString()
        +"_buy:"+ document.getElementById("Cbuy").value
        +','+CbuyArr.toString()
        +"_exchange:" +document.getElementById("Cexchange").value
        +','+CexchangeArr.toString()
        +"_phone number change:" +document.getElementById("CphoneChange").value
        +','+CphoneChangeArr.toString()
        +"_address change:"+document.getElementById("CaddressChange").value
        +','+CaddressChangeArr.toString()
        +"_email change:"+document.getElementById("CemailChange").value
        +','+CemailChangeArr.toString()
        +"_Comments:"+document.getElementById("CadditionalComments").value

        document.getElementById("FAgeneratorBody").innerHTML="<label>Financial Advisor Phone Number Change:</label><input type='text' class='form-control' id='FAphoneChange' placeholder='action not performed'><label>Financial Advisor Address Change:</label><input type='text' class='form-control' id='FAaddressChange' placeholder='action not performed'><label>Financial Advisor Email Change:</label><input type='text' class='form-control' id='FAemailChange' placeholder='action not performed'><label>Sell:</label><input type='text' class='form-control' id='Csell' placeholder='action not performed'><div id='addText1'></div><label>Buy:</label><input type='text' class='form-control' id='Cbuy' placeholder='action not performed'><div id='addText2'></div><label>Exchange:</label><input type='text' class='form-control' id='Cexchange' placeholder='action not performed'><div id='addText3'></div><label>Phone Number Change:</label><input type='text' class='form-control' id='CphoneChange' placeholder='action not performed'><div id='addText4'></div><label>Address Change:</label><input type='text' class='form-control' id='CaddressChange' placeholder='action not performed'><div id='addText5'></div><label>Email Address Change:</label><input type='text' class='form-control' id='CemailChange' placeholder='action not performed'><div id='addText6'></div>"
        //above line reverts 'FAgeneratorBody' back to single client form
        document.getElementById("disapearAfterAnswered").innerHTML=" "
        //clears out "disapearAfterAnswered"
        alertFAConfirmNumber()
    }
  }
    //reposition to proper spot
}//FAsubmitButton onclick end

//CN search below, basically repeated from navbar search
document.getElementById("CNsearchButton").onclick = function(){
  document.getElementById("advancedSearchResults").innerHTML=" "
  document.getElementById("advancedSearchResults").innerHTML="Confirmation Number not Found"
  var CNnumber= document.getElementById("CNsearchBar").value;//stores entered CN number
  var addToHTML=function(){
    var searchResult=obj[CNnumber].split("_");//splits desired element into array of WIRNs
    var finalSearchResult=[]//defines 'finalSearchResult' as empty array
    for(i=0;i<searchResult.length;i++){
      commaKiller(searchResult)
      if(searchResult[i].indexOf(':') != searchResult[i].length-1){
        finalSearchResult.push(searchResult[i])
      } //for loop goes through each element of 'searchResult' and adds each element that doesn't
        //end in ':'(i.e. that is storing a WIRN) to 'finalSearchResult'
    }
    commaKiller(finalSearchResult)
    document.getElementById("advancedSearchResults").innerHTML= "Search Results: "+ "<br>" + finalSearchResult.join("<br>");
    //above line rejoins the elements of 'finalSearchResult' using line breaks(displays better) and adds them to the HTML
  }//function explained line by line above
  findThenDo(CNnumber, addToHTML)
  return false;
  document.getElementById("CNsearchBar").value=" ";
  document.getElementById("WIRNsearchBar").value=" ";
  document.getElementById("dateSearchBar").value=" ";
  document.getElementById("confirmNumberPrint").innerHTML=" ";
  document.getElementById("FAconfirmNumberPrint").innerHTML=" ";
}

//WIRN search below
var finalWIRNsearchResults=[]
var WIRNsearchResults="WIRN not found"
document.getElementById("WIRNsearchButton").onclick=function(){
  document.getElementById("advancedSearchResults").innerHTML=" "
  document.getElementById("advancedSearchResults").innerHTML="WIRN not found"
  if(document.getElementById("WIRNsearchBar").value.length == 9){
    var cb=function(){
      for(x=0;x<WIRNsearchResults.length;x++){
        if(WIRNsearchResults[x].indexOf(":") != WIRNsearchResults[x].length-1){
          finalWIRNsearchResults.push(WIRNsearchResults[x])
        }
      }
      commaKiller(finalWIRNsearchResults)
      document.getElementById("advancedSearchResults").innerHTML="Search Results:" + "<br>"+ finalWIRNsearchResults.join("<br>")
    }
    findWIRN(obj,"WIRNsearchBar",cb)
  }
  else{
    document.getElementById("advancedSearchResults").innerHTML="All WIRNs are 9 digit numbers, please eneter a 9 digit number"
  }
  document.getElementById("CNsearchBar").value=" ";
  document.getElementById("WIRNsearchBar").value=" ";
  document.getElementById("dateSearchBar").value=" ";
  document.getElementById("confirmNumberPrint").innerHTML=" ";
  document.getElementById("FAconfirmNumberPrint").innerHTML=" ";
}

//date search below
var arrayOfKeys=[]
document.getElementById("dateSearchButton").onclick=function(){
  document.getElementById("advancedSearchResults").innerHTML="There are no confirmation numbers that were generated on the input date."
  var dateValue=document.getElementById("dateSearchBar").value
  for(key in obj){
    var element=obj[key]
    for(i=0;i<element.length;i++){
      if(element[i] == dateValue[0] && element[i+1] == dateValue[1] && element[i+3] == dateValue[3] && element[i+4] == dateValue[4] && element[i+6] == dateValue[6] && element[i+7] == dateValue[7]
      && element[i+8] == dateValue[8] && element[i+9] == dateValue[9]){
        arrayOfKeys.push(key)
        document.getElementById("advancedSearchResults").innerHTML=arrayOfKeys
      }
    }
  }
  return false;
  document.getElementById("CNsearchBar").value=" ";
  document.getElementById("WIRNsearchBar").value=" ";
  document.getElementById("dateSearchBar").value=" ";
  document.getElementById("confirmNumberPrint").innerHTML=" ";
  document.getElementById("FAconfirmNumberPrint").innerHTML=" ";
}

document.getElementById("WIRNgeneratorButton").onclick=function(){
  var WIRNarray=[]
  var WIRNfunction=function(){
    var wirnVariable=Math.floor(Math.random()*1e9).toString()
    WIRNarray.push(wirnVariable)
  }
  for(l=0;l<10;l++){
    WIRNfunction()
  }
  document.getElementById("WIRNprint").innerHTML=WIRNarray
}//end onClick
