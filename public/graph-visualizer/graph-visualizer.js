document
  .getElementById("matrix-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const weightOption = document.getElementById("weight-checkbox").checked;
    const directionOption =
      document.getElementById("direction-checkbox").checked;

    const matrixInput = document.getElementById("matrix-input").value;

    let matrix;
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
