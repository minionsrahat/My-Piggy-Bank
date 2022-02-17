function validation(elementClass){
    let flag=0;
    document.querySelectorAll('.'+elementClass).forEach(element => {
        
        if(element.value=="")
        {
            element.nextElementSibling.innerText="This is required field. It can not be empty"
            element.nextElementSibling.classList.remove('d-none');  
        }
       else if(isNaN(element.value))
        {
            element.nextElementSibling.innerText=elementClass+" Can not be a String"
            element.nextElementSibling.classList.remove('d-none');
        }
        else if(parseFloat(element.value)<0)
        {
            element.nextElementSibling.innerText=elementClass+" Can not be a negative number"
            element.nextElementSibling.classList.remove('d-none');
        }
       else{
        flag++;
        element.nextElementSibling.classList.add('d-none');
      }

    
    });
    if(flag==document.querySelectorAll('.'+elementClass).length){
        return false
    }
    else{
        return true;
    }

}
function calculateExpense(){
    let ExpenseError=validation('expense')
    let InomeError=validation('income')
    if(!ExpenseError && !InomeError){
        let totalExpense=0;
        Array.prototype.slice.call(document.querySelectorAll('.expense')).map(element => {
            totalExpense+=parseFloat(element.value)
           
        });
        let totalIncome=parseFloat(document.getElementById('income').value)
        if(totalExpense>totalIncome){
            alert("Expense can not be greater than Income")
        }
        else{
            document.getElementById('total-expense').innerText=totalExpense;
            document.getElementById('total-balance').innerText=totalIncome-totalExpense;
        }
    }
    else
    {
        document.getElementById('total-expense').innerText="";
        document.getElementById('total-balance').innerText="";
    }
    calculateRemainingBalance() 

}


function calculateSavings() {
    let SavingsError=validation('saving')

    if(!SavingsError){
        let totalSaving=parseFloat(document.querySelector('.saving').value);
        let totalIncome=parseFloat(document.getElementById('income').value)
        let totalBalance=parseFloat(document.getElementById('total-balance').innerText)
        totalSaving=parseInt((totalSaving/100)*totalIncome);
       
        if(totalSaving>totalBalance){
            document.getElementById('total-saving').innerText="0";
            alert("Sorry you havent enough money for saving "+totalSaving+" taka")
            
        }
        else{
            document.getElementById('total-saving').innerText=totalSaving;
            
        }
    }
    else
    {
        document.getElementById('total-saving').innerText="0";
      
    }
    calculateRemainingBalance() 

  }

function calculateRemainingBalance() { 

    let totalIncome=parseFloat(document.getElementById('income').value)
   
    let totalExpense=(document.getElementById('total-expense').innerText)
    totalExpense=parseFloat(totalExpense==""?0:totalExpense);
   
    let totalSaving=(document.getElementById('total-saving').innerText)
    totalSaving=parseFloat(totalSaving==""?0:totalSaving);
  
    document.getElementById('total-remaining').innerText=totalIncome-(totalExpense+totalSaving)
 }

document.querySelector('.calculate-btn').addEventListener('click',calculateExpense);
document.querySelector('.save-btn').addEventListener('click',calculateSavings);


// calculateExpense()

console.log(10>parseFloat(''));