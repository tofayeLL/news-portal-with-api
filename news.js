
const btnContainer = document.getElementById('btn-container');
const newsContainer = document.getElementById('news-container');
const loadSpinner = document.getElementById('loading-spiner');



// All categories
const loadAllCategories = async()=>{
    const res = await fetch ('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();
    data.data.news_category.forEach((category)=>{
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick="loadNewsCategory('${category.category_id}')" class="btn">${category.category_name}</button>
        `
        btnContainer.appendChild(div);
        
    })
}





// news category
const loadNewsCategory = async(id)=>{
    
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const data = await res.json();
    if(data.data.length === 0){
        loadSpinner.classList.remove('hidden');
    }
    else{
        loadSpinner.classList.add('hidden');
    }
    newsContainer.innerHTML= '';
    data.data.forEach((card)=>{
        // console.log(card);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="flex justify-between  bg-base-100 shadow-xl p-8">

        <div class="w-[40%]">
            <img src="${card.image_url}" alt="" class="w-[100%]">
        </div>

        <div class="w-[60%] p-6 space-y-2">
            <h2 class="title text-xl font-bold">${card.title}</h2>
            <div class="my-2">
                <p>${card.details.slice(0,300)}</p>
            </div>
            <div class="grid grid-cols-3">
                <p><span><img src="${card.author.img}" alt="" class="w-[20%]"></span>date:${card.author.
                    published_date}</p>
                <p>views-${card.total_view}</p>
                <button onclick="watchNowBtn('${card._id
                }')" class="btn btn-primary">Watch</button>
            </div>
            
            
        </div>


    </div>
        `
        newsContainer.appendChild(div);
        
    })
  
}



const handleSearchBox = ()=>{
    const input = document.getElementById('input-field');
    const value = input.value;
    if(value){
        loadNewsCategory (value);

    }
    else{
        alert('opps! you should have to give input id');
    }   
   
}



// show details and open modal
const detailsContainer = document.getElementById('show-details-container');

const watchNowBtn = async(text)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/news/${text}`);
    const data = await res.json();
  data.data.forEach((details)=>{
    console.log(details);
    detailsContainer.innerHTML=`
    <p>${details.rating.badge}</p>
    <p>${details.rating.number}</p>
    <img src="${details.image_url}" alt="">
    
    
    `
    

  })




    show_details_modal.showModal();
    
}







loadAllCategories();
loadNewsCategory('01');