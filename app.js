/**
 * FeastFlow Platform — Unified Application Engine
 * Manages reactive state, roles, menus, cart, checkout, live tracking, and multi-portal operations.
 */

// ============================================================================
// State Management
// ============================================================================
const APP_STORAGE_KEY = 'FEASTFLOW_STATE_V1';

const defaultState = {
  currentRole: 'customer',
  activePage: 'home',
  activeDashTab: 'overview',
  currentRestaurantId: 'rest-1',
  selectedCategory: 'all',
  activeFilter: 'all',
  sortBy: 'recommended',
  cart: [
    {
      id: 'cart-init-1',
      dishId: 'dish-1',
      restaurantId: 'rest-1',
      restaurantName: 'The Artisan Charcoal Grill',
      name: 'Prime Tomahawk Ribeye Steak',
      price: 48.50,
      basePrice: 48.50,
      size: 'Medium Cut (20oz)',
      addons: ['Truffle Mashed Potatoes (+$5.50)'],
      specialNotes: 'Medium Rare please',
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'cart-init-2',
      dishId: 'dish-12',
      restaurantId: 'rest-4',
      restaurantName: 'The Smash Burger Co.',
      name: 'Salted Caramel Crunch Thickshake',
      price: 7.50,
      basePrice: 7.50,
      size: 'Regular (16oz)',
      addons: [],
      specialNotes: 'Extra chilled',
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=300&q=80'
    }
  ],
  appliedPromo: {
    code: 'FEAST20',
    discountPercent: 20,
    minSpend: 25.00,
    description: '20% discount on all orders over $25.00',
    maxDiscount: 15.00
  },
  deliveryMethod: { type: 'standard', extraFee: 0 },
  paymentMethod: 'card',
  orders: INITIAL_ORDERS,
  user: INITIAL_USER,
  trackingOrderId: 'ORD-98214',
  modalDish: null,
  modalState: {
    selectedSize: null,
    sizeDelta: 0,
    checkedAddons: [],
    addonsTotal: 0,
    quantity: 1
  }
};

let state = loadPersistedState();

function loadPersistedState() {
  try {
    const saved = localStorage.getItem(APP_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure essential arrays and objects are present
      return {
        ...defaultState,
        ...parsed,
        orders: (parsed.orders && parsed.orders.length) ? parsed.orders : INITIAL_ORDERS,
        user: parsed.user || INITIAL_USER
      };
    }
  } catch (e) {
    console.warn('Storage read fallback', e);
  }
  return { ...defaultState };
}

function persistState() {
  try {
    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify({
      cart: state.cart,
      appliedPromo: state.appliedPromo,
      orders: state.orders,
      user: state.user,
      trackingOrderId: state.trackingOrderId
    }));
  } catch (e) {
    console.warn('Storage save fallback', e);
  }
}

// ============================================================================
// Core Initialization & Lifecycle
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initNavbarScrollEffect();
  renderCategories();
  renderRestaurants();
  renderCart();
  renderOffers();
  renderDashboard();
  renderAdminView();
  renderPartnerView();
  renderRiderView();
  renderOrderTracking();
  updateUserHeaderPill();

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeFoodModal();
      closeCheckoutModal();
      closeSearchModal();
      closeAuthModal();
      toggleCartDrawer(false);
    }
  });
});

function initNavbarScrollEffect() {
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function updateUserHeaderPill() {
  const avatar = document.getElementById('navUserAvatar');
  const name = document.getElementById('navUserName');
  if (state.user) {
    if (avatar) avatar.src = state.user.avatar;
    if (name) name.textContent = state.user.name.split(' ')[0] + '.';
  }
}

// ============================================================================
// Role & Portal Switcher (Customer / Partner / Rider / Admin)
// ============================================================================
function switchRole(newRole) {
  state.currentRole = newRole;

  // Update top role buttons
  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.role === newRole);
  });

  // Hide all main views
  const viewSections = [
    'view-home', 'view-menu', 'view-tracker', 'view-offers', 
    'view-dashboard', 'view-partner', 'view-rider', 'view-admin'
  ];
  viewSections.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  // Display targeted view based on role
  if (newRole === 'customer') {
    navigateTo(state.activePage || 'home');
  } else if (newRole === 'partner') {
    const el = document.getElementById('view-partner');
    if (el) el.style.display = 'block';
    renderPartnerView();
    showToast('Switched to Restaurant Kitchen Display System (KDS)', 'success');
  } else if (newRole === 'rider') {
    const el = document.getElementById('view-rider');
    if (el) el.style.display = 'block';
    renderRiderView();
    showToast('Switched to Courier Rider Dispatch Hub', 'success');
  } else if (newRole === 'admin') {
    const el = document.getElementById('view-admin');
    if (el) el.style.display = 'block';
    renderAdminView();
    showToast('Switched to Executive Platform Admin Console', 'success');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================================
// Page Navigation Engine
// ============================================================================
function navigateTo(page, subSection = null) {
  state.activePage = page;

  // If in another role, switch back to customer view
  if (state.currentRole !== 'customer') {
    state.currentRole = 'customer';
    document.querySelectorAll('.role-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.role === 'customer');
    });
  }

  // Update main header nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.page === page);
  });

  // Update mobile bottom nav buttons
  document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === page);
  });

  // Hide all customer pages
  ['view-home', 'view-menu', 'view-tracker', 'view-offers', 'view-dashboard', 'view-partner', 'view-rider', 'view-admin']
    .forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });

  if (page === 'home' || page === 'restaurants') {
    const homeEl = document.getElementById('view-home');
    if (homeEl) homeEl.style.display = 'block';
    if (page === 'restaurants') {
      const anchor = document.getElementById('restaurantDiscoveryAnchor');
      if (anchor) anchor.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  } else if (page === 'menu') {
    const menuEl = document.getElementById('view-menu');
    if (menuEl) menuEl.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (page === 'tracker') {
    const trackEl = document.getElementById('view-tracker');
    if (trackEl) trackEl.style.display = 'block';
    renderOrderTracking();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (page === 'offers') {
    const offersEl = document.getElementById('view-offers');
    if (offersEl) offersEl.style.display = 'block';
    renderOffers();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (page === 'dashboard') {
    const dashEl = document.getElementById('view-dashboard');
    if (dashEl) dashEl.style.display = 'block';
    if (subSection) {
      switchDashTab(subSection);
    } else {
      renderDashboard();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ============================================================================
// Horizontal Food Categories
// ============================================================================
function renderCategories() {
  const container = document.getElementById('categoriesSlider');
  if (!container) return;

  container.innerHTML = INITIAL_CATEGORIES.map(cat => {
    const isActive = state.selectedCategory === cat.id;
    return `
      <div class="category-card ${isActive ? 'active' : ''}" onclick="selectCategory('${cat.id}')">
        <div class="category-icon-circle">
          <i class="fa-solid ${cat.icon}"></i>
        </div>
        <span class="cat-name">${cat.name}</span>
      </div>
    `;
  }).join('');
}

function selectCategory(catId) {
  state.selectedCategory = catId;
  renderCategories();
  renderRestaurants();
  
  // Smooth scroll to restaurants section
  const anchor = document.getElementById('restaurantDiscoveryAnchor');
  if (anchor) anchor.scrollIntoView({ behavior: 'smooth' });
}

function selectCategoryAndScroll(catId) {
  navigateTo('restaurants');
  selectCategory(catId);
}

function scrollCategories(direction) {
  const container = document.getElementById('categoriesSlider');
  if (container) {
    container.scrollBy({ left: direction * 280, behavior: 'smooth' });
  }
}

// ============================================================================
// Restaurant Discovery & Filtering
// ============================================================================
function renderRestaurants() {
  const grid = document.getElementById('restaurantsGrid');
  const countDisplay = document.getElementById('restaurantCountDisplay');
  if (!grid) return;

  let list = [...INITIAL_RESTAURANTS];

  // 1. Filter by category
  if (state.selectedCategory && state.selectedCategory !== 'all') {
    list = list.filter(r => r.category === state.selectedCategory);
  }

  // 2. Filter pills
  if (state.activeFilter === 'rating45') {
    list = list.filter(r => r.rating >= 4.8);
  } else if (state.activeFilter === 'fast') {
    list = list.filter(r => r.deliveryTime.includes('15') || r.deliveryTime.includes('20'));
  } else if (state.activeFilter === 'freeDelivery') {
    list = list.filter(r => r.deliveryFee === 0);
  } else if (state.activeFilter === 'promoted') {
    list = list.filter(r => r.isPromoted || r.offerBadge);
  } else if (state.activeFilter === 'openNow') {
    list = list.filter(r => r.isOpen);
  }

  // 3. Sorting
  if (state.sortBy === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  } else if (state.sortBy === 'deliveryTime') {
    list.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
  } else if (state.sortBy === 'deliveryFee') {
    list.sort((a, b) => a.deliveryFee - b.deliveryFee);
  } else if (state.sortBy === 'popular') {
    list.sort((a, b) => b.reviewsCount - a.reviewsCount);
  }

  if (countDisplay) {
    countDisplay.textContent = list.length;
  }

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="empty-state-box" style="grid-column: 1 / -1;">
        <div class="empty-state-icon"><i class="fa-solid fa-utensils"></i></div>
        <h3>No Matching Restaurants Found</h3>
        <p style="color: var(--text-secondary); max-width: 400px;">
          Try adjusting your filter or selecting "All Cuisines" to discover more delicious culinary choices.
        </p>
        <button class="btn btn-primary btn-sm" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = list.map(rest => {
    const isFav = state.user.favoriteRestaurants.includes(rest.id);
    const feeText = rest.deliveryFee === 0 ? 'Free Delivery' : `$${rest.deliveryFee.toFixed(2)} delivery`;
    const feeClass = rest.deliveryFee === 0 ? 'rest-fee-info free-delivery' : 'rest-fee-info';

    return `
      <div class="restaurant-card" onclick="openRestaurantMenu('${rest.id}')">
        <div class="rest-card-img-wrap">
          <img src="${rest.cover}" alt="${rest.name}" loading="lazy">
          <div class="rest-card-badges">
            ${rest.offerBadge ? `<span class="rest-offer-badge"><i class="fa-solid fa-fire"></i> ${rest.offerBadge}</span>` : ''}
          </div>
          <button class="rest-fav-btn ${isFav ? 'is-fav' : ''}" title="Favorite" onclick="event.stopPropagation(); toggleRestaurantFavorite('${rest.id}')">
            <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </button>
          <div class="rest-time-badge">
            <i class="fa-solid fa-clock"></i> ${rest.deliveryTime}
          </div>
        </div>

        <div class="rest-card-content">
          <div class="rest-header-row">
            <h3 class="rest-name">${rest.name}</h3>
            <span class="rest-rating-pill"><i class="fa-solid fa-star"></i> ${rest.rating}</span>
          </div>

          <div class="rest-cuisine-row">
            <span>${rest.cuisine}</span>
            <span class="bullet">•</span>
            <span>${rest.priceRange}</span>
            <span class="bullet">•</span>
            <span>Min $${rest.minOrder.toFixed(2)}</span>
          </div>

          <p class="rest-desc">${rest.description}</p>

          <div class="rest-footer-meta">
            <div class="${feeClass}">
              <i class="fa-solid fa-motorcycle"></i> ${feeText}
            </div>
            <span class="view-menu-btn">
              View Menu <i class="fa-solid fa-arrow-right"></i>
            </span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function applyRestaurantFilter(filterKey) {
  state.activeFilter = filterKey;
  document.querySelectorAll('.filter-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filterKey);
  });
  renderRestaurants();
}

function handleSortChange(sortVal) {
  state.sortBy = sortVal;
  renderRestaurants();
}

function resetFilters() {
  state.selectedCategory = 'all';
  state.activeFilter = 'all';
  state.sortBy = 'recommended';
  document.getElementById('sortDropdown').value = 'recommended';
  renderCategories();
  applyRestaurantFilter('all');
}

function toggleRestaurantFavorite(restId) {
  const favs = state.user.favoriteRestaurants;
  const idx = favs.indexOf(restId);
  if (idx > -1) {
    favs.splice(idx, 1);
    showToast('Removed from your favorites', 'warning');
  } else {
    favs.push(restId);
    showToast('Saved to your favorites ❤️', 'success');
  }
  persistState();
  renderRestaurants();
  renderDashboard();
}

// ============================================================================
// Restaurant Menu View & Showcase
// ============================================================================
function openRestaurantMenu(restId) {
  const restaurant = INITIAL_RESTAURANTS.find(r => r.id === restId);
  if (!restaurant) return;

  state.currentRestaurantId = restId;

  // Populate header & metadata
  document.getElementById('menuRestCoverImg').src = restaurant.cover;
  document.getElementById('menuRestLogoImg').src = restaurant.logo;
  document.getElementById('menuRestName').textContent = restaurant.name;
  document.getElementById('menuRestOfferBadge').textContent = restaurant.offerBadge || 'CHEF CURATED';
  document.getElementById('menuRestRating').innerHTML = `<i class="fa-solid fa-star" style="color: var(--warning);"></i> ${restaurant.rating} (${restaurant.reviewsCount} reviews)`;
  document.getElementById('menuRestCuisine').textContent = restaurant.cuisine;
  document.getElementById('menuRestDeliveryTime').innerHTML = `<i class="fa-solid fa-clock"></i> ${restaurant.deliveryTime}`;
  document.getElementById('menuRestFee').innerHTML = `<i class="fa-solid fa-motorcycle"></i> ${restaurant.deliveryFee === 0 ? 'Free delivery' : `$${restaurant.deliveryFee.toFixed(2)} delivery`}`;
  document.getElementById('menuRestDesc').textContent = restaurant.description;

  // Favorite button
  const favBtn = document.getElementById('menuRestFavToggle');
  const isFav = state.user.favoriteRestaurants.includes(restId);
  if (favBtn) {
    favBtn.innerHTML = isFav ? '<i class="fa-solid fa-heart" style="color: #e11d48;"></i> Favorited' : '<i class="fa-regular fa-heart"></i> Add to Favorites';
  }

  // Populate menu category tabs
  const dishes = INITIAL_MENU_ITEMS.filter(d => d.restaurantId === restId);
  const categories = ['All', ...new Set(dishes.map(d => d.category))];
  const tabsContainer = document.getElementById('menuCategoriesTabs');
  
  if (tabsContainer) {
    tabsContainer.innerHTML = categories.map((cat, idx) => `
      <button class="menu-tab-btn ${idx === 0 ? 'active' : ''}" onclick="filterMenuCategoryTab('${cat}', this)">
        ${cat}
      </button>
    `).join('');
  }

  // Render dishes
  renderMenuDishes(dishes);
  navigateTo('menu');
}

function filterMenuCategoryTab(category, btnEl) {
  document.querySelectorAll('.menu-tab-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  const allDishes = INITIAL_MENU_ITEMS.filter(d => d.restaurantId === state.currentRestaurantId);
  const filtered = category === 'All' ? allDishes : allDishes.filter(d => d.category === category);
  renderMenuDishes(filtered);
}

function filterMenuDishes(query) {
  const q = query.trim().toLowerCase();
  const allDishes = INITIAL_MENU_ITEMS.filter(d => d.restaurantId === state.currentRestaurantId);
  const filtered = q ? allDishes.filter(d => d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)) : allDishes;
  renderMenuDishes(filtered);
}

function renderMenuDishes(dishes) {
  const grid = document.getElementById('menuFoodItemsGrid');
  if (!grid) return;

  if (dishes.length === 0) {
    grid.innerHTML = `
      <div class="empty-state-box" style="grid-column: 1 / -1;">
        <div class="empty-state-icon"><i class="fa-solid fa-bowl-food"></i></div>
        <h3>No Dishes in this Category</h3>
        <p style="color: var(--text-secondary);">Select another tab to browse full menu offerings.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = dishes.map(dish => {
    return `
      <div class="food-item-card" onclick="openFoodModal('${dish.id}')">
        <div class="food-card-img-wrap">
          <img src="${dish.image}" alt="${dish.name}" loading="lazy">
          <span class="dietary-tag ${dish.isVeg ? 'veg' : 'non-veg'}">
            <i class="fa-solid ${dish.isVeg ? 'fa-leaf' : 'fa-drumstick-bite'}"></i>
            ${dish.isVeg ? 'Vegetarian' : 'Non-Veg'}
          </span>
          ${dish.badge ? `<span class="badge badge-primary" style="position: absolute; bottom: 0.8rem; left: 0.8rem;"><i class="fa-solid fa-crown"></i> ${dish.badge}</span>` : ''}
        </div>

        <div class="food-card-body">
          <div class="food-card-title-row">
            <h4 class="food-item-title">${dish.name}</h4>
            <span class="badge badge-rating"><i class="fa-solid fa-star"></i> ${dish.rating}</span>
          </div>

          <p class="food-item-desc">${dish.description}</p>

          <div class="food-card-action-row">
            <span class="food-price">$${dish.price.toFixed(2)}</span>
            <button class="add-food-btn" onclick="event.stopPropagation(); openFoodModal('${dish.id}')">
              <i class="fa-solid fa-plus"></i> Add
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function toggleCurrentRestFav() {
  toggleRestaurantFavorite(state.currentRestaurantId);
  const favBtn = document.getElementById('menuRestFavToggle');
  const isFav = state.user.favoriteRestaurants.includes(state.currentRestaurantId);
  if (favBtn) {
    favBtn.innerHTML = isFav ? '<i class="fa-solid fa-heart" style="color: #e11d48;"></i> Favorited' : '<i class="fa-regular fa-heart"></i> Add to Favorites';
  }
}

// ============================================================================
// Food Customization & Details Modal
// ============================================================================
function openFoodModal(dishId) {
  const dish = INITIAL_MENU_ITEMS.find(d => d.id === dishId);
  if (!dish) return;

  state.modalDish = dish;
  state.modalState = {
    selectedSize: dish.customizations && dish.customizations.sizes ? dish.customizations.sizes[0] : null,
    sizeDelta: 0,
    checkedAddons: [],
    addonsTotal: 0,
    quantity: 1
  };

  // Populate title and description
  document.getElementById('modalDishImage').src = dish.image;
  document.getElementById('modalDishTitle').textContent = dish.name;
  document.getElementById('modalDishRating').innerHTML = `<i class="fa-solid fa-star"></i> ${dish.rating} (${dish.reviewsCount} reviews)`;
  document.getElementById('modalDishDescription').textContent = dish.description;
  document.getElementById('modalQtyDisplay').textContent = '1';
  document.getElementById('modalSpecialNotes').value = '';

  // Render Sizes
  const sizesContainer = document.getElementById('modalSizesContainer');
  const sizesOptions = document.getElementById('modalSizesOptions');
  if (dish.customizations && dish.customizations.sizes && dish.customizations.sizes.length) {
    sizesContainer.style.display = 'block';
    sizesOptions.innerHTML = dish.customizations.sizes.map((s, idx) => `
      <label class="custom-option-label ${idx === 0 ? 'checked' : ''}" onclick="selectModalSize(${idx}, ${s.priceDelta})">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <input type="radio" name="modalSizeRadio" ${idx === 0 ? 'checked' : ''} style="accent-color: var(--primary);">
          <span>${s.name}</span>
        </div>
        <span style="font-weight: 700; color: ${s.priceDelta > 0 ? 'var(--primary)' : 'var(--text-muted)'};">
          ${s.priceDelta > 0 ? `+$${s.priceDelta.toFixed(2)}` : 'Standard'}
        </span>
      </label>
    `).join('');
  } else {
    sizesContainer.style.display = 'none';
  }

  // Render Addons
  const addonsContainer = document.getElementById('modalAddonsContainer');
  const addonsOptions = document.getElementById('modalAddonsOptions');
  if (dish.customizations && dish.customizations.addons && dish.customizations.addons.length) {
    addonsContainer.style.display = 'block';
    addonsOptions.innerHTML = dish.customizations.addons.map((add, idx) => `
      <label class="custom-option-label" onclick="toggleModalAddon(${idx}, ${add.price}, '${add.name}', this)">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <input type="checkbox" style="accent-color: var(--primary);">
          <span>${add.name}</span>
        </div>
        <span style="font-weight: 700; color: var(--primary);">+$${add.price.toFixed(2)}</span>
      </label>
    `).join('');
  } else {
    addonsContainer.style.display = 'none';
  }

  updateModalCalculatedPrice();

  const modal = document.getElementById('foodCustomizationModal');
  if (modal) modal.classList.add('open');
}

function closeFoodModal() {
  const modal = document.getElementById('foodCustomizationModal');
  if (modal) modal.classList.remove('open');
  state.modalDish = null;
}

function selectModalSize(index, priceDelta) {
  state.modalState.selectedSize = state.modalDish.customizations.sizes[index];
  state.modalState.sizeDelta = priceDelta;

  const labels = document.querySelectorAll('#modalSizesOptions .custom-option-label');
  labels.forEach((lbl, i) => {
    lbl.classList.toggle('checked', i === index);
    const radio = lbl.querySelector('input[type="radio"]');
    if (radio) radio.checked = (i === index);
  });

  updateModalCalculatedPrice();
}

function toggleModalAddon(index, price, name, labelEl) {
  const checkbox = labelEl.querySelector('input[type="checkbox"]');
  const isChecked = checkbox.checked;
  labelEl.classList.toggle('checked', isChecked);

  if (isChecked) {
    state.modalState.checkedAddons.push({ name, price });
  } else {
    state.modalState.checkedAddons = state.modalState.checkedAddons.filter(a => a.name !== name);
  }

  state.modalState.addonsTotal = state.modalState.checkedAddons.reduce((sum, a) => sum + a.price, 0);
  updateModalCalculatedPrice();
}

function adjustModalQty(delta) {
  let q = state.modalState.quantity + delta;
  if (q < 1) q = 1;
  if (q > 10) q = 10;
  state.modalState.quantity = q;
  document.getElementById('modalQtyDisplay').textContent = q;
  updateModalCalculatedPrice();
}

function updateModalCalculatedPrice() {
  if (!state.modalDish) return;
  const unitTotal = state.modalDish.price + state.modalState.sizeDelta + state.modalState.addonsTotal;
  const grandTotal = unitTotal * state.modalState.quantity;
  document.getElementById('modalCalculatedPrice').textContent = `$${grandTotal.toFixed(2)}`;
}

function confirmAddToCart() {
  if (!state.modalDish) return;

  const restaurant = INITIAL_RESTAURANTS.find(r => r.id === state.modalDish.restaurantId) || INITIAL_RESTAURANTS[0];
  const unitPrice = state.modalDish.price + state.modalState.sizeDelta + state.modalState.addonsTotal;
  const specialNotes = document.getElementById('modalSpecialNotes').value.trim();

  const cartItem = {
    id: 'cart-' + Date.now(),
    dishId: state.modalDish.id,
    restaurantId: state.modalDish.restaurantId,
    restaurantName: restaurant.name,
    name: state.modalDish.name,
    basePrice: state.modalDish.price,
    price: unitPrice,
    size: state.modalState.selectedSize ? state.modalState.selectedSize.name : 'Standard Portion',
    addons: state.modalState.checkedAddons.map(a => `${a.name} (+$${a.price.toFixed(2)})`),
    specialNotes: specialNotes,
    quantity: state.modalState.quantity,
    image: state.modalDish.image
  };

  state.cart.push(cartItem);
  persistState();
  renderCart();
  closeFoodModal();

  // Badge bump animation
  const badge = document.getElementById('cartCountBadge');
  if (badge) {
    badge.classList.add('bump');
    setTimeout(() => badge.classList.remove('bump'), 400);
  }

  showToast(`Added "${cartItem.name}" to your bag!`, 'success');
}

// ============================================================================
// Shopping Cart Drawer Operations
// ============================================================================
function toggleCartDrawer(isOpen) {
  const backdrop = document.getElementById('cartDrawerBackdrop');
  if (backdrop) {
    backdrop.classList.toggle('open', isOpen);
  }
}

function handleBackdropClick(e) {
  if (e.target.id === 'cartDrawerBackdrop') {
    toggleCartDrawer(false);
  }
}

function renderCart() {
  const container = document.getElementById('cartItemsListContainer');
  const badge = document.getElementById('cartCountBadge');
  const subtotalEl = document.getElementById('cartSubtotalVal');
  const feeEl = document.getElementById('cartDeliveryFeeVal');
  const discountRow = document.getElementById('cartDiscountRow');
  const discountVal = document.getElementById('cartDiscountVal');
  const taxEl = document.getElementById('cartTaxVal');
  const grandTotalEl = document.getElementById('cartGrandTotalVal');

  const totalItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  if (badge) badge.textContent = totalItemCount;

  if (!container) return;

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="empty-state-box">
        <div class="empty-state-icon"><i class="fa-solid fa-bag-shopping"></i></div>
        <h4>Your Gourmet Bag is Empty</h4>
        <p style="color: var(--text-secondary); font-size: 0.85rem;">
          Explore top culinary masters and add exceptional meals to start your order.
        </p>
        <button class="btn btn-primary btn-sm" onclick="toggleCartDrawer(false); navigateTo('restaurants');">
          Explore Restaurants
        </button>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = '$0.00';
    if (feeEl) feeEl.textContent = '$0.00';
    if (taxEl) taxEl.textContent = '$0.00';
    if (grandTotalEl) grandTotalEl.textContent = '$0.00';
    if (discountRow) discountRow.style.display = 'none';
    return;
  }

  container.innerHTML = state.cart.map(item => `
    <div class="cart-item-row">
      <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
      <div class="cart-item-details">
        <h5 class="cart-item-name">${item.name}</h5>
        <p class="cart-item-options">
          ${item.size}${item.addons && item.addons.length ? ' • ' + item.addons.join(', ') : ''}
        </p>
        <span class="cart-item-price-unit">$${(item.price * item.quantity).toFixed(2)}</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.4rem;">
        <button class="cart-remove-btn" title="Remove Item" onclick="removeCartItem('${item.id}')">
          <i class="fa-solid fa-trash-can"></i>
        </button>
        <div class="quantity-stepper" style="padding: 0.15rem;">
          <button class="stepper-btn" style="width: 24px; height: 24px; font-size: 0.75rem;" onclick="adjustCartItemQty('${item.id}', -1)"><i class="fa-solid fa-minus"></i></button>
          <span style="font-size: 0.85rem; font-weight: 700; min-width: 20px; text-align: center;">${item.quantity}</span>
          <button class="stepper-btn" style="width: 24px; height: 24px; font-size: 0.75rem;" onclick="adjustCartItemQty('${item.id}', 1)"><i class="fa-solid fa-plus"></i></button>
        </div>
      </div>
    </div>
  `).join('');

  // Calculations
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 45 ? 0.00 : 1.99;
  
  let discount = 0;
  if (state.appliedPromo) {
    if (state.appliedPromo.discountPercent && subtotal >= (state.appliedPromo.minSpend || 0)) {
      discount = (subtotal * state.appliedPromo.discountPercent) / 100;
      if (state.appliedPromo.maxDiscount && discount > state.appliedPromo.maxDiscount) {
        discount = state.appliedPromo.maxDiscount;
      }
    } else if (state.appliedPromo.discountAmount) {
      discount = state.appliedPromo.discountAmount;
    }
  }

  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = taxableAmount * 0.08;
  const grandTotal = Math.max(0, taxableAmount + deliveryFee + tax);

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (feeEl) feeEl.textContent = deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`;
  if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
  if (grandTotalEl) grandTotalEl.textContent = `$${grandTotal.toFixed(2)}`;

  if (discountRow && discountVal) {
    if (discount > 0) {
      discountRow.style.display = 'flex';
      discountVal.textContent = `-$${discount.toFixed(2)}`;
    } else {
      discountRow.style.display = 'none';
    }
  }
}

function adjustCartItemQty(cartItemId, delta) {
  const item = state.cart.find(i => i.id === cartItemId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter(i => i.id !== cartItemId);
    showToast(`Removed from your bag`, 'warning');
  }
  persistState();
  renderCart();
}

function removeCartItem(cartItemId) {
  state.cart = state.cart.filter(i => i.id !== cartItemId);
  persistState();
  renderCart();
  showToast('Item removed from cart', 'warning');
}

function applyCartPromo(promoCodeParam = null) {
  const input = document.getElementById('cartPromoInput');
  const code = (promoCodeParam || (input ? input.value : '')).trim().toUpperCase();

  if (!code) {
    showToast('Please enter a valid coupon code', 'warning');
    return;
  }

  const promo = INITIAL_PROMOS.find(p => p.code === code);
  if (!promo) {
    showToast(`Invalid coupon code: "${code}"`, 'danger');
    return;
  }

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (promo.minSpend && subtotal < promo.minSpend) {
    showToast(`Coupon requires minimum spend of $${promo.minSpend.toFixed(2)}`, 'warning');
    return;
  }

  state.appliedPromo = promo;
  persistState();
  renderCart();
  showToast(`Promo code "${code}" applied successfully! 🎉`, 'success');
}

function copyAndApplyPromo(code) {
  state.appliedPromo = INITIAL_PROMOS.find(p => p.code === code) || state.appliedPromo;
  persistState();
  renderCart();
  toggleCartDrawer(true);
  showToast(`Promo "${code}" applied to your order!`, 'success');
}

// ============================================================================
// Multi-Step Checkout Experience
// ============================================================================
function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast('Your shopping bag is empty!', 'warning');
    return;
  }
  toggleCartDrawer(false);

  // Update summary in checkout
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = (subtotal > 45 ? 0 : 1.99) + state.deliveryMethod.extraFee;
  let discount = 0;
  if (state.appliedPromo && state.appliedPromo.discountPercent) {
    discount = Math.min((subtotal * state.appliedPromo.discountPercent) / 100, state.appliedPromo.maxDiscount || 15);
  }
  const tax = Math.max(0, subtotal - discount) * 0.08;
  const grandTotal = Math.max(0, subtotal - discount + deliveryFee + tax);

  document.getElementById('chkSummaryGrandTotal').textContent = `$${grandTotal.toFixed(2)}`;
  goToCheckoutStep(1);

  const modal = document.getElementById('checkoutModal');
  if (modal) modal.classList.add('open');
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  if (modal) modal.classList.remove('open');
}

function goToCheckoutStep(stepNumber) {
  // Update step indicators
  for (let i = 1; i <= 4; i++) {
    const node = document.getElementById(`chkStepNode-${i}`);
    const content = document.getElementById(`checkoutStepContent-${i}`);
    if (node) {
      node.classList.toggle('active', i === stepNumber);
      node.classList.toggle('completed', i < stepNumber);
    }
    if (content) {
      content.style.display = (i === stepNumber) ? 'block' : 'none';
    }
  }

  // Update final review step summaries
  if (stepNumber === 4) {
    const street = document.getElementById('chkStreet').value;
    const city = document.getElementById('chkCity').value;
    document.getElementById('chkSummaryAddress').textContent = `${street}, ${city}`;
    
    let paymentText = 'Credit Card (•••• 4892)';
    if (state.paymentMethod === 'apple') paymentText = 'Apple Pay';
    if (state.paymentMethod === 'cash') paymentText = 'Cash on Delivery';
    document.getElementById('chkSummaryPayment').textContent = paymentText;
  }
}

function selectDeliveryMethod(method, extraFee) {
  state.deliveryMethod = { type: method, extraFee };
  document.getElementById('tileStandardDelivery').classList.toggle('selected', method === 'standard');
  document.getElementById('tilePriorityDelivery').classList.toggle('selected', method === 'express');
}

function selectPaymentMethod(method) {
  state.paymentMethod = method;
  document.getElementById('payMethodCard').classList.toggle('selected', method === 'card');
  document.getElementById('payMethodApple').classList.toggle('selected', method === 'apple');
  document.getElementById('payMethodCash').classList.toggle('selected', method === 'cash');

  const cardDetails = document.getElementById('cardDetailsFormWrap');
  if (cardDetails) {
    cardDetails.style.display = (method === 'card') ? 'block' : 'none';
  }
}

function executePlaceOrder() {
  const recipientName = document.getElementById('chkName').value;
  const deliveryAddress = document.getElementById('chkStreet').value;

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = (subtotal > 45 ? 0 : 1.99) + state.deliveryMethod.extraFee;
  let discount = 0;
  if (state.appliedPromo && state.appliedPromo.discountPercent) {
    discount = Math.min((subtotal * state.appliedPromo.discountPercent) / 100, state.appliedPromo.maxDiscount || 15);
  }
  const tax = Math.max(0, subtotal - discount) * 0.08;
  const grandTotal = Math.max(0, subtotal - discount + deliveryFee + tax);

  const newOrder = {
    id: 'ORD-' + Math.floor(10000 + Math.random() * 90000),
    date: new Date().toISOString().replace('T', ' ').substring(0, 16),
    restaurantId: state.cart[0] ? state.cart[0].restaurantId : 'rest-1',
    restaurantName: state.cart[0] ? state.cart[0].restaurantName : 'The Artisan Charcoal Grill',
    restaurantLogo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80',
    status: 'confirmed',
    statusStep: 1,
    estimatedArrival: state.deliveryMethod.type === 'express' ? '18 mins' : '28 mins',
    items: [...state.cart],
    subtotal: subtotal,
    deliveryFee: deliveryFee,
    tax: tax,
    discount: discount,
    grandTotal: grandTotal,
    paymentMethod: state.paymentMethod === 'card' ? 'Credit Card (•••• 4892)' : (state.paymentMethod === 'apple' ? 'Apple Pay' : 'Cash on Delivery'),
    deliveryAddress: deliveryAddress,
    recipient: recipientName,
    rider: {
      name: 'Alexandre Sterling',
      phone: '+1 (555) 928-3011',
      rating: 4.95,
      vehicle: 'Yamaha MT-07 Midnight Edition (Plate # FF-7782)',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      currentLocation: 'Assigned to Dispatch'
    }
  };

  // Prepend to orders list
  state.orders.unshift(newOrder);
  state.trackingOrderId = newOrder.id;
  state.cart = []; // Empty cart
  persistState();

  closeCheckoutModal();
  renderCart();
  renderDashboard();
  renderAdminView();
  renderPartnerView();
  renderRiderView();
  navigateTo('tracker');

  showToast(`Order #${newOrder.id} confirmed! Live courier tracking active.`, 'success');
}

// ============================================================================
// Real-Time Live Order Tracking Experience
// ============================================================================
function renderOrderTracking() {
  const activeOrder = state.orders.find(o => o.id === state.trackingOrderId) || state.orders[0];
  if (!activeOrder) return;

  document.getElementById('trackerOrderId').textContent = activeOrder.id;
  document.getElementById('trackerEta').textContent = activeOrder.estimatedArrival;
  document.getElementById('trackerOrderTotalPaid').textContent = `$${activeOrder.grandTotal.toFixed(2)}`;

  // Timeline Stepper
  const stepNumber = activeOrder.statusStep || 1;
  for (let i = 1; i <= 5; i++) {
    const node = document.getElementById(`stepNode-${i}`);
    if (node) {
      node.classList.remove('done', 'active');
      if (i < stepNumber) {
        node.classList.add('done');
      } else if (i === stepNumber) {
        node.classList.add('active');
      }
    }
  }

  // Animated courier marker on SVG route map
  const marker = document.getElementById('riderMapMarker');
  const distanceText = document.getElementById('trackerDistanceDisplay');
  const riderCard = document.getElementById('trackerRiderCard');

  if (marker) {
    const coordinatesByStep = [
      { x: 120, y: 190, dist: 'At Restaurant' },
      { x: 200, y: 160, dist: 'Kitchen Packing' },
      { x: 280, y: 140, dist: '2.8 km away' },
      { x: 420, y: 200, dist: '1.2 km away' },
      { x: 560, y: 160, dist: 'Delivered at Door' }
    ];
    const pos = coordinatesByStep[Math.min(stepNumber - 1, coordinatesByStep.length - 1)];
    marker.setAttribute('transform', `translate(${pos.x}, ${pos.y})`);
    if (distanceText) distanceText.textContent = pos.dist;
  }

  // Rider Details
  if (activeOrder.rider) {
    document.getElementById('trackerRiderName').textContent = activeOrder.rider.name;
    document.getElementById('trackerRiderVehicle').textContent = activeOrder.rider.vehicle;
  }

  // Order Items
  const itemsContainer = document.getElementById('trackerOrderItemsList');
  if (itemsContainer) {
    itemsContainer.innerHTML = activeOrder.items.map(it => `
      <div style="display: flex; justify-content: space-between;">
        <span>${it.quantity}x ${it.name} (${it.size})</span>
        <span style="font-weight: 600; color: #fff;">$${(it.price * it.quantity).toFixed(2)}</span>
      </div>
    `).join('');
  }
}

function advanceOrderStatus(delta) {
  const activeOrder = state.orders.find(o => o.id === state.trackingOrderId) || state.orders[0];
  if (!activeOrder) return;

  const statusMap = {
    1: { key: 'confirmed', eta: '30 mins' },
    2: { key: 'preparing', eta: '24 mins' },
    3: { key: 'picked_up', eta: '18 mins' },
    4: { key: 'on_the_way', eta: '10 mins' },
    5: { key: 'delivered', eta: 'Delivered' }
  };

  let newStep = (activeOrder.statusStep || 1) + delta;
  if (newStep < 1) newStep = 1;
  if (newStep > 5) newStep = 5;

  activeOrder.statusStep = newStep;
  activeOrder.status = statusMap[newStep].key;
  activeOrder.estimatedArrival = statusMap[newStep].eta;

  persistState();
  renderOrderTracking();
  renderAdminView();
  renderPartnerView();
  renderRiderView();
  showToast(`Order status updated to: ${activeOrder.status.replace('_', ' ').toUpperCase()}`, 'success');
}

function refreshTrackingSimulation() {
  renderOrderTracking();
  showToast('Telemetry refreshed from satellite link', 'info');
}

// ============================================================================
// Customer Dashboard Operations
// ============================================================================
function switchDashTab(tabName) {
  state.activeDashTab = tabName;

  document.querySelectorAll('.dash-nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.tab === tabName);
  });

  const tabIds = ['overview', 'orders', 'favorites', 'addresses', 'profile'];
  tabIds.forEach(t => {
    const el = document.getElementById(`dashTab-${t}`);
    if (el) el.style.display = (t === tabName) ? 'block' : 'none';
  });

  if (tabName === 'orders') renderOrdersHistoryTable('all');
  if (tabName === 'favorites') renderFavoritesTab();
  if (tabName === 'addresses') renderAddressesTab();
}

function renderDashboard() {
  // Metrics
  document.getElementById('dashTotalOrdersMetric').textContent = state.orders.length;
  document.getElementById('dashFavoritesCountMetric').textContent = state.user.favoriteRestaurants.length + state.user.favoriteDishes.length;

  // Recent Orders (Overview)
  const recentContainer = document.getElementById('dashRecentOrdersList');
  if (recentContainer) {
    const recent = state.orders.slice(0, 3);
    recentContainer.innerHTML = recent.map(renderOrderHistoryCard).join('');
  }

  renderOrdersHistoryTable('all');
  renderFavoritesTab();
  renderAddressesTab();
}

function renderOrderHistoryCard(order) {
  const statusColors = {
    delivered: 'status-pill delivered',
    on_the_way: 'status-pill on_the_way',
    preparing: 'status-pill preparing',
    confirmed: 'status-pill confirmed'
  };
  const pillClass = statusColors[order.status] || 'status-pill confirmed';

  return `
    <div class="order-history-card">
      <div class="order-card-top">
        <div class="order-rest-row">
          <img src="${order.restaurantLogo}" alt="${order.restaurantName}" class="order-rest-thumb">
          <div>
            <h4 style="font-size: 1.05rem; color: #fff;">${order.restaurantName}</h4>
            <span style="font-size: 0.78rem; color: var(--text-muted);">${order.date} • ${order.id}</span>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <span class="${pillClass}">${order.status.replace('_', ' ').toUpperCase()}</span>
          <span style="font-size: 1.15rem; font-weight: 800; color: #fff;">$${order.grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.2rem;">
        ${order.items.map(i => `${i.quantity}x ${i.name}`).join(' • ')}
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 0.78rem; color: var(--text-muted);"><i class="fa-solid fa-credit-card"></i> ${order.paymentMethod}</span>
        <div style="display: flex; gap: 0.6rem;">
          <button class="btn btn-secondary btn-sm" onclick="trackSpecificOrder('${order.id}')">
            <i class="fa-solid fa-location-crosshairs"></i> Track
          </button>
          <button class="btn btn-primary btn-sm" onclick="reorderItems('${order.id}')">
            <i class="fa-solid fa-rotate-right"></i> Reorder
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderOrdersHistoryTable(filter) {
  const container = document.getElementById('dashFullOrdersList');
  if (!container) return;

  let list = [...state.orders];
  if (filter === 'active') {
    list = list.filter(o => o.status !== 'delivered');
  } else if (filter === 'delivered') {
    list = list.filter(o => o.status === 'delivered');
  }

  if (list.length === 0) {
    container.innerHTML = `<div class="empty-state-box"><h4>No orders in this filter</h4></div>`;
    return;
  }
  container.innerHTML = list.map(renderOrderHistoryCard).join('');
}

function filterOrderHistory(filter) {
  renderOrdersHistoryTable(filter);
}

function trackSpecificOrder(orderId) {
  state.trackingOrderId = orderId;
  persistState();
  navigateTo('tracker');
}

function reorderItems(orderId) {
  const order = state.orders.find(o => o.id === orderId);
  if (!order) return;

  order.items.forEach(it => {
    state.cart.push({
      ...it,
      id: 'cart-' + Date.now() + Math.random()
    });
  });

  persistState();
  renderCart();
  toggleCartDrawer(true);
  showToast(`Re-added ${order.items.length} dishes to your bag!`, 'success');
}

function renderFavoritesTab() {
  const grid = document.getElementById('dashFavoritesGrid');
  if (!grid) return;

  const favRests = INITIAL_RESTAURANTS.filter(r => state.user.favoriteRestaurants.includes(r.id));
  if (favRests.length === 0) {
    grid.innerHTML = `
      <div class="empty-state-box" style="grid-column: 1 / -1;">
        <div class="empty-state-icon"><i class="fa-solid fa-heart"></i></div>
        <h4>No Favorites Yet</h4>
        <p style="color: var(--text-secondary); font-size: 0.85rem;">Click the heart icon on any restaurant to save it here for fast re-ordering.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = favRests.map(rest => `
    <div class="restaurant-card" onclick="openRestaurantMenu('${rest.id}')">
      <div class="rest-card-img-wrap">
        <img src="${rest.cover}" alt="${rest.name}">
        <button class="rest-fav-btn is-fav" onclick="event.stopPropagation(); toggleRestaurantFavorite('${rest.id}')">
          <i class="fa-solid fa-heart"></i>
        </button>
      </div>
      <div class="rest-card-content">
        <div class="rest-header-row">
          <h4 class="rest-name">${rest.name}</h4>
          <span class="rest-rating-pill"><i class="fa-solid fa-star"></i> ${rest.rating}</span>
        </div>
        <p class="rest-desc">${rest.description}</p>
        <button class="btn btn-primary btn-sm" style="margin-top: 0.8rem;" onclick="event.stopPropagation(); openRestaurantMenu('${rest.id}')">
          View Menu
        </button>
      </div>
    </div>
  `).join('');
}

function renderAddressesTab() {
  const container = document.getElementById('dashAddressesList');
  if (!container) return;

  container.innerHTML = state.user.addresses.map(addr => `
    <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.4rem; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.3rem;">
          <h4 style="color: #fff;">${addr.title}</h4>
          ${addr.isDefault ? '<span class="badge badge-success">DEFAULT</span>' : ''}
        </div>
        <p style="color: var(--text-secondary); font-size: 0.85rem;">${addr.street}, ${addr.area}, ${addr.city}</p>
        <p style="color: var(--text-muted); font-size: 0.78rem;"><i class="fa-solid fa-bell"></i> ${addr.instructions}</p>
      </div>
      <button class="btn btn-secondary btn-sm" onclick="showToast('Address selected as delivery destination', 'success')">
        Use Address
      </button>
    </div>
  `).join('');
}

function saveProfileChanges(e) {
  e.preventDefault();
  state.user.name = document.getElementById('profNameInput').value;
  state.user.email = document.getElementById('profEmailInput').value;
  state.user.phone = document.getElementById('profPhoneInput').value;
  persistState();
  updateUserHeaderPill();
  showToast('Profile information successfully updated!', 'success');
}

function openNewAddressPrompt() {
  const newStreet = prompt('Enter delivery address & unit number:');
  if (newStreet) {
    state.user.addresses.push({
      id: 'addr-' + Date.now(),
      title: 'Secondary Address',
      street: newStreet,
      area: 'Metropolis',
      city: 'Metropolis',
      isDefault: false,
      instructions: 'Standard delivery'
    });
    persistState();
    renderAddressesTab();
    showToast('New delivery address added!', 'success');
  }
}

// ============================================================================
// Offers & Promotions Showcase
// ============================================================================
function renderOffers() {
  const grid = document.getElementById('offersCardsGrid');
  if (!grid) return;

  grid.innerHTML = INITIAL_PROMOS.map(promo => `
    <div class="offer-card">
      <div>
        <span class="badge badge-primary" style="margin-bottom: 0.6rem;"><i class="fa-solid fa-tag"></i> ${promo.expiry}</span>
        <h3 style="font-size: 1.4rem; margin-bottom: 0.4rem; color: #fff;">
          ${promo.discountPercent ? `${promo.discountPercent}% OFF Entire Order` : (promo.isFreeDelivery ? 'Free Delivery Pass' : `$${promo.discountAmount} Flat Discount`)}
        </h3>
        <p style="color: var(--text-secondary); font-size: 0.88rem;">${promo.description}</p>
      </div>

      <div>
        <div class="offer-code-pill" onclick="copyAndApplyPromo('${promo.code}')" title="Click to copy & apply">
          <span>${promo.code}</span>
          <i class="fa-regular fa-copy"></i>
        </div>
        <button class="btn btn-primary btn-md" style="width: 100%;" onclick="copyAndApplyPromo('${promo.code}')">
          Apply to Cart
        </button>
      </div>
    </div>
  `).join('');
}

// ============================================================================
// Admin Portal & Executive Intelligence
// ============================================================================
function renderAdminView() {
  const ordersBody = document.getElementById('adminOrdersTableBody');
  if (!ordersBody) return;

  // KPIs
  const totalRev = state.orders.reduce((sum, o) => sum + o.grandTotal, 0);
  const revenueEl = document.getElementById('adminKpiRevenue');
  const ordersEl = document.getElementById('adminKpiOrders');
  if (revenueEl) revenueEl.textContent = `$${(128450 + totalRev).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  if (ordersEl) ordersEl.textContent = (4820 + state.orders.length).toLocaleString();

  // Orders Table
  ordersBody.innerHTML = state.orders.map(order => {
    const statusPillClass = {
      delivered: 'status-pill delivered',
      on_the_way: 'status-pill on_the_way',
      preparing: 'status-pill preparing',
      confirmed: 'status-pill confirmed'
    }[order.status] || 'status-pill confirmed';

    return `
      <tr>
        <td style="font-weight: 700; color: #fff;">${order.id}</td>
        <td>${order.recipient || 'Sophia Montgomery'}</td>
        <td>${order.restaurantName}</td>
        <td style="font-weight: 700; color: var(--primary);">$${order.grandTotal.toFixed(2)}</td>
        <td>${order.paymentMethod}</td>
        <td><span class="${statusPillClass}">${order.status.replace('_', ' ').toUpperCase()}</span></td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="trackSpecificOrder('${order.id}')" title="Inspect Telemetry">
            <i class="fa-solid fa-eye"></i> View
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function filterAdminOrders(query) {
  const q = query.toLowerCase().trim();
  const rows = document.querySelectorAll('#adminOrdersTableBody tr');
  rows.forEach(r => {
    const text = r.textContent.toLowerCase();
    r.style.display = text.includes(q) ? '' : 'none';
  });
}

function exportAdminReport() {
  showToast('Generating audit report PDF & CSV package...', 'info');
  setTimeout(() => {
    showToast('Executive audit report downloaded successfully!', 'success');
  }, 1000);
}

// ============================================================================
// Restaurant Partner Kitchen Display System (KDS)
// ============================================================================
function renderPartnerView() {
  const grid = document.getElementById('kitchenTicketsGrid');
  if (!grid) return;

  const activeOrders = state.orders.filter(o => o.status !== 'delivered');
  const countEl = document.getElementById('kitchenActiveTicketsCount');
  if (countEl) countEl.textContent = activeOrders.length;

  if (activeOrders.length === 0) {
    grid.innerHTML = `
      <div class="empty-state-box" style="grid-column: 1 / -1;">
        <div class="empty-state-icon"><i class="fa-solid fa-bell"></i></div>
        <h3>No Pending Kitchen Tickets</h3>
        <p style="color: var(--text-secondary);">All incoming order batches are prepared and handed to couriers.</p>
        <button class="btn btn-primary btn-sm" onclick="addNewKitchenOrderDemo()">Simulate Incoming Order</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = activeOrders.map(order => `
    <div class="kitchen-ticket-card">
      <div class="ticket-header">
        <div>
          <span style="font-size: 0.76rem; color: var(--text-muted); font-weight: 700;">TICKET ${order.id}</span>
          <h4 style="color: #fff; font-size: 1.1rem;">${order.restaurantName}</h4>
        </div>
        <span class="status-pill ${order.status}">${order.status.replace('_', ' ').toUpperCase()}</span>
      </div>

      <div class="ticket-items-list">
        ${order.items.map(it => `
          <div class="ticket-item-row">
            <span><strong>${it.quantity}x</strong> ${it.name} (${it.size})</span>
            <span style="color: var(--text-muted); font-size: 0.8rem;">Ready in 8m</span>
          </div>
        `).join('')}
      </div>

      <div style="display: flex; gap: 0.6rem; margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--border-subtle);">
        <button class="btn btn-secondary btn-sm" style="flex: 1;" onclick="advanceKitchenTicket('${order.id}', 'preparing')">
          <i class="fa-solid fa-fire-burner"></i> Cook
        </button>
        <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="advanceKitchenTicket('${order.id}', 'picked_up')">
          <i class="fa-solid fa-check"></i> Ready
        </button>
      </div>
    </div>
  `).join('');
}

function advanceKitchenTicket(orderId, newStatus) {
  const order = state.orders.find(o => o.id === orderId);
  if (!order) return;

  order.status = newStatus;
  if (newStatus === 'preparing') order.statusStep = 2;
  if (newStatus === 'picked_up') order.statusStep = 3;

  persistState();
  renderPartnerView();
  renderOrderTracking();
  renderAdminView();
  showToast(`Kitchen Ticket #${orderId} marked as ${newStatus.toUpperCase()}`, 'success');
}

function addNewKitchenOrderDemo() {
  const demoOrder = {
    id: 'ORD-' + Math.floor(10000 + Math.random() * 90000),
    date: new Date().toISOString().replace('T', ' ').substring(0, 16),
    restaurantId: 'rest-1',
    restaurantName: 'The Artisan Charcoal Grill',
    restaurantLogo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80',
    status: 'confirmed',
    statusStep: 1,
    estimatedArrival: '25 mins',
    items: [
      { id: 'dish-1', name: 'Prime Tomahawk Ribeye Steak', size: 'Master Cut (32oz)', quantity: 1, price: 64.50 },
      { id: 'dish-3', name: 'Flame Grilled Lamb Chops', size: '3 Pieces', quantity: 1, price: 32.00 }
    ],
    subtotal: 96.50,
    deliveryFee: 1.99,
    tax: 7.72,
    discount: 0.00,
    grandTotal: 106.21,
    paymentMethod: 'Credit Card (•••• 4892)',
    deliveryAddress: 'Skyline Terrace 12A, Downtown',
    rider: {
      name: 'Alexandre Sterling',
      phone: '+1 (555) 928-3011',
      vehicle: 'Yamaha MT-07 Midnight Edition'
    }
  };
  state.orders.unshift(demoOrder);
  persistState();
  renderPartnerView();
  renderAdminView();
  showToast('New ticket arrived on kitchen screen! 🔔', 'info');
}

// ============================================================================
// Courier Rider Operations & Dispatch
// ============================================================================
function renderRiderView() {
  const activeOrder = state.orders.find(o => o.status !== 'delivered') || state.orders[0];
  if (!activeOrder) return;

  document.getElementById('riderTripTitle').textContent = `Order #${activeOrder.id}`;
  document.getElementById('riderPickupName').textContent = activeOrder.restaurantName;
}

function handleRiderAction(action) {
  const activeOrder = state.orders.find(o => o.status !== 'delivered') || state.orders[0];
  if (!activeOrder) return;

  if (action === 'arrived') {
    showToast('Marked arrived at restaurant pickup point', 'info');
  } else if (action === 'picked_up') {
    activeOrder.status = 'picked_up';
    activeOrder.statusStep = 3;
    showToast('Package secured in thermal bag! Status: Picked Up', 'success');
  } else if (action === 'on_the_way') {
    activeOrder.status = 'on_the_way';
    activeOrder.statusStep = 4;
    showToast('GPS telemetry transmitting: On The Way to customer', 'success');
  } else if (action === 'delivered') {
    activeOrder.status = 'delivered';
    activeOrder.statusStep = 5;
    showToast('Delivery completed! Trip fare $8.50 credited to your wallet 💰', 'success');
  }

  persistState();
  renderRiderView();
  renderOrderTracking();
  renderAdminView();
  renderPartnerView();
}

function acceptNewTripPrompt(restaurantName) {
  showToast(`Accepted delivery job for ${restaurantName}! Route loaded.`, 'success');
}

// ============================================================================
// Global Live Search Modal
// ============================================================================
function openSearchModal() {
  const overlay = document.getElementById('globalSearchOverlay');
  if (overlay) {
    overlay.classList.add('open');
    const input = document.getElementById('globalSearchField');
    if (input) {
      input.value = '';
      input.focus();
    }
    handleGlobalLiveSearch('');
  }
}

function closeSearchModal() {
  const overlay = document.getElementById('globalSearchOverlay');
  if (overlay) overlay.classList.remove('open');
}

function handleSearchOverlayClick(e) {
  if (e.target.id === 'globalSearchOverlay') {
    closeSearchModal();
  }
}

function handleHeroSearch(e) {
  if (e.key === 'Enter') {
    submitHeroSearch();
  }
}

function submitHeroSearch() {
  const input = document.getElementById('heroSearchInput');
  const val = input ? input.value.trim() : '';
  if (val) {
    openSearchModal();
    const field = document.getElementById('globalSearchField');
    if (field) {
      field.value = val;
      handleGlobalLiveSearch(val);
    }
  }
}

function searchTagQuick(tag) {
  const field = document.getElementById('globalSearchField');
  if (field) {
    field.value = tag;
    handleGlobalLiveSearch(tag);
  }
}

function handleGlobalLiveSearch(query) {
  const tray = document.getElementById('searchResultsTray');
  if (!tray) return;

  const q = query.trim().toLowerCase();
  if (!q) {
    tray.innerHTML = `
      <div style="text-align: center; color: var(--text-muted); padding: 2rem;">
        Type to search gourmet burgers, woodfired pizzas, biryani, or restaurants...
      </div>
    `;
    return;
  }

  // Search matching restaurants
  const matchedRests = INITIAL_RESTAURANTS.filter(r => 
    r.name.toLowerCase().includes(q) || 
    r.cuisine.toLowerCase().includes(q) || 
    r.description.toLowerCase().includes(q)
  );

  // Search matching dishes
  const matchedDishes = INITIAL_MENU_ITEMS.filter(d => 
    d.name.toLowerCase().includes(q) || 
    d.description.toLowerCase().includes(q)
  );

  if (matchedRests.length === 0 && matchedDishes.length === 0) {
    tray.innerHTML = `
      <div class="empty-state-box">
        <div class="empty-state-icon"><i class="fa-solid fa-magnifying-glass"></i></div>
        <h4>No Culinary Matches for "${query}"</h4>
        <p style="color: var(--text-muted); font-size: 0.85rem;">Check for typos or try searching "Steak", "Pizza", or "Biryani".</p>
      </div>
    `;
    return;
  }

  let html = '';

  if (matchedRests.length) {
    html += `<div style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; margin-bottom: 0.4rem;">Restaurants (${matchedRests.length})</div>`;
    html += matchedRests.map(r => `
      <div class="search-result-item" onclick="closeSearchModal(); openRestaurantMenu('${r.id}')">
        <img src="${r.logo}" alt="${r.name}" class="search-item-thumb">
        <div style="flex: 1;">
          <h5 style="color: #fff; font-size: 0.95rem;">${r.name}</h5>
          <span style="font-size: 0.78rem; color: var(--text-secondary);">${r.cuisine} • ${r.rating}★ • ${r.deliveryTime}</span>
        </div>
        <span class="btn btn-outline-primary btn-sm">Menu <i class="fa-solid fa-arrow-right"></i></span>
      </div>
    `).join('');
  }

  if (matchedDishes.length) {
    html += `<div style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; margin: 1rem 0 0.4rem;">Dishes & Meals (${matchedDishes.length})</div>`;
    html += matchedDishes.map(d => `
      <div class="search-result-item" onclick="closeSearchModal(); openFoodModal('${d.id}')">
        <img src="${d.image}" alt="${d.name}" class="search-item-thumb">
        <div style="flex: 1;">
          <h5 style="color: #fff; font-size: 0.95rem;">${d.name}</h5>
          <span style="font-size: 0.78rem; color: var(--text-secondary);">${d.category} • $${d.price.toFixed(2)}</span>
        </div>
        <span class="btn btn-primary btn-sm"><i class="fa-solid fa-plus"></i> Add</span>
      </div>
    `).join('');
  }

  tray.innerHTML = html;
}

// ============================================================================
// Auth & Demo Reset
// ============================================================================
function openAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) modal.classList.add('open');
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) modal.classList.remove('open');
}

function resetDemoStatePrompt() {
  if (confirm('Reset FeastFlow sandbox to default demo state? All mock orders and cart items will return to factory seed data.')) {
    localStorage.removeItem(APP_STORAGE_KEY);
    state = { ...defaultState };
    closeAuthModal();
    window.location.reload();
  }
}

function openAddressSelector() {
  const addr = prompt('Update active delivery address:', 'Penthouse 14B, Sapphire Sky Residences, Downtown Central');
  if (addr) {
    document.getElementById('heroCurrentLocation').textContent = addr;
    showToast(`Delivery location set to: ${addr}`, 'success');
  }
}

function toggleMobileNav() {
  const links = document.getElementById('mainNavLinks');
  if (links) {
    const isShown = links.style.display === 'flex';
    links.style.display = isShown ? 'none' : 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'absolute';
    links.style.top = '74px';
    links.style.left = '0';
    links.style.right = '0';
    links.style.background = 'rgba(10, 15, 26, 0.98)';
    links.style.padding = '1.5rem';
    links.style.borderBottom = '1px solid var(--border-glass)';
  }
}

// ============================================================================
// Toast Notification Engine
// ============================================================================
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-msg ${type}`;
  
  const iconMap = {
    success: 'fa-circle-check',
    warning: 'fa-triangle-exclamation',
    danger: 'fa-circle-xmark',
    info: 'fa-bell'
  };
  const icon = iconMap[type] || 'fa-bell';

  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger enter animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto dismiss after 3.5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 400);
  }, 3500);
}
