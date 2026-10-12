/* Keep relative chart data URLs working from the GitHub Pages root. */
function resolveDataURLs(value, base) {
  if (!value || typeof value !== 'object') return;
  if (typeof value.url === 'string') value.url = new URL(value.url, base).href;
  Object.values(value).forEach(child => resolveDataURLs(child, base));
}
// Include local datasets in the specification sent to the online editor.
// Cache file contents so shared map geometry is only fetched once.
const editorDataFiles = new Map();
async function inlineLocalData(value, origin) {
  if (!value || typeof value !== 'object') return;
  if (typeof value.url === 'string') {
    const url = new URL(value.url);
    if (url.origin === origin) {
      if (!editorDataFiles.has(url.href)) {
        editorDataFiles.set(url.href, fetch(url.href).then(response => {
          if (!response.ok) throw new Error(`Data file returned ${response.status}: ${url.pathname}`);
          return response.text();
        }));
      }
      const contents = await editorDataFiles.get(url.href);
      if (url.pathname.endsWith('.csv')) {
        value.values = vega.read(contents, {...value.format, type: 'csv', parse: value.format?.parse ?? 'auto'});
        delete value.format;
      } else {
        value.values = JSON.parse(contents);
      }
      delete value.url;
    }
  }
  await Promise.all(Object.values(value).map(child => inlineLocalData(child, origin)));
}
// Present explanatory notes consistently in HTML, outside the scaled chart.
function extractNotes(spec) {
  const notes = [];
  function visit(view) {
    if (view.layer) {
      const layers = view.layer;
      for (let i = layers.length - 2; i >= 0; i--) {
        if (layers[i].mark?.type === 'rect' && layers[i].mark.fill === '#EDF4EF' && layers[i + 1]?.mark?.type === 'text') {
          const text = layers[i + 1].encoding?.text?.value;
          if (text) notes.push(Array.isArray(text) ? text.join(' ') : text);
          layers.splice(i, 2);
        }
      }
    }
    ['hconcat', 'vconcat'].forEach(key => (view[key] || []).forEach(visit));
  }
  visit(spec);
  if (spec.marks) {
    const index = spec.marks.findIndex(mark => mark.name === 'context_note');
    if (index >= 0) {
      const text = spec.marks[index].encode.enter.text.value;
      notes.push(Array.isArray(text) ? text.join(' ') : text);
      if (spec.marks[index - 1]?.type === 'rect' && spec.marks[index - 1].encode?.enter?.fill?.value === '#EDF4EF') spec.marks.splice(index - 1, 2);
      else spec.marks.splice(index, 1);
      spec.padding.bottom = 55;
    }
  }
  return notes;
}
async function renderChart(number) {
  const host = document.getElementById(`vis${number}`);
  try {
    const url = new URL(`js/charts/vis${number}.vg.json`, document.baseURI);
    const response = await fetch(url, {cache: 'no-cache'});
    if (!response.ok) throw new Error(`Chart specification returned ${response.status}`);
    const spec = await response.json();
    resolveDataURLs(spec, url);
    await inlineLocalData(spec, url.origin);
    // Use one type scale for ordinary chart text; preserve large pictogram figures.
    function standardiseText(value) {
      if (!value || typeof value !== 'object') return;
      for (const [key, child] of Object.entries(value)) {
        if (key === 'font') {
          if (typeof child === 'string') value[key] = 'DM Sans';
          else if (child && typeof child === 'object' && typeof child.value === 'string') child.value = 'DM Sans';
        }
        else if (['labelFontSize', 'subtitleFontSize'].includes(key)) value[key] = 12;
        else if (key === 'titleFontSize') value[key] = 13;
        else if (key === 'fontSize') {
          if (typeof child === 'number' && child < 16) value[key] = 12;
          else if (child && typeof child === 'object' && typeof child.value === 'number' && child.value < 16) child.value = 12;
        }
        standardiseText(child);
      }
    }
    standardiseText(spec);
    // Smooth quantitative colour ramps in perceptual colour space.
    function perceptualScales(value) {
      if (!value || typeof value !== 'object') return;
      const scale = value.scale;
      if (scale && Array.isArray(scale.range) && scale.range.every(c => typeof c === 'string' && c.startsWith('#')) && value.type === 'quantitative') scale.interpolate = 'lab';
      Object.values(value).forEach(perceptualScales);
    }
    perceptualScales(spec);
    spec.config = {...spec.config, font: 'DM Sans', axis: {...spec.config?.axis, labelFontSize: 12, titleFontSize: 13, gridColor: '#E9ECE7', gridOpacity: 0.65}, legend: {...spec.config?.legend, labelFontSize: 12, titleFontSize: 13}};
    const notes = extractNotes(spec);
    if (number === 10 || number === 11) spec.padding.top = 10;
    if (number === 11) {
      spec.height = 515;
      spec.padding.bottom = 0;
    }
    if (number === 5) {
      spec.height = 360;
      spec.padding = {top: 10, left: 0, right: 15, bottom: 0};
    }
    if (number === 2 || number === 3) {
      spec.width = number === 2 ? 280 : 420;
      if (number === 2) spec.height = 290;
      if (number === 3) {
        spec.height = 325;
        spec.layer.forEach(layer => {
          if (layer.encoding?.y?.scale?.domain) layer.encoding.y.scale.domain = [325, 0];
        });
      }
      spec.layer = spec.layer.filter(layer => {
        const text = layer.encoding?.text?.value;
        if (typeof text === 'string' && (text.startsWith('1990 baseline:') || text.startsWith('Icons show approximate ratios;'))) {
          notes.unshift(text);
          return false;
        }
        return true;
      });
      const wrap = (text, limit) => {
        const lines = []; let line = '';
        for (const word of text.split(' ')) {
          if ((line + ' ' + word).trim().length > limit && line) { lines.push(line); line = word; }
          else line = (line + ' ' + word).trim();
        }
        if (line) lines.push(line);
        return lines;
      };
      spec.title.text = wrap(spec.title.text, 35);
      spec.title.subtitle = wrap(Array.isArray(spec.title.subtitle) ? spec.title.subtitle.join(' ') : spec.title.subtitle, 55);
      spec.title.fontSize = 18;
      spec.title.subtitleFontSize = 12;
    }
    const accessibleTitle = Array.isArray(spec.title.text) ? spec.title.text.join(' ') : spec.title.text;
    host.replaceChildren();
    if (number >= 1 && number <= 11) {
      const heading = document.createElement('div');
      heading.className = number === 2 || number === 3 ? 'paired-chart-heading' : 'aligned-chart-heading';
      const title = document.createElement('h3');
      title.textContent = Array.isArray(spec.title.text) ? spec.title.text.join(' ') : spec.title.text;
      const subtitle = document.createElement('p');
      subtitle.textContent = Array.isArray(spec.title.subtitle) ? spec.title.subtitle.join(' ') : spec.title.subtitle;
      heading.append(title, subtitle);
      host.insertAdjacentElement('beforebegin', heading);
      delete spec.title;
    }
    const result = await vegaEmbed(host, spec, {renderer: 'svg', actions: true, tooltip: true});
    const svg = host.querySelector('svg');
    if (svg) {
      const width = Number(svg.getAttribute('width'));
      let height = Number(svg.getAttribute('height'));
      if (number === 5) {
        const marks = Array.from(svg.querySelectorAll('g.mark-rect, g.mark-text, g.mark-symbol, g.mark-rule'));
        const bottom = Math.max(...marks.map(mark => {
          const bounds = mark.getBBox();
          return bounds.y + bounds.height;
        }));
        if (Number.isFinite(bottom)) height = Math.min(height, Math.ceil(bottom + spec.padding.top + 8));
        svg.setAttribute('height', height);
      }
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
      svg.style.width = '100%';
      svg.style.height = 'auto';
      svg.setAttribute('role', 'img');
      svg.setAttribute('aria-label', accessibleTitle);
    }
    if (notes.length) {
      const group = document.createElement('div');
      group.className = 'annotation-group';
      // Put the contextual explanation first and the baseline/icon note second.
      notes.slice().reverse().forEach(text => {
        const note = document.createElement('aside');
        note.className = 'annotation-note';
        note.textContent = text;
        group.append(note);
      });
      host.insertAdjacentElement('afterend', group);
    }
    host.setAttribute('aria-busy', 'false');
    return result;
  } catch (error) {
    host.replaceChildren();
    const message = document.createElement('p');
    message.className = 'chart-error';
    message.textContent = `Chart ${number} could not load. Please refresh or check your connection.`;
    host.append(message);
    host.setAttribute('aria-busy', 'false');
    console.error(`Chart ${number}:`, error);
  }
}
window.addEventListener('DOMContentLoaded', () => {
  window.chartResults = Promise.all(Array.from({length: 11}, (_, i) => renderChart(i + 1)));
});
