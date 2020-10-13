
const getNotesBtn = document.getElementById("getNotes");
const getNoteBtn = document.getElementById("getNote");
const postNoteBtn = document.getElementById("postNote");
const updateNoteBtn = document.getElementById("updateNote");
const deleteNoteBtn = document.getElementById("deleteNote");


// GET NOTES
getNotesBtn.addEventListener("click", function(e) {
    e.preventDefault();

    return fetch('./notes')
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            for(let i in data) {
                document.getElementById('results').innerHTML += data[i].title;
            }
        }) 
});


// GET NOTE
getNoteBtn.addEventListener("click", function(e) {
    e.preventDefault();

    let id = document.getElementById("getNoteId").value;

    return fetch('./notes/' + id)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
                document.getElementById('results').innerHTML += data.title;
        }) 
});


// POST NOTE
postNoteBtn.addEventListener("click", function(e) {
    e.preventDefault();

    const title = document.getElementById("postTitle").value;
    const body = document.getElementById("postBody").value;

    const note = { title: title, body: body };

    const options = {
        method: 'POST',
        body: JSON.stringify(note),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }

    return fetch('./notes/', options)
        .then(function(res) {
            console.log(res)
            return res.json()
        })
        .then(function(data) {
            console.log("From second")

            console.log(data)

                document.getElementById('results').innerHTML += data.title;
        })
        .catch(err => {
            console.log(err)
        }) 
});


// UPDATE NOTE
updateNoteBtn.addEventListener("click", function(e) {
    e.preventDefault();

    const id = document.getElementById("updateId").value;
    const title = document.getElementById("updateTitle").value;
    const body = document.getElementById("updateBody").value;

    const note = { _id: id, title: title, body: body };

    const options = {
        method: 'PATCH',
        body: JSON.stringify(note),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }

    return fetch('./notes/' + id, options)
        .then(function(res) {
            console.log(res)
            return res.json()
        })
        .then(function(data) {

            console.log(data)

        })
        .catch(err => {
            console.log(err)
        }) 
});



// DELETE NOTE
deleteNoteBtn.addEventListener("click", function(e) {
    e.preventDefault();

    const id = document.getElementById("deleteNoteId").value;

    const options = {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }

    return fetch('./notes/' + id, options)
        .then(function(res) {
            console.log(res)
            return res.json()
        })
        .then(function(data) {

            console.log(data)

        })
        .catch(err => {
            console.log(err)
        }) 
});