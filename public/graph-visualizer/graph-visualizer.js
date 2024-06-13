const jsonRadio = document.getElementById("json-radio");
const stringRadio = document.getElementById("string-radio");
const inputTip = document.getElementById("input-tip");
const matrixInputTextarea = document.getElementById("matrix-input");

jsonRadio.addEventListener("change", () => {
  matrixInputTextarea.value = "";
  inputTip.textContent = "Enter adjacency matrix in JSON format";
  matrixInputTextarea.placeholder =
    "[\n   [0, 1, 0],\n   [1, 0, 1],\n   [0, 1, 0]\n]";
});

stringRadio.addEventListener("change", () => {
  matrixInputTextarea.value = "";
  inputTip.textContent = "Enter adjacency matrix in string format";
  matrixInputTextarea.placeholder = "0 1 0\n1 0 1\n0 1 0";
});

document
  .getElementById("matrix-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const weightOption = document.getElementById("weight-checkbox").checked;
    const directionOption =
      document.getElementById("direction-checkbox").checked;

    const matrixInput = document.getElementById("matrix-input").value;

    let matrix;
    //TODO: check if the input is JSON or string
    try {
      matrix = JSON.parse(matrixInput);
    } catch (e) {
      alert("Invalid JSON format. Please enter a valid adjacency matrix.");
      return;
    }

    fetch("/api/graph", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ matrix }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          visualizeGraph(data.matrix, weightOption, directionOption);
        }
      })
      .catch((error) => console.error("Error:", error));
  });
