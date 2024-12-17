document.addEventListener('DOMContentLoaded', function () {
  const textArea = document.getElementById('des');
  const maxCharacters = 1500;  // Set the maximum character count

  // Create the character count message element
  const charCountMessage = document.createElement('p');
  charCountMessage.style.color = 'gray';  // Optional: Apply some basic styles
  charCountMessage.style.fontSize = '14px';  // Optional: Adjust font size
  textArea.parentNode.appendChild(charCountMessage);  // Insert the message below the textarea

  // Initially hide the message
  charCountMessage.style.display = 'none';

  textArea.addEventListener('input', function () {
    const charCount = textArea.value.length;

    // If the character count reaches the maximum, display the message
    if (charCount >= maxCharacters) {
      charCountMessage.style.display = 'block'; // Show the message
      charCountMessage.textContent = "You have entered the maximum of ${ maxCharacters } characters.";
      // Optional: Truncate the input to the maximum character count
      textArea.value = textArea.value.substring(0, maxCharacters);
    } else {
      charCountMessage.style.display = 'none'; // Hide the message if below max characters
    }
  });
});


document.addEventListener('DOMContentLoaded', function () {
  const titleInput = document.getElementById('title');
  const maxTitleLength = 300;  // Set the maximum character count for the title


  titleInput.addEventListener('input', function () {
    const titleLength = titleInput.value.length;

    // If the character count reaches the maximum, display the message
    if (titleLength >= maxTitleLength) {

      // Truncate the input to the maximum character count
      titleInput.value = titleInput.value.substring(0, maxTitleLength);
    }
  });
});

var x, i, j, l, ll, selElmnt, a, b, c;
x = document.getElementsByClassName("buttonBAR");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
document.addEventListener("click", closeAllSelect);