const filePicker = document.getElementById("image");
const imagePreviewElement = document.getElementById("imagePreview");

function showPreview() {
  const files = filePicker.files;

  if (!files || files.length === 0) {
    imagePreviewElement.style.display = "none";
    return;
  }

  const pickedFile = files[0];

  imagePreviewElement.src = URL.createObjectURL(pickedFile);
  imagePreviewElement.style.display = "block";
}

filePicker.addEventListener("change", showPreview);
