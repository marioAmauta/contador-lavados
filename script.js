const $innerContainer = document.querySelector('.inner-container');

const initialStateDataStorageKey = 'initialStateData';
const $initialStateForm = document.getElementById('initialStateForm');
const $initialStateInfoContainer = document.getElementById('initialStateInfoContainer').children;
const $saveInitialDataButton = document.getElementById('saveInitialDataButton');
const $resetInitialFormButton = document.getElementById('resetInitialFormButton');
const $deleteInitialDataButton = document.getElementById('deleteInitialDataButton');

const finalStateDataStorageKey = 'finalStateData';
const $finalStateForm = document.getElementById('finalStateForm');
const $finalStateInfoContainer = document.getElementById('finalStateInfoContainer').children;
const $saveFinalDataButton = document.getElementById('saveFinalDataButton');
const $resetFinalFormButton = document.getElementById('resetFinalFormButton');
const $deleteFinalDataButton = document.getElementById('deleteFinalDataButton');

const resultDataStorageKey = 'resultData';
const $resultSection = document.getElementById('resultSection');
const $resultDataContainer = document.getElementById('resultDataContainer').children;
const $getResultButton = document.getElementById('getResultButton');
const $deleteAllDataButton = document.getElementById('deleteAllDataButton');

function getLocalStorageValue(storageKey) {
  return localStorage.getItem(storageKey);
}

function setLocalStorageValue(storageKey, value) {
  return localStorage.setItem(storageKey, value);
}

function getParsedDataFromLocalStorage(storageKey) {
  return JSON.parse(getLocalStorageValue(storageKey));
}

function stringifyDataForLocalStorage(data) {
  return JSON.stringify(data);
}

function checkLocalStorage() {
  const resetInfoData = {
    numericValues: {
      total: 0,
      programOne: 0,
      programTwo: 0
    },
    date: 'Sin Fecha'
  };

  if (getLocalStorageValue(initialStateDataStorageKey)) {
    setStateInfo($initialStateInfoContainer, getParsedDataFromLocalStorage(initialStateDataStorageKey));
    $initialStateForm.classList.add('display-none');
  } else {
    setStateInfo($initialStateInfoContainer, resetInfoData);
    $initialStateForm.classList.remove('display-none');
  }

  if (getLocalStorageValue(finalStateDataStorageKey)) {
    setStateInfo($finalStateInfoContainer, getParsedDataFromLocalStorage(finalStateDataStorageKey));
    $finalStateForm.classList.add('display-none');
  } else {
    setStateInfo($finalStateInfoContainer, resetInfoData);
    $finalStateForm.classList.remove('display-none');
  }

  if (getLocalStorageValue(resultDataStorageKey)) {
    setStateInfo($resultDataContainer, getParsedDataFromLocalStorage(resultDataStorageKey));
    $resultSection?.classList.remove('display-none');
  } else {
    setStateInfo($resultDataContainer, resetInfoData);
    $resultSection?.classList.add('display-none');
  }
}

function saveDataToLocalStorage(storageKey, data, result = false) {
  const isDataInvalid = Object.values(data.numericValues).some(value => isNaN(value));

  if (isDataInvalid) {
    alert('Todos los campos deben ser llenados');
    return;
  }

  if (getLocalStorageValue(storageKey)) {
    if (confirm('Ya hay datos guardados, ¿Deseas reemplazarlos?')) {
      setLocalStorageValue(storageKey, stringifyDataForLocalStorage(data));
      if (!result) {
        alert('Datos reemplazados correctamente');
      }
      checkLocalStorage();
    }
    return;
  }

  setLocalStorageValue(storageKey, stringifyDataForLocalStorage(data));
  if (!result) {
    alert('Datos guardados correctamente');
  }
  checkLocalStorage();
}

function deleteFromLocalStorage(storageKey, message = null) {
  if (storageKey.length === 3) {
    if (confirm('¿Estas seguro que quires eliminar todos los datos?')) {
      storageKey.map(key => {
        localStorage.removeItem(key);
      });
      checkLocalStorage();
    }
  } else {
    if (confirm(message)) {
      localStorage.removeItem(storageKey);
      checkLocalStorage();
    }
  }
}

function resetForm(formToReset) {
  if (confirm('Deseas limpiar el formulario?')) {
    formToReset.reset();
  }
  return;
}

function setStateInfo(stateInfoContainer, data) {
  const total = stateInfoContainer[0].children[1];
  const programOne = stateInfoContainer[1].children[1];
  const programTwo = stateInfoContainer[2].children[1];
  const date = stateInfoContainer[3].children[1];

  total.textContent = data?.numericValues.total;
  programOne.textContent = data?.numericValues.programOne;
  programTwo.textContent = data?.numericValues.programTwo;
  date.textContent = data?.date;
}

function handleStateForm(form, storageKey, stateInfoCard, reset = false, result = false) {
  if (!reset) {
    const stateInfoData = {
      numericValues: {
        total: form[0].valueAsNumber,
        programOne: form[1].valueAsNumber,
        programTwo: form[2].valueAsNumber
      },
      date: new Date().toLocaleString()
    };

    saveDataToLocalStorage(storageKey, stateInfoData);
    setStateInfo(stateInfoCard, getParsedDataFromLocalStorage(storageKey));
    checkLocalStorage();
  } else {
    resetForm(form);
  }
}

function getResult() {
  const initialStateData = getParsedDataFromLocalStorage(initialStateDataStorageKey);
  const finalStateData = getParsedDataFromLocalStorage(finalStateDataStorageKey);

  if (!initialStateData && !finalStateData) {
    alert('No hay datos, llena los formularios y vuelve a intentar');
    return;
  }

  const resultData = {
    numericValues: {
      total: finalStateData.numericValues.total - initialStateData.numericValues.total,
      programOne: finalStateData.numericValues.programOne - initialStateData.numericValues.programOne,
      programTwo: finalStateData.numericValues.programTwo - initialStateData.numericValues.programTwo
    },
    date: new Date().toLocaleString()
  };

  saveDataToLocalStorage(resultDataStorageKey, resultData, true);
  setStateInfo($resultDataContainer, getParsedDataFromLocalStorage(resultDataStorageKey));
  checkLocalStorage();
}

document.addEventListener('DOMContentLoaded', () => {
  checkLocalStorage();

  $innerContainer.addEventListener('click', event => {
    event.preventDefault();

    if (event.target.id === $saveInitialDataButton.id) {
      handleStateForm($initialStateForm, initialStateDataStorageKey, $initialStateInfoContainer);
    }

    if (event.target.id === $resetInitialFormButton.id) {
      handleStateForm($initialStateForm, initialStateDataStorageKey, $initialStateInfoContainer, true);
    }

    if (event.target.id === $deleteInitialDataButton.id) {
      deleteFromLocalStorage(initialStateDataStorageKey, '¿Deseas eliminar el numeral inicial?');
    }

    if (event.target.id === $saveFinalDataButton.id) {
      handleStateForm($finalStateForm, finalStateDataStorageKey, $finalStateInfoContainer);
    }

    if (event.target.id === $resetFinalFormButton.id) {
      handleStateForm($finalStateForm, finalStateDataStorageKey, $finalStateInfoContainer, true);
    }

    if (event.target.id === $deleteFinalDataButton.id) {
      deleteFromLocalStorage(finalStateDataStorageKey, '¿Deseas eliminar el numeral final?');
    }

    if (event.target.id === $getResultButton.id) {
      getResult();
    }

    if (event.target.id === $deleteAllDataButton.id) {
      deleteFromLocalStorage([initialStateDataStorageKey, finalStateDataStorageKey, resultDataStorageKey]);
    }
  });
});
