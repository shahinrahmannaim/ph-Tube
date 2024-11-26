// load categories
const loadCategories =()=>{
    
    fetch(`https://openapi.programming-hero.com/api/phero-tube/categories`)
    .then(res=> res.json())
    .then(data=>displayCategory(data.categories))
    .catch(e=>{
        console.log("Error fetching data",e);
        
    })
}



const  removeActiveClass= ()=>{
    const buttons = document.getElementsByClassName("category-btn")
    console.log(buttons)
for(let btn of buttons){
    btn.classList.remove("active")
}
}

const loadVideosByCategory=(id)=>{

alert(`category ${id}`)
 fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res=> res.json())

    .then(data=>{
        removeActiveClass()
        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add("active")
        
       
        displayVideos(data.category)
    })
    .catch(e=>{
        console.log("Error fetching data",e);
        
    })

}

const displayCategory=(categories)=>{

    const categoryContainer= document.getElementById("categories");

    categories.forEach(item => {
        
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML= 
        `
        <button id="btn-${item.category_id}" onclick="loadVideosByCategory(${item.category_id})" class="btn category-btn" > ${item.category} </button>
        `

        categoryContainer.append(buttonContainer);
        
    }); 
}

loadCategories()


// load videos
const loadVideos =(inputText = " ")=>{
    
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${inputText}`)
    .then(res=> res.json())
    .then(data=> displayVideos(data.videos))
    .catch(e=>{
        console.log("Error fetching data",e);
        
    })
}
loadVideos()

function getTimeString(time){
    const hour = parseInt(time/ 3600);
    let  remainingSecond= parseInt(time % 3600);
    const minutes = parseInt(remainingSecond / 60);
   
    return `${hour} hrs ${minutes} min ago`
}
const loadDetails= async (videoId)=>{
    const url = (` https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`)

    const res = await fetch(url)
    const data = await res.json()
    displayVideoDetails(data.video)
    

  
}
const displayVideoDetails = (video)=>{
    console.log(video)
    const detailsContainer =  document.getElementById("modalContent")

    detailsContainer.innerHTML=`
        <img src=${video.thumbnail} />
        <p> ${video.description} </p>
    `

    document.getElementById("customModal").showModal();

}


const displayVideos = (videos)=> {
    const videosContainer = document.getElementById('videos');
    videosContainer.innerHTML=""

    if(videos.length == 0){
 
       videosContainer.classList.remove("grid")

        videosContainer.innerHTML= ` 
        <div class=" min-h-[300px] flex flex-col gap-5 justify-center items-center" >
        <img class="" src="../assets/Icon.png" /> 
         <p>No videos found</p> 
        </div>
        
        `
    }else{
          videosContainer.classList.add("grid")
     
videos.forEach(video=>{
     console.log(video)

     const card = document.createElement('div');
     card.classList="card card-compact  shadow-xl"
     card.innerHTML= 
     `
      
  <figure class="h-[200px] relative " >
    <img class="h-full w-full object-cover"
      src="${video.thumbnail}"
      alt="Shoes" />
      ${video.others.posted_date ?.length==0  ? "" : ` <span class="absolute right-2 t-xs bottom-2 bg-black text-white rounded p-1" >
      ${getTimeString(video.others.posted_date)}
      </span>`}
  </figure>

 
  <div class="px-0 py-2 flex">
    <div class="px-2" >
     <img class="w-10 h-10 rounded-full object-cover  "
      src=${video.authors[0].profile_picture}
      alt="Shoes" />
     
    
    </div>

    <div>
    <h2 class="font-bold" >${video.title}</h2>
     <div class=" flex" >
     <p class="text-gray-400 px-2" >${video.authors[0].profile_name}</p>
      ${video.authors[0].verified===true ? `<img class="w-5 h-5 rounded-full object-cover"
      src="https://cdn-icons-png.flaticon.com/128/6270/6270515.png"
      alt="Error" /> ` : `<img class="w-5 h-5 rounded-full object-cover"
      src="https://cdn-icons-png.flaticon.com/128/11340/11340066.png"
      alt="Error" />`}
     
     </div>
    <p>${video.others.views} views</p>
   
    </div>
    
    
  </div>

 <p> <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error" >Details</button> </p>
     `

videosContainer.append(card);

})
    }

}
const inputText = document.getElementById("search-input").addEventListener("keyup",(e)=>{
loadVideos(e.target.value)
})







