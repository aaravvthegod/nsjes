// Get all checkbox elements and the progress bar container
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const progressBar = document.querySelector('.progress-bar');
const progressText = document.getElementById('progress-text');

// Function to update progress bar
function updateProgress() {
  // Get the total number of checkboxes and the number of checked boxes
  const totalCheckboxes = checkboxes.length;
  const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked').length;

  // Calculate the progress percentage
  const progress = (checkedCheckboxes / totalCheckboxes) * 100;

  // Update the width of the progress bar and the progress text
  progressBar.style.width = progress + '%';
  progressText.innerText = `Progress: ${Math.round(progress)}%`;

  // Optionally, you can also save progress to localStorage for persistence
  localStorage.setItem('checklistProgress', progress);
}

// Event listener for checkbox change events
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', updateProgress);
});

// Load saved progress from localStorage (if available)
window.onload = function() {
  const savedProgress = localStorage.getItem('checklistProgress');
  if (savedProgress) {
    progressBar.style.width = savedProgress + '%';
    progressText.innerText = `Progress: ${Math.round(savedProgress)}%`;

    // Set the checkboxes based on saved progress (partial checkbox state)
    const percentage = Math.round(savedProgress);
    const checkboxesToCheck = Math.round((percentage / 100) * checkboxes.length);
    for (let i = 0; i < checkboxesToCheck; i++) {
      checkboxes[i].checked = true;
    }
  } else {
    // Set initial progress if no saved progress
    progressBar.style.width = '0%';
    progressText.innerText = 'Progress: 0%';
  }
};
