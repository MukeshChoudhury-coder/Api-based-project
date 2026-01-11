const loader=document.querySelector(".loder")
const renderUsers=document.querySelector(".users-div")
const prevBtn =document.querySelector(".prev")
const nextBtn=document.querySelector(".next")
const pageCount=document.querySelector(".page-upd")
const frm=document.querySelector("form")
const gitSearch=document.querySelector(".gitSearch")

let fetchedData=[]
let page=1
let limit=5
  let countPage=1

async function fetching() {
  loader.innerHTML=`
  <h3>Fetch users.....</h3>
  `
  
  try{
    const res=await fetch(`https://api.github.com/users`)
    
    if(res.ok){
      const data=await res.json()

    fetchedData=data
     loader.innerText=""
     pageCount.innerText=countPage
     
 pagination(fetchedData)
    
    }else{
      loader.innerHTML=`
      <h3>Something went wrong.Please try again later!
    </h3> `
    console.log(res.status)
    }
  }catch(error){
    console.log(error)
    loader.innerHTML=`
    <p>Please check your internet connection!</p>
    `
  }
  
}
fetching()

// pagination function//
  
  function pagination(){
    let skip=(page-1)*limit
let getUsers =fetchedData.slice(skip,skip+limit)
 renderUi(getUsers)
  }
  
  //render function//
function renderUi(daata=getUsers){
  loader.innerHTML=""
  
  if(daata.length===0){
    loader.innerHTML=`
  <h1>User not found 😞!</h1>
  `
  }

  daata.forEach((c)=>{
      const ul=document.createElement("ul")
    
    ul.classList.add("users")
    ul.innerHTML=`
    <li>${c.login}</li>
    `
    
    loader.appendChild(ul)

  })
   
}


// buttons/
prevBtn.disabled=true
prevBtn.style.backgroundColor="grey"

nextBtn.addEventListener("click",()=>{
  page++
    countPage++
  pageCount.innerText=countPage
  if(page===5 ){
    nextBtn.disabled=true;
    nextBtn.style.backgroundColor="grey"
  }
  
    prevBtn.disabled=false
    prevBtn.style.backgroundColor="dodgerblue"
pagination()
})
prevBtn.addEventListener("click",()=>{
  page--
  countPage--
  pageCount.innerText=countPage
  if(page===1){
    prevBtn.disabled=true
    prevBtn.style.backgroundColor="grey"
  }
  nextBtn.style.backgroundColor="dodgerblue"
  nextBtn.disabled=false
  
pagination()
})



// search input//
function searchUsers(){
   let filterUser=fetchedData.filter((e)=>{
  return e.login.toLowerCase().trim()===gitSearch.value.toLowerCase().trim()
  })

  renderUi(filterUser)

}


frm.addEventListener("submit",(e)=>{
e.preventDefault()
searchUsers()
gitSearch.value=""
})