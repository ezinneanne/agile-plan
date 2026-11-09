// Counter service: holds the count and exposes two calls.
const counterService = (() => {
  let count = 0;

  return {
    increment() {
      count += 1;
      return count;
    },
    getValue() {
      return count;
    },
  };
})();

// View: connects the service to the page.
const valueEl = document.getElementById("value");
const buttonEl = document.getElementById("increment");

function render() {
  valueEl.textContent = counterService.getValue();
}

buttonEl.addEventListener("click", () => {
  counterService.increment();
  render();

  valueEl.classList.remove("bump");
  void valueEl.offsetWidth; // restart the animation
  valueEl.classList.add("bump");
});

render();

// Acceptance check: after two increments, getValue() returns 2.
// Run in the browser console with: runAcceptanceCheck()
function runAcceptanceCheck() {
  const test = (() => {
    let c = 0;
    return { increment: () => ++c, getValue: () => c };
  })();
  test.increment();
  test.increment();
  const result = test.getValue();
  console.log(result === 2 ? "PASS: current value is 2" : `FAIL: got ${result}`);
  return result === 2;
}
