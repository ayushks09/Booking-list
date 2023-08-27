const form = document.querySelector("#book-form")
const tbody = document.querySelector("#book-list")


function getValueFromElement(idValue){
   return  document.querySelector("#"+idValue).value
 
}

function addBook(title,author,isbn){
   let myBooks = getBooks()
   myBooks.push({title,author,isbn})
   localStorage.setItem("books",JSON.stringify(myBooks))
}

function addBookToList(title,author,isbn){
   let tr = document.createElement("tr")//<tr></tr>
   tr.innerHTML = `
     <td>${title}</td>
     <td>${author}</td>
     <td>${isbn}</td>
     <td><a href="#" class="btn btn-danger btn-right">X</a></td>
   
   `
  tbody.appendChild(tr)
}

function getBooks(){
   let books

   if(localStorage.getItem("books") === null){
      books = []
   }else{
      books = JSON.parse(localStorage.getItem("books"))
   }


   return books
}


//Event Handler
form.addEventListener("submit",e =>{
    e.preventDefault()

    let title = getValueFromElement("title")
    let author = getValueFromElement("author")
    let isbn  = getValueFromElement("isbn")
   if(title==="" || author==="" || isbn===""){
    alert("Please Fill All the Fields ")
   }else{
   addBookToList(title,author,isbn)
   addBook(title,author,isbn)
   }



})

window.addEventListener("DOMContentLoaded",()=>{
   let allBooks = getBooks()
   allBooks.forEach(item => addBookToList(item.title,item.author,item.isbn))
})