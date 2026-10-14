function calcForm() {
    let inputNum1 =document.getElementById("num1").value;
    let inputNum2 =document.getElementById("num2").value;

    inputNum1 = Number(inputNum1.trim()) ;
    inputNum2 = Number(inputNum2.trim()) ; 






    let opperator = document.getElementById("operator").value;
    
    console.log(inputNum1);

    console.log(inputNum2);

    console.log(opperator);
    

//    inputNum2 =  inputNum2.trim ;
//    inputNum1 =  inputNum1.trim

   

    let result;

    if (isNaN(inputNum1) || isNaN(inputNum2)) {

        alert("Error :(");
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

setInterval(() => {
    alert("Please, use me...")
}, 30000);