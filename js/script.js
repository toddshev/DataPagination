/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

const linkList = document.querySelector('.link-list');


function addSearchBar() { 
   const header = document.querySelector('.header');
   const searchDiv = document.createElement('div');
   searchDiv.className = 'student-search';
   searchDiv.innerHTML = `
      <label for="search" class="student-search">
         <span>Search by name</span>
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
        `;
   header.appendChild(searchDiv);
}
addSearchBar();  //can't add listener below until element is created and attached to dom

const searchBar = document.querySelector('#search');

searchBar.addEventListener('keyup', (e) => {
   const userInput = e.target.value.toLowerCase();
   console.log(userInput)
   const matchingStudents = [];

});






function showPage(list, page, numPerPage=9) {
   const start = (page * numPerPage) - numPerPage;
   const end = page * numPerPage;
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = ''; // Clear previous content

   for (let i = start; i < end && i < list.length; i++) {
      const student = list[i];
      const studentListItem = document.createElement('li');
   //   studentListItem.className = 'student-item cf';
      studentListItem.innerHTML = `
        <li class="student-item cf">
          <div class="student-details">
            <img class="avatar" src="${student.picture.thumbnail}" alt="Profile Picture">
            <h3>${student.name.title} ${student.name.first} ${student.name.last}</h3>
            <span class="email">${student.email}</span>
          </div>
          <div class="joined-details">
            <span class="date">Joined ${student.registered.date}</span>
          </div>
        </li>
      `;

      studentList.appendChild(studentListItem);
   }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list, numPerPage=9) {
   //Must round up to account for data on the last page
   const numOfPages = Math.ceil(list.length / numPerPage);
   
   for (let i = 1; i <= numOfPages; i++) {
      const listItem = document.createElement('li');
      if (i === 1) { //sets first button to active when page loads
         listItem.innerHTML = `<li><button type="button" class="active">${i}</button></li>`;
      } else {
      listItem.innerHTML = `<li><button type="button">${i}</button></li>`;
      }
      linkList.appendChild(listItem);
   }
}

linkList.addEventListener('click', (e) => {
   if (e.target.tagName === 'BUTTON') {
      const buttons = document.querySelectorAll('.link-list button');  //returns node list/collection
      for (button of buttons) {
         button.classList.remove('active');
      }
      e.target.classList.add('active');
      showPage(data, e.target.textContent);
      }
   });

// Call functions

showPage(data, 1, 9);    //modified slightly, added 2nd argument to adjust items per page
addPagination(data,9);  //modified slightly, added 2nd argument to adjust items per page