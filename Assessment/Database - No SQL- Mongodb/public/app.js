// ==========================================================================
// Dashboard Core JavaScript Engine
// Driving REST API Integrations, Auditing log feeds, and Real-Time Simulations
// ==========================================================================

const API_BASE = '/api/products';
let currentSearch = '';
let currentCategory = '';
let availableCategories = new Set();
let logPollInterval = null;

// On Page Load
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  lucide.createIcons();
  
  // Connect and load database values
  loadAllProducts();
  loadAnalyticsData();
  fetchAuditLogs();
  
  // Start background log audit polling (every 4 seconds)
  logPollInterval = setInterval(fetchAuditLogs, 4000);
});

// ==========================================
// NAVIGATION & TABS ENGINE
// ==========================================
function switchTab(tabId) {
  // Deactivate all nav buttons and panes
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
  
  // Activate selected elements
  document.getElementById(`btn-${tabId}`).classList.add('active');
  document.getElementById(`tab-${tabId}`).classList.add('active');
  
  // Specific tab loading logic
  if (tabId === 'analytics') {
    loadAnalyticsData();
  } else if (tabId === 'terminal') {
    fetchAuditLogs();
  } else if (tabId === 'inventory') {
    loadAllProducts();
  }
}

// ==========================================
// PRODUCT INVENTORY HUB (CRUD ROUTINES)
// ==========================================
async function loadAllProducts() {
  const grid = document.getElementById('products-grid');
  
  try {
    let queryUrl = API_BASE;
    const params = [];
    if (currentSearch) params.push(`search=${encodeURIComponent(currentSearch)}`);
    if (currentCategory) params.push(`category=${encodeURIComponent(currentCategory)}`);
    if (params.length > 0) queryUrl += `?${params.join('&')}`;

    const res = await fetch(queryUrl);
    const result = await res.json();
    
    if (!result.success) throw new Error(result.error);
    
    const products = result.data;
    document.getElementById('stat-total-products').textContent = products.length;
    
    // Clear and redraw grid
    grid.innerHTML = '';
    
    if (products.length === 0) {
      grid.innerHTML = `
        <div class="loader-container">
          <i data-lucide="package-open" style="width: 48px; height: 48px; color: var(--text-dark);"></i>
          <p>No products found matching the criteria. Try adding one!</p>
        </div>
      `;
      lucide.createIcons();
      return;
    }
    
    // Draw product cards
    products.forEach(prod => {
      // Keep track of categories dynamically
      if (prod.category) availableCategories.add(prod.category);
      
      const card = document.createElement('div');
      card.className = 'product-card';
      
      let stockClass = '';
      let stockLabelText = 'In Stock';
      if (prod.stock === 0) {
        stockClass = 'out-of-stock';
        stockLabelText = 'Out of Stock';
      } else if (prod.stock <= 5) {
        stockClass = 'low-stock';
        stockLabelText = 'Low Stock!';
      }
      
      card.innerHTML = `
        <div>
          <div class="product-meta-header">
            <span class="product-category">${escapeHtml(prod.category)}</span>
            <span class="product-price">$${prod.price.toFixed(2)}</span>
          </div>
          <h3 class="product-name">${escapeHtml(prod.name)}</h3>
          <p class="product-desc">${escapeHtml(prod.description)}</p>
        </div>
        
        <div>
          <div class="product-inventory-control">
            <div class="stock-indicator">
              <span class="stock-label">${stockLabelText}</span>
              <span class="stock-value ${stockClass}" id="stock-val-${prod._id}">${prod.stock} items</span>
            </div>
            <div class="stock-adjusters">
              <button class="adjust-btn dec-btn" onclick="adjustStock('${prod._id}', -1)" title="Decrement Inventory (Atomic $inc)">
                <i data-lucide="minus"></i>
              </button>
              <button class="adjust-btn inc-btn" onclick="adjustStock('${prod._id}', 1)" title="Increment Inventory (Atomic $inc)">
                <i data-lucide="plus"></i>
              </button>
            </div>
          </div>
          
          <div class="product-actions">
            <button class="btn btn-secondary" onclick="openEditProductModal('${prod._id}', '${escapeJs(prod.name)}', ${prod.price}, ${prod.stock}, '${escapeJs(prod.category)}', '${escapeJs(prod.description)}')">
              <i data-lucide="edit-3"></i>
              <span>Edit</span>
            </button>
            <button class="btn btn-danger" onclick="deleteProduct('${prod._id}')">
              <i data-lucide="trash-2"></i>
              <span>Delete</span>
            </button>
          </div>
        </div>
      `;
      
      grid.appendChild(card);
    });
    
    // Update filtering dropdown dynamically with gathered categories
    populateCategoriesDropdown();
    lucide.createIcons();
    
  } catch (error) {
    showAlert('Failed to load catalog', error.message, 'error');
  }
}

// Search Handler with bounce limit
let searchTimeout;
function handleSearch(val) {
  clearTimeout(searchTimeout);
  currentSearch = val;
  searchTimeout = setTimeout(loadAllProducts, 300);
}

// Category Filter Handler
function handleCategoryFilter(val) {
  currentCategory = val;
  loadAllProducts();
}

// Dynamic Category dropdown populator
function populateCategoriesDropdown() {
  const dropdown = document.getElementById('filter-category');
  const currentVal = dropdown.value;
  
  // Reset options but keep "All"
  dropdown.innerHTML = '<option value="">All Categories</option>';
  
  // Sort and add categories
  Array.from(availableCategories).sort().forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    dropdown.appendChild(opt);
  });
  
  // Restore value
  dropdown.value = currentVal;
}

// ==========================================
// ATOMIC INVENTORY INCREMENTS ($inc)
// ==========================================
async function adjustStock(productId, amount) {
  try {
    const res = await fetch(`${API_BASE}/${productId}/stock`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount })
    });
    
    const result = await res.json();
    
    if (!result.success) {
      throw new Error(result.error);
    }
    
    // Smoothly update matching indicators on current view to optimize speed
    const valElem = document.getElementById(`stock-val-${productId}`);
    if (valElem) {
      const prod = result.data;
      valElem.textContent = `${prod.stock} items`;
      
      // Update visual alert colors on the fly
      valElem.className = 'stock-value';
      valElem.parentElement.querySelector('.stock-label').textContent = 'In Stock';
      if (prod.stock === 0) {
        valElem.classList.add('out-of-stock');
        valElem.parentElement.querySelector('.stock-label').textContent = 'Out of Stock';
      } else if (prod.stock <= 5) {
        valElem.classList.add('low-stock');
        valElem.parentElement.querySelector('.stock-label').textContent = 'Low Stock!';
      }
    }
    
    // Silent logs updates, refresh charts
    loadAnalyticsData();
    fetchAuditLogs();
    
  } catch (error) {
    showAlert('Inventory limit warning', error.message, 'warning');
  }
}

// ==========================================
// MODAL FORMS MANAGEMENT (Add / Edit / Delete)
// ==========================================
function openAddProductModal() {
  document.getElementById('modal-title').textContent = 'Create New Catalog Product';
  document.getElementById('form-product-id').value = '';
  document.getElementById('product-form').reset();
  
  // Enable initial stock editing for new items
  document.getElementById('form-stock').disabled = false;
  
  document.getElementById('product-modal').classList.add('open');
}

function openEditProductModal(id, name, price, stock, category, description) {
  document.getElementById('modal-title').textContent = 'Update Product Attributes';
  document.getElementById('form-product-id').value = id;
  document.getElementById('form-name').value = name;
  document.getElementById('form-price').value = price;
  document.getElementById('form-stock').value = stock;
  
  // Disable initial stock in basic edit modal to enforce atomic $inc route usage!
  document.getElementById('form-stock').disabled = true;
  
  document.getElementById('form-category').value = category;
  document.getElementById('form-description').value = description;
  
  document.getElementById('product-modal').classList.add('open');
}

function closeAddProductModal() {
  document.getElementById('product-modal').classList.remove('open');
}

async function handleFormSubmit(event) {
  event.preventDefault();
  
  const id = document.getElementById('form-product-id').value;
  const name = document.getElementById('form-name').value.trim();
  const price = parseFloat(document.getElementById('form-price').value);
  const stock = parseInt(document.getElementById('form-stock').value);
  const category = document.getElementById('form-category').value.trim();
  const description = document.getElementById('form-description').value.trim();
  
  const payload = { name, price, category, description };
  
  try {
    let res;
    
    if (id) {
      // UPDATE operation: uses PUT /api/products/:id
      res = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      // CREATE operation: uses POST /api/products
      payload.stock = stock; // Include stock for initial creation
      res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }
    
    const result = await res.json();
    
    if (!result.success) {
      throw new Error(result.error);
    }
    
    showAlert(id ? 'Product updated' : 'Product created', result.message, 'success');
    closeAddProductModal();
    loadAllProducts();
    loadAnalyticsData();
    fetchAuditLogs();
    
  } catch (error) {
    showAlert('Catalog processing failed', error.message, 'error');
  }
}

async function deleteProduct(productId) {
  if (!confirm('Are you sure you want to delete this product from the inventory database?')) return;
  
  try {
    const res = await fetch(`${API_BASE}/${productId}`, {
      method: 'DELETE'
    });
    
    const result = await res.json();
    
    if (!result.success) throw new Error(result.error);
    
    showAlert('Product deleted', 'Successfully removed item from the catalog', 'success');
    loadAllProducts();
    loadAnalyticsData();
    fetchAuditLogs();
    
  } catch (error) {
    showAlert('Deletion failed', error.message, 'error');
  }
}

// ==========================================
// BUSINESS INSIGHTS (AGGREGATION ENGINE)
// ==========================================
async function loadAnalyticsData() {
  const deck = document.getElementById('analytics-deck');
  
  try {
    const res = await fetch(`${API_BASE}/reports/categories`);
    const result = await res.json();
    
    if (!result.success) throw new Error(result.error);
    
    const report = result.data;
    deck.innerHTML = '';
    
    if (report.length === 0) {
      deck.innerHTML = `
        <div class="loader-container" style="grid-column: 1 / -1;">
          <i data-lucide="bar-chart-2" style="width: 48px; height: 48px; color: var(--text-dark);"></i>
          <p>No aggregation insights available yet. Fill database to compile reports!</p>
        </div>
      `;
      lucide.createIcons();
      return;
    }
    
    // Find the highest stock value to calculate progress percentages
    const maxVal = Math.max(...report.map(r => r.totalValue), 100);
    
    report.forEach(catReport => {
      const card = document.createElement('div');
      card.className = 'analytics-card';
      
      const pct = Math.min((catReport.totalValue / maxVal) * 100, 100);
      
      card.innerHTML = `
        <div class="analytics-card-title">
          <i data-lucide="tag"></i>
          <span>${escapeHtml(catReport._id)}</span>
        </div>
        <div class="analytics-metrics">
          <div class="metric-row">
            <span class="metric-lbl">Product Count</span>
            <span class="metric-val">${catReport.productCount} models</span>
          </div>
          <div class="metric-row">
            <span class="metric-lbl">Total Stock Volume</span>
            <span class="metric-val">${catReport.totalStock} units</span>
          </div>
          <div class="metric-row">
            <span class="metric-lbl">Average Unit Price</span>
            <span class="metric-val">$${catReport.averagePrice.toFixed(2)}</span>
          </div>
          <div class="metric-row" style="margin-top: 6px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.03);">
            <span class="metric-lbl" style="font-weight: 700;">Total Inventory Value</span>
            <span class="metric-val highlight">$${catReport.totalValue.toFixed(2)}</span>
          </div>
        </div>
        <div class="progress-bar-container" title="Relative Category Stock Value share">
          <div class="progress-bar-fill" style="width: ${pct}%"></div>
        </div>
      `;
      
      deck.appendChild(card);
    });
    
    lucide.createIcons();
    
  } catch (error) {
    showAlert('Analytics compile failed', error.message, 'error');
  }
}

// ==========================================
// AUDIT LOG TERMINAL READER (FS STREAM)
// ==========================================
async function fetchAuditLogs() {
  const term = document.getElementById('log-terminal');
  if (!term || document.getElementById('tab-terminal').style.display === 'none') return;
  
  try {
    const res = await fetch(`${API_BASE}/logs/view`);
    const result = await res.json();
    
    if (!result.success) throw new Error(result.error);
    
    const rawLogs = result.logs;
    
    if (!rawLogs) {
      term.innerHTML = '<div class="log-line">No activities recorded inside access.log. Try adding or editing products!</div>';
      return;
    }
    
    // Format the logs with syntax highlighting colors
    const lines = rawLogs.split('\n');
    term.innerHTML = lines.map(line => {
      if (!line.trim()) return '';
      
      // Highlight matching HTTP methods and response statuses
      let formattedLine = escapeHtml(line);
      
      // Methods
      formattedLine = formattedLine.replace(/(GET)/g, '<span class="log-get">$1</span>');
      formattedLine = formattedLine.replace(/(POST)/g, '<span class="log-post">$1</span>');
      formattedLine = formattedLine.replace(/(PUT)/g, '<span class="log-put">$1</span>');
      formattedLine = formattedLine.replace(/(PATCH)/g, '<span class="log-patch">$1</span>');
      formattedLine = formattedLine.replace(/(DELETE)/g, '<span class="log-delete">$1</span>');
      
      // Status Codes (e.g. 200, 201, 304, 400, 404, 500)
      formattedLine = formattedLine.replace(/\b(200|201|204)\b/g, '<span class="log-status-2xx">$1</span>');
      formattedLine = formattedLine.replace(/\b(301|302|304)\b/g, '<span class="log-status-3xx">$1</span>');
      formattedLine = formattedLine.replace(/\b(400|401|403|404)\b/g, '<span class="log-status-4xx">$1</span>');
      formattedLine = formattedLine.replace(/\b(500|502|503)\b/g, '<span class="log-status-5xx">$1</span>');
      
      // Time Stamps
      formattedLine = formattedLine.replace(/^(\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\])/g, '<span class="log-time">$1</span>');

      return `<div class="log-line">${formattedLine}</div>`;
    }).join('');
    
  } catch (error) {
    term.innerHTML = `<div class="log-line log-status-5xx">[Audit Monitor Error] Failed to stream logs: ${escapeHtml(error.message)}</div>`;
  }
}

// ==========================================
// INTERACTIVE ACADEMIC SANDBOX (SIMULATOR)
// ==========================================
let simInterval = null;

function runSyncSimulator() {
  const consoleEl = document.getElementById('simulator-console');
  const spinnerEl = document.getElementById('event-loop-spinner');
  const threadStateEl = document.getElementById('thread-state');
  const barEl = document.getElementById('thread-progress');
  
  if (simInterval) clearInterval(simInterval);
  
  consoleEl.textContent = '[SYSTEM] Initializing Blocking I/O (readFileSync) ... Preparing to freeze thread for 3 seconds.';
  
  // Visual cues: freeze event loop rotator
  spinnerEl.className = 'rotator frozen';
  threadStateEl.textContent = 'BLOCKED / UNRESPONSIVE';
  threadStateEl.className = 'thread-status blocked';
  barEl.style.backgroundColor = 'var(--error)';
  barEl.style.width = '100%';
  
  // We use setTimeout to allow the browser to paint the blocked state, 
  // then we initiate a synchronous blocking infinite check for 3 seconds!
  setTimeout(() => {
    const start = Date.now();
    
    // THIS LINE BLOCKS THE MAIN JAVASCRIPT THREAD COMPLETELY
    while (Date.now() - start < 3000) {
      // Event loop and page is completely frozen, user clicks do not register!
    }
    
    // Restore states
    consoleEl.innerHTML = `
      [SYNC FILE READ] Initiated read file: 'access.log'<br>
      [SYNC FILE READ] Done reading. Content size: 45432 bytes.<br>
      [SYSTEM] Main thread freed! The Event Loop can now tick again.
    `;
    spinnerEl.className = 'rotator running';
    threadStateEl.textContent = 'IDLE / RESPONSIVE';
    threadStateEl.className = 'thread-status active';
    barEl.style.backgroundColor = 'var(--success)';
  }, 100);
}

function runAsyncSimulator() {
  const consoleEl = document.getElementById('simulator-console');
  const spinnerEl = document.getElementById('event-loop-spinner');
  const threadStateEl = document.getElementById('thread-state');
  const barEl = document.getElementById('thread-progress');
  
  if (simInterval) clearInterval(simInterval);
  
  consoleEl.innerHTML = `
    [ASYNC FILE READ] Initiated fs.readFile('access.log') non-blocking request.<br>
    [ASYNC FILE READ] Delegated work to OS libuv pool. Moving immediately to next line...<br>
    [SYSTEM] Thread is fully responsive. Event loop remains healthy!
  `;
  
  spinnerEl.className = 'rotator running';
  threadStateEl.textContent = 'RESPONSIVE / ACTIVE';
  threadStateEl.className = 'thread-status active';
  barEl.style.backgroundColor = 'var(--success)';
  
  // Run smooth progress animation that stays fully clickable
  let progress = 0;
  barEl.style.width = '0%';
  
  simInterval = setInterval(() => {
    progress += 5;
    barEl.style.width = `${progress}%`;
    
    if (progress >= 100) {
      clearInterval(simInterval);
      consoleEl.innerHTML += `<br>[ASYNC CALLBACK] File read finished successfully in background! Event queue triggered.`;
      threadStateEl.textContent = 'IDLE / RESPONSIVE';
    }
  }, 100);
}

// ==========================================
// GENERAL FLOATING NOTIFICATION SYSTEM
// ==========================================
function showAlert(title, message, type = 'success') {
  const container = document.getElementById('alert-container');
  const banner = document.createElement('div');
  banner.className = `alert-banner alert-${type}`;
  
  let iconName = 'check-circle';
  if (type === 'error') iconName = 'alert-octagon';
  if (type === 'warning') iconName = 'alert-triangle';
  
  banner.innerHTML = `
    <i class="alert-icon-${type}" data-lucide="${iconName}" style="width: 20px; height: 20px; flex-shrink: 0;"></i>
    <div class="alert-content">
      <h4>${escapeHtml(title)}</h4>
      <p>${escapeHtml(message)}</p>
    </div>
  `;
  
  container.appendChild(banner);
  lucide.createIcons();
  
  // Smooth self-destruct after 4.5 seconds
  setTimeout(() => {
    banner.style.opacity = '0';
    setTimeout(() => banner.remove(), 350);
  }, 4500);
}

// ==========================================
// STRING SANITIZATION SANITY CHECKERS
// ==========================================
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeJs(str) {
  if (!str) return '';
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r');
}
