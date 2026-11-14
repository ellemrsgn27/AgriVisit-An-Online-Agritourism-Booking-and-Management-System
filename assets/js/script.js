document.addEventListener("DOMContentLoaded", init);

function init() {
  initMobileNavigation();
  initViewSwitcher();
  initHomeSearch();
  initCategoryChips();
  initExperienceTabs();
  initFiltersPanel();
  initDiscoveryFilters();
  initFarmSelection();
  initMapControls();
  initGuestStepper();
  initCheckoutForm();
  initAuthForms();
  initBookingTabs();
  initTicketToggle();
  initReviewForm();
  initOwnerBookingList();
  initCheckinPanel();
  initOwnerReviewTabs();
  drawTicketQr();
}

function initMobileNavigation() {
  const toggle = document.getElementById("nav-toggle");
  const navigation = document.getElementById("primary-navigation");
  if (!toggle || !navigation) return;

  const setOpen = (open) => {
    navigation.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  toggle.addEventListener("click", () => {
    setOpen(!navigation.classList.contains("is-open"));
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a") && window.innerWidth <= 860) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) setOpen(false);
  });
}

function initViewSwitcher() {
  const views = Array.from(document.querySelectorAll(".view"));
  const consoleRoot = document.getElementById("console");
  const panels = Array.from(document.querySelectorAll(".console-panel"));
  const consoleLinks = Array.from(document.querySelectorAll("[data-console-target]"));
  const crumb = document.getElementById("console-crumb");
  if (!views.length) return;

  const viewNames = views.map((view) => view.id.replace("view-", ""));

  const showTouristView = (name) => {
    views.forEach((view) => {
      const active = view.id === `view-${name}`;
      view.hidden = !active;
      view.classList.toggle("is-active", active);
    });

    if (consoleRoot) consoleRoot.hidden = true;
    document.body.classList.remove("is-console");

    document.querySelectorAll(".primary-navigation__link").forEach((link) => {
      link.classList.toggle("is-active", link.dataset.viewTarget === name);
    });

    document.getElementById("site-header")?.removeAttribute("hidden");
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  };

  const showConsolePanel = (name) => {
    views.forEach((view) => {
      view.hidden = true;
      view.classList.remove("is-active");
    });

    if (!consoleRoot) return;
    consoleRoot.hidden = false;
    document.body.classList.add("is-console");

    panels.forEach((panel) => panel.classList.toggle("is-active", panel.id === `panel-${name}`));

    consoleLinks.forEach((link) => {
      if (!link.classList.contains("console-navigation__link")) return;
      link.classList.toggle("is-active", link.dataset.consoleTarget === name);
    });

    if (crumb) {
      const link = consoleLinks.find((item) => item.dataset.consoleTarget === name && item.textContent);
      crumb.textContent = link ? link.textContent.trim() : "Workspace";
    }

    window.scrollTo({ top: 0 });
  };

  const route = (target) => {
    if (target && target.startsWith("owner-")) {
      showConsolePanel(target);
      return;
    }
    if (viewNames.includes(target)) showTouristView(target);
  };

  document.querySelectorAll("[data-view-target], [data-console-target]").forEach((control) => {
    control.addEventListener("click", (event) => {
      const target = control.dataset.viewTarget || control.dataset.consoleTarget;
      if (!target) return;
      event.preventDefault();
      route(target);
      history.replaceState(null, "", `#${target.startsWith("owner-") ? "workspace" : `view-${target}`}`);
    });
  });

  const initial = window.location.hash.replace("#", "");
  if (initial === "workspace") showConsolePanel("owner-overview");
  else if (initial.startsWith("view-")) route(initial.replace("view-", ""));
}

function initHomeSearch() {
  const form = document.getElementById("home-search");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    document.querySelector('[data-view-target="discovery"]')?.click();
  });
}

function initCategoryChips() {
  const chips = Array.from(document.querySelectorAll(".category-chip"));
  if (!chips.length) return;

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((other) => other.classList.toggle("is-active", other === chip));
    });
  });
}

function initExperienceTabs() {
  const tabs = Array.from(document.querySelectorAll("[data-experience]"));
  const grid = document.getElementById("experience-grid");
  if (!tabs.length || !grid) return;

  const cards = Array.from(grid.querySelectorAll(".experience-card"));

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((other) => {
        const active = other === tab;
        other.classList.toggle("is-active", active);
        other.setAttribute("aria-selected", String(active));
      });

      const filter = tab.dataset.experience;
      cards.forEach((card) => {
        card.hidden = filter !== "all" && card.dataset.category !== filter;
      });
    });
  });
}

function initGuestStepper() {
  const stepper = document.getElementById("guest-stepper");
  const output = document.getElementById("guest-count");
  const summaryGuests = document.getElementById("summary-guests");
  const summaryTotal = document.getElementById("summary-total");
  if (!stepper || !output) return;

  const basePrice = 650;
  const bookingFee = 100;
  const maxGuests = 8;
  let guests = Number(output.textContent) || 1;

  const render = () => {
    output.textContent = String(guests);
    if (summaryGuests) summaryGuests.textContent = String(guests);
    if (summaryTotal) {
      summaryTotal.textContent = `\u20b1${(basePrice * guests + bookingFee).toLocaleString("en-PH")}`;
    }
  };

  stepper.querySelectorAll(".guest-stepper__button").forEach((button) => {
    button.addEventListener("click", () => {
      const step = Number(button.dataset.step);
      guests = Math.max(1, Math.min(maxGuests, guests + step));
      render();
    });
  });

  render();
}

function initCheckoutForm() {
  const form = document.getElementById("checkout-form");
  const note = document.getElementById("checkout-note");
  if (!form || !note) return;

  form.querySelectorAll(".payment-option input").forEach((input) => {
    input.addEventListener("change", () => {
      form.querySelectorAll(".payment-option").forEach((option) => {
        option.classList.toggle("is-selected", option.contains(input) && input.checked);
      });
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const guestCount = Number(document.getElementById("guest-count")?.textContent) || 1;
    const firstName = form.querySelector("#checkout-first")?.value.trim() || "Guest";

    note.classList.add("is-success");
    note.textContent = `Slot held for ${firstName}. ${guestCount} ${guestCount === 1 ? "guest" : "guests"} \u00b7 your QR ticket appears in My bookings once the host confirms.`;
    document.querySelector('[data-view-target="bookings"]')?.click();
  });
}

function initAuthForms() {
  const validate = (form, messageEl, rules) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const error = rules();

      if (error) {
        messageEl.classList.remove("is-success");
        messageEl.classList.add("is-error");
        messageEl.textContent = error;
        return;
      }

      messageEl.classList.remove("is-error");
      messageEl.classList.add("is-success");
      messageEl.textContent = "All set \u2014 your details look good.";
    });
  };

  const loginForm = document.getElementById("login-form");
  const loginMessage = document.getElementById("login-message");
  if (loginForm && loginMessage) {
    validate(loginForm, loginMessage, () => {
      const email = loginForm.querySelector("#login-email").value.trim();
      const password = loginForm.querySelector("#login-password").value;
      if (!email || !email.includes("@")) return "Enter the email address you registered with.";
      if (!password) return "Enter your password.";
      return null;
    });
  }

  const touristForm = document.getElementById("tourist-register-form");
  const touristMessage = document.getElementById("tourist-register-message");
  if (touristForm && touristMessage) {
    validate(touristForm, touristMessage, () => {
      const email = touristForm.querySelector("#tr-email").value.trim();
      const password = touristForm.querySelector("#tr-password").value;
      const confirm = touristForm.querySelector("#tr-confirm").value;
      if (!email || !email.includes("@")) return "Enter a valid email address.";
      if (password.length < 12) return "Use at least 12 characters for your password.";
      if (password !== confirm) return "The two passwords do not match.";
      return null;
    });
  }

  const ownerForm = document.getElementById("owner-register-form");
  const ownerMessage = document.getElementById("owner-register-message");
  if (ownerForm && ownerMessage) {
    validate(ownerForm, ownerMessage, () => {
      const email = ownerForm.querySelector("#or-email").value.trim();
      const password = ownerForm.querySelector("#or-password").value;
      const confirm = ownerForm.querySelector("#or-confirm").value;
      const farm = ownerForm.querySelector("#or-farm").value.trim();
      if (!farm) return "Add the public name of your farm.";
      if (!email || !email.includes("@")) return "Enter a valid email address.";
      if (password.length < 12) return "Use at least 12 characters for your password.";
      if (password !== confirm) return "The two passwords do not match.";
      return null;
    });
  }
}

function initOwnerBookingList() {
  const list = document.getElementById("owner-booking-list");
  if (!list) return;

  const tabs = Array.from(document.querySelectorAll("[data-owner-status]"));
  const rows = Array.from(list.querySelectorAll(".owner-booking-row"));

  const applyFilter = (status) => {
    rows.forEach((row) => {
      row.hidden = status !== "all" && row.dataset.status !== status;
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((other) => {
        const active = other === tab;
        other.classList.toggle("is-active", active);
        other.setAttribute("aria-selected", String(active));
      });
      applyFilter(tab.dataset.ownerStatus);
    });
  });

  list.querySelectorAll("[data-confirm-booking]").forEach((button) => {
    button.addEventListener("click", () => {
      const row = button.closest(".owner-booking-row");
      if (!row) return;

      row.dataset.status = "confirmed";

      const status = row.querySelector(".booking-status");
      if (status) {
        status.classList.remove("booking-status--pending");
        status.classList.add("booking-status--confirmed");
        status.textContent = "Confirmed";
      }

      const actions = row.querySelector(".owner-booking-row__actions");
      if (actions) {
        actions.innerHTML = '<button class="button button--ghost" type="button">Message guest</button>';
      }
    });
  });
}

function initCheckinPanel() {
  const result = document.getElementById("ticket-result");
  const refOutput = document.getElementById("ticket-result-ref");
  const input = document.getElementById("checkin-ref");
  const note = document.getElementById("ticket-result-note");
  if (!result || !refOutput || !input) return;

  const showTicket = (reference) => {
    refOutput.textContent = reference;
    result.hidden = false;
    if (note) note.textContent = "";
  };

  document.getElementById("checkin-lookup")?.addEventListener("click", () => {
    const value = input.value.trim() || "AGV-261114-084";
    showTicket(value.toUpperCase());
  });

  document.getElementById("simulate-scan")?.addEventListener("click", () => {
    input.value = "AGV-261114-084";
    showTicket("AGV-261114-084");
  });

  document.getElementById("checkin-confirm")?.addEventListener("click", (event) => {
    if (note) note.textContent = "Checked in \u2014 3 guests are on the farm.";
    event.currentTarget.disabled = true;
    event.currentTarget.textContent = "Group checked in";
  });
}

function initOwnerReviewTabs() {
  const tabs = Array.from(document.querySelectorAll("#panel-owner-reviews .booking-tabs__tab"));
  const rows = Array.from(document.querySelectorAll("#panel-owner-reviews .review-admin-row"));
  if (!tabs.length || !rows.length) return;

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      tabs.forEach((other) => {
        const active = other === tab;
        other.classList.toggle("is-active", active);
        other.setAttribute("aria-selected", String(active));
      });

      rows.forEach((row) => {
        const pending = row.querySelector(".booking-status--pending") !== null;
        row.hidden = (index === 1 && pending) || (index === 2 && !pending);
      });
    });
  });
}

function initFiltersPanel() {
  const toggle = document.getElementById("filters-toggle");
  const panel = document.getElementById("price-rating-panel");
  const label = document.getElementById("filters-toggle-label");
  if (!toggle || !panel) return;

  toggle.addEventListener("click", () => {
    const open = panel.hasAttribute("hidden");
    panel.toggleAttribute("hidden", !open);
    toggle.setAttribute("aria-expanded", String(open));
    if (label) label.textContent = open ? "Filters shown" : "Filters hidden";
  });
}

function initDiscoveryFilters() {
  const form = document.getElementById("discovery-filters");
  const list = document.getElementById("farm-list");
  const heading = document.getElementById("results-heading");
  const note = document.getElementById("filters-note");
  const clearButton = document.getElementById("clear-filters");
  if (!form || !list || !heading) return;

  const cards = Array.from(list.querySelectorAll(".farm-card"));
  const experience = document.getElementById("filter-experience");
  const price = document.getElementById("filter-price");
  const rating = document.getElementById("filter-rating");

  const matchesPrice = (value, cardPrice) => {
    switch (value) {
      case "under-500":
        return cardPrice < 500;
      case "500-800":
        return cardPrice >= 500 && cardPrice <= 800;
      case "over-800":
        return cardPrice > 800;
      default:
        return true;
    }
  };

  const applyFilters = (event) => {
    if (event) event.preventDefault();

    const category = experience ? experience.value : "all";
    const priceValue = price ? price.value : "any";
    const ratingValue = rating ? rating.value : "any";
    const minimumRating = ratingValue === "any" ? 0 : Number(ratingValue);

    let visible = 0;

    cards.forEach((card) => {
      const cardPrice = Number(card.dataset.price);
      const cardRating = Number(card.dataset.rating);
      const show =
        (category === "all" || card.dataset.category === category) &&
        matchesPrice(priceValue, cardPrice) &&
        cardRating >= minimumRating;

      card.hidden = !show;
      if (show) visible += 1;
    });

    heading.textContent = `${visible} ${visible === 1 ? "farm" : "farms"} for your Saturday`;

    if (note) {
      const parts = [];
      if (category !== "all") parts.push("experience");
      if (priceValue !== "any") parts.push("price");
      if (ratingValue !== "any") parts.push("rating");
      note.textContent = parts.length
        ? `Showing farms that match your ${parts.join(", ")} filters.`
        : "Combines with location and experience filters. Any price and all ratings are selected, so all current results stay visible.";
    }

    if (window.innerWidth <= 860 && event) {
      list.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  form.addEventListener("submit", applyFilters);

  const applyButton = document.getElementById("apply-filters");
  if (applyButton) {
    applyButton.addEventListener("click", (event) => {
      event.preventDefault();
      form.requestSubmit();
    });
  }

  [experience, price, rating].forEach((select) => {
    if (select) select.addEventListener("change", applyFilters);
  });

  if (clearButton) {
    clearButton.addEventListener("click", () => {
      form.reset();
      applyFilters();
    });
  }
}

function initFarmSelection() {
  const list = document.getElementById("farm-list");
  if (!list) return;

  const cards = Array.from(list.querySelectorAll(".farm-card"));
  const markers = Array.from(document.querySelectorAll(".map-price-marker"));
  const preview = document.querySelector(".selected-farm-preview");
  const previewName = preview ? preview.querySelector(".selected-farm-preview__name") : null;
  const previewMeta = preview ? preview.querySelector(".selected-farm-preview__meta") : null;

  const select = (price) => {
    cards.forEach((card) => card.classList.toggle("is-selected", card.dataset.price === price));
    markers.forEach((marker) => {
      const active = marker.classList.contains(`map-price-marker--${price}`);
      marker.classList.toggle("is-active", active);
    });

    const card = cards.find((item) => item.dataset.price === price);
    if (!card || !preview) return;

    const name = card.querySelector(".farm-result-information__name");
    const rating = card.querySelector(".rating");
    const category = card.querySelector(".farm-result-information__category");

    if (previewName && name) previewName.textContent = name.textContent.trim();
    if (previewMeta && rating && category) {
      const score = rating.textContent.trim().split(" ")[0];
      previewMeta.textContent = `${score} \u00b7 ${category.textContent.trim()}`;
    }
  };

  cards.forEach((card) => {
    card.addEventListener("click", () => select(card.dataset.price));
  });

  markers.forEach((marker) => {
    marker.addEventListener("click", () => {
      const price = marker.classList[1].replace("map-price-marker--", "");
      select(price);
      document.querySelector(`.farm-card[data-price="${price}"]`)?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
  });
}

function initMapControls() {
  const canvas = document.getElementById("map-canvas");
  if (!canvas) return;

  let zoom = 1;

  const apply = () => {
    canvas.style.transform = `scale(${zoom})`;
    canvas.style.transformOrigin = "50% 50%";
    canvas.style.transition = "transform 220ms cubic-bezier(0.32, 0.72, 0.3, 1)";
  };

  document.getElementById("map-zoom-in")?.addEventListener("click", () => {
    zoom = Math.min(1.6, zoom + 0.1);
    apply();
  });

  document.getElementById("map-zoom-out")?.addEventListener("click", () => {
    zoom = Math.max(0.9, zoom - 0.1);
    apply();
  });

  document.getElementById("map-recenter")?.addEventListener("click", () => {
    zoom = 1;
    apply();
  });
}

function initBookingTabs() {
  const tabs = Array.from(document.querySelectorAll(".booking-tabs__tab"));
  if (!tabs.length) return;

  const list = document.getElementById("booking-list");
  const empty = document.getElementById("booking-empty");
  const items = list ? Array.from(list.querySelectorAll("[data-status]")) : [];

  const filter = (status) => {
    let visible = 0;

    items.forEach((item) => {
      const show = status === "all" || item.dataset.status === status;
      item.hidden = !show;
      if (show) visible += 1;
    });

    if (empty) empty.hidden = visible > 0;
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((other) => {
        const active = other === tab;
        other.classList.toggle("is-active", active);
        other.setAttribute("aria-selected", String(active));
      });
      filter(tab.dataset.status);
    });
  });
}

function initTicketToggle() {
  const toggles = document.querySelectorAll(".booking-card__ticket-toggle");
  toggles.forEach((toggle) => {
    const bodyId = toggle.getAttribute("aria-controls");
    const body = bodyId ? document.getElementById(bodyId) : null;
    const cardBody = body ? body.closest(".booking-card__body") : null;
    if (!cardBody) return;

    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      cardBody.classList.toggle("is-collapsed", open);
    });
  });
}

function initReviewForm() {
  const form = document.getElementById("review-form");
  if (!form) return;

  const stars = Array.from(form.querySelectorAll(".review-card__star"));
  const textarea = form.querySelector("#review-text");
  const note = document.getElementById("review-note");
  let rating = stars.length;

  const paint = (value) => {
    stars.forEach((star, index) => {
      const filled = index < value;
      star.classList.toggle("is-filled", filled);
      star.setAttribute("aria-checked", String(index + 1 === value));
    });
  };

  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      rating = index + 1;
      paint(rating);
    });

    star.addEventListener("mouseenter", () => {
      stars.forEach((item, i) => item.classList.toggle("is-filled", i <= index));
    });

    star.addEventListener("mouseleave", () => paint(rating));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = textarea ? textarea.value.trim() : "";

    if (!text) {
      note.textContent = "Write a few words before submitting your review.";
      note.classList.remove("is-success");
      note.classList.add("is-error");
      textarea?.focus();
      return;
    }

    if (rating === 0) {
      note.textContent = "Tap a star to give your visit a rating.";
      note.classList.remove("is-success");
      note.classList.add("is-error");
      return;
    }

    note.textContent = "Thank you \u2014 your review is queued for moderation.";
    note.classList.remove("is-error");
    note.classList.add("is-success");
    form.reset();
    paint(stars.length);
  });
}

function drawTicketQr() {
  const svg = document.getElementById("ticket-qr");
  if (!svg) return;

  const size = 25;
  const seed = "AGV-261114-084";
  let hash = 2166136261;

  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash ^ seed.charCodeAt(i)) * 16777259;
    hash = hash >>> 0;
  }

  const isFinderZone = (x, y) =>
    (x < 7 && y < 7) || (x >= size - 7 && y < 7) || (x < 7 && y >= size - 7);

  let rects = "";

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (isFinderZone(x, y)) continue;

      hash = (hash * 1103515245 + 12345) >>> 0;
      const on = (hash >>> 8) % 100 < 46;

      if (on) rects += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
    }
  }

  const finder = (x, y) =>
    `<rect x="${x}" y="${y}" width="7" height="7" fill="none" stroke="currentColor" stroke-width="1"/>` +
    `<rect x="${x + 2}" y="${y + 2}" width="3" height="3"/>`;

  svg.innerHTML =
    rects +
    finder(0, 0) +
    finder(size - 7, 0) +
    finder(0, size - 7);
}
