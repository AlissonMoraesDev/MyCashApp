const onCallRegister = async (name, email) => {
  try {
    const data = {
      name,
      email
    }
    const response = await fetch('https://mp-wallet-app-api.herokuapp.com/users', {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const user = await response.json();

    return user;

  } catch(error) {
    return { error };
  }
};

const onRegister = async () => {
  const name = document.getElementById('input-name').value;
  const email = document.getElementById('input-email').value;

  if(name.length <= 3) {
    alert("Nome deve conter mais de 3 caracteres");
    document.getElementById('input-name').focus();
    return;
  }

  if(email.length <= 5 && !email.includes("@")) {
    alert("Formato de e-mail inválido!");
    document.getElementById('input-email').focus();
    return;
  }

  const response = await onCallRegister(name, email);

  if(response.error) {
    alert("Falha ao tentar cadastrar, tente novamente!");
    return;
  }

  alert("Cadastro efetuado com sucesso!");

  localStorage.setItem("@MyCashApp:userEmail", response.email);
  localStorage.setItem("@MyCashApp:userName", response.name);
  localStorage.setItem("@MyCashApp:userId", response.id);

  window.open("../home/index.html", "_self");
}

window.onload = () => {
  const form = document.getElementById('form-register');
  form.onsubmit = (event) => {
    event.preventDefault();
    onRegister();
  }
}