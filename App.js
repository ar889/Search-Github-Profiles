// selecting elements from dom

let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let input = document.getElementById("inputText");
  let inputVal = input.value;
  if (inputVal) {
    fetchApi(inputVal);
  }
});

// Function to fetchApi og github

async function fetchApi(user) {
  let url = "https://api.github.com/users/" + user;
  console.log(url);
  await fetch(url)
    .then((Response) => {
      return Response.json();
    })
    .then((data) => {
      populateData(data);
      fetch(`${data.repos_url}`)
        .then((res) => {
          return res.json();
        })
        .then((data1) => {
          console.log(data1);
          addRepos(data1);
          console.log(data1);
        });
    });
}

// function to populate data to DOM

function populateData(userData) {
  let html = `<img src="${userData.avatar_url}" alt="${userData.name}">
  <div>
     <h1>${userData.name}</h1>
     <p><strong>${userData.bio}</strong></p>
     <div id='innerDiv'>
     <span class='extraData'><strong>Followers:</strong> ${userData.followers}</span><span class='extraData'><strong>Following:</strong> ${userData.following}</span><span class='extraData'><strong>Repo's:</strong> ${userData.public_repos}</span></div></div> <div id="repos"></div>`;
  let container = document.getElementById("container");
  container.innerHTML = html;
}

// function to populate repositories 

async function addRepos(repoData) {
  let repoArray = Array.from(repoData).slice(0, 10);
  repoArray.forEach((repo) => {
    console.log(repo.name);
    let element = document.getElementById("repos");
    let newEl = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
    element.innerHTML += newEl;
    console.log(repo.name);
  });
}
