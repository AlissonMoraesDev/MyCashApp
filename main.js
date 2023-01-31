const validationUser = async (email) => {
  try {
    const result = await fetch(
      `https://mp-wallet-app-api.herokuapp.com/users?email=${email}`
      );
      const user = await result.json();
      return user;
  } catch (error) {
    { error };
  }
  
}

const onClickLogin = async () => {

  const formLogin = document.getElementById('form-login')
  const email = document.getElementById('input-email').value;

  formLogin.onsubmit = (event) => {
    event.preventDefault();
    if(email.length < 5 || !email.includes("@")) {
      alert("E-mail inválido!");
      document.getElementById('input-email').focus();
      return; 
    }
  }
  
  
  const result = await validationUser(email);

  if(result.error) {
    alert("Falha ao validar e-mail");
    return;
  }
  
  localStorage.setItem("@MyCashApp:userEmail", result.email);
  localStorage.setItem("@MyCashApp:userName", result.name);
  localStorage.setItem("@MyCashApp:userId", result.id);

  window.open("./src/pages/home/index.html", "_self");
}