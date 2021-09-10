
// Make a new note
class makeNotes{
    constructor(title,note,noteId){
        this.title = title;
        this.note = note;
        this.noteId = noteId;
    };
};


// Storage
class storage{

    static getNotes(){
        let notes;
        if(localStorage.getItem('notes')===null){
            notes = [];

        }else{
            notes = JSON.parse(localStorage.getItem("notes"));
        }
        return notes;
    };

    static addNotes(note){
        let notes = storage.getNotes();
        notes.push(note);
        localStorage.setItem("notes",JSON.stringify(notes));
    };

    static removeNotes(num){

        let notes = storage.getNotes();
        notes.forEach((e,i)=>{
            if(e.noteId==num){
                notes.splice(i,1);
            }
        });
        localStorage.setItem("notes",JSON.stringify(notes));

    };

}




// User-interface
class UI{

    static displayNotes(){
        const notesList = storage.getNotes();

        let notes = notesList ;

        notes.forEach((e)=>{UI.addNotesToList(e)})

    };

    static addNotesToList(e){

        let tBody = document.querySelector('#table-body');
        let tRow = document.createElement('tr');

        tRow.innerHTML = `<td>${e.title}</td>
                          <td>${e.note}</td>
                          <td>${e.noteId}</td>
                          <td><button class="btn btn-danger delete">X</button></td>
                          
                          `
        tBody.append(tRow);
    };

    static showAlert(givenClass,showMsg){
        let element = document.createElement('div');
        element.classList = `alert alert-${givenClass}`
        element.innerHTML = showMsg;
        element.style.textAlign = 'center';

        let nav = document.querySelector('.container');
        let form = document.querySelector('#form');
        nav.insertBefore(element,form);

        setTimeout(()=>{document.querySelector('.alert').remove()},1300);
    };

    static clearFields(){

        document.querySelector('#title').value = "";
        document.querySelector('#note').value = "";
        document.querySelector('#NoteId').value = "";

    };



};

document.addEventListener('DOMContentLoadeded',UI.displayNotes());

document.querySelector('#form').addEventListener('submit',(e)=>{

    e.preventDefault();

    
    let title = document.getElementById('title');
    let note = document.getElementById('note');
    let noteId = document.getElementById('NoteId');
    if(title.value==='' || note.value==='' || noteId.value===''){
        UI.showAlert('info','Fill all the fields 🦊')
    }else{

    
        let noteObj = new makeNotes(title.value,note.value,noteId.value);

        // Add note to localStorage
        storage.addNotes(noteObj);

        // Add note to list
        UI.addNotesToList(noteObj);


        // clear user inputs
        UI.clearFields()

        // show success alert
        UI.showAlert('success','Note Added 🚀')

        // Remove notes
        removeNotes()
        


    }

});

// Delete notes
let removeNotes = () => {

    let tBody = document.querySelector('#table-body');
    tBody.addEventListener('click',(e)=>{

        if(e.target.classList.contains('delete')){
            e.target.parentElement.parentElement.remove();
            storage.removeNotes(e.target.parentElement.previousElementSibling.innerHTML);
        };
        UI.showAlert('danger','Note Removed');
        
    });

};

// Filter note

let query = document.querySelector("#query");
// console.log(query,searchBtn);
query.addEventListener('input',function(e){
    
    searchQuery = e.target.value.toLowerCase();
    let tBody = document.getElementById("table-body");
    Array.from(tBody.getElementsByTagName('tr')).forEach(function(el){
        if(el.getElementsByTagName('td')[0].innerText.toLowerCase().includes(searchQuery)){
            el.style.display = "block";
        }else{el.style.display="none"};
    });
});




