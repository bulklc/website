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
    // document.getElementById("page-body").style.display = "block";

    document.getElementById("access-grid").style.display = "none";
    document.getElementById("keypad").style.display = "none";

    document.getElementById("page-content").style.display = "flex";
    // document.getElementById("page-body").style.display = "block";

    

    document.getElementById("page-content").innerHTML = `
      <div class="letter-container">
        <div class="letter-header">
          <p><b>${card_messages[message_code].date}</b></p>
        </div>
        <div id="letter-body" class="letter-body">
        </div>   
        <div id="letter-footer" class="letter-footer">
        </div>             
      </div>
    `;




    card_messages[message_code].content["letter-body"].forEach((element) => {
      const elementNode = document.createElement(element.element_type);

      if (element.element_type === "ul") {
        element.content.forEach((listItem) => {
          const listItemNode = document.createElement("li");
          listItemNode.innerHTML = listItem;
          elementNode.appendChild(listItemNode);
        });
      } else {
        elementNode.innerHTML = element.content;
      }

      document.getElementById("letter-body").appendChild(elementNode);
    });

    card_messages[message_code].content["letter-footer"].forEach((element) => {
      const elementNode = document.createElement(element.element_type);
      elementNode.innerHTML = element.content;
      document.getElementById("letter-footer").appendChild(elementNode);

    });
  } else {
    alert(
      "Sorry, no message was found under this four digit code. Please check and try again."
    );
  }

}
