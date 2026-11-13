const KEY='odhniya-admin-v1';
const initial=[
{id:1,name:'Rose Embroidered Stoler',category:'Stoler',price:1850,stock:24,sold:46,status:'Completed',color:'Rose',image:'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&auto=format&fit=crop',created:'2026-07-25'},
{id:2,name:'Soft Cotton Undercaps',category:'Undercaps',price:650,stock:40,sold:38,status:'Completed',color:'Beige',image:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&auto=format&fit=crop',created:'2026-07-26'},
{id:3,name:'Everyday Premium Hijab',category:'Hijab',price:1500,stock:18,sold:29,status:'Pending',color:'Mauve',image:'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop',created:'2026-07-27'},
{id:4,name:'Floral Pearl Pins',category:'Pins',price:450,stock:60,sold:55,status:'Completed',color:'Gold',image:'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&auto=format&fit=crop',created:'2026-07-28'},
{id:5,name:'Midnight Black Stoler',category:'Stoler',price:1950,stock:13,sold:22,status:'Pending',color:'Black',image:'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop',created:'2026-07-29'},
{id:6,name:'Lavender Undercap',category:'Undercaps',price:700,stock:32,sold:34,status:'Completed',color:'Purple',image:'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=600&auto=format&fit=crop',created:'2026-07-29'}
];
export const seedProducts=initial;
export function getProducts(){try{const x=JSON.parse(localStorage.getItem(KEY));return Array.isArray(x)?x:initial.map(x=>({...x}));}catch{return initial.map(x=>({...x}));}}
export function saveProducts(items){localStorage.setItem(KEY,JSON.stringify(items));window.dispatchEvent(new CustomEvent('products-changed'));}
export function addProduct(item){const products=getProducts();products.unshift({...item,id:Date.now(),sold:0,created:new Date().toISOString().slice(0,10)});saveProducts(products);}
export function updateProduct(id,updates){saveProducts(getProducts().map(x=>x.id===id?{...x,...updates}:x));}
export function deleteProduct(id){saveProducts(getProducts().filter(x=>x.id!==id));}
