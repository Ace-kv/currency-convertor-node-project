#! /usr/bin/env node
import inquirer from 'inquirer'

const rates: {[key: string]: {[key: string]: number}} = {
    'Pakistani Ruppee (PKR)': {

        'US dollar (USD)': 0.0036,
        'Euro (EUR)': 0.0034,
        'Saudi riyal (SAR)': 0.014,
        'Australian dollar (AUD)': 0.0055,
        'Canadian dollar (CAD)': 0.0049,
        'Chinese yuan (CNY)': 0.026 

    }, 'US dollar (USD)': {

        'Pakistani Ruppee (PKR)': 276.67,
        'Euro (EUR)': 0.93,
        'Saudi riyal (SAR)': 3.75,
        'Australian dollar (AUD)': 1.53,
        'Canadian dollar (CAD)': 1.34,
        'Chinese yuan (CNY)': 7.18

    }, 'Euro (EUR)': {

        'Pakistani Ruppee (PKR)': 298.42,
        'US dollar (USD)': 1.08,
        'Saudi riyal (SAR)': 4.04,
        'Australian dollar (AUD)': 1.65,
        'Canadian dollar (CAD)': 1.45,
        'Chinese yuan (CNY)': 7.74

    }, 'Saudi riyal (SAR)': {

        'Pakistani Ruppee (PKR)': 73.73,
        'US dollar (USD)': 0.27,
        'Euro (EUR)': 0.25,
        'Australian dollar (AUD)': 0.41,
        'Canadian dollar (CAD)': 0.36,
        'Chinese yuan (CNY)': 1.91

    }, 'Australian dollar (AUD)': {

        'Pakistani Ruppee (PKR)': 180.41,
        'US dollar (USD)': 0.65,
        'Euro (EUR)': 0.60,
        'Saudi riyal (SAR)': 2.45,
        'Canadian dollar (CAD)': 0.88,
        'Chinese yuan (CNY)': 4.68

    }, 'Canadian dollar (CAD)': {

        'Pakistani Ruppee (PKR)': 204.98,
        'US dollar (USD)': 0.74,
        'Euro (EUR)': 0.69,
        'Saudi riyal (SAR)': 2.78,
        'Australian dollar (AUD)': 1.14,
        'Chinese yuan (CNY)': 5.32

    }, 'Chinese yuan (CNY)': {

        'Pakistani Ruppee (PKR)': 38.82,
        'US dollar (USD)': 0.14,
        'Euro (EUR)': 0.13,
        'Saudi riyal (SAR)': 0.53,
        'Australian dollar (AUD)': 0.22,
        'Canadian dollar (CAD)': 0.19

    }
}

console.log('Welcome to the Console Currency Convertor (CCC). The only 3 Cs you need to travel well!\n');

const main = async () => {
    try {
        const firstPrompt = await inquirer.prompt([{
            type: 'list',
            name: 'myCurrency',
            message: 'Select the currency that you HAVE:',
            choices: ['Pakistani Ruppee (PKR)', 'US dollar (USD)', 'Euro (EUR)', 'Saudi riyal (SAR)', 'Australian dollar (AUD)',
                    'Canadian dollar (CAD)', 'Chinese yuan (CNY)'] 
        },
        {
            type: 'input',
            name: 'moneyInput',
            message: 'Enter the amount of money you want to convert WITHOUT the relevant currency sign e.g. write "1" instead of "$1"',
            validate: (moneyVal) => {
                const isValid = !isNaN(moneyVal)
                return isValid || 'Please enter a valid number'
            }
        }])

        const {myCurrency, moneyInput} = firstPrompt
        const secondPrompt = await inquirer.prompt([{

                type: 'list',
                name: 'currencyConv',
                message: 'Select the currency that you want to convert TO:',
                choices: ['Pakistani Ruppee (PKR)', 'US dollar (USD)', 'Euro (EUR)', 'Saudi riyal (SAR)', 'Australian dollar (AUD)',
                        'Canadian dollar (CAD)', 'Chinese yuan (CNY)'].filter((currency) => currency != myCurrency)
        }])
        return {...firstPrompt, ...secondPrompt}

    } catch (error: any) {
        if (error.isTtyError) {
            console.error("Prompt couldn't be rendered in the current environment");

          } else {
            console.error("Error during user input:", error.message);
          }
    }
}

const currencyConv = async () => {
    try{
        const answers: {[key: string]: string} = await main()
        const result: number = +rates[answers.myCurrency][answers.currencyConv] * +answers.moneyInput
        console.log(`\n${answers.moneyInput} ${answers.myCurrency} after conversion is equal to ${result} ${answers.currencyConv}`);

    } catch (error: any) {
        if (error.isTtyError) {
            console.error("Prompt couldn't be rendered in the current environment");

          } else {
            console.error("Error during user input:", error.message);
          }
    }
}

currencyConv()