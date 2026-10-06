const searchInput = document.getElementById("search-bar",);
const suggestions = document.getElementById("suggestions",);
const homeLogo = document.getElementById("home-logo");

const response = await fetch("/entries.json");
const entries = await response.json();

// Listen for typing
searchInput?.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  suggestions.innerHTML = "";

  if (!query) return;

  const matches = entries.filter((e) =>
    e.title.toLowerCase().includes(query)
  );

  if (matches.length > 0) {
    for (const match of matches) {
      const li = document.createElement("li");
      const link = document.createElement("a");
  
      link.href = match.url;
      link.textContent = match.title;
  
      li.appendChild(link);
      suggestions.appendChild(li);
  
      // Clear search bar when you enter to another page
      link.addEventListener("click", () => {
        suggestions.innerHTML = "";
        searchInput.value = "";
      });
    }
  }
  else {
    const li = document.createElement("li");
    li.textContent = "No se encontraron resultados";
    li.className = "empty";
    suggestions.appendChild(li);
  }
});

// Close suggestions if you click outside
document.addEventListener("click", (event) => {
  const isClickInside = 
  searchInput.contains(event.target) ||
  suggestions.contains(event.target);

  if (!isClickInside) {
    suggestions.innerHTML = "";
  }
});

homeLogo?.addEventListener("click", () => {
  location.href = "/";
});
