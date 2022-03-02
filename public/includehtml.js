function includeHTML() {
  var z, i, elmnt, file, xhttp;
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    file = elmnt.getAttribute("include-html");
    if (file) {
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          elmnt.removeAttribute("include-html");
          // load embedded stylesheets
          let styles = elmnt.querySelectorAll("style");
          if (styles.length > 0) {
            let style = document.createElement("style");
            style.setAttribute('type', 'text/css');
            style.innerHTML = styles[0].innerText;
            document.head.appendChild(style);
          }
          // load embedded scripts
          let scripts = elmnt.querySelectorAll("script");
          if (scripts.length > 0) {
            let script = document.createElement("script");
            script.type = 'text/javascript';
            script.text = scripts[0].text;
            document.body.appendChild(script);

          }
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      return;
    }
  }
}
