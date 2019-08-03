let type = ''

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


async function Render(type) {
    const row = document.getElementById('row');
    const response =  await fetch("https://avito.dump.academy/products");
    let data = await response.json();
    data = data.data;
    const sellers = await fetch("https://avito.dump.academy/sellers");
    let seller= await sellers.json();
    seller = seller.data;
    let finishdata = ``;

    let priceSort = document.getElementById("priceSort");
    let raitingSort = document.getElementById('raitingSort');
    
    raitingSort.addEventListener('click', () => {
        seller= seller.sort((obj1, obj2) => {
            return obj2.rating - obj1.rating;
        })
       let arr = [];
       arr.push(data[0]);
       for(let i = 0; i < seller.length; i++)
       {
           for(let j = 0; j < data.length; j++)
           {
               if(data[j].relationships.seller === seller[i].id)
               {
                   arr.push(data[j].relationships.seller);
               }
           }
       }
       console.log(arr);
    })
    priceSort.addEventListener("click", ()=>{
    finishdata = ``;
       data = data.sort(function(obj1,obj2){
              return obj1.price - obj2.price;
        });
        console.log(data)
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
                             <span class="icons"><i class="fas fa-heart add-like"></i></span>
                         </p>
                       </div>
                       <div class="card-reveal">
                       <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
                       <p>Here is some more information about this product that is only revealed once clicked on.</p>
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
                       <div class="card-reveal">
                       <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
                       <p>Here is some more information about this product that is only revealed once clicked on.</p>
                       </div>
                    </div>
                 </div>`
                }
               
            }
         }
         
         row.innerHTML = finishdata;
    
    });
   
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
                        <span class="icons"><i class="fas fa-heart add-like"></i></span>
                    </p>
                  </div>
                  <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
                  <p>Here is some more information about this product that is only revealed once clicked on.</p>
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
                  <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
                  <p>Here is some more information about this product that is only revealed once clicked on.</p>
                  </div>
               </div>
            </div>`
           }
          
       }
    }
    
    row.innerHTML = finishdata;
 }
 
 Render(type);
 