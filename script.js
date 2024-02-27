const container = document.getElementById('panZoomContainer');
const elements = document.querySelectorAll('.colored-element');
const element4 = document.getElementById('element4');
const element5 = document.getElementById('element5');
let isPanning = false;
let startOffsetX = 0;
let startOffsetY = 0;
let zoomScale = 1;

function updateElementPositions(offsetX, offsetY) {
    elements.forEach((element, index) => {
        element.style.left = initialPositions[index].left + offsetX + 'px';
        element.style.top = initialPositions[index].top + offsetY + 'px';
    });
}

function updateCanvasSize() {


    const newWidth = Math.max(minWidth, window.innerWidth);
    const newHeight = Math.max(minHeight, window.innerHeight);

    container.style.width = `${newWidth}px`;
    container.style.height = `${newHeight}px`;
}

// Set initial position for element4
const initialPositionElement4 = {
    left: container.clientWidth / 2 - element4.clientWidth / 2,
    top: container.clientHeight / 2 - element4.clientHeight / 2
};

// Apply initial position
element4.style.left = `${initialPositionElement4.left}px`;
element4.style.top = `${initialPositionElement4.top}px`;

const initialPositionElement5 = {
    left: container.clientWidth / 2 - element5.clientWidth / 2,
    top: container.clientHeight / 2 - element5.clientHeight / 2
};

element5.style.left = `${initialPositionElement5.left}px`;
element5.style.top = `${initialPositionElement5.top}px`;

// Store the initial positions
const initialPositions = Array.from(elements).map(element => ({
    left: parseInt(element.style.left),
    top: parseInt(element.style.top)
}));

container.addEventListener('mousedown', (e) => {
    isPanning = true;
    startOffsetX = e.clientX;
    startOffsetY = e.clientY;
});

container.addEventListener('mouseup', () => {
    isPanning = false;
    // Update the initial positions after each pan
    initialPositions.forEach((pos, index) => {
        pos.left = parseInt(elements[index].style.left);
        pos.top = parseInt(elements[index].style.top);
    });
});

container.addEventListener('mousemove', (e) => {
    if (isPanning) {
        const offsetX = (e.clientX - startOffsetX) / zoomScale;
        const offsetY = (e.clientY - startOffsetY) / zoomScale;

        updateElementPositions(offsetX, offsetY);
    }
});


// Add similar touch events for mobile devices if needed

container.addEventListener('wheel', (e) => {
    e.preventDefault(); // Prevent the default behavior of scrolling

    // Adjust the zoom level based on scroll direction
    const zoomFactor = e.deltaY > 0 ? 0.90 : 1.10;

    // Get the cursor position relative to the container
    const cursorX = e.clientX - container.getBoundingClientRect().left;
    const cursorY = e.clientY - container.getBoundingClientRect().top;

    // Calculate the offset of the cursor position after zoom
    const offsetX = (cursorX - container.clientWidth / 2) * (1 - zoomFactor);
    const offsetY = (cursorY - container.clientHeight / 2) * (1 - zoomFactor);

    // Update the scale factor
    zoomScale *= zoomFactor;

    // Apply the zoom to the container
    container.style.transform = `scale(${zoomScale})`;

    // Update the canvas size and element positions
    updateCanvasSize();
    updateElementPositions(offsetX, offsetY);
});




// Call the updateCanvasSize function whenever the window is resized
window.addEventListener('resize', () => {
    updateCanvasSize();
    updateElementPositions(0, 0);
});



function openModal(imagePath) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('expandedImage');

  modal.style.display = 'block';
  modalImg.src = imagePath;

  // Disable scrolling on the background content
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('imageModal');

  modal.style.display = 'none';

  // Enable scrolling on the background content
  document.body.style.overflow = 'auto';
}

// Close the modal if the user clicks outside the image
window.onclick = function (event) {
  const modal = document.getElementById('imageModal');
  if (event.target == modal) {
    closeModal();
  }
};

let isImagesMode = true;

        const wordTexts = [
            "Your Word 1 Text",
            "Your Word 2 Text",
            // Add more text for other words as needed
        ];

        function showWords() {
            if (isImagesMode) {
                isImagesMode = false;
        
                // Hide image elements
                document.querySelectorAll('.image-element').forEach((element) => {
                    element.style.display = 'none';
                });
        
                // Show text elements
                document.querySelectorAll('.text-element').forEach((element) => {
                    element.style.display = 'block';
                });
        
                updateTextContent(wordTexts);
            }
        }
        
        function showImages() {
            if (!isImagesMode) {
                isImagesMode = true;
        
                // Hide text elements
                document.querySelectorAll('.text-element').forEach((element) => {
                    element.style.display = 'none';
                });
        
                // Show image elements
                document.querySelectorAll('.image-element').forEach((element) => {
                    element.style.display = 'block';
                });
        
                updateTextContent(wordTexts);
            }
        }

        

        // Add this to your existing script.js or in a <script> tag in the body of your HTML
function toggleNavigation() {
    var indexNavigation = document.getElementById('indexNavigation');
    indexNavigation.style.display = (indexNavigation.style.display === 'block') ? 'none' : 'block';
}




// Add this to your existing script.js or in a <script> tag in the body of your HTML
document.addEventListener('DOMContentLoaded', function () {
    // Check if element5 was closed during the session
    const isElement5Closed = localStorage.getItem('isElement5Closed');
    const element5 = document.getElementById('element5');

    if (isElement5Closed === 'true') {
        element5.style.display = 'none';
    }
});

function closeElement5() {
    const element5 = document.getElementById('element5');
    element5.style.display = 'none';

    // Set a flag in localStorage to remember that element5 was closed during the session
    localStorage.setItem('isElement5Closed', 'true');
}
