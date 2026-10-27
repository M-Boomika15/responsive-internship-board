const grid = document.querySelector("#internship-grid");
const searchInput = document.querySelector("#search-input");
const domainFilter = document.querySelector("#domain-filter");
const filterForm = document.querySelector("#filter-form");
const clearSearchButton = document.querySelector("#clear-search");
const resetButton = document.querySelector("#reset-filters");
const emptyResetButton = document.querySelector("#empty-reset");
const retryButton = document.querySelector("#retry-button");
const emptyState = document.querySelector("#empty-state");
const errorState = document.querySelector("#error-state");
const resultCount = document.querySelector("#result-count");
const resultsStatus = document.querySelector("#results-status");

let internships = [];

const markStyles = ["", "purple", "orange", "blue"];
const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[character]);
}

function populateDomains(items) {
  const domains = [...new Set(items.map(item => item.domain))].sort();
  domainFilter.innerHTML = '<option value="all">All domains</option>' +
    domains.map(domain => `<option value="${escapeHTML(domain)}">${escapeHTML(domain)}</option>`).join("");
}

function makeCard(item, index) {
  const skills = item.skills.map(skill => `<span class="skill">${escapeHTML(skill)}</span>`).join("");
  const stipend = Number.isFinite(Number(item.stipend)) ? currency.format(Number(item.stipend)) : "Not listed";
  return `
    <article class="internship-card">
      <div class="card-top">
        <div class="company-mark ${markStyles[index % markStyles.length]}" aria-hidden="true">${escapeHTML(item.company.slice(0, 1).toUpperCase())}</div>
        <span class="tag">${escapeHTML(item.type || "Internship")}</span>
      </div>
      <h3>${escapeHTML(item.role)}</h3>
      <p class="company-name">${escapeHTML(item.company)}</p>
      <div class="card-meta">
        <span class="meta-pill">⌖ ${escapeHTML(item.location)}</span>
        <span class="meta-pill">◷ ${escapeHTML(item.duration)}</span>
        <span class="meta-pill">${escapeHTML(item.workMode)}</span>
      </div>
      <p class="card-description">${escapeHTML(item.description)}</p>
      <div class="skill-list" aria-label="Skills">${skills}</div>
      <div class="card-footer">
        <div><span class="stipend-label">MONTHLY STIPEND</span><span class="stipend-amount">${escapeHTML(stipend)} <small>/ month</small></span></div>
        <a class="apply-link" href="${escapeHTML(item.applyUrl)}" target="_blank" rel="noopener noreferrer" aria-label="View application information for ${escapeHTML(item.role)} at ${escapeHTML(item.company)}">View role <span aria-hidden="true">↗</span></a>
      </div>
    </article>`;
}

function getFilteredItems() {
  const query = searchInput.value.trim().toLowerCase();
  const domain = domainFilter.value;
  return internships.filter(item => {
    const searchable = [item.role, item.company, item.domain, item.location, item.description, ...(item.skills || [])].join(" ").toLowerCase();
    return searchable.includes(query) && (domain === "all" || item.domain === domain);
  });
}

function render() {
  const filtered = getFilteredItems();
  const hasResults = filtered.length > 0;
  grid.innerHTML = filtered.map(makeCard).join("");
  grid.hidden = !hasResults;
  emptyState.hidden = hasResults;
  errorState.hidden = true;
  resultCount.textContent = String(filtered.length);
  resultsStatus.textContent = `Showing ${filtered.length} of ${internships.length} internships`;
  clearSearchButton.hidden = searchInput.value.length === 0;
}

async function loadInternships() {
  errorState.hidden = true;
  emptyState.hidden = true;
  resultsStatus.textContent = "Loading internships…";
  try {
    const response = await fetch("./internships.json");
    if (!response.ok) throw new Error("Could not load internship data.");
    const data = await response.json();
    if (!Array.isArray(data) || data.some(item => !item.company || !item.role || !item.domain)) {
      throw new Error("Internship data is not in the expected format.");
    }
    internships = data;
    populateDomains(internships);
    render();
  } catch (error) {
    grid.innerHTML = "";
    grid.hidden = true;
    emptyState.hidden = true;
    errorState.hidden = false;
    resultCount.textContent = "0";
    resultsStatus.textContent = "Internships could not be loaded.";
  }
}

filterForm.addEventListener("submit", event => {
  event.preventDefault();
  render();
});
searchInput.addEventListener("input", render);
domainFilter.addEventListener("change", render);
clearSearchButton.addEventListener("click", () => {
  searchInput.value = "";
  render();
  searchInput.focus();
});
function resetFilters() {
  searchInput.value = "";
  domainFilter.value = "all";
  render();
  searchInput.focus();
}
resetButton.addEventListener("click", resetFilters);
emptyResetButton.addEventListener("click", resetFilters);
retryButton.addEventListener("click", loadInternships);

loadInternships();
