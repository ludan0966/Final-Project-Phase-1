// signup page
if (document.URL.includes("signuppage.html")) {
  const signuppassword = document.getElementById('signuppassword');
  const pRight = document.getElementById('pRight');
  const pWrong = document.getElementById('pWrong');
  const signupemail = document.getElementById('signupemail');
  const emailError = document.getElementById('emailError');
  const signupbtn = document.getElementById('signupbtn');

  // Event listener for sign up button
  signupbtn.addEventListener('click', function () {
    const passwordLength = signuppassword.value.trim().length;
    const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const email = signupemail.value.trim();
    const password = signuppassword.value;
    const username = document.getElementById('username').value.trim();
    const signupInfo = document.getElementById('signupInfo');
    var users = JSON.parse(localStorage.getItem('users')) || [];
    var existingUser = users.find(function (user) {
      return user.email === email;
    });
    //Check if the email account exists
    if (existingUser) {
      signupInfo.innerHTML = 'User already exists!';
    } else {
      if (passwordLength < 6) {
        pWrong.style.display = 'block';
        pRight.style.display = 'none';
        signuppassword.style.border = '1px solid red';
        signuppassword.value = '';
      } else {
        pWrong.style.display = 'none';
        signuppassword.style.border = '1px solid gray';
      }

      if (!emailFormat.test(email)) {
        emailError.style.display = 'block';
        signupemail.style.border = '1px solid red';
        signupemail.value = '';
      } else {
        emailError.style.display = 'none';
        signupemail.style.border = '1px solid gray';
      }

      if (passwordLength >= 6 && emailFormat.test(email)) {
        pRight.style.display = 'block';
        pRight.style.color = 'blue';
        emailError.style.display = 'none';
        signupemail.style.border = '1px solid gray';
        signuppassword.style.border = '1px solid gray';

        users.push({ email: email, password: password });
        localStorage.setItem('users', JSON.stringify(users));
        signupInfo.innerHTML = 'Congratulations! You have signed up successfully!';
        pRight.style.display = 'none';
      }
    }
  });
}

// login page
if (document.URL.includes("loginpage.html")) {
  const loginbtn = document.getElementById('loginbtn');
  const loginemail = document.getElementById('loginemail');
  const loginpassword = document.getElementById('loginpassword');
  const loginInfo = document.getElementById('loginInfo');
  const coworker = document.getElementById('coworker');
  const owner = document.getElementById('owner');

  // Event listener for login button
  loginbtn.addEventListener('click', function () {
    const email = loginemail.value.trim();
    const password = loginpassword.value.trim();
    const role = document.querySelector('input[name="role"]:checked');

    if (!role) {
      loginInfo.innerHTML = 'Please select a role.';
      return;
    }

    var roleId = role.id;

    var users = JSON.parse(localStorage.getItem('users')) || [];

    var matchedUser = users.find(function (user) {
      return user.email === email && user.password === password;
    });

    if (matchedUser) {
      if (roleId === 'owner') {
        window.location.href = 'workspacepage.html';
      } else if (roleId === 'coworker') {

        window.location.href = 'searchpage.html';
      }
    } else {
      loginInfo.innerHTML = 'Invalid email or password, please try again.';
    }
  });
}

// Function for landing
const sliderData = [
  { url: 'workspacephoto/coworkingdesk-1.jpg' },
  { url: 'workspacephoto/coworkingdesk-2.jpg' },
  { url: 'workspacephoto/meetingroom-1.jpg' },
  { url: 'workspacephoto/meetingroom-2.jpg' },
  { url: 'workspacephoto/privateoffice-1.jpg' },
  { url: 'workspacephoto/privateoffice-2.jpg' }
];

const slider = document.getElementById('slider');
let currentIndex = 0;

// Function to change background image
function changeBackground() {
  slider.style.backgroundImage = `url(${sliderData[currentIndex].url})`;
  currentIndex = (currentIndex + 1) % sliderData.length;
}

// Change image every 1.5 seconds
setInterval(changeBackground, 1500);

// Retrieve stored information array
let workspaceInfos = JSON.parse(localStorage.getItem('workspaceInfos')) || [];

// Display information on the page
const workspaceList = document.getElementById('workspaceList');

// Function to render workspace information
function renderWorkspaceInfo(workspaceInfo, index) {
  const item = document.createElement('li');

  // Create and add paragraph for address information
  const addressParagraph = document.createElement('p');
  addressParagraph.textContent = 'Address: ' + workspaceInfo.address;
  item.appendChild(addressParagraph);

  // Create and add paragraph for city information
  const cityParagraph = document.createElement('p');
  cityParagraph.textContent = 'City: ' + workspaceInfo.city;
  item.appendChild(cityParagraph);

  // Create and add paragraph for state information
  const stateParagraph = document.createElement('p');
  stateParagraph.textContent = 'State: ' + workspaceInfo.state;
  item.appendChild(stateParagraph);

  // Create and add paragraph for country information
  const countryParagraph = document.createElement('p');
  countryParagraph.textContent = 'Country: ' + workspaceInfo.country;
  item.appendChild(countryParagraph);

  // Create and add paragraph for amenity information
  const amenityParagraph = document.createElement('p');
  amenityParagraph.textContent = 'Amenity: ' + workspaceInfo.amenity;
  item.appendChild(amenityParagraph);

  // If a photo is uploaded, display the photo
  if (workspaceInfo.photo) {
    const img = document.createElement('img');
    img.src = workspaceInfo.photo;
    img.style.maxWidth = '200px'; // Set max width to control image size
    item.appendChild(img);
  }

  // Create delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  // Add click event handler
  deleteButton.addEventListener('click', function () {
    // Remove the information from the stored array
    workspaceInfos.splice(index, 1);
    // Update local storage
    localStorage.setItem('workspaceInfos', JSON.stringify(workspaceInfos));
    // Remove the information from the page
    workspaceList.removeChild(item);
    // Re-render the page
    renderWorkspaceList();
  });
  item.appendChild(deleteButton);

  workspaceList.appendChild(item);
}

// Function to re-render the page
function renderWorkspaceList() {
  // Clear the list content
  workspaceList.innerHTML = '';
  // Iterate through the stored information array and render it on the page
  workspaceInfos.forEach(renderWorkspaceInfo);
}

// Render information when the page is first loaded
renderWorkspaceList();
