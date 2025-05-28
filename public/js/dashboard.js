  const button = document.getElementById('uploadBtn');
  const fileInput = document.getElementById('fileInput');
  const imgProfile = document.getElementById('image-profile');

  button.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {

        const imageUrl = URL.createObjectURL(file);
      // Aquí puedes hacer algo con el archivo, por ejemplo mostrar la imagen
      imgProfile.src = imageUrl;
    }
  });

