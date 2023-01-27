const renderFinancesList = async (data) => {
  const financesTable = document.getElementById('finances-table');
  data.map((item) => {
    const tableRow = document.createElement("tr");
    tableRow.className = "line";
    
    // Description table
    const descriptionTd = document.createElement("td")
    const descriptionText = document.createTextNode(item.title);
    descriptionTd.appendChild(descriptionText);
    tableRow.appendChild(descriptionTd);
    
    // Category table
    const categoryTd = document.createElement("td")
    const categoryText = document.createTextNode(item.name);
    categoryTd.appendChild(categoryText);
    tableRow.appendChild(categoryTd);
    
    // Date table
    const dateTd = document.createElement("td")
    const dateText = document.createTextNode(new Date(item.date).toLocaleDateString('dd'));
    dateTd.appendChild(dateText);
    tableRow.appendChild(dateTd);

    // Value table
    const valueTd = document.createElement("td")
    valueTd.className = "center";
    const valueText = document.createTextNode(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(item.value));
    valueTd.appendChild(valueText);
    tableRow.appendChild(valueTd);

     // Category table
     const deleteTd = document.createElement("td")
     deleteTd.className = "right";
     const deleteText = document.createTextNode("Deletar");
     deleteTd.appendChild(deleteText);
     tableRow.appendChild(deleteTd);

     financesTable.appendChild(tableRow);
  });
}

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
    renderFinancesList(data);
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

const onLoadCategories = async () => {
  try {
    const selectCategorias = document.getElementById('input-category');
    const response = await fetch('https://mp-wallet-app-api.herokuapp.com/categories');
    const resultCategories = await response.json();
    resultCategories.map((category) => {
      const option = document.createElement("option");
      const optionText = document.createTextNode(category.name);
      option.id = `category_${category.id}`;
      option.value = category.id;
      option.appendChild(optionText);
      selectCategorias.appendChild(option);
    })
  } catch (error){
    console.log('Erro ao carregar as categorias');
  }
}

const onOpenModal = () => {
  const modalLancamento = document.getElementById('modal-lancamento');
  modalLancamento.style.display = "flex";

}

const onCloseModal = () => {
  const modalLancamento = document.getElementById('modal-lancamento');
  modalLancamento.style.display = "none";
}


window.onload = () => {
  onLoadCategories();
  onLoadUserInfo();
  onLoadFinancesData();
}