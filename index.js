function createEmployeeRecord(array) {
    return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
};

}
function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, dataStamp) {
    let [date, hour] = dataStamp.split(" ");
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    })
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dataStamp) {
    let [date, hour] = dataStamp.split(" ");
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    })
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    let timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    let timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    if (timeInEvent && timeOutEvent) {
        return (timeOutEvent.hour - timeInEvent.hour) / 100;
    }
    return 0;
}

function wagesEarnedOnDate(employeeRecord, date) {
    let hours = hoursWorkedOnDate(employeeRecord, date);
    return hours * employeeRecord.payPerHour;
}
function allWagesFor(employeeRecord) {
    let datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    return datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employeeRecord) => total + allWagesFor(employeeRecord), 0);
}


