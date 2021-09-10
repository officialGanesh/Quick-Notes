
// Make a new note
class makeNotes{
    constructor(title,note,noteId){
        this.title = title;
        this.note = note;
        this.noteId = noteId;
    };
};



// User-interface
class UI{

    static displayNotes(){
        const notesList = [
            {
                title: "first",
                note: "first note",
                noteId: 4566,
        },
            {
                title: "second",
                note: "second note",
                noteId: 4555,
        }];

        let notes = notesList ;

        notes.forEach((e)=>{UI.addNotesToList(e)})

    };

    static addNotesToList(e){

        let tBody = document.querySelector('#table-body');
        let tRow = document.createElement('tr');

        tRow.innerHTML = `<td>${e.title}</td>
                          <td>${e.note}</td>
                          <td>${e.noteId}</td>
                          <td><button class="btn btn-danger">X</button></td>
                          
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

    let noteObj = new makeNotes(title.value,note.value,noteId.value);

    // Add note to list
    UI.addNotesToList(noteObj);
    // clear user inputs
    UI.clearFields()
    // show success alert
    UI.showAlert('success','Note Added 🚀')

});





