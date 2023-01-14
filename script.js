const initialStateForm = document.getElementById('initialStateForm');
const initialStateInfo = document.getElementById('initialStateInfo');
const initialStateDataName = 'initialStateData';

const finalStateForm = document.getElementById('finalStateForm');

const resetButton = document.getElementById('resetButton');

function setInitialStateInfo(data) {
  const firstParagraph = initialStateInfo.children[1];
  const secondParagraph = initialStateInfo.children[2];
  const thirdParagraph = initialStateInfo.children[3];
  const fourthParagraph = initialStateInfo.children[4];

  firstParagraph.textContent = `Total: ${data.startTotal}`;
  secondParagraph.textContent = `Programa 1: ${data.programOne}`;
  thirdParagraph.textContent = `Programa 2: ${data.programTwo}`;
  fourthParagraph.textContent = `Fecha de registro: ${data.recordDate}`;
}

function checkInitialStateData() {
  if (localStorage.getItem(initialStateDataName)) {
    const data = JSON.parse(localStorage.getItem(initialStateDataName));
    setInitialStateInfo(data);
    initialStateForm.classList.add('display-none');
    initialStateInfo.classList.remove('display-none');
  } else {
    initialStateForm.reset();
    initialStateInfo.classList.add('display-none');
    initialStateForm.classList.remove('display-none');
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
    totalResult: shiftEndData.endTotal - shiftStartDataLocalStorage.startTotal,
    programOneResult: shiftEndData.programOne - shiftStartDataLocalStorage.programOne,
    programTwoResult: shiftEndData.programTwo - shiftStartDataLocalStorage.programTwo
  };
}

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

finalStateForm.addEventListener('submit', event => {
  event.preventDefault();

  const resultData = {
    totalResult: shiftEndData.endTotal - shiftStartDataLocalStorage.startTotal,
    programOneResult: shiftEndData.programOne - shiftStartDataLocalStorage.programOne,
    programTwoResult: shiftEndData.programTwo - shiftStartDataLocalStorage.programTwo
  };

  console.log('shiftStartDataLocalStorage', shiftStartDataLocalStorage);
  console.log('shiftEndData', shiftEndData);
  console.log('resultData', resultData);

  resultSection.innerHTML = `
    <h3>Datos inicio de turno</h3>
    <p>Total: ${resultData.startTotal}</p>
    <p>Programa 1: ${resultData.programOne}</p>
    <p>Programa 2: ${resultData.programTwo}</p>
    `;
});

resetButton.addEventListener('click', () => {
  if (confirm('¿Deseas eliminar los datos de inicio del turno?')) {
    localStorage.removeItem(initialStateDataName);
    checkInitialStateData();
  }
  return;
});
