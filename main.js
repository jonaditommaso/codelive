import './style.css';
import Split from 'split-grid';
import { encode, decode } from 'js-base64';

const $ = selector => document.querySelector(selector);

Split({
    columnGutters: [{
        track: 1,
        element: $('.vertical-gutter'),
    }],
    rowGutters: [{
        track: 1,
        element: $('.horizontal-gutter'),
    }]
});


const $html = $('#html');
const $css = $('#css');
const $js = $('#js');

function init () {
  const { pathname } = window.location;
  const [ baseHtml, baseCss, baseJs ] = pathname.slice(1).split('%7C');

  const html = decode(baseHtml);
  const css = decode(baseCss);
  const js = decode(baseJs);

  $html.value = html;
  $css.value = css;
  $js.value = js;

  const htmlForPreview = createHtml({ html, css, js });
  $('iframe').setAttribute('srcdoc', htmlForPreview);
}

const update = () => {
  const html = $html.value;
  const css = $css.value;
  const js = $js.value;

  const hashedCode = `${encode(html)}|${encode(css)}|${encode(js)}`;
  window.history.replaceState(null, null, `/${hashedCode}`);


  const htmlForPreview = createHtml({ html, css, js });
  $('iframe').setAttribute('srcdoc', htmlForPreview);
}

$html.addEventListener('input', update);
$css.addEventListener('input', update);
$js.addEventListener('input', update);


const createHtml = ({ html, css, js }) => {

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <style>
        ${css}
      </style>
    </head>
    <body>
      ${html}
      <script>
        ${js}
      </script>
    </body>
  </html>
  `
};

init();