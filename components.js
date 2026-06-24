// Lightweight loader to inject navbar and footer across pages
(function () {
    function loadInto(selector, url) {
        var host = document.querySelector(selector);
        if (!host) return;
        fetch(url)
            .then(function (res) { return res.text(); })
            .then(function (html) { host.innerHTML = html; })
            .catch(function (err) { console.error('Failed to load', url, err); });
    }

    document.addEventListener('DOMContentLoaded', function () {
        loadInto('#site-navbar', 'partials/navbar.html');
        loadInto('#site-footer', 'partials/footer.html');
    });
})();

