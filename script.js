/* ============================================================
   osmartinez.dev — script
   Tema · paleta · idioma (ES/EN) · scroll suave · reveal
   Preferencias persistidas en localStorage (con try/catch).
   ============================================================ */

const store = {
  get(k){ try{ return localStorage.getItem(k) }catch(e){ return null } },
  set(k,v){ try{ localStorage.setItem(k,v) }catch(e){} }
};
const root = document.documentElement;

/* THEME */
const savedTheme = store.get('theme') || 'dark';
root.setAttribute('data-theme', savedTheme);
document.getElementById('theme').addEventListener('click', () => {
  const t = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', t); store.set('theme', t);
});

/* PALETA */
const PALS = ['indigo','cobalto','esmeralda','amber'];
const palBtn = document.getElementById('palBtn'), palMenu = document.getElementById('palMenu');
function setPalette(p){
  if(!PALS.includes(p)) p = 'indigo';
  root.setAttribute('data-palette', p); store.set('palette', p);
  palMenu.querySelectorAll('.pal-opt').forEach(o => o.setAttribute('aria-checked', o.dataset.pal === p));
}
setPalette(store.get('palette') || 'indigo');
palBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const open = palMenu.classList.toggle('open');
  palBtn.setAttribute('aria-expanded', open);
});
palMenu.querySelectorAll('.pal-opt').forEach(o => o.addEventListener('click', () => {
  setPalette(o.dataset.pal);
  palMenu.classList.remove('open'); palBtn.setAttribute('aria-expanded', false);
}));
document.addEventListener('click', (e) => {
  if(!palMenu.contains(e.target) && e.target !== palBtn){ palMenu.classList.remove('open'); palBtn.setAttribute('aria-expanded', false) }
});
document.addEventListener('keydown', (e) => { if(e.key === 'Escape'){ palMenu.classList.remove('open'); palBtn.setAttribute('aria-expanded', false) } });

/* I18N */
const dict = {
  es:{nav_xp:"Trabajo destacado",nav_serv:"Servicios",nav_about:"Sobre mí",nav_cta:"Hablemos",pal_title:"// paleta",
    aria_pal:"Cambiar paleta de color",aria_theme:"Cambiar tema claro u oscuro",aria_menu:"Abrir menú",
    meta_desc:"Ingeniero de software senior con más de 8 años construyendo apps móviles y web de alto tráfico. React Native, React, Node.js y .NET. Disponible para proyectos freelance.",
    hero_status:"Disponible para nuevos proyectos",
    hero_h1:"Construyo apps que usan <em>millones</em> de personas.",
    hero_lead:"Soy Oscar Martínez, ingeniero de software senior con más de 8 años construyendo apps web y móviles usadas por millones —Spin by OXXO, Aeroméxico—. Ayudo a empresas a llevar su producto de la idea a producción, con código que aguanta el mundo real.",
    hero_cta1:"Hablemos de tu proyecto →",hero_cta2:"Ver experiencia",
    meta1:"años de experiencia",meta2b:"Millones",meta2:"de usuarios alcanzados",meta3:"móvil · web · cloud",
    exp_eyebrow:"// trabajo destacado",exp_head:"Productos que he ayudado a construir.",xp_via:"vía",tab_biz:"Negocio",tab_tech:"Técnico",
    xp1_when:"2025 — actualidad",xp1_biz:"La nueva app de Aeroméxico es como millones de pasajeros en México y LATAM reservan, hacen check-in y viajan. Construyo las pantallas y componentes reutilizables que mantienen esa experiencia rápida y confiable a escala enterprise.",xp1_tech:"React Native con TypeScript, integrando microservicios y APIs de backend en una arquitectura distribuida. Estándares estrictos de código, optimización de rendimiento y arquitectura limpia de nivel enterprise.",
    xp2_when:"2025 · Freelance",xp2_biz:"Una empresa de contratistas manejaba toda su operación en hojas de cálculo — ciudades, materiales y medidores, dispersos y a mano. Les construí un ERP a medida desde cero que lo centraliza todo, para que su equipo deje de perder horas en seguimiento manual y trabaje desde una sola fuente de verdad.",xp2_tech:"Backend .NET 7 con SQL Server y una PWA React mobile-first (Tailwind). Autenticación JWT, almacenamiento en AWS S3 y módulos de administración para ciudades, materiales y medidores. Desplegado en QA y producción en Ubuntu con Nginx, HTTPS (Let's Encrypt) y pipelines CI/CD.",
    xp3_when:"2023 — 2025",xp3_biz:"Spin Premia y Spin by OXXO son apps fintech usadas por millones en México — lealtad, pagos y recompensas. Ayudé a construir y mantener las funciones que mantienen esas apps confiables para una base de usuarios enorme.",xp3_tech:"React Native, Redux y TypeScript, con TDD en Jest y 85%+ de cobertura por pull request. Releases de QA y producción gestionados con Firebase, bajo SCRUM con sprints quincenales.",
    xp4_when:"2021 — 2023",xp4_biz:"Para Sumitomo Corporation, una empresa global, ayudé a entregar aplicaciones web internas que agilizan cómo trabajan sus equipos — construidas 100% en remoto junto a stakeholders de EE. UU., en inglés.",xp4_tech:"React, Redux, TypeScript y DevExpress en el front, servicios en SQL Server en el back, con TDD en Jest. Desplegado en Microsoft Azure, colaborando en equipos ágiles a través de zonas horarias.",
    xp5_when:"2019 — 2021",xp5_biz:"Terminal Logistics mueve grandes volúmenes de carga, y su operación corre sobre software a medida. Lideré el desarrollo de las herramientas logísticas que mantienen ese flujo funcionando, día tras día.",xp5_tech:"React, React Native, Redux, Node.js y C#/.NET, gestionando bases de datos SQL Server y MongoDB pensadas para operaciones logísticas de alto volumen.",
    serv_eyebrow:"// qué construyo",serv_head:"Del problema al producto que aguanta producción.",
    serv1_t:"Apps móviles",serv1_d:"Apps iOS y Android con React Native, del prototipo a la tienda. La misma base con la que construí productos usados por millones.",
    serv2_t:"Aplicaciones web full-stack",serv2_d:"Front y back a medida con React/Next.js y Node.js o .NET. Arquitectura limpia y código con pruebas, no prototipos frágiles.",
    serv3_t:"Sistemas a medida y ERPs",serv3_d:"Sistemas internos, ERPs y paneles que automatizan tu operación — como el ERP que construí de cero, punta a punta, para un cliente.",
    serv4_t:"APIs, integraciones y cloud",serv4_d:"APIs REST, integraciones con terceros y despliegue en AWS o Azure con CI/CD. Todo entregado listo para producción.",
    about_eyebrow:"// sobre mí",about_head:"No solo escribo código. Entrego productos que funcionan.",
    about_p1:"Soy ingeniero de software senior con más de <strong>8 años construyendo aplicaciones móviles y web de alto tráfico</strong>. He entregado productos usados por millones de personas —Spin by OXXO, Aeroméxico— y sistemas a medida de punta a punta como freelance.",
    about_p2:"Trabajo con <strong>TDD (85%+ de cobertura)</strong>, arquitectura limpia y flujos de desarrollo aumentados con IA. Llevo más de dos años colaborando a diario con equipos de EE.UU. en entornos 100% remotos y en inglés.",
    about_p3:"Si necesitas una app, un sistema a medida o mejorar un producto existente, puedo ayudarte de principio a fin.",
    contact_eyebrow:"// contacto",contact_head:"¿Construimos <em>algo?</em>",
    contact_p:"Cuéntame qué tienes en mente. Respondo a todos los mensajes y, si no soy la persona indicada para tu proyecto, te lo diré con honestidad.",
    contact_loc:"Monterrey, México · Disponible en remoto"},
  en:{nav_xp:"Selected work",nav_serv:"Services",nav_about:"About",nav_cta:"Let's talk",pal_title:"// palette",
    aria_pal:"Change color palette",aria_theme:"Toggle light or dark theme",aria_menu:"Open menu",
    meta_desc:"Senior software engineer with 8+ years building high-traffic mobile and web apps. React Native, React, Node.js and .NET. Available for freelance projects.",
    hero_status:"Available for new projects",
    hero_h1:"I build apps used by <em>millions</em>.",
    hero_lead:"I'm Oscar Martínez, a senior software engineer with 8+ years building web and mobile apps used by millions — Spin by OXXO, Aeroméxico. I help businesses take their product from idea to production, with code that holds up in the real world.",
    hero_cta1:"Let's talk about your project →",hero_cta2:"See experience",
    meta1:"years of experience",meta2b:"Millions",meta2:"of users reached",meta3:"mobile · web · cloud",
    exp_eyebrow:"// selected work",exp_head:"Products I've helped build.",xp_via:"via",tab_biz:"Business",tab_tech:"Technical",
    xp1_when:"2025 — present",xp1_biz:"Aeroméxico's new mobile app is how millions of passengers across Mexico and LATAM book, check in and travel. I build the screens and reusable components that keep that experience fast and reliable at enterprise scale.",xp1_tech:"React Native with TypeScript, integrating microservices and backend APIs across a distributed architecture. Strict code standards, performance optimization and clean architecture required for enterprise-level reliability.",
    xp2_when:"2025 · Freelance",xp2_biz:"A contracting company was running its whole operation on spreadsheets — cities, materials and meter data, scattered and manual. I built them a custom ERP from scratch that centralizes it into one place, so their team stops losing hours to manual tracking and works from a single source of truth.",xp2_tech:".NET 7 backend with SQL Server and a mobile-first React PWA (Tailwind). JWT authentication, AWS S3 storage, and admin modules for cities, materials and meters. Deployed to QA and production on Ubuntu with Nginx, HTTPS (Let's Encrypt) and CI/CD pipelines.",
    xp3_when:"2023 — 2025",xp3_biz:"Spin Premia and Spin by OXXO are fintech apps used by millions across Mexico — loyalty, payments and rewards. I helped build and maintain the features that keep those apps dependable for a massive daily user base.",xp3_tech:"React Native, Redux and TypeScript, with TDD in Jest at 85%+ coverage per pull request. QA and production releases managed through Firebase, following SCRUM with bi-weekly sprints.",
    xp4_when:"2021 — 2023",xp4_biz:"For Sumitomo Corporation, a global enterprise, I helped deliver internal web applications that streamline how their teams work — built fully remotely alongside US stakeholders, in English.",xp4_tech:"React, Redux, TypeScript and DevExpress on the front, SQL Server services on the back, with TDD in Jest. Deployed to Microsoft Azure, collaborating in Agile teams across time zones.",
    xp5_when:"2019 — 2021",xp5_biz:"Terminal Logistics moves high volumes of freight, and their operation runs on custom software. I led development of the logistics tools that keep that throughput flowing, day in and day out.",xp5_tech:"React, React Native, Redux, Node.js and C#/.NET, managing SQL Server and MongoDB databases built for high-throughput logistics operations.",
    serv_eyebrow:"// what I build",serv_head:"From the problem to a product that survives production.",
    serv1_t:"Mobile apps",serv1_d:"iOS and Android apps with React Native, from prototype to store. The same foundation I used to build products used by millions.",
    serv2_t:"Full-stack web apps",serv2_d:"Custom front and back with React/Next.js and Node.js or .NET. Clean architecture and tested code, not fragile prototypes.",
    serv3_t:"Custom systems & ERPs",serv3_d:"Internal systems, ERPs and dashboards that automate your operation — like the ERP I built from scratch, end-to-end, for a client.",
    serv4_t:"APIs, integrations & cloud",serv4_d:"REST APIs, third-party integrations and deployment on AWS or Azure with CI/CD. Everything delivered production-ready.",
    about_eyebrow:"// about me",about_head:"I don't just write code. I ship products that work.",
    about_p1:"I'm a senior software engineer with <strong>8+ years building high-traffic mobile and web applications</strong>. I've shipped products used by millions —Spin by OXXO, Aeroméxico— and delivered custom systems end-to-end as a freelancer.",
    about_p2:"I work with <strong>TDD (85%+ coverage)</strong>, clean architecture and AI-augmented development workflows. For 2+ years I've collaborated daily with US teams in fully remote, English-speaking environments.",
    about_p3:"If you need an app, a custom system or to improve an existing product, I can help you end to end.",
    contact_eyebrow:"// contact",contact_head:"Let's build <em>something?</em>",
    contact_p:"Tell me what you have in mind. I reply to every message and, if I'm not the right person for your project, I'll tell you honestly.",
    contact_loc:"Monterrey, Mexico · Available remotely"}
};

function applyLang(l){
  root.lang = l;
  document.querySelectorAll('[data-i18n]').forEach(el => { const k = el.getAttribute('data-i18n'); if(dict[l][k] != null) el.textContent = dict[l][k] });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { const k = el.getAttribute('data-i18n-html'); if(dict[l][k] != null) el.innerHTML = dict[l][k] });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => { const k = el.getAttribute('data-i18n-aria'); if(dict[l][k] != null) el.setAttribute('aria-label', dict[l][k]) });
  const md = document.querySelector('meta[name="description"]'); if(md && dict[l].meta_desc) md.setAttribute('content', dict[l].meta_desc);
  document.getElementById('lang').textContent = (l === 'es' ? 'EN' : 'ES');
  document.title = (l === 'es' ? "Oscar Martínez — Ingeniero de Software Senior" : "Oscar Martínez — Senior Mobile & Fullstack Engineer");
}
let lang = store.get('lang') || 'en'; applyLang(lang);
document.getElementById('lang').addEventListener('click', () => { lang = lang === 'es' ? 'en' : 'es'; store.set('lang', lang); applyLang(lang) });

/* TABS (Negocio/Técnico por rol) — patrón ARIA tabs; cada tablist se cablea
   por separado. El texto de ambos paneles lo mantiene applyLang (los ocultos
   siguen en el DOM, así que también se traducen y quedan indexables). */
document.querySelectorAll('.xp-tablist').forEach(list => {
  const tabs = Array.from(list.querySelectorAll('[role="tab"]'));
  function select(tab){
    tabs.forEach(t => {
      const on = t === tab;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      if(panel) panel.hidden = !on;
    });
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', e => {
      let n = null;
      if(e.key === 'ArrowRight') n = (i + 1) % tabs.length;
      else if(e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
      else if(e.key === 'Home') n = 0;
      else if(e.key === 'End') n = tabs.length - 1;
      if(n !== null){ e.preventDefault(); select(tabs[n]); tabs[n].focus(); }
    });
  });
});

/* MISC */
document.getElementById('year').textContent = new Date().getFullYear();
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 12); onScroll();
window.addEventListener('scroll', onScroll, {passive:true});

const burger = document.getElementById('burger'), menu = document.getElementById('menu');
burger.addEventListener('click', () => { const o = menu.classList.toggle('open'); burger.classList.toggle('open', o); burger.setAttribute('aria-expanded', o) });
function closeMenu(){ menu.classList.remove('open'); burger.classList.remove('open'); burger.setAttribute('aria-expanded', false) }

const rm = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', (e) => {
  const id = a.getAttribute('href');
  const target = id.length > 1 ? document.querySelector(id) : null;
  if(target){ e.preventDefault(); const y = target.getBoundingClientRect().top + window.pageYOffset - 76; window.scrollTo({top:Math.max(0,y), behavior: rm ? 'auto' : 'smooth'}) }
  closeMenu();
}));

const io = new IntersectionObserver((ents) => { ents.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target) } }) }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
