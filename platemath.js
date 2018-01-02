var weightInput = $('input[id="weight"]').numeric({
    negative: false
});

var p45 = 0,
    p25 = 0,
    p10 = 0,
    p5 = 0,
    p2 = 0;

weightInput.keyup(function () {
    var wobar = ($(this).val() - 45) / 2;
    platesNeeded(p45, p25, p10, p5, p2);
    calculate(wobar);
});

function calculate(wobar) {
    if (wobar - 45 >= 0) {
        p45++;
        calculate(wobar - 45);
    } else if (wobar - 25 >= 0) {
        p25++;
        calculate(wobar - 25);
    } else if (wobar - 10 >= 0) {
        p10++;
        calculate(wobar - 10);
    } else if (wobar - 5 >= 0) {
        p5++;
        calculate(wobar - 5);
    } else if (wobar - 2.5 >= 0) {
        p2++;
        calculate(wobar - 2.5);
    }
    if (wobar == 0) {
        platesNeeded(p45, p25, p10, p5, p2);
        p45 = 0;
        p25 = 0;
        p10 = 0;
        p5 = 0;
        p2 = 0;
    }
}

function platesNeeded(p45, p25, p10, p5, p2) {
    $("#need").html('You would need...');
    $("#p45").html(p45 + ' set' + ((p45 > 1 || p45 == 0) ? 's' : '') + ' of 45 lb plates');
    $("#p25").html(p25 + ' set' + ((p25 > 1 || p25 == 0) ? 's' : '') + ' of 25 lb plates');
    $("#p10").html(p10 + ' set' + ((p10 > 1 || p10 == 0) ? 's' : '') + ' of 10 lb plates');
    $("#p5").html(p5 + ' set' + ((p5 > 1 || p5 == 0) ? 's' : '') + ' of 5 lb plates');
    $("#p2").html(p2 + ' set' + ((p2 > 1 || p2 == 0) ? 's' : '') + ' of 2.5 lb plates');
}
