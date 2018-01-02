var salaryInput = $('input[id="salary"]').numeric({
    negative: false
});

salaryInput.keyup(function () {
    var yearlySalary = $(this).val();
    var hourlySalary = calculateHourlySalary(yearlySalary);
    var monthlySalary = calculateMonthlySalary(yearlySalary);

    renderHourMonthSalary(hourlySalary, monthlySalary);
});

function calculateHourlySalary(yearlySalary) {
    var workingHours = 2080; // ~2080 working hours in a year
    return toTwoDecimalPlaces(yearlySalary / workingHours);
}

function calculateMonthlySalary(yearlySalary) {
    return toTwoDecimalPlaces(yearlySalary / 12);
}

function toTwoDecimalPlaces(num) {
    return num.toFixed(2);
}

function renderHourMonthSalary(hourlySalary, monthlySalary) {
    $("#hour").html("$" + hourlySalary);
    $("#month").html("$" + monthlySalary);
}
