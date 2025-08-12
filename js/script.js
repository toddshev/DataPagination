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
document.addEventListener('DOMContentLoaded', () => {
  
   //Programmatically add search bar inside the header section
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
   addSearchBar();  //can't add listeners below until element is created and attached to dom

   const searchButton = document.querySelector('.student-search button');
   const searchInput = document.querySelector('#search');

   //Search on click - key up event listener also works, but is commented out
   //since they interfere with each other
   //Will display a message in the input box if nothing is found.
   //Clicking on search with no input will reset the page to the first page of students.
   
   searchButton.addEventListener('click', (e) => {
      const userInput = searchInput.value.toLowerCase();
      const studentList = document.querySelector('.student-list');
      const matchingStudents = [];  // Array to hold students that match the search criteria
      
      for (let i = 0; i < data.length; i++) {
         const student = data[i];
         //Concatenated full name, assuming search criteria could be in first or last name
         const fullName = `${student.name.first} ${student.name.last}`.toLowerCase();
         if (fullName.includes(userInput)) {
            matchingStudents.push(student);
         } else if (userInput === '') { 
            searchInput.value = ''
            searchInput.placeholder = 'Search by name...';
            showPage(data, 1);    
            addPagination(data);
         }
      }
      if (matchingStudents.length === 0) {
         searchInput.value = '';   
         searchInput.placeholder = 'No results found.';
         showPage([],1);
         addPagination([]);

      } else { 
         showPage(matchingStudents, 1); // Show first page of matching students
         addPagination(matchingStudents); // Update pagination for matching students
      }
      if (userInput === '') {
         searchInput.placeholder = 'Search by name...';
      }
   });

   //Toggle above listener off if you want to use the listener below instead

   // searchInput.addEventListener('keyup', (e) => {
   //    const userInput = e.target.value.toLowerCase();
   //    const studentList = document.querySelector('.student-list');
   //    const matchingStudents = [];  // Array to hold students that match the search criteria
      
   //    for (let i = 0; i < data.length; i++) {
   //       const student = data[i];
   //       //Concatenated full name, assuming search criteria could be in first or last name
   //       const fullName = `${student.name.first} ${student.name.last}`.toLowerCase();
   //       if (fullName.includes(userInput)) {
   //          matchingStudents.push(student);
   //       }
   //    }
   //    if (matchingStudents.length === 0) {
   //       searchInput.value = '';   
   //       searchInput.placeholder = 'No results found.';
   //     } else { 
   //       showPage(matchingStudents, 1); // Show first page of matching students
   //       addPagination(matchingStudents); // Update pagination for matching students
   //       }
   // });

   
   function showPage(list, page) {
      const startIndex = (page * 9) - 9;
      const endIndex = page * 9;
      const studentList = document.querySelector('.student-list');
      studentList.innerHTML = ''; // Clear previous content

      for (let i = startIndex; i >=startIndex && i < endIndex && i < list.length; i++) {
         const student = list[i];
         const studentListItem = document.createElement('li');
         studentListItem.innerHTML = `
         <li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${student.picture.thumbnail}" alt="Profile Picture"/>
               <h3>${student.name.title} ${student.name.first} ${student.name.last}</h3>
               <span class="email">${student.email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${student.registered.date}</span>
            </div>
         </li>
         `;
         studentList.insertAdjacentElement('beforeend',studentListItem);
      }
   }
               
   /*
   Create the `addPagination` function
   This function will create and insert/append the elements needed for the pagination buttons
   */

   
   function addPagination(list) {
      //Must round up to account for data on the last page
      const numOfPages = Math.ceil(list.length / 9);
      const linkList = document.querySelector('.link-list');

      linkList.innerHTML = ''; 

      for (let i = 1; i <= numOfPages; i++) {
         const buttonItem = document.createElement('li');
         if (i === 1) {
            buttonItem.innerHTML = `<button type="button" class="active">${i}</button></li>`;
         } else {
            buttonItem.innerHTML = `<button type="button">${i}</button>`;
         }
         linkList.insertAdjacentElement('beforeend', buttonItem); 
      }
   }
 
   const linkList = document.querySelector('.link-list');

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

   // Call functions - these fire when the page loads

   showPage(data, 1);    
   addPagination(data);  
});