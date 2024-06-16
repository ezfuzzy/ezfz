const jsonRadio = document.getElementById("json-radio");
const stringRadio = document.getElementById("string-radio");
const inputTip = document.getElementById("input-tip");
const matrixInputTextarea = document.getElementById("matrix-input");
const graphTip = document.getElementById("graph-tip");

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

    graphTip.style.display = "block";
    const matrixInput = document.getElementById("matrix-input").value;

    let matrix;

    if (jsonRadio.checked) {
      // JSON input
      try {
        matrix = JSON.parse(matrixInput);
      } catch (e) {
        alert("Invalid JSON format. Please enter a valid adjacency matrix.");
        return;
      }
    } else {
      const rows = matrixInput.trim().split("\n");

      matrix = rows
        .map((row) => {
          const rowData = row
            .trim()
            .split(" ")
            .map((num) => {
              const parsed = Number(num); // -> returns NaN if not a number
              return isNaN(parsed) ? 0 : parsed; // 행렬이 숫자로만 구성되게 보장
            });

          return rowData;
        })
        .filter((row) => row.length > 0); // 빈 행 제거
      // 최대 열 길이 구하기
      const maxLength = Math.max(...matrix.map((row) => row.length));

      // 각 행의 길이를 최대 열 길이에 맞추고 부족한 부분은 0으로 채우기
      // > format 지키기 위해 (큰 의미 x)
      matrix = matrix.map((row) => {
        while (row.length < maxLength) {
          row.push(0);
        }
        return row;
      });

      console.log(matrix);
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
