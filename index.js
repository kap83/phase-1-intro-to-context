// Your code here

//takes as an argument: an array that includes 3 strings and interger. leave blank spaces

let info = [ , , , ]

function createEmployeeRecord(info) {
//returns an Object with the elements from the array (+ timeIn and timeOut) as keys
    let obj = {
        firstName: info[0],
        familyName: info[1],
        title: info[2],
        payPerHour: info[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return obj
}
//createEmployeeRecord()


// arguments array of arrays
function createEmployeeRecords(arr){
//returns an array of objects -> converts each nested array into createEmployeeRecord()
let newArr = [];
for(let i = 0; i < arr.length; i++){
    newArr.push(createEmployeeRecord(arr[i]))
} 
return newArr
}
//createEmployeeRecords()



//takes 2 arguments: createEmployeeRecord & date and time stamp
//add timeStamp as an object to timeInEvents in createEmployeeRecord
//returns an employee record

function createTimeInEvent(record, dateStamp){ //provides 2014-02-28 1400
    let dateAndTime = dateStamp.split(" ")
    let timeObj = {
        type: "TimeIn", 
        hour: parseInt(dateAndTime[1]),
        date: dateAndTime[0]
    }
   record.timeInEvents.push(timeObj) //we're trying to push timeObj *into* record.timeInEvent
   return record //don't return the push, it won't work
}
//createTimeInEvent()

//same as above
function createTimeOutEvent(record, dateStamp){
    let dateAndTime = dateStamp.split(" ")
    let timeObj = {
        type: "TimeOut", 
        hour: parseInt(dateAndTime[1]),
        date: dateAndTime[0],   
    }
    //console.log(timeObj.hour)
    record.timeOutEvents.push(timeObj)
    return record 
}

//returns hours worked as an interger 

function hoursWorkedOnDate(record, dateStamp){
    let hours;
    for(let i=0; i < record.timeInEvents.length; i++){
        if(record.timeInEvents[i].date === dateStamp){
            if(record.timeOutEvents[i].date === dateStamp){
                hours = record.timeOutEvents[i].hour - record.timeInEvents[i].hour
            }
        }
    }
    return hours/100
}

// fx wagesEarnedOnDate(record, dateStamp) {hoursWorkedOnDate * payRate returns pay owed. }

function wagesEarnedOnDate(record, dateStamp){
   //console.log(record.payPerHour) //gives me pay per hour
   return (hoursWorkedOnDate(record, dateStamp)) * record.payPerHour
}

//fx allWagesFor(record){ use wagesEarnedOnDate aggregate the value of all dates worked => a number}

function allWagesFor(record){
    let allPay = [];
    let allDates = [];

    for (let i = 0; i < record.timeInEvents.length; i++){
        allDates.push(record.timeInEvents[i].date)
    }

    allDates.forEach(date => {
        allPay.push(wagesEarnedOnDate(record, date))
    });

    return allPay.reduce(( previousValue, currentValue ) => previousValue + currentValue)
}

// fx calculatePayroll(arr){use wagesEarnedOnDate aggregate the value of all the dates worked => sum of pay owed to the employee for all dates worked, a number}
function calculatePayroll(arrRecord){
    let payRoll = []
    arrRecord.forEach(emp =>{
        payRoll.push(allWagesFor(emp))
    })
    return payRoll.reduce((previousValue, currentValue) => previousValue + currentValue)
}