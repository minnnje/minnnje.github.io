(() => {
  // <stdin>
  (function() {
    var tocRoot = document.querySelector(".toc-nav ul");
    var tocLinks = document.querySelectorAll('.toc-nav a[href^="#"]');
    if (!tocRoot || !tocLinks.length || !("IntersectionObserver" in window)) return;
    var entries = [];
    tocLinks.forEach(function(link) {
      var id = decodeURIComponent(link.getAttribute("href").slice(1));
      var heading = document.getElementById(id);
      if (heading) entries.push({ link, heading });
    });
    if (!entries.length) return;
    function topLevelLi(li) {
      while (li && li.parentElement && li.parentElement !== tocRoot) {
        li = li.parentElement.closest("li");
      }
      return li;
    }
    function setActive(link) {
      entries.forEach(function(e) {
        e.link.classList.remove("active");
      });
      link.classList.add("active");
      var activeLi = link.closest("li");
      var openLi = topLevelLi(activeLi);
      Array.prototype.forEach.call(tocRoot.children, function(li) {
        li.classList.toggle("toc-open", li === openLi);
      });
    }
    var observer = new IntersectionObserver(
      function(observed) {
        observed.forEach(function(item) {
          if (!item.isIntersecting) return;
          var match = entries.find(function(e) {
            return e.heading === item.target;
          });
          if (!match) return;
          setActive(match.link);
        });
      },
      { rootMargin: "-96px 0px -70% 0px" }
    );
    entries.forEach(function(e) {
      observer.observe(e.heading);
    });
    setActive(entries[0].link);
  })();
  (function() {
    var container = document.querySelector(".featured-carousel");
    if (!container) return;
    var cards = container.querySelectorAll(".featured-card");
    if (!cards.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var index = 0;
    var timer = null;
    function activate(i) {
      cards.forEach(function(c) {
        c.classList.remove("is-active");
      });
      cards[i].classList.add("is-active");
    }
    function start() {
      activate(index);
      timer = setInterval(function() {
        index = (index + 1) % cards.length;
        activate(index);
      }, 2200);
    }
    function stop() {
      clearInterval(timer);
      cards.forEach(function(c) {
        c.classList.remove("is-active");
      });
    }
    start();
    container.addEventListener("mouseenter", stop);
    container.addEventListener("mouseleave", start);
  })();
})();
