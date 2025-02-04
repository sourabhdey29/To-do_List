document.addEventListener('DOMContentLoaded',()=>{

   const todoInput = document.getElementById('todo-input');
   const addTaskButton = document.getElementById('add-task-button');
   const todoList = document.getElementById('todo-list');
   const clrButton = document.getElementById('clr-all');


   let tasks= JSON.parse(localStorage.getItem('tasks')) ||[];

   tasks.forEach((task)=>renderTask(task));

  
   addTaskButton.addEventListener('click',()=>{

    const taskText= todoInput.value.trim();
    if(taskText==="") return;

    const newTask={
        id:Date.now(),
        text:taskText,
        completed:false,
    }
    tasks.push(newTask);
    saveTask();
    renderTask(newTask);
    todoInput.value="";
    
   

    console.log(tasks);

   });

   function saveTask(){
    localStorage.setItem('tasks',JSON.stringify(tasks));
   }

   function renderTask(task){

    const li = document.createElement('li');
    li.setAttribute('data-id',task.id);
    li.innerHTML=`
    <span>${task.text}</span>
    <button>Delete</button>`
    if(task.completed){ return li.classList.add('completed')}
    todoList.appendChild(li);

    clrButton.classList.remove('hidden')

    clrButton.addEventListener('click', (e) =>{

        console.log(e)
        tasks = tasks.filter((t)=>t.id != t.id)
        li.remove();
        saveTask();
       
     })
   
    

    li.addEventListener('click',(e)=>{
        if(e.target.tagName==="BUTTON") return;
        task.completed = !task.completed;
        li.classList.toggle('completed')
        saveTask();
  })


    li.querySelector('button').addEventListener('click',(e)=>{

        e.stopPropagation();

        tasks = tasks.filter((t)=>t.id != task.id)
        li.remove();
        saveTask();
    })
        
   }

   

   

});