
function validation(elementClass){
    let flag=0;
    document.querySelectorAll('.'+elementClass).forEach(element => {
        
        if(element.value=="")
        {
            element.nextElementSibling.innerText="This is required field. It can not be empty"
            element.nextElementSibling.classList.remove('d-none');  
        }
       else if(isNaN(parseInt(element.value)))
        {
            element.nextElementSibling.innerText=elementClass+" Can not be a String"
            element.nextElementSibling.classList.remove('d-none');
        }
        else if(parseInt( element.value)<0)
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
            totalExpense+=parseInt(element.value)
           
        });
        let totalIncome=parseInt(document.getElementById('income').value)
        if(totalExpense>totalIncome){
            alert("Expense can not be greater than Income")
        }
        else{
            document.getElementById('total-expense').innerText=totalExpense;
            document.getElementById('total-balance').innerText=totalIncome-totalExpense;
        }
    }

}




document.querySelector('.calculate-btn').addEventListener('click',()=>{
    calculateExpense()
});