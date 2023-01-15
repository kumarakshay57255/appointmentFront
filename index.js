

const submit = document.getElementById('submit')
const showUsers = document.getElementById('user');

submit.addEventListener('click',addUser);

showUsers.addEventListener('click',deleteUser);

async function addUser(event){
   try {
      event.preventDefault();
      const username = document.getElementById('username').value;
     const ph = document.getElementById('ph').value
      const email = document.getElementById('email').value;  
      const obj = {
         username,ph,email
      }
     const user = await axios.post('http://localhost:4000/user',obj)
    showUser(user.data) 
    
   } catch (error) {
     throw Error(error);
   }
}
 

async function showUser(obj){
   let li = document.createElement('li');
   li.id=`${obj.id}`
   let delBtn = document.createElement('button');
   delBtn.className='btn btn-danger delete';
   delBtn.appendChild(document.createTextNode('Delete'));
   li.appendChild(document.createTextNode(`${obj.username} ${obj.email} ${obj.ph}`));
   li.appendChild(delBtn);
   showUsers.appendChild(li)

}

window.addEventListener('DOMContentLoaded',async(e)=>{
   try {
    const users = await axios.get('http://localhost:4000/user');
    users.data.alluser.map(ele=>{
      showUser(ele)
    });
     
   } catch (error) {
     throw Error(error);
   }
    
})


async function deleteUser(event){
    try {
       if(event.target.classList.contains('delete')){
         const id = event.target.parentElement.id;
         await axios.delete(`http://localhost:4000/user/${id}`)
         showUsers.removeChild(event.target.parentElement);
       }
    } catch (error) {
      throw Error(error);
    }
}



