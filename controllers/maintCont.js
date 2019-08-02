const request = require('request');
const url =  "https://avito.dump.academy/products";
const url2 =  "https://avito.dump.academy/sellers";

exports.getMain = (req, res) =>{
  let newPrice = [];
   request({
        url: url,
        json: true
      }, (err, response, body) => {
        if (!err && response.statusCode === 200) {  
            for(let i = 0; i < body.data.length; i++)
            {
              if(body.data[i].price !== undefined)
              {
                newPrice.push(body.data[i].price.toLocaleString('ru'));
              }
            }
            request({
              url: url2,
              json: true
            }, (err, response, sellers) => {
              if (!err && response.statusCode === 200) {  
              res.render('main', {
                  body: body,
                  type: 'All',
                  price: newPrice,
                  sellers: sellers
              });
          }
        
        })
    
      
        }
      })
       
}
