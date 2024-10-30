// Zadanie 1: Wybierz niezbędne elementy DOM
// Przykład: Musisz uzyskać odniesienia do elementów takich jak input pliku, przycisk, img i canvas.
// Wskazówka: Użyj document.getElementById lub podobnych metod, aby uzyskać elementy po ich ID.

const fileInput = document.getElementById("imageUpload");
const imageButton = document.getElementById("convertGrayscale");
let uploadedImage = document.getElementById("uploadedImage");
let grayscaleImage = document.getElementById("grayscaleImage");
let ourCanvasContext = grayscaleImage.getContext("2d");

// Zadanie 2: Dodaj nasłuchiwacz zdarzeń dla przesyłania obrazu
// Kiedy użytkownik wybierze obraz, wyświetl go w elemencie <img>.
// Wskazówka: Możesz użyć API FileReader, aby odczytać plik jako URL danych.

fileInput.addEventListener("change", (e) => {
	const file = e.target.files[0];
	if (file) {
		const fileReader = new FileReader();
		fileReader.onload = (e) => {
			uploadedImage.src = e.target.result;
		};
		fileReader.readAsDataURL(file);
	}
});

// Zadanie 3: Dodaj nasłuchiwacz zdarzeń do przycisku „Konwertuj na odcienie szarości”
// Po kliknięciu, skonwertuj wyświetlany obraz na odcienie szarości i pokaż go w elemencie <canvas>.
// Wskazówka: Musisz użyć elementu canvas i jego kontekstu (2D) oraz zmodyfikować dane pikseli.

imageButton.addEventListener("click", () => {
	// Zadanie opcjonalne: Zastanów się, co się stanie, jeśli nie zostanie przesłany żaden obraz, a przycisk odcieni szarości zostanie kliknięty.
	// Wskazówka: Możesz sprawdzić, czy obraz został przesłany, zanim zastosujesz filtr odcieni szarości.

	if (!uploadedImage.src) {
		alert("Please upload an image to see the grayscale effect");
		return;
	}


	// Sposób I z użyciem CSS:

	// grayscaleImage = image
	// grayscaleImage.src = image.src
	// grayscaleImage.style.filter = 'grayscale(1)';

	// grayscaleImage.width = uploadedImage.width;
	// grayscaleImage.height = uploadedImage.height;




	// Zadanie 4: Narysuj przesłany obraz na canvasie
	// Wskazówka: Użyj drawImage() w kontekście canvasa, aby narysować obraz. Upewnij się, że rozmiar canvasa odpowiada rozmiarowi obrazu.

	// I Sposób :

	// grayscaleImage.width = uploadedImage.width;
	// grayscaleImage.height = uploadedImage.height;

	// ourCanvasContext.drawImage(uploadedImage, 0, 0, uploadedImage.width, uploadedImage.height);

	// grayscaleImage.style.filter = 'grayscale(1)';

	// II Sposób : 

	grayscaleImage.width = uploadedImage.width;
	grayscaleImage.height = uploadedImage.height;

	ourCanvasContext.drawImage(uploadedImage, 0, 0, uploadedImage.width, uploadedImage.height);

	// // Zadanie 5: Skonwertuj obraz na odcienie szarości poprzez manipulowanie danymi pikseli
	// // Wskazówka: Użyj getImageData() do pobrania danych pikseli, zastosuj formułę dla odcieni szarości, a następnie użyj putImageData(), aby zaktualizować canvas.

	const imageData = ourCanvasContext.getImageData(0, 0, grayscaleImage.width, grayscaleImage.height);
	const howManyPixels = imageData.data;
	let i = 0;

	const RGBToGrayScale = (red,green,blue) => {
		theGrayScale = Math.floor((red * 6966 + green * 23436 + blue * 2366) / 32768);
		return theGrayScale
	  }

	for (i; i < howManyPixels.length; i = i + 4) {
		const red = howManyPixels[i];
		const green = howManyPixels[i + 1];
		const blue = howManyPixels[i + 2];
		const grayScale = RGBToGrayScale(red,green,blue)

		howManyPixels[i] = grayScale;
		howManyPixels[i + 1] = grayScale;
		howManyPixels[i + 2] = grayScale;
	}

	ourCanvasContext.putImageData(imageData, 0, 0);
});


