// form-script

const myForm = document.querySelector('#orders-form');
const dishName = document.querySelector('#name');
const dishAmount = document.querySelector('#amount');
const table = document.querySelector('#table');
const msg = document.querySelector('.msg');

myForm.addEventListener('submit', onSubmit);

window.addEventListener('DOMContentLoaded', () => {
    axios.get('https://crudcrud.com/api/ac1211aecf064c378d1c38338a651cbc/ordersData')
    .then((response) => {
        for(orderObj of response.data){
            showOrdersOnScreen(orderObj);
        }
    })
    .catch(err => {
        myForm.innerHTML = '<h1>Error: Something went wrong!!!!</h1>';
        console.log(err);
    })
})

function onSubmit(e){
    e.preventDefault();
    if(dishName.value === '' || dishAmount.value === ''){
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';

        setTimeout(() => msg.remove(), 3000);
    }
    else{
        let dishObj = {
            name : dishName.value,
            amount : dishAmount.value,
            table: table.value
        }
        axios.post('https://crudcrud.com/api/ac1211aecf064c378d1c38338a651cbc/ordersData', dishObj)
        .then((response) => {
            console.log(response)
            showOrdersOnScreen(response.data);
        })
        .catch(err => {
            document.body.innerHTML += 'Error: Something went wrong!!!!';
            console.log(err)
        });

        dishName.value = '';
        dishAmount.value = '';
    }
}

function showOrdersOnScreen(obj){
    var tableNo = document.getElementById(obj.table);
    const li = document.createElement('li');
    var orderDetails = document.createTextNode(`${obj.name} : ${obj.amount} : ${obj.table}`);
    li.appendChild(orderDetails);
    li.classList = 'tableOrders';

    // create delete btn element
    var delBtn = document.createElement('button');
    delBtn.className = 'delete';
    var delText = document.createTextNode('Delete');
    delBtn.appendChild(delText);
  
    // delete event
    delBtn.onclick = () =>{
        if(confirm('Are you sure ?')){
            tableNo.removeChild(li);
            axios.delete('https://crudcrud.com/api/ac1211aecf064c378d1c38338a651cbc/ordersData/'+obj._id);
        }
    }   

    li.appendChild(delBtn);
    tableNo.appendChild(li);
}