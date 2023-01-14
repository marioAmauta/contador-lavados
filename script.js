const initialStateDataName = 'initialStateData';

const initialStateForm = document.getElementById('initialStateForm');
const initialStateInfo = document.getElementById('initialStateInfo');
const initialDataInfoContainer = document.getElementById('initialDataInfoContainer');

const finalStateForm = document.getElementById('finalStateForm');
const finalStateInfo = document.getElementById('finalStateInfo');
const finalDataInfoContainer = document.getElementById('finalDataInfoContainer');
const finalStateContainer = document.getElementById('finalStateContainer');

const resetButton = document.getElementById('resetButton');

function setInitialStateInfo(data) {
  const total = initialDataInfoContainer.children[0].children[1];
  const programOne = initialDataInfoContainer.children[1].children[1];
  const programTwo = initialDataInfoContainer.children[2].children[1];
  const date = initialDataInfoContainer.children[3].children[1];

  total.textContent = data.startTotal;
  programOne.textContent = data.programOne;
  programTwo.textContent = data.programTwo;
  date.textContent = data.recordDate;
}

function setFinalStateInfo(data) {
  const total = finalDataInfoContainer.children[0].children[1];
  const programOne = finalDataInfoContainer.children[1].children[1];
  const programTwo = finalDataInfoContainer.children[2].children[1];

  total.textContent = data.totalResult;
  programOne.textContent = data.programOneResult;
  programTwo.textContent = data.programTwoResult;
}

function checkInitialStateData() {
  if (localStorage.getItem(initialStateDataName)) {
    const data = JSON.parse(localStorage.getItem(initialStateDataName));
    setInitialStateInfo(data);

    initialStateForm.classList.add('display-none');
    initialStateInfo.classList.remove('display-none');

    finalStateContainer.classList.remove('display-none');
    finalStateInfo.classList.add('display-none');
  } else {
    initialStateForm.reset();
    initialStateInfo.classList.add('display-none');
    initialStateForm.classList.remove('display-none');

    finalStateContainer.classList.add('display-none');
  }
}

function handleInitialStateForm() {
  const initialStateData = {
    startTotal: initialStateForm[0].valueAsNumber,
    programOne: initialStateForm[1].valueAsNumber,
    programTwo: initialStateForm[2].valueAsNumber,
    recordDate: new Date().toLocaleString()
  };

  const stringifiedData = JSON.stringify(initialStateData);
  localStorage.setItem(initialStateDataName, stringifiedData);

  alert('Datos guardados correctamente');
  checkInitialStateData();
}

function handleFinalStateForm() {
  const finalStateData = {
    endTotal: finalStateForm[0].valueAsNumber,
    programOne: finalStateForm[1].valueAsNumber,
    programTwo: finalStateForm[2].valueAsNumber
  };

  const savedData = JSON.parse(localStorage.getItem(initialStateDataName));

  const resultData = {
    totalResult: finalStateData.endTotal - savedData.startTotal,
    programOneResult: finalStateData.programOne - savedData.programOne,
    programTwoResult: finalStateData.programTwo - savedData.programTwo
  };

  console.log(resultData);

  setFinalStateInfo(resultData);

  finalStateContainer.classList.remove('display-none');
  finalStateForm.classList.add('display-none');
  finalStateInfo.classList.remove('display-none');
}

document.addEventListener('DOMContentLoaded', () => {
  checkInitialStateData();

  document.addEventListener('submit', event => {
    event.preventDefault();

    if (event.target.id === initialStateForm.id) {
      handleInitialStateForm();
    }

    if (event.target.id === finalStateForm.id) {
      handleFinalStateForm();
    }
  });

  resetButton.addEventListener('click', () => {
    if (confirm('¿Deseas eliminar los datos de inicio del turno?')) {
      localStorage.removeItem(initialStateDataName);
      checkInitialStateData();
    }
    return;
  });
});
