/* Your Code Here */
function calculatePayroll(employees) {
    return employees.reduce((totalPay, employee) => {
        return totalPay + allWagesFor.call(employee);
    }, 0);
}

function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(' ');

    employee.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour, 10)
    });

    return employee;
}

// Assuming createTimeInEvent is defined somewhere
function createTimeInEvent(employeeRecord, dateTimeString) {
    // Check if dateTimeString is defined before splitting
    if (dateTimeString) {
        // Split date and time
        const [date, time] = dateTimeString.split(' ');
        
        // Example logic to add timeInEvent to employeeRecord
        employeeRecord.timeInEvents.push({
            date: date,
            hour: parseInt(time.split(':')[0], 10) // Example: extract hour
        });
        
        return employeeRecord;
    } else {
        throw new Error('Date/Time String is undefined');
    }
}


function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);

    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    const rate = employee.payPerHour;

    return hoursWorked * rate;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

function calculatePayroll(employees) {
    return employees.reduce((totalPay, employee) => {
        return totalPay + allWagesFor.call(employee);
    }, 0);
}


