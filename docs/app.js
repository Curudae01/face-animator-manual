const root=document.documentElement;
const themeButton=document.getElementById("themeButton");
const menuButton=document.getElementById("menuButton");
const sidebar=document.getElementById("sidebar");
const searchInput=document.getElementById("searchInput");
const noResults=document.getElementById("noResults");
const languageDropdown=document.getElementById("languageDropdown");
const languageButton=document.getElementById("languageButton");
const languageMenu=document.getElementById("languageMenu");
const currentLanguageFlag=document.getElementById("currentLanguageFlag");
const currentLanguageCode=document.getElementById("currentLanguageCode");

const languageFlags={
  es:"./assets/flags/es.svg",
  en:"./assets/flags/gb.svg",
  pt:"./assets/flags/pt.svg",
  de:"./assets/flags/de.svg",
  fr:"./assets/flags/fr.svg",
  ja:"./assets/flags/jp.svg"
};
const languageLabels={
  es:"ES",
  en:"EN",
  pt:"PT",
  de:"DE",
  fr:"FR",
  ja:"日本語"
};

const uiText={
  es:{copy:"Copiar",copied:"✓ Copiado",unavailable:"No disponible",light:"Cambiar a modo claro",dark:"Cambiar a modo oscuro"},
  en:{copy:"Copy",copied:"✓ Copied",unavailable:"Unavailable",light:"Switch to light mode",dark:"Switch to dark mode"},
  pt:{copy:"Copiar",copied:"✓ Copiado",unavailable:"Indisponível",light:"Mudar para modo claro",dark:"Mudar para modo escuro"},
  de:{copy:"Kopieren",copied:"✓ Kopiert",unavailable:"Nicht verfügbar",light:"Zum hellen Modus wechseln",dark:"Zum dunklen Modus wechseln"},
  fr:{copy:"Copier",copied:"✓ Copié",unavailable:"Indisponible",light:"Passer au mode clair",dark:"Passer au mode sombre"},
  ja:{copy:"コピー",copied:"✓ コピー済み",unavailable:"利用できません",light:"ライトモードに切り替え",dark:"ダークモードに切り替え"}
};
const currentLanguage=root.dataset.language||root.lang||"es";
const technicalLanguage=currentLanguage==="es"?"es":"en";
root.dataset.technicalLanguage=technicalLanguage;
const labels=uiText[currentLanguage]||uiText.es;

function syncLanguageDropdown(){
  if(!languageButton||!languageMenu) return;

  if(currentLanguageFlag){
    currentLanguageFlag.src=languageFlags[currentLanguage]||languageFlags.es;
  }
  if(currentLanguageCode){
    currentLanguageCode.textContent=languageLabels[currentLanguage]||"ES";
  }

  languageMenu.querySelectorAll("[data-lang]").forEach(link=>{
    const active=link.dataset.lang===currentLanguage;
    link.classList.toggle("active",active);
    if(active){
      link.setAttribute("aria-current","page");
    }else{
      link.removeAttribute("aria-current");
    }
  });
}

syncLanguageDropdown();

if(languageButton&&languageMenu){
  languageButton.addEventListener("click",event=>{
    event.stopPropagation();
    const open=!languageMenu.classList.contains("open");
    languageMenu.classList.toggle("open",open);
    languageButton.setAttribute("aria-expanded",open?"true":"false");
  });

  languageMenu.addEventListener("click",event=>{
    event.stopPropagation();
  });

  document.addEventListener("click",()=>{
    languageMenu.classList.remove("open");
    languageButton.setAttribute("aria-expanded","false");
  });

  document.addEventListener("keydown",event=>{
    if(event.key==="Escape"){
      languageMenu.classList.remove("open");
      languageButton.setAttribute("aria-expanded","false");
      languageButton.focus();
    }
  });
}

const progress=document.createElement("div");
progress.className="scroll-progress";
document.body.prepend(progress);

const savedTheme=localStorage.getItem("face-animator-theme");
if(savedTheme==="dark"||savedTheme==="light"){
  root.dataset.theme=savedTheme;
}

function syncThemeButton(){
  themeButton.textContent=root.dataset.theme==="dark"?"☀":"◐";
  themeButton.setAttribute(
    "aria-label",
    root.dataset.theme==="dark"?labels.light:labels.dark
  );
}
syncThemeButton();

themeButton.addEventListener("click",()=>{
  const next=root.dataset.theme==="dark"?"light":"dark";
  root.dataset.theme=next;
  localStorage.setItem("face-animator-theme",next);
  syncThemeButton();
});

if(menuButton){
  menuButton.addEventListener("click",()=>{
    sidebar.classList.toggle("open");
  });
}

sidebar.querySelectorAll("a").forEach(a=>{
  a.addEventListener("click",()=>sidebar.classList.remove("open"));
});

document.querySelectorAll("pre").forEach(pre=>{
  const button=document.createElement("button");
  button.className="copy-button";
  button.type="button";
  button.textContent=labels.copy;

  button.addEventListener("click",async()=>{
    const code=pre.querySelector("code")?.innerText||pre.innerText;

    try{
      await navigator.clipboard.writeText(code);
      button.textContent=labels.copied;
      setTimeout(()=>button.textContent=labels.copy,1200);
    }
    catch{
      button.textContent=labels.unavailable;
    }
  });

  pre.appendChild(button);
});

document.querySelectorAll(".button").forEach(button=>{
  button.addEventListener("pointermove",event=>{
    const rect=button.getBoundingClientRect();
    button.style.setProperty("--btn-x",(event.clientX-rect.left)+"px");
    button.style.setProperty("--btn-y",(event.clientY-rect.top)+"px");
  });

  button.addEventListener("click",event=>{
    const rect=button.getBoundingClientRect();
    const ripple=document.createElement("span");
    const size=Math.max(rect.width,rect.height)/2+"px";

    ripple.className="ripple";
    ripple.style.left=(event.clientX-rect.left)+"px";
    ripple.style.top=(event.clientY-rect.top)+"px";
    ripple.style.width=size;
    ripple.style.height=size;

    button.appendChild(ripple);
    setTimeout(()=>ripple.remove(),600);
  });
});

const sections=[...document.querySelectorAll(".searchable")];
const navLinks=[...sidebar.querySelectorAll("a[href^='#']")];

const normalize=s=>(s||"")
  .toLocaleLowerCase("es")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g,"");

if(searchInput){
  searchInput.addEventListener("input",()=>{
    const q=normalize(searchInput.value.trim());
    let visible=0;

    sections.forEach(section=>{
      const match=!q||normalize(section.innerText).includes(q);
      section.hidden=!match;
      if(match) visible++;
    });

    noResults.hidden=visible!==0;
  });
}

const observer=new IntersectionObserver(entries=>{
  const visible=entries
    .filter(e=>e.isIntersecting)
    .sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];

  if(!visible) return;

  navLinks.forEach(a=>{
    a.classList.toggle(
      "active",
      a.getAttribute("href")==="#"+visible.target.id
    );
  });
},{
  rootMargin:"-18% 0px -70% 0px",
  threshold:[0,.1,.25,.5,1]
});

document.querySelectorAll("section[id]").forEach(section=>{
  observer.observe(section);
});

function updateProgress(){
  const max=document.documentElement.scrollHeight-window.innerHeight;
  const ratio=max>0?Math.min(1,Math.max(0,window.scrollY/max)):0;
  progress.style.width=(ratio*100)+"%";
}

updateProgress();
window.addEventListener("scroll",updateProgress,{passive:true});
window.addEventListener("resize",updateProgress);

document.addEventListener("click",event=>{
  if(
    window.innerWidth<=900
    && sidebar.classList.contains("open")
    && !sidebar.contains(event.target)
    && event.target!==menuButton
  ){
    sidebar.classList.remove("open");
  }
});
