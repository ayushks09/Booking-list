const form = document.querySelector("#book-form")
const tbody = document.querySelector("#book-list")


class Book{

constructor(title,author,isbn){
    this.title=title
    this.author=author
    this.isbn=isbn
}
}

class UI{

    static addBookToList(book){
        let tr = document.createElement("tr")//<tr></tr>
        tr.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td><a href="#" class="btn btn-danger btn-right delete">X</a></td>
        
        `
       tbody.appendChild(tr)
    }
   
    static getValueFromElement(idValue){
        return document.querySelector("#"+idValue).value

    }

    static clearAllFields(){
        document.querySelector("#author").value=""
        document.querySelector("#title").value=""
        document.querySelector("#isbn").value=""
    }

    static setAlert(msg,className){
        let div=document.createElement("div")
        div.innerHTML=msg
        div.className="alert alert-"+className
        let container=document.querySelector(".container")
        container.insertBefore(div,form)

        setTimeout(()=>{
            document.querySelector(".alert").remove()

        },2000)
    }

}


class store{

    static addBook(book){
        let myBooks = store.getBooks()
        
        myBooks.push(book)

        localStorage.setItem("books",JSON.stringify(myBooks))
     }
     

     static getBooks(){
        let books
     
        if(localStorage.getItem("books") === null){
           books = []
        }else{
           books = JSON.parse(localStorage.getItem("books"))
        }
     
     
        return books
     }
     
}


 form.addEventListener("submit",e=>{
    e.preventDefault();
    let title = UI.getValueFromElement("title")
    let author = UI.getValueFromElement("author")
    let isbn  = UI.getValueFromElement("isbn")
   if(title==="" || author==="" || isbn===""){
  UI.setAlert("Please fill all the fields","danger")
   }else{
    let book=new Book(title,author,isbn)
   UI.addBookToList(book)
   store.addBook(book)
   UI.setAlert("succesfully added","success")
   UI.clearAllFields()
   
   }
})

window.addEventListener("DOMContentLoaded",()=>{
    let allBooks = store.getBooks()
    allBooks.forEach(item => UI.addBookToList(item))
 })

 tbody.addEventListener("click",function(e){
   if(e.target.classList.contains("delete")){

    if(confirm("are u sure")){
    tbody.removeChild(e.target.parentElement.parentElement)
    removeDatabase(e.target.parentElement.previousElementSibling.textContent);
    }
     }
 })

 function removeDatabase(isbn){
   
  let arr=(JSON.parse(localStorage.getItem("books")));
//let ar  = [1,2,3,4]
arr.forEach((book,index)=>{
    if(book.isbn === isbn){
   arr.splice(index,1)
    }
 })
 localStorage.setItem('books',JSON.stringify(arr));


}