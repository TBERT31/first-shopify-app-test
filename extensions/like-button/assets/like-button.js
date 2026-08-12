(function () {
  var rootSelector = "[data-like-button]";
  var storagePrefix = "like-button:";

  function getStoredValue(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function setStoredValue(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      // Ignore storage failures so the button still works for the current page.
    }
  }

  function render(root, liked) {
    var button = root.querySelector("[data-like-button-trigger]");
    var label = root.querySelector("[data-like-button-label]");
    var count = root.querySelector("[data-like-button-count]");
    var likeLabel = root.dataset.likeLabel || "Like";
    var likedLabel = root.dataset.likedLabel || "Liked";

    if (!button) {
      return;
    }

    button.setAttribute("aria-pressed", liked ? "true" : "false");
    button.setAttribute("aria-label", liked ? likedLabel : likeLabel);

    if (label) {
      label.textContent = liked ? likedLabel : likeLabel;
    }

    if (count) {
      count.textContent = liked ? "1" : "0";
    }
  }

  function initLikeButton(root) {
    if (root.dataset.likeButtonInitialized === "true") {
      return;
    }

    var button = root.querySelector("[data-like-button-trigger]");
    var productId = root.dataset.productId || root.id;
    var storageKey = storagePrefix + productId;
    var liked = getStoredValue(storageKey) === "true";

    root.dataset.likeButtonInitialized = "true";
    render(root, liked);

    if (!button) {
      return;
    }

    button.addEventListener("click", function () {
      liked = !liked;
      setStoredValue(storageKey, liked ? "true" : "false");
      render(root, liked);
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
