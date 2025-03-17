let currentInput = 0;
const inputs = ["input1", "input2", "input3", "input4"];

function highlightCurrentInput() {
  inputs.forEach((input, index) => {
    const inputElement = document.getElementById(input);
    if (index === currentInput) {
      inputElement.classList.add("highlight");
    } else {
      inputElement.classList.remove("highlight");
    }
  });
}

function setCurrentInput(index) {
  console.log(index);
  currentInput = index;
  highlightCurrentInput();
}

function handleKeyPress(element, action) {
  element.classList.add("key-pressed");
  setTimeout(() => {
    element.classList.remove("key-pressed");
  }, 100);

  if (action === "backward") {
    backward();
  } else if (action === "forward") {
    forward();
  } else {
    addNumber(action);
  }
}

function addNumber(number) {
  const inputElement = document.getElementById(inputs[currentInput]);
  inputElement.value = number;
  if (currentInput < inputs.length - 1) {
    currentInput++;
  } else {
    currentInput = 0;
  }
  highlightCurrentInput();
}

function backward() {
  if (currentInput > 0) {
    currentInput--;
  } else {
    currentInput = inputs.length - 1;
  }
  highlightCurrentInput();
}

function forward() {
  if (currentInput < inputs.length - 1) {
    currentInput++;
  } else {
    currentInput = 0;
  }
  highlightCurrentInput();
}

function show_message(card_messages) {
  const input1 = document.getElementById("input1").value;
  const input2 = document.getElementById("input2").value;
  const input3 = document.getElementById("input3").value;
  const input4 = document.getElementById("input4").value;

  const message_code = "".concat(input1, input2, input3, input4);

  if (card_messages.hasOwnProperty(message_code)) {
    document.getElementById("access-grid").style.display = "none";
    document.getElementById("keypad").style.display = "none";
    document.getElementById("page-content").style.display = "block";

    document.getElementById("page-content").innerHTML = `
      <div class="message">
        <p class="date">${card_messages[message_code].date}</p>
        <p>${card_messages[message_code].content}</p>
      </div>
    `;
  } else {
    alert(
      "Sorry, no message was found under this four digit code. Please check and try again."
    );
  }
}
