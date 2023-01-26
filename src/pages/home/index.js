const onLoadUserInfo = () => {
  const email = localStorage.getItem("@MyCashApp:userEmail");
  const user =  localStorage.getItem("@MyCashApp:userName");
  
  const navbarUserInfo = document.getElementById('user-container');
  const navbarUserAvatar = document.getElementById('user-avatar');

  // Add user e-mail
  const emailElement = document.createElement("p")
  const emailText = document.createTextNode(email);
  emailElement.appendChild(emailText);
  navbarUserInfo.appendChild(emailElement);

  // add button logout
  const logoutElement = document.createElement("a");
  const logoutText = document.createTextNode("Sair");
  logoutElement.appendChild(logoutText);
  navbarUserInfo.appendChild(logoutElement);

  // Add user first letter avatar
  const nameElement = document.createElement("h3")
  const nameText = document.createTextNode(user.charAt(0));
  nameElement.appendChild(nameText);

  navbarUserAvatar.appendChild(nameElement);


}

window.onload = () => {
  onLoadUserInfo();
}