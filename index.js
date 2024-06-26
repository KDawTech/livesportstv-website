// index.js
document.addEventListener('DOMContentLoaded', () => {
  // Counter for the number of signatures
  let count = 3;
  let scaleFactor = 1;
  let intervalId = null; // Shared interval ID for managing animation

  const updateSignatureCount = () => {
    const counterElement = document.getElementById('counter');
    counterElement.textContent = `${count} people have signed this petition and support this cause.`;
  };

  const scaleImage = () => {
    const modalImage = document.getElementById('modalImage'); // Ensure this ID matches your image ID
    scaleFactor = (scaleFactor === 1) ? 0.8 : 1;
    modalImage.style.transform = `scale(${scaleFactor})`;
  };

  const toggleModal = (person) => {
    const modal = document.getElementById('thanks-modal');
    const modalContent = document.getElementById('thanks-content-modal');
    modalContent.textContent = `Thank you ${person.name} from ${person.hometown} for your support!`;

    modal.style.display = 'flex';

    if (intervalId !== null) {
      clearInterval(intervalId);
    }

    intervalId = setInterval(scaleImage, 500);

    setTimeout(() => {
      modal.style.display = 'none';
      clearInterval(intervalId);
      intervalId = null;
    }, 4000);
  };

  const validateForm = (event) => {
    event.preventDefault();
    let person = { name: '', hometown: '', email: '' };
    let formIsValid = true;

    // Assuming your form has 'name', 'hometown', 'email' as names for the form fields
    const form = document.getElementById('sign-petition');
    for (let element of form.elements) {
      if (element.type === 'text' && element.value.length < 2) {
        element.classList.add('error');
        formIsValid = false;
      } else {
        element.classList.remove('error');
        person[element.name] = element.value.trim();
      }
    }

    if (formIsValid) {
      addSignature(person);
      toggleModal(person);
      form.reset();
      updateSignatureCount();
    }
  };

  const addSignature = (person) => {
    count++;
    const signaturesSection = document.querySelector('.signatures');
    const newSignature = document.createElement('p');
    newSignature.textContent = `🖊️ ${person.name} from ${person.hometown} supports this.`;
    signaturesSection.appendChild(newSignature);
  };

  const signNowButton = document.getElementById('sign-now-button');
  signNowButton.addEventListener('click', validateForm);

  // New close button handler
  const closeButton = document.getElementById('close-modal'); // Make sure this ID matches your close button ID
  closeButton.addEventListener('click', () => {
    const modal = document.getElementById('thanks-modal');
    modal.style.display = 'none';
    clearInterval(intervalId);
    intervalId = null;
  });

  const themeButton = document.getElementById('theme-button');
  themeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
});


