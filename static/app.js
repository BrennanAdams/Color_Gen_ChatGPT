//app.js
const form = document.querySelector('#form');
const button = form.querySelector('button');
window.addEventListener('resize', adjust_span_font_size, adjust_form_elements_size); //adjust font size of span when window is resized


form.addEventListener("submit", function(e) {
    const query = form.elements.query.value;
    console.log("Request received: " + query)

    e.preventDefault(); //prevents page from refreshing
    
    // Disable the button and show loading state
    button.disabled = true;
    button.classList.add('loading');

    get_colors(query);
})

//function that gets the data from a POST request to the OpenAI API
function get_colors(query) {
    fetch("/palette", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            query: query
        })
    })
    .then((response) => response.json())
    .then(data => {
        const container = document.querySelector('.container');
        container.innerHTML = ""; //clears container of previous colors
        create_div(data.colors, container); //call function to create divs for each color
    })
    .catch(error => {
        console.error(error);

        // Re-enable the button and remove loading state
        button.disabled = false;
        button.classList.remove('loading');
    });
}

//function that creates divs for each color from the colors returned by OpenAI API
function create_div(colors, container) {
    for(const color of colors) {
        //creation of the div color object
        const div = document.createElement('div'); //create a div for each color
        div.classList.add('color'); //add class to div
        div.style.backgroundColor = color; //set background color of div
        div.style.width = `${100 / colors.length}%` //set width of div to 100 / number of colors
                    
        //creation of the color value span
        const span = document.createElement("span");
        span.innerText = color;
        div.appendChild(span); //append span to div
        
        add_event_listeners(div, span, color); //add event listener to copy color value to clipboard

        //append div to container
        container.appendChild(div); 
        adjust_span_font_size(); //adjust font size of span
}

// Re-enable the button and remove loading state
button.disabled = false;
button.classList.remove('loading');
}

//function that adds event listener to copy color value to clipboard
function add_event_listeners(div, span, color) {
    // Add event listener to copy color value to clipboard
    div.addEventListener('click', () => {
        navigator.clipboard.writeText(color)
        console.log("Color copied to clipboard: " + color)
    });

    // Event listener to show/hide span on hover
    div.addEventListener('mouseenter', () => {
        span.style.display = 'block';
    });
    div.addEventListener('mouseleave', () => {
        span.style.display = 'none';
    });
}

function adjust_span_font_size() {
    const spanElements = document.querySelectorAll('.color span'); //selects all span elements
    spanElements.forEach((span) => {
        const containerWidth = window.innerWidth;
        const divisor = 30; //amount of spacing between the span and the edge of the container
        const fontSize = Math.floor(containerWidth / divisor); // Adjust the divisor (20) as needed

        span.style.fontSize = `${fontSize}px`; //set font size of span
    });
}

function adjust_form_elements_size() {
    const inputElement = document.querySelector('#form input[type="text"]');
    const buttonElement = document.querySelector('.btn');
    
    const viewportWidth = window.innerWidth;
    const inputFontSize = viewportWidth / 50; // Adjust the divisor (50) as needed
    const inputPadding = viewportWidth / 80; // Adjust the divisor (80) as needed
    const inputWidth = viewportWidth / 10; // Adjust the divisor (10) as needed
    const buttonFontSize = viewportWidth / 50; // Adjust the divisor (50) as needed
    const buttonPadding = viewportWidth / 80; // Adjust the divisor (80) as needed
    
    inputElement.style.fontSize = `${inputFontSize}px`;
    inputElement.style.padding = `${inputPadding}px`;
    inputElement.style.width = `${inputWidth}px`;
    buttonElement.style.fontSize = `${buttonFontSize}px`;
    buttonElement.style.padding = `${buttonPadding}px`;
}
    
    
//     function add_button_event_listener() {
//         const buttonElement = document.querySelector('.btn');

//         buttonElement.addEventListener('click', () => {
//             //buttonElement.disabled = true; // Disable the button
//             buttonElement.classList.add('loading'); // Add the loading class

//             // Simulating loading with a timeout (remove this code once you have the actual API request)
//             setTimeout(() => {
//                 buttonElement.classList.remove('loading');
//                 buttonElement.disabled = false;
//         }, 3000);
//     });
// }


