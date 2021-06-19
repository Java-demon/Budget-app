  const getSumButton = document.getElementById('start'),
        budgetValue = document.getElementsByClassName('budget-value')[0],
        dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
        levelValue = document.getElementsByClassName('level-value')[0],
        expensesValue = document.getElementsByClassName('expenses-value')[0],
        optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
        incomeValue = document.getElementsByClassName('income-value')[0],
        monthSavingValue = document.getElementsByClassName('monthsavings-value')[0],
        yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],

        expensesItem = document.getElementsByClassName('expenses-item'),
        expensesBtn = document.getElementsByTagName('button')[0],
        optionalExpensesBtn = document.getElementsByTagName('button')[1],
        countBtn = document.getElementsByTagName('button')[2],
        optionalexpensesItem = document.querySelectorAll('.optionalexpenses-item'),
        incomeItem = document.querySelector('.choose-income'),
        checkSavings = document.querySelector('#savings'),
        sumValue = document.querySelector('.choose-sum'),
        percentValue = document.querySelector('.choose-percent'),
        yearValue = document.querySelector('.year-value'),
        monthValue = document.querySelector('.month-value'),
        dayValue = document.querySelector('.day-value');

      
  let money, time;    


  const appData = {
    budget: money,
    expenses: {},
    optionalExpenses: {},
    income: [],
    timeData: time,
    savings: false,
    moneyPerDay: 0,
  
  };


  getSumButton.addEventListener('click', () => {
    money = +prompt('Ваш бюджет на меяц', ''),
    time = prompt('Введите дату в формате YYYY-MM-DD','');
    while(!money) {
      money = +prompt('Ваш бюджет на меяц', '');
    }
    appData.budget = money;
    appData.timeData = time
    budgetValue.textContent = money.toFixed();
    const yearMonthDay = time.split('-');
    yearValue.value = yearMonthDay[0];
    monthValue.value = yearMonthDay[1];
    dayValue.value = yearMonthDay[2];

    // yearValue.value = new Date(Date.parse(time)).getFullYear();
    // monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    // dayValue.value = new Date(Date.parse(time)).getDate();

    console.log(appData.timeData);
  });

  expensesBtn.addEventListener('click', () => {
    let sum = 0;
      for(let i = 0; i < expensesItem.length - 1; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++ i].value;                     
        
        if(a && a.length < 50 && b) {
            appData.expenses[a] = b;
            sum += parseInt(b) ? parseInt(b) : 0;
        } else {
          --i;
        }
      
      }
      expensesValue.textContent = sum;

  });

  optionalExpensesBtn.addEventListener('click', () => {
    for(let i = 0; i < optionalexpensesItem.length; i++) {
      let opt = optionalexpensesItem[i].value;
      appData['optionalExpenses'][i] = opt;
      optionalExpensesValue.textContent += appData['optionalExpenses'][i] + ' ';
    }
  });

  countBtn.addEventListener('click', () => {

    if(!appData.budget) {
      dayBudgetValue.textContent = 'Произошла ошибка';
      return;
    }

    appData.moneyPerDay = (appData.budget / 30).toFixed();
    dayBudgetValue.textContent = appData.moneyPerDay;

    if(appData.moneyPerDay < 500) {
      levelValue.textContent = 'иди съешь доширак';
    } else if(appData.moneyPerDay >= 500 && appData.moneyPerDay < 2000) {
      levelValue.textContent = 'Можно позволить себе шаурму';
    } else if (appData.moneyPerDay > 2000){
      levelValue.textContent = 'Да ты буржуй'; 
    } else {
      levelValue.textContent = 'произошла ошибка';
    }
     
  });
  
  incomeItem.addEventListener('input', () => {
    const items = incomeItem.value;
    appData.income = items.split(',');
    incomeValue.textContent = appData.income;
  });

  levelValue.textContent = [1,2,4,5];

  checkSavings.addEventListener('click', () => {
   appData.savings = appData.savings ? false : true;
  });

  // sumValue.addEventListener('input', () => {
  //   if(appData.savings){
  //     const sum = +sumValue.value,
  //           percent = +percentValue.value
  //     appData.monthIncome = sum/100/12*percent;
  //     appData.yearIncome = sum/100*percent;
  //   } 
  // })
  
  percentValue.addEventListener('input', () => {
    if(appData.savings){
      const sum = +sumValue.value,
            percent = +percentValue.value
      appData.monthIncome = sum/100/12*percent;
      appData.yearIncome = sum/100*percent;

      monthSavingValue.textContent = appData.monthIncome.toFixed(1);
      yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
  })