// declare a global variable for data sorting
let activeTab;


// fetch data from the API
const fetchData = async () => 
{
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories")
    const data = await response.json();

    const tabsContainer = document.getElementById("tab-container");
    // console.log(data.data);
    data.data.forEach(categories => 
    {
        const categoryID = categories.category_id;
        
        const newCategory = document.createElement("div");
        newCategory.innerHTML = `
        <a onclick="tabClicked(${categoryID})" class="tab bg-gray-400 text-white font-normal rounded-sm my-2 mx-3 hover:bg-red-500 hover:shadow-lg hover:text-white">${categories.category}</a>
        `
        tabsContainer.appendChild(newCategory);
    });
}

fetchData();


// Load data based on the clicked tab or category
const tabClicked = async (tabID) => 
{
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${tabID}`);
    const data = await response.json();
    const data1 = data.data;
    manageCards(data1);
}

// Create card based on the selected category
const manageCards = (data1) =>
{
  const cardContainer = document.getElementById("card-container");
  const errorMessageContainer = document.getElementById("error-container");
  activeTab = data1;
  
  cardContainer.innerHTML = "";
  errorMessageContainer.innerHTML = "";
  const imgContainer = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <g clip-path="url(#clip0_11_34)">
    <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
    <path d="M12.7094 7.20637L9.14062 10.7751L7.29062 8.92668C6.88906 8.52512 6.2375 8.52512 5.83594 8.92668C5.43437 9.32824 5.43437 9.97981 5.83594 10.3814L8.43125 12.9767C8.82187 13.3673 9.45625 13.3673 9.84687 12.9767L14.1625 8.66106C14.5641 8.25949 14.5641 7.60793 14.1625 7.20637C13.7609 6.80481 13.1109 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
  </g>
  <defs>
    <clipPath id="clip0_11_34">
      <rect width="20" height="20" fill="white"/>
    </clipPath>
  </defs>
</svg>`;

if(data1.length == 0)
{
  errorMessageContainer.innerHTML = `
  <div class="text-center mb-20">
      <img class="mx-auto" src="./images/not found Icon.png" alt="not found">
      <h3 class="text-3xl font-bold">Oops!! There is no <br> content here</h3>
  </div>
  `
}
else
{
  data1.forEach(cards => 
  {
      const convertedTime = convertSeconds(cards.others.posted_date);
      const newCard = document.createElement("div");

      newCard.innerHTML = `
      <div class=" w-11/12 mx-auto my-3">
      <div class=" rounded-full">
          <img src="${cards.thumbnail}" alt="Thumbnail" class="rounded-lg h-48 w-full">
          <div class="text-right relative text-white rounded-lg">
              <p class=" text-xs absolute bg-[rgba(0,0,0,0.5)] bottom-2 right-3 px-2 rounded-md"> ${convertedTime}</p>
              </div>
      </div>
      <div class="flex mt-4">
          <div class="w-12 mt-2 mr-2">
              <img class="rounded-full w-10 h-10" src="${cards.authors[0].profile_picture}" alt="author's profile pic">
          </div>
          <div>
              <h1 class="text-lg font-semibold">${cards.title}</h1>
              <div class="flex">
                  <p class="my-1 text-sm text-gray-600">${cards.authors[0].profile_name}</p>
                  <p class = "mt-1 ml-1">
                      ${cards.authors[0].verified? imgContainer : '' } </p>
              </div>
              <p class="text-sm text-gray-600">${cards.others.views} views</p>
          </div>
      </div>

  </div> `;
      cardContainer.appendChild(newCard);
  })
}

}

// Calculate Time 

const convertSeconds = (seconds) => 
{
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
  
    if (hours > 0) 
    {
      return `${hours} hrs ${minutes} min ago`
    }
    
    else if (hours < 0 && minutes > 0)
    {
      return `${minutes} min ago`
    }
    else
    {
        return ""
    }
}


// Sort Item By View
const sortItem = (activeTabData) =>
{
  activeTabData = activeTab;
  const sortedData = activeTabData.sort((item1, item2) => parseFloat(item2.others.views) - parseFloat(item1.others.views));
  manageCards(sortedData);
  
}


// Startup by Default Tab
tabClicked(1000);


// Redirect to Blog post
function blogPage()
{
    window.location.href = "blog.html";
}

// Redirect to the Main Page
function goBackButton()
{
    window.location.href = "index.html";
}