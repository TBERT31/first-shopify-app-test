(function () {
  var rootSelector = "[data-like-button]";

  function getStateUrl(root) {
    var endpoint = root.dataset.endpoint || "/apps/like-product";
    var params = new URLSearchParams({
      productId: root.dataset.productId || "",
    });
    var liquidCustomerId = root.dataset.liquidCustomerId || "";

    if (liquidCustomerId) {
      params.set("customerId", liquidCustomerId);
    }

    return endpoint + "?" + params.toString();
  }

  function getLoginUrl(root) {
    var loginUrl = root.dataset.loginUrl || "/account/login";
    var separator = loginUrl.indexOf("?") === -1 ? "?" : "&";
    var returnParam = loginUrl.indexOf("/customer_authentication/login") === -1 ? "return_url" : "return_to";
    var returnPath = window.location.pathname + window.location.search;

    if (loginUrl.indexOf("return_to=") !== -1 || loginUrl.indexOf("return_url=") !== -1) {
      return loginUrl;
    }

    return loginUrl + separator + returnParam + "=" + encodeURIComponent(returnPath);
  }

  function render(root, state) {
    var button = root.querySelector("[data-like-button-trigger]");
    var label = root.querySelector("[data-like-button-label]");
    var count = root.querySelector("[data-like-button-count]");
    var likeLabel = root.dataset.likeLabel || "Like";
    var likedLabel = root.dataset.likedLabel || "Liked";
    var loginLabel = root.dataset.loginLabel || "Sign in to like";
    var liked = Boolean(state && state.liked);
    var requiresLogin = Boolean(state && state.requiresLogin);

    if (!button) {
      return;
    }

    root.hidden = Boolean(state && state.disabled);
    button.setAttribute("aria-pressed", liked ? "true" : "false");
    button.setAttribute("aria-label", requiresLogin ? loginLabel : liked ? likedLabel : likeLabel);

    if (label) {
      label.textContent = requiresLogin ? loginLabel : liked ? likedLabel : likeLabel;
    }

    if (count) {
      count.textContent = state && typeof state.count === "number" ? String(state.count) : "0";
    }
  }

  async function requestState(root, method) {
    var response = await fetch(getStateUrl(root), {
      method: method || "GET",
      credentials: "include",
    });

    if (!response.ok && response.status !== 401 && response.status !== 403) {
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
          if (state && state.requiresLogin) {
            window.location.href = getLoginUrl(root);
            return;
          }

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
