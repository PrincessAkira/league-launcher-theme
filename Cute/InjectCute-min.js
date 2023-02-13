const config = require('./cute.theme.config.json');
let backgroundImg = config.background.image;
const UI = {
      Row: (e) => {
         const t = document.createElement('div');
         return (
            t.classList.add('lol-settings-general-row'),
            Array.isArray(e) && e.forEach((e) => t.appendChild(e)),
            t
         );
      },
      Label: (e) => {
         const t = document.createElement('p');
         return (
            t.classList.add('lol-settings-window-size-text'),
            (t.innerText = e),
            t
         );
      },
      Link: (e, t, n) => {
         const c = document.createElement('p');
         c.classList.add('lol-settings-code-of-conduct-link'),
            c.classList.add('lol-settings-window-size-text');
         const o = document.createElement('a');
         return (
            (o.innerText = e),
            (o.target = '_blank'),
            (o.href = t),
            (o.onclick = n || null),
            c.append(o),
            c
         );
      },
      Button: (e, t) => {
         const n = document.createElement('lol-uikit-flat-button-secondary');
         return (
            (n.innerText = e), (n.onclick = t), (n.style.display = 'flex'), n
         );
      },
      Input: (e, t) => {
         const n = document.createElement('lol-uikit-flat-input');
         n.style.marginBottom = '12px';
         const c = document.createElement('input');
         (c.type = 'url'),
            (c.placeholder = e),
            (c.style.width = '200px'),
            (c.name = 'name'),
            (c.oninput = t);
         let o = {
            get value() {
               return c.value;
            },
         };
         return (exports.search = () => o), n.appendChild(c), n;
      },
   },
   injectSettings = (e) => {
      e.prepend(
         UI.Row([
            UI.Link(
               'Cute-Theme',
               'https://github.com/PrincessAkira/league-launcher-theme',
               () => {},
               UI.Button('Open plugins folder', () =>
                  window.openPluginsFolder()
               )
            ),
            UI.Input(backgroundCheck(), () => {
               let e = exports.search().value;
               e.match(/^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|jpeg|png)$/) &&
                  accessCuteThemeCSS(e);
            }),
            UI.Button('Reload theme', () => reloadTheme()),
            document.createElement('br'),
         ])
      );
   };
function backgroundCheck() {
   return checkIfPopulated()
      ? backgroundImg
      : 'https://thicc-thighs.de/stuff/wallpaper.jpg';
}
function checkIfPopulated() {
   return '' != backgroundImg;
}
function accessCuteThemeCSS(e) {
   document.documentElement.style.setProperty(
      '--background',
      `linear-gradient(rgba(22, 22, 22, 0.6), rgba(22, 22, 22, 0.2)), url(${decodeURIComponent(
         e
      )})`
   );
}
function reloadTheme() {
   let e = /thicc-thighs.de*/;
   for (var t = 0; t < document.styleSheets.length; t++)
      -1 != document.styleSheets[t].href.search(e) &&
         (document.styleSheets[t].disabled = !0),
         document
            .getElementsByTagName('body')[0]
            .insertAdjacentHTML(
               'afterbegin',
               '<link rel="stylesheet" href="https://thicc-thighs.de/league-css/Cute/cute.theme-min.css" />'
            ),
         location.reload();
}
window.addEventListener('load', async () => {
   document
      .getElementsByTagName('body')[0]
      .insertAdjacentHTML(
         'afterbegin',
         '<link rel="stylesheet" href="https://thicc-thighs.de/league-css/Cute/cute.theme-min.css" />'
      ),
      checkIfPopulated() && accessCuteThemeCSS(backgroundImg);
   const e = setInterval(() => {
      const t = document.getElementById('lol-uikit-layer-manager-wrapper');
      t &&
         (clearInterval(e),
         new MutationObserver((e) => {
            const t = document.querySelector(
               'div.lol-settings-options > lol-uikit-scrollable'
            );
            t &&
               e.some((e) => Array.from(e.addedNodes).includes(t)) &&
               injectSettings(t);
         }).observe(t, { childList: !0, subtree: !0 }));
   }, 500);
}),
   (exports.UI = UI);
