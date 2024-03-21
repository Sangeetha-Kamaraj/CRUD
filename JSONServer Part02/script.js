let jsonData=[];
const URL ="http://localhost:3000/todos";
const getAllTodos= async () => {
    try{
    const response= await fetch(URL); 
    todos= await response.json();
    displayTodos();
    }catch(error){
        console.error("Error fetching todos:",error);
    }
};
const changeStatus=async(id,Status)=>{
    try{
    const statusToChange={
        "Pending":"Ongoing",
        "Ongoing":"Completed",
        "Completed":"Pending"
    }
    const newStatus=statusToChange[Status];
    const response= await fetch(`${URL}/${id}`,{
    method:"PATCH",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        Status:newStatus
    })
}); 
const updatedTodo=await response.json();
todos=todos.map(todo=>(todo.id===updatedTodo.id?updatedTodo:todo));
displayTodos();
    }catch(error){
        console.error("Error changing status:",error);
    }
};  
    
const deleteTodo=async(id)=>{
    try{
    await fetch(`${URL}/${id}`,{
        method:"DELETE"
    });
    todos=todos.filter(todo=>todo.id !==id);
    displayTodos();
}catch(error){
    console.error("Error deleting todo:",error)
}
};
const displayTodos=()=>{
    const todosDiv=document.getElementById("todos");
    todosDiv.innerHTML="";
    todos.forEach(todo=>{
        const todoDiv=document.createElement("div");
        todoDiv.classList.add("todo",todo.Status);
        todoDiv.innerHTML+=`
        
            <h3>${todo.UserName}</h3>
            <p>${todo.Task}</p>
            <button onclick="changeStatus('${todo.id}','${todo.Status}')">${todo.Status}</button>
            <button onclick="deleteTodo('${todo.id}')">Delete</button>
        `;
        todosDiv.appendChild(todoDiv);
    });
};



const addTodo=async(event)=>{
    e.preventDefault();
    const UserName=document.getElementById("UserNamer").value.trim();
    const Task=document.getElementById("Task").value.trim();
    const Deadline=document.getElementById("Deadline").value.trim();
    if(!UserName || !Task || !Deadline){
        alert("please fill out all fields");
        return
    }
    const newTodo={UserName,Task,Deadline,Status:"Pending"};
    try{
const response=await fetch(URL,{
    method:"POST",
    headers:
    {
        "Content-Type":"application/json"
    },
    body:JSON.stringify(newTodo)
});
const addedTodo=await response.json();
todos.push(addedTodo);
displayTodos();
document.getElementById("todoForm").reset();
    }
    catch(error)
    {
        console.error("Error adding todo:",error);
    }
};
window.onload=()=>{
    getAllTodos();
    document.getElementById("todoForm").addEventListener("Submit",addTodo);
};

document.querySelectorAll("input[type='text'").forEach(input=>{input.addEventListener("blur",(event)=>{
    event.target.value=event.target.value.trim();
});
});