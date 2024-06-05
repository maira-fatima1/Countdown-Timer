#! /user/bin/env node
import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
let res = await inquirer.prompt([
    {
        type: "number",
        name: "userInput",
        message: "Please Enter the amount of second:",
        validate: (input) => {
            if (isNaN(input)) {
                return "please enter valid number";
            }
            else if (input > 60) {
                return "seconds must be in 60";
            }
            else {
                return true;
            }
        }
    }
]);
let input = res.userInput;
function startTime(val) {
    let intTime = new Date().setSeconds(new Date().getSeconds() + val);
    let intervalTime = new Date(intTime);
    setInterval((() => {
        let currTime = new Date();
        let timeDiff = differenceInSeconds(intervalTime, currTime);
        if (timeDiff <= 0) {
            console.log("Timer has expired");
            process.exit();
        }
        let min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        let sec = Math.floor(timeDiff % 60);
        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
    }), 100);
}
startTime(input);
