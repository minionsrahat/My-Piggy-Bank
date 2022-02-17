function validation(elementClass){
    let flag=0;
    document.querySelectorAll('.'+elementClass).forEach(element => {
    
    
        //Validate Input field to check whether input field contain blank text or not
        if(element.value=="")
        {
            element.nextElementSibling.innerText="This is required field. It can not be empty"
            element.nextElementSibling.classList.remove('d-none');  
        }

       //Validate Input field to check whether input field contain any string , char  or not
       else if(isNaN(element.value))
        {
            element.nextElementSibling.innerText=elementClass.toUpperCase()+" Can not be a String"
            element.nextElementSibling.classList.remove('d-none');
        }

        //Validate Input field to check whether input field value less than 0  or not
        else if(parseFloat(element.value)<0)
        {
            element.nextElementSibling.innerText=elementClass.toUpperCase()+" Can not be a negative number"
            element.nextElementSibling.classList.remove('d-none');
        }
       else{
        flag++;
        element.nextElementSibling.classList.add('d-none');
      }
    });

    //if validation dont contain any error then return false
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

     //If expense input field and income input field doesnt contains any error then do the rest of the calculation
    if(!ExpenseError && !InomeError){


        let totalExpense=0;
        //add all expense
        Array.prototype.slice.call(document.querySelectorAll('.expense')).map(element => {
            totalExpense+=parseFloat(element.value)
           
        });
        let totalIncome=parseFloat(document.getElementById('income').value)
        if(totalExpense>totalIncome){
            alert("You Havent enough money .Expense can not be greater than Income")
            document.getElementById('total-expense').innerText="";
            document.getElementById('total-balance').innerText="";
        }
        else{
            document.getElementById('total-expense').innerText=totalExpense;
              //Substract expense from income 
            document.getElementById('total-balance').innerText=totalIncome-totalExpense;
        }
    }
    else
    {
        //if validation contains any error then set innerText with blank text
        document.getElementById('total-expense').innerText="";
        document.getElementById('total-balance').innerText="";
    }

    //update remaining balance field
    calculateRemainingBalance() 

}


function calculateSavings() {
    let SavingsError=validation('saving')
    let InomeError=validation('income')

    //If savinginput field and income input field dont contains any error then do the rest of the calculation
    if(!SavingsError && !InomeError){
        let totalSaving=parseFloat(document.querySelector('.saving').value);
        let totalIncome=parseFloat(document.getElementById('income').value)
        let totalBalance=parseFloat(document.getElementById('total-balance').innerText)
        totalSaving=parseInt((totalSaving/100)*totalIncome);
       
        //If total saving greater than remaining balance
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
          //if validation contains any error then set innerText with blank text
        document.getElementById('total-saving').innerText="0";
      
    }

      //update remaining balance field
    calculateRemainingBalance() 
  }

  //if input field contain blank text then set it with zero
  function filterValue(node) {
    return parseInt(node==""?0:node);
      
  }

function calculateRemainingBalance() { 

    let totalIncome=(document.getElementById('income').value)
    totalIncome=filterValue(totalIncome)

    let totalExpense=(document.getElementById('total-expense').innerText)
    totalExpense=filterValue(totalExpense)

    let totalSaving=(document.getElementById('total-saving').innerText)
    totalSaving=filterValue(totalSaving)

    document.getElementById('total-remaining').innerText=totalIncome-(totalExpense+totalSaving)
 }



// add addEventListener for expense Calculation
document.querySelector('.calculate-btn').addEventListener('click',calculateExpense);



// add addEventListener for saving Calculation
document.querySelector('.save-btn').addEventListener('click',calculateSavings);


//Default call calculateExpense,calculateSavings function for calculate default value
calculateExpense()
calculateSavings()
