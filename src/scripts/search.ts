import type { Entry } from "../../src/lib/data";
// import { entries } from "../../public/entries.json";

export function initSearch() {
  document.addEventListener("DOMContentLoaded", async () => {
    const searchInput = document.getElementById("search-bar",) as HTMLInputElement;
    const suggestions = document.getElementById("suggestions",) as HTMLUListElement;
    const homeLogo = document.getElementById("home-logo") as HTMLImageElement;
    // const main = document.getElementById("main-content") as HTMLElement;

    //
    // const defaultContent = main.innerHTML;

    const response = await fetch("/entries.json");
    const entries: Entry[] = await response.json();
    // console.log(entries);

    // Listen for typing
    searchInput?.addEventListener("input", () => {
      const query = searchInput.value.trim().toLowerCase();
      suggestions.innerHTML = "";
    
      if (!query) return;
    
      const matches = entries.filter((e: Entry) =>
        e.title.toLowerCase().includes(query)
      );

      for (const match of matches) {
        const li = document.createElement("li");
        const link = document.createElement("a");

        link.href = match.url;
        link.textContent = match.title;

        li.appendChild(link);
        suggestions.appendChild(li);
      }

      // V2
      // const matches = entries.map((e: Entry) => {
      //   if (e.title.toLocaleLowerCase().includes(query)) {
      //     return e;
      //   }
      //   return null;
      // });
    
      // V3
      // matches.forEach((match: Entry) => {
      //   if (match && match.url) {
      //     // V1
      //     // const li = document.createElement("li");
      //     // const link = document.createElement("a");
      //     // link.href = match.url;
      //     // link.textContent = match.title;
      //     // li.appendChild(link);
      //     // suggestions.appendChild(li);
    
      //     const li = document.createElement("li");
      //     const link = document.createElement("a");
    
      //     link.href = match.url;
      //     link.textContent = match.title;
    
      //     // V2
      //     // li.textContent = match.title;
      //     // li.style.cursor = "pointer";
      //     // li.addEventListener("click", () => loadEntry(match.url));
    
      //     link.setAttribute("role", "link");
    
      //     li.appendChild(link);
      //     suggestions.appendChild(li);
      //   }
      // });
    });
    // V2
    // function loadEntry(url: string) {
    //   fetch(url)
    //     .then((res) => res.text())
    //     .then((html) => {
    //       main.innerHTML = html;
    //       suggestions.innerHTML = "";
    //       searchInput.value = "";
    //     })
    //     .catch((err) => {
    //       main.innerHTML = "<p>Error cargando el contenido.</p>";
    //     });
    // }
    // loadFrequentQuestions();
    // function loadFrequentQuestions() {
    //   const opt = document.getElementsByClassName("opt") as HTMLCollection;
    //   for (let i = 0; i < opt.length; i++) {
    //     const url = opt.item(i)?.getAttribute("accesskey");
    //     if (url) {
    //       opt.item(i)?.addEventListener("click", () => loadEntry(url));
    //     }
    //     // console.log(opt.item(i)?.getAttribute("href"));
    //   }
    // }
    
    
    // homeLogo.style.cursor = "pointer"; //
    homeLogo?.addEventListener("click", () => {
      // main.innerHTML = defaultContent;
      location.href = "/";
    });
      
    // initSearch();
  });
}
