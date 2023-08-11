const deleteBtn = document.getElementById("deleteBtn");
deleteBtn.addEventListener("click", function () {
  const id = this.getAttribute("data-set");
  fetch("http://localhost:5000/posts/delete/" + id, { method: "DELETE" })
    .then(
      (res) => (window.location.href = "http://localhost:5000/posts/dashboard")
    )
    .catch((err) => console.log(err));
});
