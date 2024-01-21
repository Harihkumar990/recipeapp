
const URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
let n=20;
let parentcontainer = document.querySelector(".container");
let filterArr = [];
let selectedareaname =[];
let searchvalue ="";
let selecttype = document.querySelector(".selectype");
let createelem = (element)=> document.createElement(element);
let input = document.querySelector(".input");

const getdata = async (url)=>{
  try{
    const {data} = await axios.request(url);
    return data;

  }catch(err){
    console.log("ERROR ,",err)
  }
}
let {meals} = await getdata(URL);
console.log(meals)

let Recipes = (food) =>{
  for(let meal of food){

    let maincontainer = createelem("main");
    maincontainer.setAttribute("data-id",meal.idMeal);
    maincontainer.classList.add("main")
    let imagecontainer = createelem("div");

    let image = createelem("img");
    image.classList.add("image");
    image.setAttribute("data-id",meal.idMeal);
    image.setAttribute("src",meal.strMealThumb)

    imagecontainer.appendChild(image);
    maincontainer.appendChild(imagecontainer)

    let imginfo = createelem("div");

    imginfo.classList.add("imginfo");
  
    let dishname = createelem("span");
    dishname.innerText ="Name: "+ meal.strMeal;
    imginfo.appendChild(dishname);
  
    let dishcategory = createelem("span");
    dishcategory.innerText ="Category: "+ meal.strCategory;
    imginfo.appendChild(dishcategory);

    let area = createelem("span");
    area.innerText = "Region: " + meal.strArea;
    imginfo.appendChild(area);

    maincontainer.appendChild(imginfo);

    let timecontainer = createelem("div");
    timecontainer.classList.add("timecount")

    timecontainer.classList.add("timecount");
    let time =  createelem("span");
    n = n+10;
    time.innerText = "Time :Self Depend"
    timecontainer.appendChild(time);
    maincontainer.appendChild(timecontainer);

    parentcontainer.appendChild(maincontainer)
  
  }

}
Recipes(meals)
let region =[];

function filterregion(meals){
  
  for(let meal of meals){
    if(!region.includes(meal.strArea)){
      region = [...region,meal.strArea]
    }  
  }
}
filterregion(meals);


for(let area of region){
  let labelcontainer = createelem("div");
  labelcontainer.classList.add("lablecount");
  
  let label = createelem("label")
  label.classList.add("label")
  label.innerText = area;
  
  let checklist = createelem("input");
  checklist.classList.add("check");
  checklist.setAttribute("type","checkbox");
  checklist.setAttribute("data-name",area)
  
  label.appendChild(checklist);
  labelcontainer.appendChild(label);


  selecttype.appendChild(labelcontainer);
}

let areaname=""
function getfilter(){
  filterArr = searchvalue?.length>0 ? meals.filter((recipe) => recipe.strMeal.toLowerCase().includes(searchvalue)):meals;
  if(selectedareaname?.length>0){
    filterArr = searchvalue?.length>0 ? filterArr : meals;
    filterArr = filterArr.filter(recipe=>selectedareaname.includes(recipe.strArea));
  }
  return filterArr;
}
input.addEventListener("keyup",(e)=>{
  searchvalue = e.target.value.toLowerCase();
  let filter = getfilter();
  parentcontainer.innerHTML = "";
  Recipes(filterArr);
})


selecttype.addEventListener("click",(e)=>{
  areaname = e.target.dataset.name;
  let isSelected = e.target.checked;
  let temparr = meals.reduce((acc,cur)=> (cur.strArea === acc) ? cur.strArea : acc,areaname)
  selectedareaname = isSelected ? [...selectedareaname,temparr]:selectedareaname.filter(name => name!==temparr );
  let filter = getfilter();
  parentcontainer.innerHTML = "";
  Recipes(filter)
})

parentcontainer.addEventListener("click",(e)=>{
  let str = e.target.dataset.id;
  console.log(str);
  if(str?.length>0){
    localStorage.clear();
    localStorage.setItem("card",str)
    location.href="description.html";
  }

  
})