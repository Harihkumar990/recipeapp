let id = localStorage.getItem("card")
const URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
let parentcontainer = document.querySelector(".container");
let instruction = document.querySelector(".instruction");
let createElement = (elem) => document.createElement(elem);
const getdata = async (url)=>{
    try{
      const {data} = await axios.get(url);
      return data;
  
    }catch(err){
      console.log("ERROR ,",err)
    }
  }
let {meals} = await getdata(URL);
let n=0;
let arr = meals.filter((recipe) => id === recipe.idMeal);
let temparr = [...arr]
console.log(arr);
let ingredientnumer = ["strIngredient1","strIngredient2","strIngredient3","strIngredient4","strIngredient5","strIngredient6","strIngredient7","strIngredient8","strIngredient9","strIngredient10","strIngredient11","strIngredient12","strIngredient13","strIngredient14","strIngredient14","strIngredient15","strIngredient16","strIngredient17","strIngredient18","strIngredient19","strIngredient20"];
let ingredientarr = [];
let strmeaseure = ["strMeasure1","strMeasure2","strMeasure3","strMeasure4","strMeasure5","strMeasure6","strMeasure7","strMeasure8","strMeasure9","strMeasure10","strMeasure11","strMeasure12","strMeasure13","strMeasure14","strMeasure14","strMeasure15","strMeasure16","strMeasure17","strMeasure18","sstrMeasure19","strMeasure20"];

let quantity = []
for(let [key,value] of Object.entries(temparr.pop())){
  if(ingredientnumer.includes(key) && value?.length>0)
    ingredientarr = [...ingredientarr,value]
  if(strmeaseure.includes(key) && value !== " "){
    quantity = [...quantity,value];
  }
}

for(let char of arr){
  let image = createElement("img");
  image.setAttribute("src",char.strMealThumb);
  image.classList.add("image");
  parentcontainer.appendChild(image);
  let table = createElement("table");
  
 
  let tablerow = createElement("tr")
  table.classList.add("table");
  let tableheading1 = createElement("th");
  tableheading1.innerText = "Ingredient ";
   
  let tableheading2 = createElement("th");
  tableheading2.innerText = "Quantity ";
  tablerow.appendChild(tableheading1);
  tablerow.appendChild(tableheading2);
  table.appendChild(tablerow)
  tablerow.classList.add("ingre")
 
  for(let i=0; i<quantity.length;i++){
    let tableRow = createElement("tr");
    tableRow.classList.add("ingre")
    let tabledata1 = createElement("td");
    let tabledata2 = createElement("td");
    tabledata1.innerText = ingredientarr[i] + " :";
    tabledata2.innerText =  quantity[i];
    tableRow.appendChild(tabledata1);
    tableRow.appendChild(tabledata2);
    table.appendChild(tableRow);
  }
  
  
  parentcontainer.appendChild(table)
  
  let instructionspan = createElement("span");
  instructionspan.innerText = char.strInstructions;
  
  instruction.appendChild(instructionspan);
  
        

}

