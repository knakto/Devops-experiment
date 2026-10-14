function calcForm() {
    let inputNum1 = Number($("#num1").val().trim());
    let inputNum2 = Number($("#num2").val().trim());
    let opperator = $("#operator").val();

    let result;

    if (isNaN(inputNum1) || isNaN(inputNum2)) {
        alert("Error :(");
        return;
    } else if (opperator === '+') {
        result = inputNum1 + inputNum2;
    } else if (opperator === '-') {
        result = inputNum1 - inputNum2;
    } else if (opperator === '*') {
        result = inputNum1 * inputNum2;
    } else if (opperator === '/') {
        if (inputNum2 === 0) {
            result = 'Cannot divide by zero';
        } else {
            result = inputNum1 / inputNum2;
        }
    } else if (opperator === '%') {
        if (inputNum2 === 0) {
            result = 'Cannot divide by zero';
        } else {
            result = inputNum1 % inputNum2;
        }
    } else {
        result = 'Error :(';
    }
    alert(result);
}

$(function () {
    $("#form").on("submit", function (event) {
        event.preventDefault();
        calcForm();
    });

    setInterval(function () {
        alert("Please, use me...");
    }, 30000);
});
