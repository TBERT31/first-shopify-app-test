(function () {
  var rootSelector = "[data-like-button]";
  var storagePrefix = "like-button-visitor-id";

  function getOrCreateVisitorId() {
    try {
      var existingId = window.localStorage.getItem(storagePrefix);

      if (existingId) {
        return existingId;
      }

      var newId =
        window.crypto && window.crypto.randomUUID
          ? window.crypto.randomUUID()
          : String(Date.now()) + "-" + String(Math.random()).slice(2);

      window.localStorage.setItem(storagePrefix, newId);
      return newId;
    } catch (error) {
      return String(Date.now()) + "-" + String(Math.random()).slice(2);
    }
  }

  function getStateUrl(root) {
    var endpoint = root.dataset.endpoint || "/apps/like-product";
    var params = new URLSearchParams({
      productId: root.dataset.productId || "",
      visitorId: getOrCreateVisitorId(),
    });

    return endpoint + "?" + params.toString();
  }

  function render(root, state) {
    var button = root.querySelector("[data-like-button-trigger]");
    var label = root.querySelector("[data-like-button-label]");
    var count = root.querySelector("[data-like-button-count]");
    var likeLabel = root.dataset.likeLabel || "Like";
    var likedLabel = root.dataset.likedLabel || "Liked";
    var liked = Boolean(state && state.liked);

    if (!button) {
      return;
    }

    root.hidden = Boolean(state && state.disabled);
    button.setAttribute("aria-pressed", liked ? "true" : "false");
    button.setAttribute("aria-label", liked ? likedLabel : likeLabel);

    if (label) {
      label.textContent = liked ? likedLabel : likeLabel;
    }

    if (count) {
      count.textContent = state && typeof state.count === "number" ? String(state.count) : "0";
    }
  }

  async function requestState(root, method) {
    var response = await fetch(getStateUrl(root), {
      method: method || "GET",
    });

    if (!response.ok && response.status !== 403) {
      throw new Error("Unable to update like button state");
    }

    return response.json();
  }

  function initLikeButton(root) {
    if (root.dataset.likeButtonInitialized === "true") {
      return;
    }

    var button = root.querySelector("[data-like-button-trigger]");

    root.dataset.likeButtonInitialized = "true";
    root.hidden = true;

    if (!button) {
      return;
    }

    requestState(root, "GET")
      .then(function (state) {
        render(root, state);
      })
      .catch(function () {
        root.hidden = true;
      });

    button.addEventListener("click", function () {
      button.disabled = true;

      requestState(root, "POST")
        .then(function (state) {
          render(root, state);
        })
        .finally(function () {
          button.disabled = false;
        });
    });
  }

  function initAll() {
    document.querySelectorAll(rootSelector).forEach(initLikeButton);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }

  document.addEventListener("shopify:section:load", initAll);
})();
