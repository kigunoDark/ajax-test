
let type = '',data,seller;
let usualSort = document.getElementById('usual');

usualSort.addEventListener('click', () =>{
    type = 'all'
    Render(type);
})
 
function getType(btn)
{
        type = btn;
        Render(type);
}
function renderPage(data) {
    const row = document.getElementById('row');
    
    let finishdata = ``;
    if(data.length === 0 )
    {
      finishdata += `<div class="container">
          <div class="warning">
                <h4 class="center"> По вашему запросу ничего не найдено </h4>
                <p > <h5 class="center"> Пожалуйста введите данные верно!</h5> </p>
          </div>
        </div>` 
    }
    else {
    for ( let i = 0; i < data.length; i++){
        if(data[i].price !== undefined) {
            if(type === '' || type==="all"){
             finishdata += `<div class="col s12 m4">
            
             <div class="card">
  
                   <div class="card-image">
                   <img class="activator adv-img" src="${data[i].pictures[0]}">
                   <span class="card-title">${seller[data[i].relationships.seller].name}</span>
                   </div>
                   <div class="card-content">
                   <span class="title"> <a href="#"> ${data[i].title}</a></span>
                   <p class="price"> ${data[i].price.toLocaleString('ru')} <i class="fas fa-ruble-sign"></i></p>
                     <p>
                         <span class="icons"> <i class="fas fa-star">  ${seller[data[i].relationships.seller].rating}</i> </span> 
                         <span class="icons"><i class="fas fa-camera-retro">  ${data[i].pictures.length}</i></span>
                         <span class="icons"><button class="favorite" onclick="her(this.value)" value='${data[i]}'> <i class="fas fa-heart add-like"></i> </button></span> 
                     </p>
                   </div>
                   
                </div>
             </div>`
            } else if(type === data[i].category)
            {
             finishdata += `<div class="col s12 m4">
             <div class="card">
  
                   <div class="card-image">
                   <img class="activator adv-img" src="${data[i].pictures[0]}">
                   <span class="card-title">${seller[data[i].relationships.seller].name}</span>
                   </div>
                   <div class="card-content">
                   <span class="title"> <a href="#"> ${data[i].title}</a></span>
                   <p class="price"> ${data[i].price.toLocaleString('ru')} <i class="fas fa-ruble-sign"></i></p>
                     <p>
                         <span class="icons"> <i class="fas fa-star">  ${seller[data[i].relationships.seller].rating}</i> </span> 
                         <span class="icons"><i class="fas fa-camera-retro">  ${data[i].pictures.length}</i></span>
                         <span class="icons"><i class="fas fa-heart add-like"></i></span>
                     </p>
                   </div>
                </div>
             </div>`
            }
           
        }
     }
    }
     
     row.innerHTML = finishdata;
}

function her(data)
{
  createDb(data);
  
}
// function createDb(data){
//   const request = indexedDB.open('favorites');


//       request.onupgradeneeded = e => {
//         const db = e.target.result;
//         // favorites = {
//         //   data:data 
//             // id:id
//         // }
//         db.createObjectStore('personal_fav', {keyPath:"id"});
//           alert("Upgrade");
//       }
  
//       request.onsuccess = e => {
//         const db = e.target.result;
//           alert(`Success  ${db.name}`);
//       }
  
//       request.onerror = e => {
//           alert("Error");
//       }
// }
async function Render(type) {
    const response =  await fetch("https://avito.dump.academy/products");
    data = await response.json();
    data = data.data;

    const sellers = await fetch("https://avito.dump.academy/sellers");
    seller= await sellers.json();
    seller = seller.data;


    const priceSort = document.getElementById("priceSort");
    const raitingSort = document.getElementById('raitingSort');
 
    const range = document.getElementById('range');
    document.getElementById("min").addEventListener('input', restrictToInteger);
    function restrictToInteger() {
        this.value = this.value.replace(/[^\d]/g, '');
    }

    document.getElementById("max").addEventListener('input', restrictToInteger);
    function restrictToInteger() {
        this.value = this.value.replace(/[^\d]/g, '');
    }

      range.addEventListener('click', () => {
        const min = parseInt(document.getElementById('min').value);
        const max = parseInt(document.getElementById('max').value);
        
        const arr = [];
        console.log(data.length)
         for(let i = 0; i < data.length; i++)
         {
           if(data[i].price >= min && data[i].price <=max)
           {
            arr.push(data[i]);
           }
          
         }
        renderPage(arr);
      })

    raitingSort.addEventListener('click', () => {

        data.sort((a,b)=> seller[b.relationships.seller].rating - seller[a.relationships.seller].rating);

        renderPage(data);
    });

    priceSort.addEventListener("click", ()=>{
       data = data.sort(function(obj1,obj2){
              return obj1.price - obj2.price;
        });

        renderPage(data);
    });
    
    renderPage(data);
 }
 
 Render(type);