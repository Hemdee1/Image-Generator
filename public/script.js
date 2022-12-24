const form = document.querySelector("form");
const textInput = document.querySelector("#text_input");
const sizeInput = document.querySelector("#size");
const imgCont = document.querySelector("#image");
const errorCont = document.querySelector("#error");
const textCont = document.querySelector("#text");
const loader = document.querySelector("#loader");

textInput.focus();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  //   reset default
  errorCont.innerHTML = "";

  const text_input = textInput.value;
  const size = sizeInput.value;

  if (!text_input) {
    return (errorCont.innerHTML = "Please input an image description");
  }

  generateImage(text_input, size);
});

async function generateImage(text, size) {
  // show loading
  loader.classList.add("show");
  document.body.style.overflowY = "hidden";

  try {
    const response = await fetch("/generateImage", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ text, size }),
    });

    if (!response.ok) {
      throw new Error("Image cannot be generated");
    }

    const data = await response.json();
    showImage(data.data, text);
    url = data.data;

    // checking if the image has fully loaded
    const complete = await waitForImage(imgCont);
    if (complete === undefined) {
      // remove loading
      loader.classList.remove("show");
      document.body.style.overflowY = "scroll";
    }
  } catch (error) {
    errorCont.innerHTML = error.message;

    // reset to default
    removeImage();
    loader.classList.remove("show");
    document.body.style.overflowY = "scroll";
  }
}

function showImage(url, text) {
  imgCont.src = url;
  imgCont.setAttribute("alt", text);
  textCont.innerHTML = text;
}

function removeImage() {
  imgCont.src = "";
  imgCont.setAttribute("alt", "");
  textCont.innerHTML = "";
}

function waitForImage(imgElem) {
  return new Promise((res) => {
    if (imgElem.complete) {
      return res();
    }
    imgElem.onload = () => res();
    imgElem.onerror = () => res();
  });
}
