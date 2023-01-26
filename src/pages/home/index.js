const renderFinanceElements = (data) => {
  const totalItems = data.length;
  const revenues = data
    .filter((item) => Number(item.value) > 0)
    .reduce((acc, item) => acc + Number(item.value), 0);
    const expenses = data
    .filter((item) => Number(item.value) < 0)
    .reduce((acc, item) => acc + Number(item.value), 0);
  const totalValue = revenues + expenses;

  // render card total releases
  const releases = document.getElementById('finance-releases');
  const releasesText = document.createTextNode(totalItems);
  const releasesElement = document.createElement("h1");
  releasesElement.appendChild(releasesText);
  releases.appendChild(releasesElement);

  // render card revenues
  const revenuesCard = document.getElementById('finance-revenues');
  const revenuesCardText = document.createTextNode(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(revenues));
  const revenuesCardElement = document.createElement("h1");
  revenuesCardElement.appendChild(revenuesCardText);
  revenuesCard.appendChild(revenuesCardElement);

  // render card expenses
  const expensesCard = document.getElementById('finance-expenses');
  const expensesCardText = document.createTextNode(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(expenses));
  const expensesCardElement = document.createElement("h1");
  expensesCardElement.appendChild(expensesCardText);
  expensesCard.appendChild(expensesCardElement);

  // render card balance
  const balanceCard = document.getElementById('finance-balance');
  const balanceCardText = document.createTextNode(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(totalValue));
  const balanceCardElement = document.createElement("h1");
  balanceCardElement.className = "ui-balance"
  balanceCardElement.appendChild(balanceCardText);
  balanceCard.appendChild(balanceCardElement);
};

const onLoadFinancesData = async () => {
  try {
    const date = "2022-12-15";
    const email = localStorage.getItem("@MyCashApp:userEmail");
    const result = await fetch(`https://mp-wallet-app-api.herokuapp.com/finances?date=${date}`,
      {
        method: "GET",
        headers: {
          email: email,
        },
      }
    );
    const data = await result.json();
    renderFinanceElements(data);
    return data;
  } catch (error) {
    return { error }
  }
}

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
  onLoadFinancesData();
}