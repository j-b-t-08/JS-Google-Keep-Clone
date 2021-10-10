const addButton = document.querySelector('#add');

const updateLSData = () =>{
    const textAreaData = document.querySelectorAll('textarea'); //array format main data save horha hoga
    const notes = [];
    console.log(textAreaData);
    /*note-> mian current value hai */ textAreaData.forEach((note) => {
                                       return notes.push(note.value)
                                       })
    console.log(notes);

    localStorage.setItem('notes', JSON.stringify(notes));//json.stringify isliye q array format main store hoga tu convert krrhy string format mai

}

const addNewNote = (text = '') =>{
    
  const note = document.createElement('div');
  note.classList.add('note');

  const htmlData = `
  <div class="operation">
           <button class="edit"> <i class="fas fa-edit"></i> </button>
           <button class="delete"> <i class="fas fa-trash-alt"></i> </button>
  </div>
  <div class="main ${text ? "" : "hidden"} "></div>
  <textarea class="${text ? "hidden" : ""}"></textarea> `;

  note.insertAdjacentHTML('afterbegin', htmlData);
  //console.log(note);

  //Getting the references
  const editButton = note.querySelector('.edit');
  const delButton = note.querySelector('.delete');
  const mainDiv = note.querySelector('.main');
  const textArea = note.querySelector('textarea');

  //Deleting the node
  delButton.addEventListener('click', () => {
      note.remove();
      updateLSData(); //refresh k baad dobara data arha tu usko bh local storage sy delete krrhy
  })

  //Toggle using edit button
  textArea.value = text;
  mainDiv.innerHTML = text;


  editButton.addEventListener('click', () =>{
    mainDiv.classList.toggle('hidden');
    textArea.classList.toggle('hidden');
  });
  
   textArea.addEventListener('change', (event) => {
    const value = event.target.value;
    mainDiv.innerHTML = value;

   updateLSData(); 
   });

  document.body.appendChild(note);
  //it appends a node as the last child of a node

}

//Getting data back from localStorage
const notes = JSON.parse(localStorage.getItem('notes')); //js object format main convert krrha data ko parse() wapis, phly hmny string main krdiya tha stringify sy

if(notes){ notes.forEach((note) => addNewNote(note)) };

addButton.addEventListener('click', () => {
    addNewNote();
})