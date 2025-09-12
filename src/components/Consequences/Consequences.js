document.addEventListener("DOMContentLoaded", function () {
  const image = document.getElementById("downloadable-image");

  if (image) {
    image.addEventListener("click", function () {
      const link = document.createElement("a");
      link.href = "/schema-consequences.webp";
      link.download = "schema-consequences-hyperacousie.webp";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
});
