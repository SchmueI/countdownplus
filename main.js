function print(value){
    console.log(value)
}

function parse(){

    startDate = document.getElementById("stDt").value + ""
    startTime = document.getElementById("stTe").value + ""

    endDate   = document.getElementById("edDt").value + ""
    endTime   = document.getElementById("edTe").value + ""


    startDate = startDate.split("-")
    startTime = startTime.split(":")
    
    //                                     VVV -1, bc js starts counting month by 0 but days by 1.....
    d = new Date(startDate[0], startDate[1]-1, startDate[2], startTime[0], startTime[1], 0, 0)
    print (startDate[0] + (startDate[1]-1) + startDate[2] + startTime[0] + startTime[1] + 0, + 0)
    startDate = d.valueOf()

    endDate   = endDate.split("-")
    endTime   = endTime.split(":")
    
    b = new Date(endDate[0], endDate[1]-1, endDate[2], endTime[0], endTime[1], 0, 0)
    print (endDate[0] + (endDate[1]-1) + endDate[2] + endDate[0] + endDate[1] + 0, + 0)
    endDate = b.valueOf();

    location.replace("index.html?startDate="+startDate+"&endDate="+endDate)

}

function selector(){
    let html = `

<h1>Start Tag</h1>
<input type = "date" id = "stDt"></input>
<input type = "time" id = "stTe"></input>

<br><br>

<hr>

<h1>Ziel Tag</h1>

<input type = "date" id = "edDt"></input>
<input type = "time" id = "edTe"></input>

<br><br>
<input type = "button" onclick = "parse()" value="Countdown!"></input>
    `
    document.getElementById("content").innerHTML = html;
}

function format(ms){
    seconds = ms / 1000
    minutes = seconds / 60
    hours = minutes / 60
    days = hours / 24

    buf = String(days).split(".")
    days = buf[0]

    buf = String(parseFloat("0."+buf[1]) * 24).split(".")
    hours = buf[0]

    buf = String(parseFloat("0."+buf[1]) * 60).split(".")
    minutes = buf[0]

    buf = String(parseFloat("0."+buf[1]) * 60).split(".")
    seconds = buf[0]

    buf = String(parseFloat("0."+buf[1]) * 1000).split(".")
    miliseconds = buf[0]

    return ""+days+" days, "+hours+":"+minutes+":"+seconds+"."+miliseconds
}

function countDown(startDate, endDate){
    now = new Date();
    now = now.valueOf()

    if (endDate > now.valueOf()){

        setInterval(function() {
            now = new Date();
            now = now.valueOf()
            countdownTime = endDate - now
            html = `
<center>
  <h1>`+format (countdownTime)+`</h1>
</center>
`
            document.getElementById("content").innerHTML = html;
        }, 81);
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
        selector();
    } else {
        countDown(startDate, endDate);
    }

}

checkValues()