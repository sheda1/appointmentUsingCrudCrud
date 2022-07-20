var form = document.getElementById('my-form');
var name11 = document.getElementById('name');
var email = document.getElementById('email');
var idd = 'ce896597d5a541ec8df1554dcdde5548';

form.addEventListener('submit',storeLocal);




function storeLocal(e){
    e.preventDefault();
    var name1 = name11.value;
    var email1 = email.value;
    console.log(name1);
    console.log(email1);
  
    let obj = {
        name1,
        email1
    }
   axios.post(`https://crudcrud.com/api/${idd}/appointment`,obj)
   .then((response) => {
        console.log(response);
        
        const id = response.data._id;
        console.log('post',id);
        display(obj,id);
        name1 = "";
        email1 = "";
  })
  .catch((err) => {
        document.body.innerHTML = document.body.innerHTML + '<h4> something went wrong while post request</h4>'
  });
   // localStorage.setItem(obj.email1, JSON.stringify(obj));
   
}

function display(user,id){
   document.getElementById('name').value = '';
   document.getElementById('email').value ='';

   /*if (localStorage.getItem(user.email) != null){
      removeUser(user.email);
   }*/

  const parentNode = document.getElementById('users');
  const childHTML = `<li id='${id}'> ${user.name1} - ${user.email1}
                    <button onCLick = deleteUser('${id}')>Delete</button>
                    <button onClick = EditUser('${user.name1}','${user.email1}','${id}')>Edit</button>
                    </li>`
    parentNode.innerHTML = parentNode.innerHTML + childHTML;

}

window.addEventListener('DOMContentLoaded',() => {
    /*
   const localStorageObj = localStorage;
    const localStorageKeys = Object.keys(localStorageObj);
    console.log(localStorageKeys);
    console.log(localStorageObj);

    for (var i = 0; i < localStorageKeys.length; i++){
        const key = localStorageKeys[i];
        const data = localStorageObj[key];
        //console.log(data);
        const parseData = JSON.parse(data);
        console.log(parseData);
        display(parseData);
    }*/

    axios.get(`https://crudcrud.com/api/${idd}/appointment`)
    .then((response) => {
        console.log(response.data);

        for(let i = 0; i < response.data.length; i++){
            const parentNode = document.getElementById('users');
            const id = response.data[i]._id;
            const childHTML = `<li id ='${id}' > ${response.data[i].name1}  - ${response.data[i].email1}
            
                              <button onClick = deleteUser('${response.data[i]._id}') > Delete </button> &nbsp&nbsp
                              
                               <button onClick = EditUser('${response.data[i].name1}','${response.data[i].email1}','${response.data[i]._id}') > Edit </button>
                               </li>`
              parentNode.innerHTML = parentNode.innerHTML + childHTML;                 
         
             }
    })
    .catch((err) => {
        document.body.innerHTML = document.body.innerHTML + '<h4> No data</h4>';
      })
      
});


function deleteUser(userId){
   
    axios.delete(`https://crudcrud.com/api/${idd}/appointment/${userId}`)
    .then((response) => {
        removeUser(userId);
    }).catch((err) => {
        document.body.innerHTML = document.body.innerHTML + '<h4> something went wrong while deleting</h4>'
    })
    
   // localStorage.removeItem(email11);
}

function removeUser(userId){
  
  
   // const ul = document.getElementById('users');
    const li = document.getElementById(userId);

   li.remove();
   
}

function EditUser(name11,email11,id){
    
    document.getElementById('name').value = name11;
    document.getElementById('email').value = email11;
    

    // const name1 = document.getElementById('name').value;
    // const email1 = document.getElementById('email').value

    //  const obj = {
    //     name1,
    //     email1
    //  }
    
   
       
    axios.put(`https://crudcrud.com/api/${idd}/appointment/${id}`,{
        name1 : document.getElementById('name').value,
        email1 : document.getElementById('email').value
    })
    .then((res) => {
        deleteUser(id);
        console.log(res);
    
    }).catch((err) => {
        document.body.innerHTML = document.body.innerHTML + '<h4> something went wrong while editing</h4>'
       })
        
}
