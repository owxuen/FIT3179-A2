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
// Emphasise a few subjects, dates and figures without changing the wording.
const emphasisPattern = /(A\$[\d,]+(?:\.\d+)?(?:\s+(?:million|billion))?|[+−]?\d[\d,]*(?:\.\d+)?(?:%|×|\s+(?:million|billion|ML|tonnes|litres))|(?:19|20)\d{2}(?:[–-]\d{2})?|national milk production|milk output per cow|output per cow|milk production|cow numbers|farm numbers|survey averages|farm businesses|herd size|milk output per farm|seasonal calendar|industry scale|different units|export volumes?|export values?|value per tonne|overseas sales value|consumption per person|domestic consumption|dairy industry|far fewer farms|larger herds|recent production|products sold|percentage declines|absolute losses|\b100\b|baseline|South Australia|New South Wales|Western Australia|Greater China|Queensland|Victoria|Tasmania|Indonesia|Singapore|Japan|July–June|yoghurt category)/gi;
function emphasizeText(element, text, limit = 5) {
  const matches = Array.from(text.matchAll(emphasisPattern));
  const kind = match => /^(?:19|20)\d{2}(?:[–-]\d{2})?$/.test(match[0]) ? 'period' : /\d/.test(match[0]) ? 'value' : 'subject';
  const chosen = [];
  const seen = new Set();
  const take = (type, maximum) => {
    let count = 0;
    for (const match of matches) {
      const key = match[0].toLowerCase();
      if (kind(match) !== type || seen.has(key) || count >= maximum || chosen.length >= limit) continue;
      chosen.push(match); seen.add(key); count++;
    }
  };
  take('value', 3); take('subject', 1); take('period', 1);
  let offset = 0;
  for (const match of chosen.sort((a, b) => a.index - b.index)) {
    element.append(document.createTextNode(text.slice(offset, match.index)));
    const strong = document.createElement('strong');
    strong.className = 'emphasis-' + kind(match);
    strong.textContent = match[0];
    element.append(strong);
    offset = match.index + match[0].length;
  }
  element.append(document.createTextNode(text.slice(offset)));
}
function emphasizePageParagraphs() {
  document.querySelectorAll('main p:not(.chart-status)').forEach(paragraph => {
    // Source links and existing metadata emphasis retain their original markup.
    if (paragraph.childElementCount) return;
    const text = paragraph.textContent;
    paragraph.replaceChildren();
    emphasizeText(paragraph, text);
  });
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
    if (number === 5) {
      const intro = host.parentElement.querySelector('.chart-intro');
      const context = intro && intro.querySelector('p');
      if (context) notes.push(context.textContent);
      if (intro) intro.remove();
    }

    if (number === 6) {
      // Keep computed annotation text available for the live HTML sidebar.
      for (const layer of spec.layer) {
        if (layer.encoding?.text?.field === 'comparison_note') {
          layer.mark.opacity = 0;
          layer.encoding.x = {value: 0};
          layer.encoding.y = {value: 0};
        }
      }
      // The map's legends share the page's right-hand text column.
      for (const layer of spec.layer) {
        if (layer.encoding?.size) layer.encoding.size.legend = null;
        if (layer.encoding?.color) layer.encoding.color.legend = null;
      }
    }
    if (number === 7) {
      for (const layer of spec.layer) {
        if (layer.encoding?.color?.field === 'milk_production_ml') layer.encoding.color.legend = null;
      }
      spec.layer = spec.layer.filter(layer => layer.encoding?.text?.value !== 'October 2024: 945 ML — the 2024–25 peak');
    }
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
        if (typeof text === 'string' && (text.startsWith('1990 baseline:') || text.startsWith('Icons show approximate ratios;') || text.startsWith('These farm averages imply about 67% more milk per cow;'))) {
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
      heading.append(title);
      if (spec.title.subtitle) {
        const subtitle = document.createElement('p');
        emphasizeText(subtitle, Array.isArray(spec.title.subtitle) ? spec.title.subtitle.join(' ') : spec.title.subtitle);
        heading.append(subtitle);
      }
      const intro = host.parentElement.querySelector('.chart-intro');
      const context = intro && intro.querySelector('p');
      if (context) {
        context.classList.add('chart-context');
        heading.append(context);
      }
      if (intro) intro.remove();
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
    let mapSidebar;
    if (number === 6) {
      const layout = document.createElement('div');
      layout.className = 'map-two-column';
      host.insertAdjacentElement('beforebegin', layout);
      layout.append(host);
      mapSidebar = document.createElement('div');
      mapSidebar.className = 'map-sidebar';
      const legends = document.createElement('div');
      legends.className = 'map-legends';
      legends.innerHTML = '<div class="map-legend"><strong>Direction</strong><span><i style="background:#009E60"></i>Growth</span><span><i style="background:#6F6F6F"></i>Decline</span><span><i style="background:#BDBDBD"></i>No change</span></div><div class="map-legend"><strong>Absolute change (ML)</strong><span><i class="size-key" style="width:23px;height:23px"></i>250</span><span><i class="size-key" style="width:32px;height:32px"></i>500</span><span><i class="size-key" style="width:45px;height:45px"></i>1,000</span></div>';
      mapSidebar.append(legends);
      const comparisons = document.createElement('div');
      comparisons.className = 'map-comparisons';
      comparisons.setAttribute('aria-live', 'polite');
      mapSidebar.append(comparisons);
      const updateComparisons = () => {
        const labels = [];
        const walk = item => {
          if (typeof item.text === 'string' && /^(Largest loss in litres:|Smallest rise in litres:|Largest percentage fall:|Smallest percentage rise:)/.test(item.text)) labels.push(item.text);
          if (item.items) item.items.forEach(walk);
        };
        walk(result.view.scenegraph().root);
        comparisons.replaceChildren();
        [...new Set(labels)].forEach(text => {
          const paragraph = document.createElement('p');
          paragraph.textContent = text;
          comparisons.append(paragraph);
        });
      };
      updateComparisons();
      result.view.addSignalListener('startYear', () => result.view.runAfter(updateComparisons));
      const bindings = host.querySelector('.vega-bindings');
      if (bindings) mapSidebar.append(bindings);
      layout.append(mapSidebar);
    }
    if (number === 7) {
      const layout = document.createElement('div');
      layout.className = 'map-two-column seasonal-layout';
      host.insertAdjacentElement('beforebegin', layout);
      layout.append(host);
      const sidebar = document.createElement('div');
      sidebar.className = 'seasonal-sidebar';
      sidebar.innerHTML = '<div class="seasonal-legend" aria-label="Milk production colour scale: 550 to 1,000 million litres"><strong>Milk production (ML)</strong><div class="seasonal-scale"><div class="seasonal-gradient"></div><div class="seasonal-ticks"><span>1,000</span><span>800</span><span>600</span><span>550</span></div></div></div><p class="seasonal-peak"><strong>October 2024: 945 ML</strong><br>The 2024–25 peak, highlighted on the outer ring.</p>';
      layout.append(sidebar);
    }
    if (notes.length) {
      const group = document.createElement('div');
      group.className = 'annotation-group';
      // Put the contextual explanation first and the baseline/icon note second.
      notes.slice().reverse().forEach(text => {
        const note = document.createElement('aside');
        note.className = 'annotation-note';
        emphasizeText(note, text, 2);
        group.append(note);
      });
      if (mapSidebar) mapSidebar.append(group);
      else host.insertAdjacentElement('afterend', group);
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
  emphasizePageParagraphs();
  window.chartResults = Promise.all(Array.from({length: 11}, (_, i) => renderChart(i + 1)));
});
