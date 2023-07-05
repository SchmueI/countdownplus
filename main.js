function print(value){
    console.log(value)
}

function parse(){

    startDate = document.getElementById("stDt").value + ""
    startTime = document.getElementById("stTe").value + ""

    endDate   = document.getElementById("stDt").value + ""
    endTime   = document.getElementById("edTe").value + ""


    startDate = startDate.split("-")
    startTime = startTime.split(":")
    
    //                                     VVV +1, bc js starts counting month by 0 but days by 1.....
    d = new Date(startDate[0], startDate[1]+1, startDate[2], startTime[0], startTime[1], 0, 0)
    startDate = d.valueOf()



    endDate   = endDate.split("-")
    endTime   = endTime.split(":")
    
    d = new Date(endDate[0], endDate[1]+1, endDate[2], endTime[0], endTime[1], 0, 0)
    endDate = d.valueOf()

    location.replace("index.html?startDate="+startDate+"&endDate="+endDate)

}

function selector(){
    let html = `
<input type = "date" id = "stDt"></input>
<input type = "time" id = "stTe"></input>

<br><br>

<input type = "date" id = "edDt"></input>
<input type = "time" id = "edTe"></input>

<br><br>
<input type = "button" onclick = "parse()" value="Countdown!"></input>
    `
    document.getElementById("content").innerHTML = html;
}

function countDown(startDate, endDate){
    now = new Date();
    print (startDate);
    print (endDate);
    print (now.valueOf());
    
    if (startDate < endDate && endDate > now.valueOf()){
        while (true){
            countdownTime = endDate - startDate
            html = `
<center>
  <h1>`+countdownTime+`</h1>
</center>
`
            document.getElementById("content").innerHTML = html;
        }
    }else{
        print ("format error")
    }
}

function checkValues(){

    var url_string = window.location;
    var url = new URL(url_string);
    var startDate = url.searchParams.get("startDate");
    var endDate   = url.searchParams.get("endDate");

    if (startDate == null || endDate == null){
        output = selector();
    } else if (isNaN(startDate) || isNaN(endDate) ){
        output = selector();
    } else {
        output = countDown(startDate, endDate);
    }

}

checkValues()