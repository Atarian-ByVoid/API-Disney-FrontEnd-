document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById("modal");
    var closeBtn = document.getElementById("close-btn");
  
    closeBtn.addEventListener("click", function() {
      modal.style.display = "none";
    });
  
    window.addEventListener("click", function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
  
    modal.style.display = "block";
  });
  