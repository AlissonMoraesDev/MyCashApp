const renderFinancesList = async (data) => {
  const financesTable = document.getElementById('finances-table');
  financesTable.innerHTML = "";

  const tableHeader = document.createElement("tr");
  
  const tableTitle = document.createTextNode("Descrição");
  const titleElement = document.createElement("th")
  titleElement.appendChild(tableTitle);
  tableHeader.appendChild(titleElement);

  const categoryTitle = document.createTextNode("Categoria");
  const categoryElement = document.createElement("th")
  categoryElement.appendChild(categoryTitle);
  tableHeader.appendChild(categoryElement);

  const dateTitle = document.createTextNode("Data");
  const dateElement = document.createElement("th")
  dateElement.appendChild(dateTitle);
  tableHeader.appendChild(dateElement);

  const valueTitle = document.createTextNode("Valor");
  const valueElement = document.createElement("th")
  valueElement.appendChild(valueTitle);
  valueElement.className = "center";
  tableHeader.appendChild(valueElement);

  const actionTitle = document.createTextNode("Ação");
  const actionElement = document.createElement("th")
  actionElement.appendChild(actionTitle);
  actionElement.className = "right";
  tableHeader.appendChild(actionElement);

  financesTable.appendChild(tableHeader);

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
  releases.innerHTML = "";

  const totalSubtext = document.createTextNode("Lançamentos");
  const totalSubtextElement = document.createElement("h3");
  totalSubtextElement.appendChild(totalSubtext);
  releases.appendChild(totalSubtextElement);

  const releasesText = document.createTextNode(totalItems);
  const releasesElement = document.createElement("h1");
  releasesElement.id = "total-releases";
  releasesElement.appendChild(releasesText);
  releases.appendChild(releasesElement);

  // render card revenues
  const revenuesCard = document.getElementById('finance-revenues');
  revenuesCard.innerHTML = "";

  const revenuesSubtext = document.createTextNode("Receitas");
  const revenuesSubtextElement = document.createElement("h3");
  revenuesSubtextElement.appendChild(revenuesSubtext);
  revenuesCard.appendChild(revenuesSubtextElement);

  const revenuesCardText = document.createTextNode(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(revenues));
  const revenuesCardElement = document.createElement("h1");
  revenuesCard.id = "revenue-element";
  revenuesCardElement.appendChild(revenuesCardText);
  revenuesCard.appendChild(revenuesCardElement);

  // render card expenses
  const expensesCard = document.getElementById('finance-expenses');
  expensesCard.innerHTML = "";

  const expensesSubtext = document.createTextNode("Despesas");
  const expensesSubtextElement = document.createElement("h3");
  expensesSubtextElement.appendChild(expensesSubtext);
  expensesCard.appendChild(expensesSubtextElement);

  const expensesCardText = document.createTextNode(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(expenses));
  const expensesCardElement = document.createElement("h1");
  expensesCard.id = "expenses-element";
  expensesCardElement.appendChild(expensesCardText);
  expensesCard.appendChild(expensesCardElement);

  // render card balance
  const balanceCard = document.getElementById('finance-balance');
  balanceCard.innerHTML = "";

  const balanceSubtext = document.createTextNode("Balanço");
  const balanceSubtextElement = document.createElement("h3");
  balanceSubtextElement.appendChild(balanceSubtext);
  balanceCard.appendChild(balanceSubtextElement);

  const balanceCardText = document.createTextNode(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(totalValue));
  const balanceCardElement = document.createElement("h1");
  balanceCard.id = "balance-element";
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

const onCallAddFinance = async (data) => {
  try {
    
    const email = localStorage.getItem("@MyCashApp:userEmail");

    const response = await fetch('https://mp-wallet-app-api.herokuapp.com/finances', {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          email: email,
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

const onCreateFinanceRelease = async (target) => {
  try { 
    const title = target[0].value;
    const value = Number(target[1].value);
    const date = target[2].value;
    const category_id = Number(target[3].value);
    const result = await onCallAddFinance({
      title,
      value,
      date,
      category_id
    });

    if(result.error) {
      alert('Erro ao realizar o lançamento');
      return;
    }
    onCloseModal();
    onLoadFinancesData();
  } catch (error) {
    alert('Erro ao realizar o lançamento');
  }
}


window.onload = () => {
  onLoadCategories();
  onLoadUserInfo();
  onLoadFinancesData();

  const form = document.getElementById('form-finance-release');
  form.onsubmit = (event) => {
    event.preventDefault();
    onCreateFinanceRelease(event.target);
  }

}