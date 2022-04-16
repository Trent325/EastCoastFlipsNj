
const items =[];
const addYeezy1 = document.querySelector("#add");
const addYeezy2 = document.querySelector("#add1");
const addYeezy3 = document.querySelector("#add2");
const addYeezy4 = document.querySelector("#add4");
const addYeezy5 = document.querySelector("#add5");
const addYeezy6 = document.querySelector("#add6");
const button = document.querySelector("body > div.ProductContainer > div.buttonHolder > div > button");

addYeezy1.addEventListener("click", ()=>{
    items.push({id:1,quantity:1});
    console.log(items);
})
addYeezy2.addEventListener("click", ()=>{
    items.push({id:2,quantity:1});
    console.log(items);
})
addYeezy3.addEventListener("click", ()=>{
    items.push({id:3,quantity:1});
    console.log(items);
})
addYeezy4.addEventListener("click", ()=>{
    items.push({id:4,quantity:1});
    console.log(items);
})
addYeezy5.addEventListener("click", ()=>{
    items.push({id:5,quantity:1});
    console.log(items);
})
addYeezy6.addEventListener("click", ()=>{
    items.push({id:6,quantity:1});
    console.log(items);
})
button.addEventListener("click",()=> {
    fetch('/create-checkout-session',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({

            items
            
        })
    }).then(res =>{
        if(res.ok) return res.json()
        return res.json().then(json =>Promise.reject(json))
    })
    .then(({url}) =>{
        window.location = url
        console.log(url);
    })
    .catch(e => {
        console.error(e.error)
    })
})

