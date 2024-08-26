#! /usr/bin/env node
//Oop My Bank project
import inquirer from "inquirer";
import chalk from "chalk";


//Bank Account Interface
interface BankAccount{
    accountNumber : number;
    balance : number;
    withdraw (amount : number) :void ;
    deposit (amount : number) : void ;
    getBalance () : void;
};

//Bank Account class
class BankAccount implements BankAccount {
    accountNumber : number;
    balance : number;
    constructor(accountNumber : number, balance : number){
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    //Debit monay
    withdraw(amount : number) : void {
        if(this.balance >= amount){
            this.balance -= amount;
            console.log(chalk.yellow(`Withdrawal of $${amount} successfully. Remaining balance is : $${this.balance}`)); 
        }
        else{
                console.log(chalk.red("Insufficient Balance")); 
        };
    };

    //Credit monay
    deposit(amount : number) : void {
        if (amount > 100) {
            amount -= 1 //$1 frr changd if more then $100 is deposited.
        } this.balance += amount;
        console.log(chalk.magenta(`Deposit of $${amount} successfully. Rmaining balance is : $${this.balance}`));
};

    //check balance
    checkBalance(): void{
        console.log(chalk.green(`Current balance is : $${this.balance}`));
        
    };
};


// Creat customer class 
class Customer {
    firstName: string;
    lastName: string;
    gender : string;
    age : number;
    mobailNumber : number;
    account : BankAccount;
    constructor(firstName: string, lastName: string, gender: string, age: number, mobailNumber : number, account: BankAccount){
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobailNumber = mobailNumber;
        this.account = account;
    };

}


//Create bank account
const accounts : BankAccount[] = [
    new BankAccount (1001, 500),
    new BankAccount (1002, 1000),
    new BankAccount (1003, 2000)
];

// Create customers
const customers : Customer[] = [
    new Customer  ("Mehroz", "Saikh", "Male", 24, 31612398765, accounts[0]),
    new Customer  ("Samra", "Saikh", "Female", 26, 3172966856, accounts[1]),
    new Customer  ("Anas", "Khan", "Male", 22, 31414567780, accounts[2])
];

//Function to interact whit bank account

async function service(){
    do{
        const accountNumberInput = await inquirer.prompt({
                name : "accountNumber",
                type : "number",
                message : chalk.blue("Enter Your Account Number:")
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if(customer){
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
                name : "select",
                type : "list",
                message : chalk.magenta("Select An Operation"),
                choices : ["Deposit", "Withdraw", "Check Balance", "Exit"]
            }]);

            switch(ans.select){
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name : "amount",
                        type : "number",
                        message : chalk.blue("Enter The Amount to Deposit:")
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;

                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name : "amount",
                        type : "number",
                        message : chalk.magenta("Enter The Amount to Withdrw:")
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;

                case "Check Balance":
                    customer.account.checkBalance();
                    break;

                case "Exit":
                    console.log(chalk.red("Exiting Bank Program..."));
                    console.log(chalk.yellow("\nThank You For Using Bank Services. Have A Great Day!"));
                  return;  
                    
            }
        }
        else{
            console.log(chalk.red("Invalid Account Number. Please Try Again."));
        };
    } while (true) 
};
service()