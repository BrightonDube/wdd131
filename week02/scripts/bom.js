document.addEventListener('DOMContentLoaded', function () {
  const favChapter = document.getElementById('favChapter');
  const saveButton = document.querySelector('button');
  const outputDisplay = document.getElementById('list');

  if (favChapter) {
    favChapter.focus();
  }
  if (saveButton && favChapter && outputDisplay) {
    saveButton.addEventListener('click', function () {
      const textToSave = favChapter.value.trim();
      if (textToSave !== '') {
        const li = document.createElement('li');
        li.textContent = textToSave;
        outputDisplay.appendChild(li);
        favChapter.value = '';
        favChapter.focus();
      }
    });
  } else {
    console.error('One or more required HTML elements were not found.');
  }
});
