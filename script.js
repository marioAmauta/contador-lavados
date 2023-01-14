const initialStateForm = document.getElementById('initialStateForm');
const initialStateInfo = document.getElementById('initialStateInfo');
const initialDataInfoContainer = document.getElementById('initialDataInfoContainer');

const initialStateDataName = 'initialStateData';

const finalStateContainer = document.getElementById('finalStateContainer');
const finalStateForm = document.getElementById('finalStateForm');

const resetButton = document.getElementById('resetButton');

function setInitialStateInfo(data) {
  const firstParagraph = initialDataInfoContainer.children[0].children[1];
  const secondParagraph = initialDataInfoContainer.children[1].children[1];
  const thirdParagraph = initialDataInfoContainer.children[2].children[1];
  const fourthParagraph = initialDataInfoContainer.children[3].children[1];

  firstParagraph.textContent = data.startTotal;
  secondParagraph.textContent = data.programOne;
  thirdParagraph.textContent = data.programTwo;
  fourthParagraph.textContent = data.recordDate;
}

function checkInitialStateData() {
  if (localStorage.getItem(initialStateDataName)) {
    const data = JSON.parse(localStorage.getItem(initialStateDataName));
    setInitialStateInfo(data);

    initialStateForm.classList.add('display-none');
    initialStateInfo.classList.remove('display-none');

    finalStateContainer.classList.remove('display-none');
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

  const resultData = {
    totalResult: finalStateData.endTotal - shiftStartDataLocalStorage.startTotal,
    programOneResult: finalStateData.programOne - shiftStartDataLocalStorage.programOne,
    programTwoResult: finalStateData.programTwo - shiftStartDataLocalStorage.programTwo
  };
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
