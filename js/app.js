(() => {
  "use strict";
  function t(t) {
    this.type = t;
  }
  (t.prototype.init = function () {
    const t = this;
    (this.оbjects = []),
      (this.daClassname = "_dynamic_adapt_"),
      (this.nodes = document.querySelectorAll("[data-da]"));
    for (let t = 0; t < this.nodes.length; t++) {
      const e = this.nodes[t],
        o = e.dataset.da.trim().split(","),
        s = {};
      (s.element = e),
        (s.parent = e.parentNode),
        (s.destination = document.querySelector(o[0].trim())),
        (s.breakpoint = o[1] ? o[1].trim() : "767"),
        (s.place = o[2] ? o[2].trim() : "last"),
        (s.index = this.indexInParent(s.parent, s.element)),
        this.оbjects.push(s);
    }
    this.arraySort(this.оbjects),
      (this.mediaQueries = Array.prototype.map.call(
        this.оbjects,
        function (t) {
          return (
            "(" + this.type + "-width: " + t.breakpoint + "px)," + t.breakpoint
          );
        },
        this
      )),
      (this.mediaQueries = Array.prototype.filter.call(
        this.mediaQueries,
        function (t, e, o) {
          return Array.prototype.indexOf.call(o, t) === e;
        }
      ));
    for (let e = 0; e < this.mediaQueries.length; e++) {
      const o = this.mediaQueries[e],
        s = String.prototype.split.call(o, ","),
        i = window.matchMedia(s[0]),
        n = s[1],
        a = Array.prototype.filter.call(this.оbjects, function (t) {
          return t.breakpoint === n;
        });
      i.addListener(function () {
        t.mediaHandler(i, a);
      }),
        this.mediaHandler(i, a);
    }
  }),
    (t.prototype.mediaHandler = function (t, e) {
      if (t.matches)
        for (let t = 0; t < e.length; t++) {
          const o = e[t];
          (o.index = this.indexInParent(o.parent, o.element)),
            this.moveTo(o.place, o.element, o.destination);
        }
      else
        for (let t = e.length - 1; t >= 0; t--) {
          const o = e[t];
          o.element.classList.contains(this.daClassname) &&
            this.moveBack(o.parent, o.element, o.index);
        }
    }),
    (t.prototype.moveTo = function (t, e, o) {
      e.classList.add(this.daClassname),
        "last" === t || t >= o.children.length
          ? o.insertAdjacentElement("beforeend", e)
          : "first" !== t
          ? o.children[t].insertAdjacentElement("beforebegin", e)
          : o.insertAdjacentElement("afterbegin", e);
    }),
    (t.prototype.moveBack = function (t, e, o) {
      e.classList.remove(this.daClassname),
        void 0 !== t.children[o]
          ? t.children[o].insertAdjacentElement("beforebegin", e)
          : t.insertAdjacentElement("beforeend", e);
    }),
    (t.prototype.indexInParent = function (t, e) {
      const o = Array.prototype.slice.call(t.children);
      return Array.prototype.indexOf.call(o, e);
    }),
    (t.prototype.arraySort = function (t) {
      "min" === this.type
        ? Array.prototype.sort.call(t, function (t, e) {
            return t.breakpoint === e.breakpoint
              ? t.place === e.place
                ? 0
                : "first" === t.place || "last" === e.place
                ? -1
                : "last" === t.place || "first" === e.place
                ? 1
                : t.place - e.place
              : t.breakpoint - e.breakpoint;
          })
        : Array.prototype.sort.call(t, function (t, e) {
            return t.breakpoint === e.breakpoint
              ? t.place === e.place
                ? 0
                : "first" === t.place || "last" === e.place
                ? 1
                : "last" === t.place || "first" === e.place
                ? -1
                : e.place - t.place
              : e.breakpoint - t.breakpoint;
          });
    });
  new t("max").init();
  class e {
    constructor(t) {
      let e = {
        logging: !0,
        init: !0,
        attributeOpenButton: "data-popup",
        attributeCloseButton: "data-close",
        fixElementSelector: "[data-lp]",
        youtubeAttribute: "data-youtube",
        youtubePlaceAttribute: "data-youtube-place",
        setAutoplayYoutube: !0,
        classes: {
          popup: "popup",
          popupContent: "popup__content",
          popupActive: "popup_show",
          bodyActive: "popup-show",
        },
        focusCatch: !0,
        closeEsc: !0,
        bodyLock: !0,
        bodyLockDelay: 500,
        hashSettings: { location: !0, goHash: !0 },
        on: {
          beforeOpen: function () {},
          afterOpen: function () {},
          beforeClose: function () {},
          afterClose: function () {},
        },
      };
      (this.isOpen = !1),
        (this.targetOpen = { selector: !1, element: !1 }),
        (this.previousOpen = { selector: !1, element: !1 }),
        (this.lastClosed = { selector: !1, element: !1 }),
        (this._dataValue = !1),
        (this.hash = !1),
        (this._reopen = !1),
        (this._selectorOpen = !1),
        (this.lastFocusEl = !1),
        (this._focusEl = [
          "a[href]",
          'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
          "button:not([disabled]):not([aria-hidden])",
          "select:not([disabled]):not([aria-hidden])",
          "textarea:not([disabled]):not([aria-hidden])",
          "area[href]",
          "iframe",
          "object",
          "embed",
          "[contenteditable]",
          '[tabindex]:not([tabindex^="-"])',
        ]),
        (this.options = {
          ...e,
          ...t,
          classes: { ...e.classes, ...t?.classes },
          hashSettings: { ...e.hashSettings, ...t?.hashSettings },
          on: { ...e.on, ...t?.on },
        }),
        this.options.init && this.initPopups();
    }
    initPopups() {
      this.popupLogging("Проснулся"), this.eventsPopup();
    }
    eventsPopup() {
      document.addEventListener(
        "click",
        function (t) {
          const e = t.target.closest(`[${this.options.attributeOpenButton}]`);
          if (e)
            return (
              t.preventDefault(),
              (this._dataValue = e.getAttribute(
                this.options.attributeOpenButton
              )
                ? e.getAttribute(this.options.attributeOpenButton)
                : "error"),
              "error" !== this._dataValue
                ? (this.isOpen || (this.lastFocusEl = e),
                  (this.targetOpen.selector = `${this._dataValue}`),
                  (this._selectorOpen = !0),
                  void this.open())
                : void this.popupLogging(
                    `Ой ой, не заполнен атрибут у ${e.classList}`
                  )
            );
          return t.target.closest(`[${this.options.attributeCloseButton}]`) ||
            (!t.target.closest(`.${this.options.classes.popupContent}`) &&
              this.isOpen)
            ? (t.preventDefault(), void this.close())
            : void 0;
        }.bind(this)
      ),
        document.addEventListener(
          "keydown",
          function (t) {
            if (
              this.options.closeEsc &&
              27 == t.which &&
              "Escape" === t.code &&
              this.isOpen
            )
              return t.preventDefault(), void this.close();
            this.options.focusCatch &&
              9 == t.which &&
              this.isOpen &&
              this._focusCatch(t);
          }.bind(this)
        ),
        document.querySelector("form[data-ajax],form[data-dev]") &&
          document.addEventListener(
            "formSent",
            function (t) {
              const e = t.detail.form.dataset.popupMessage;
              e && this.open(e);
            }.bind(this)
          ),
        this.options.hashSettings.goHash &&
          (window.addEventListener(
            "hashchange",
            function () {
              window.location.hash
                ? this._openToHash()
                : this.close(this.targetOpen.selector);
            }.bind(this)
          ),
          window.addEventListener(
            "load",
            function () {
              window.location.hash && this._openToHash();
            }.bind(this)
          ));
    }
    open(t) {
      if (
        (t &&
          "string" == typeof t &&
          "" !== t.trim() &&
          ((this.targetOpen.selector = t), (this._selectorOpen = !0)),
        this.isOpen && ((this._reopen = !0), this.close()),
        this._selectorOpen ||
          (this.targetOpen.selector = this.lastClosed.selector),
        this._reopen || (this.previousActiveElement = document.activeElement),
        (this.targetOpen.element = document.querySelector(
          this.targetOpen.selector
        )),
        this.targetOpen.element)
      ) {
        if (
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)
        ) {
          const t = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(
              this.options.youtubeAttribute
            )}?rel=0&showinfo=0&autoplay=1`,
            e = document.createElement("iframe");
          e.setAttribute("allowfullscreen", "");
          const o = this.options.setAutoplayYoutube ? "autoplay;" : "";
          e.setAttribute("allow", `${o}; encrypted-media`),
            e.setAttribute("src", t),
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ) &&
              this.targetOpen.element
                .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                .appendChild(e);
        }
        this.options.hashSettings.location &&
          (this._getHash(), this._setHash()),
          this.options.on.beforeOpen(this),
          this.targetOpen.element.classList.add(
            this.options.classes.popupActive
          ),
          document.body.classList.add(this.options.classes.bodyActive),
          this._reopen ? (this._reopen = !1) : n(),
          this.targetOpen.element.setAttribute("aria-hidden", "false"),
          (this.previousOpen.selector = this.targetOpen.selector),
          (this.previousOpen.element = this.targetOpen.element),
          (this._selectorOpen = !1),
          (this.isOpen = !0),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          document.dispatchEvent(
            new CustomEvent("afterPopupOpen", { detail: { popup: this } })
          ),
          this.popupLogging("Открыл попап");
      } else
        this.popupLogging(
          "Ой ой, такого попапа нет. Проверьте корректность ввода. "
        );
    }
    close(t) {
      t &&
        "string" == typeof t &&
        "" !== t.trim() &&
        (this.previousOpen.selector = t),
        this.isOpen &&
          i &&
          (this.options.on.beforeClose(this),
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute) &&
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ) &&
            (this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ).innerHTML = ""),
          this.previousOpen.element.classList.remove(
            this.options.classes.popupActive
          ),
          this.previousOpen.element.setAttribute("aria-hidden", "true"),
          this._reopen ||
            (document.body.classList.remove(this.options.classes.bodyActive),
            n(),
            (this.isOpen = !1)),
          this._removeHash(),
          this._selectorOpen &&
            ((this.lastClosed.selector = this.previousOpen.selector),
            (this.lastClosed.element = this.previousOpen.element)),
          this.options.on.afterClose(this),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          this.popupLogging("Закрыл попап"));
    }
    _getHash() {
      this.options.hashSettings.location &&
        (this.hash = this.targetOpen.selector.includes("#")
          ? this.targetOpen.selector
          : this.targetOpen.selector.replace(".", "#"));
    }
    _openToHash() {
      let t = document.querySelector(
        `.${window.location.hash.replace("#", "")}`
      )
        ? `.${window.location.hash.replace("#", "")}`
        : document.querySelector(`${window.location.hash}`)
        ? `${window.location.hash}`
        : null;
      document.querySelector(`[${this.options.attributeOpenButton}="${t}"]`) &&
        t &&
        this.open(t);
    }
    _setHash() {
      history.pushState("", "", this.hash);
    }
    _removeHash() {
      history.pushState("", "", window.location.href.split("#")[0]);
    }
    _focusCatch(t) {
      const e = this.targetOpen.element.querySelectorAll(this._focusEl),
        o = Array.prototype.slice.call(e),
        s = o.indexOf(document.activeElement);
      t.shiftKey && 0 === s && (o[o.length - 1].focus(), t.preventDefault()),
        t.shiftKey || s !== o.length - 1 || (o[0].focus(), t.preventDefault());
    }
    _focusTrap() {
      const t = this.previousOpen.element.querySelectorAll(this._focusEl);
      !this.isOpen && this.lastFocusEl
        ? this.lastFocusEl.focus()
        : t[0].focus();
    }
    popupLogging(t) {
      this.options.logging && l(`[Попапос]: ${t}`);
    }
  }
  let o = (t, e = 500, o = 0) => {
      t.classList.contains("_slide") ||
        (t.classList.add("_slide"),
        (t.style.transitionProperty = "height, margin, padding"),
        (t.style.transitionDuration = e + "ms"),
        (t.style.height = `${t.offsetHeight}px`),
        t.offsetHeight,
        (t.style.overflow = "hidden"),
        (t.style.height = o ? `${o}px` : "0px"),
        (t.style.paddingTop = 0),
        (t.style.paddingBottom = 0),
        (t.style.marginTop = 0),
        (t.style.marginBottom = 0),
        window.setTimeout(() => {
          (t.hidden = !o),
            !o && t.style.removeProperty("height"),
            t.style.removeProperty("padding-top"),
            t.style.removeProperty("padding-bottom"),
            t.style.removeProperty("margin-top"),
            t.style.removeProperty("margin-bottom"),
            !o && t.style.removeProperty("overflow"),
            t.style.removeProperty("transition-duration"),
            t.style.removeProperty("transition-property"),
            t.classList.remove("_slide");
        }, e));
    },
    s = (t, e = 500, o = 0) => {
      if (!t.classList.contains("_slide")) {
        t.classList.add("_slide"),
          (t.hidden = !t.hidden && null),
          o && t.style.removeProperty("height");
        let s = t.offsetHeight;
        (t.style.overflow = "hidden"),
          (t.style.height = o ? `${o}px` : "0px"),
          (t.style.paddingTop = 0),
          (t.style.paddingBottom = 0),
          (t.style.marginTop = 0),
          (t.style.marginBottom = 0),
          t.offsetHeight,
          (t.style.transitionProperty = "height, margin, padding"),
          (t.style.transitionDuration = e + "ms"),
          (t.style.height = s + "px"),
          t.style.removeProperty("padding-top"),
          t.style.removeProperty("padding-bottom"),
          t.style.removeProperty("margin-top"),
          t.style.removeProperty("margin-bottom"),
          window.setTimeout(() => {
            t.style.removeProperty("height"),
              t.style.removeProperty("overflow"),
              t.style.removeProperty("transition-duration"),
              t.style.removeProperty("transition-property"),
              t.classList.remove("_slide");
          }, e);
      }
    },
    i = !0,
    n = (t = 500) => {
      document.documentElement.classList.contains("lock") ? a(t) : r(t);
    },
    a = (t = 500) => {
      let e = document.querySelector("body");
      if (i) {
        let o = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let t = 0; t < o.length; t++) {
            o[t].style.paddingRight = "0px";
          }
          (e.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, t),
          (i = !1),
          setTimeout(function () {
            i = !0;
          }, t);
      }
    },
    r = (t = 500) => {
      let e = document.querySelector("body");
      if (i) {
        let o = document.querySelectorAll("[data-lp]");
        for (let t = 0; t < o.length; t++) {
          o[t].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (e.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (i = !1),
          setTimeout(function () {
            i = !0;
          }, t);
      }
    };
  function l(t) {
    setTimeout(() => {
      window.FLS && console.log(t);
    }, 0);
  }
  function c(t, e) {
    const o = Array.from(t).filter(function (t, o, s) {
      if (t.dataset[e]) return t.dataset[e].split(",")[0];
    });
    if (o.length) {
      const t = [];
      o.forEach((o) => {
        const s = {},
          i = o.dataset[e].split(",");
        (s.value = i[0]),
          (s.type = i[1] ? i[1].trim() : "max"),
          (s.item = o),
          t.push(s);
      });
      let s = t.map(function (t) {
        return (
          "(" + t.type + "-width: " + t.value + "px)," + t.value + "," + t.type
        );
      });
      s = (function (t) {
        return t.filter(function (t, e, o) {
          return o.indexOf(t) === e;
        });
      })(s);
      const i = [];
      if (s.length)
        return (
          s.forEach((e) => {
            const o = e.split(","),
              s = o[1],
              n = o[2],
              a = window.matchMedia(o[0]),
              r = t.filter(function (t) {
                if (t.value === s && t.type === n) return !0;
              });
            i.push({ itemsArray: r, matchMedia: a });
          }),
          i
        );
    }
  }
  let p = (t, e = !1, o = 500, s = 0) => {
    const i = document.querySelector(t);
    if (i) {
      let n = "",
        r = 0;
      e &&
        ((n = "header.header"), (r = document.querySelector(n).offsetHeight));
      let c = {
        speedAsDuration: !0,
        speed: o,
        header: n,
        offset: s,
        easing: "easeOutQuad",
      };
      if (
        (document.documentElement.classList.contains("menu-open") &&
          (a(), document.documentElement.classList.remove("menu-open")),
        "undefined" != typeof SmoothScroll)
      )
        new SmoothScroll().animateScroll(i, "", c);
      else {
        let t = i.getBoundingClientRect().top + scrollY;
        window.scrollTo({ top: r ? t - r : t, behavior: "smooth" });
      }
      l(`[gotoBlock]: Юхуу...едем к ${t}`);
    } else l(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${t}`);
  };
  let h = !1;
  function d() {
    if (document.documentElement.clientWidth > 991.98) {
      const t = document.querySelector("#topMenu"),
        e = "menu__item",
        o = "menu__item-more";
      let s = t.offsetWidth,
        i = 0,
        n = document.createElement("li");
      if (
        ((n.className = "menu__item menu__item_ellipsis has-sub"),
        (n.innerHTML =
          '<a href="#" class="menu__link"><span class="ellipsis">...</span></a><ul class="sub-menu m-sub"></ul>'),
        t.querySelectorAll(".menu__item_ellipsis").length > 0)
      ) {
        t.querySelectorAll(".menu__item_ellipsis ul li").forEach(function (e) {
          t.append(e);
        }),
          t.querySelector(".menu__item_ellipsis").remove();
      }
      let a = t.querySelectorAll("li");
      a.forEach(function (t) {
        i += t.offsetWidth;
      }),
        i > s &&
          (t.append(n),
          (s -= n.offsetWidth),
          (i = 0),
          (a = t.querySelectorAll("li")),
          a.forEach(function (t) {
            (i += t.offsetWidth),
              t.classList.contains("menu__item_ellipsis") ||
                (i < s
                  ? (t.classList.add(e), t.classList.remove(o))
                  : (t.classList.add(o), t.classList.remove(e)));
          }));
      let r = n.querySelector("ul");
      t.querySelectorAll("." + o).forEach(function (t) {
        r.append(t);
      });
    }
  }
  setTimeout(() => {
    if (h) {
      let t = new Event("windowScroll");
      window.addEventListener("scroll", function (e) {
        document.dispatchEvent(t);
      });
    }
  }, 0),
    d(),
    window.addEventListener("resize", d, !1),
    (window.FLS = !0),
    (function (t) {
      let e = new Image();
      (e.onload = e.onerror =
        function () {
          t(2 == e.height);
        }),
        (e.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (t) {
      let e = !0 === t ? "webp" : "no-webp";
      document.documentElement.classList.add(e);
    }),
    (function () {
      let t = document.querySelector(".icon-menu");
      t &&
        t.addEventListener("click", function (t) {
          i && (n(), document.documentElement.classList.toggle("menu-open"));
        });
    })(),
    (function () {
      const t = document.querySelectorAll("[data-showmore]");
      let e, i;
      function n(t) {
        t.forEach((t) => {
          a(t.itemsArray, t.matchMedia);
        });
      }
      function a(t, e) {
        t.forEach((t) => {
          !(function (t, e = !1) {
            const i = (t = e ? t.item : t).querySelector(
                "[data-showmore-content]"
              ),
              n = t.querySelector("[data-showmore-button]"),
              a = r(t, i);
            (e.matches || !e) &&
            a <
              (function (t) {
                let e = t.offsetHeight;
                t.style.removeProperty("height");
                let o = t.offsetHeight;
                return (t.style.height = `${e}px`), o;
              })(i)
              ? (o(i, 0, a), (n.hidden = !1))
              : (s(i, 0, a), (n.hidden = !0));
          })(t, e);
        });
      }
      function r(t, e) {
        let o = 0;
        if ("items" === (t.dataset.showmore ? t.dataset.showmore : "size")) {
          const t = e.dataset.showmoreContent
              ? parseInt(e.dataset.showmoreContent)
              : 3,
            s = e.children;
          for (let e = 1; e < s.length; e++) {
            if (((o += s[e - 1].offsetHeight), e === t)) break;
          }
        } else {
          o = e.dataset.showmoreContent
            ? parseInt(e.dataset.showmoreContent)
            : 150;
        }
        return console.log(o), o;
      }
      function l(t) {
        const l = t.target,
          c = t.type;
        if ("click" === c) {
          if (l.closest("[data-showmore-button]")) {
            const t = l
                .closest("[data-showmore-button]")
                .closest("[data-showmore]"),
              e = t.querySelector("[data-showmore-content]"),
              i = t.dataset.showmoreButton ? t.dataset.showmoreButton : "500",
              n = r(t, e);
            e.classList.contains("_slide") ||
              (t.classList.contains("_showmore-active")
                ? o(e, i, n)
                : s(e, i, n),
              t.classList.toggle("_showmore-active"));
          }
        } else "resize" === c && (e.length && a(e), i.length && n(i));
      }
      t.length &&
        ((e = Array.from(t).filter(function (t, e, o) {
          return !t.dataset.showmoreMedia;
        })),
        e.length && a(e),
        document.addEventListener("click", l),
        window.addEventListener("resize", l),
        (i = c(t, "showmoreMedia")),
        i &&
          i.length &&
          (i.forEach((t) => {
            t.matchMedia.addEventListener("change", function () {
              a(t.itemsArray, t.matchMedia);
            });
          }),
          n(i)));
    })(),
    new e({}),
    (function () {
      function t(t) {
        if ("click" === t.type) {
          const e = t.target;
          if (e.closest("[data-goto]")) {
            const o = e.closest("[data-goto]"),
              s = o.dataset.goto ? o.dataset.goto : "",
              i = !!o.hasAttribute("data-goto-header"),
              n = o.dataset.gotoSpeed ? o.dataset.gotoSpeed : "500";
            p(s, i, n), t.preventDefault();
          }
        } else if ("watcherCallback" === t.type && t.detail) {
          const e = t.detail.entry,
            o = e.target;
          if ("navigator" === o.dataset.watch) {
            const t = o.id,
              s =
                (document.querySelector("[data-goto]._navigator-active"),
                document.querySelector(`[data-goto="${t}"]`));
            e.isIntersecting
              ? s && s.classList.add("_navigator-active")
              : s && s.classList.remove("_navigator-active");
          }
        }
      }
      document.addEventListener("click", t),
        document.addEventListener("watcherCallback", t);
    })();
})();
