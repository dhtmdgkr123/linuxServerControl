if (typeof jQuery === "undefined") {
    throw new Error("jquery-confirm requires jQuery");
}
var u, s;
(function (l, d) {
    l.fn.confirm = function (a, t) {
        if ( ! a ) {
            a = {}
        }
        if (typeof a === "string") {
            a = {
                content: a,
                title: t ? t : false
            }
        }
        l(this).each(function () {
            var o = l(this);
            if (o.attr("jc-attached")) {
                console.warn("jConfirm has already been attached to this element ", o[0]);
                return
            }
            o.on("click", function (t) {
                t.preventDefault();
                var i = l.extend({}, a);
                if (o.attr("data-title")) {
                    i.title = o.attr("data-title")
                }
                if (o.attr("data-content")) {
                    i.content = o.attr("data-content")
                }
                if (typeof i.buttons == "undefined") {
                    i.buttons = {}
                }
                i["$target"] = o;
                if (o.attr("href") && Object.keys(i.buttons).length === 0) {
                    var e = l.extend(true, {}, u.pluginDefaults.defaultButtons, (u.defaults || {}).defaultButtons || {});
                    var n = Object.keys(e)[0];
                    i.buttons = e;
                    i.buttons[n].action = function () {
                        location.href = o.attr("href")
                    }
                }
                i.closeIcon = false;
                var s = l.confirm(i)
            });
            o.attr("jc-attached", true)
        });
        return l(this)
    };
    l.confirm = function (t, i) {
        if ( ! t ) {
            t = {}
        }
        if (typeof t === "string") {
            t = {
                content: t,
                title: i ? i : false
            }
        }
        if (typeof t.buttons !== "object") {
            t.buttons = {}
        }
        if ( ! Object.keys(t.buttons).length ) {
            var e = l.extend(true, {}, u.pluginDefaults.defaultButtons, (u.defaults || {}).defaultButtons || {});
            t.buttons = e
        }
        return u(t)
    };
    l.alert = function (t, i) {
        if (typeof t === "undefined") {
            t = {}
        }
        if (typeof t === "string") {
            t = {
                content: t,
                title: i ? i : false
            }
        }
        if (typeof t.buttons != "object") {
            t.buttons = {}
        }
        if (Object.keys(t.buttons).length == 0) {
            var e = l.extend(true, {}, u.pluginDefaults.defaultButtons, (u.defaults || {}).defaultButtons || {});
            var n = Object.keys(e)[0];
            t.buttons[n] = e[n]
        }
        return u(t)
    };
    l.dialog = function (t, i) {
        if (typeof t === "undefined") {
            t = {}
        }
        if (typeof t === "string") {
            t = {
                content: t,
                title: i ? i : false,
                closeIcon: function () {}
            }
        }
        t.buttons = {};
        if (typeof t.closeIcon == "undefined") {
            t.closeIcon = function () {}
        }
        t.confirmKeys = [13];
        return u(t)
    };
    u = function (t) {
        if (typeof t === "undefined") {
            t = {}
        }
        var i = l.extend(true, {}, u.pluginDefaults);
        if (u.defaults) {
            i = l.extend(true, i, u.defaults)
        }
        i = l.extend(true, {}, i, t);
        var e = new s(i);
        u.instances.push(e);
        return e
    };
    s = function (t) {
        l.extend(this, t);
        this._init()
    };
    s.prototype = {
        _init: function () {
            var t = this;
            if (!u.instances.length) {
                u.lastFocused = l("body").find(":focus")
            }
            this._id = Math.round(Math.random() * 99999);
            this.contentParsed = l(document.createElement("div"));
            if (!this.lazyOpen) {
                setTimeout(function () {
                    t.open()
                }, 0)
            }
        },
        _buildHTML: function () {
            var t = this;
            this._parseAnimation(this.animation, "o");
            this._parseAnimation(this.closeAnimation, "c");
            this._parseBgDismissAnimation(this.backgroundDismissAnimation);
            this._parseColumnClass(this.columnClass);
            this._parseTheme(this.theme);
            this._parseType(this.type);
            var i = l(this.template);
            i.find(".jconfirm-box").addClass(this.animationParsed).addClass(this.backgroundDismissAnimationParsed).addClass(this.typeParsed);
            if (this.typeAnimated) {
                i.find(".jconfirm-box").addClass("jconfirm-type-animated")
            }
            if (this.useBootstrap) {
                i.find(".jc-bs3-row").addClass(this.bootstrapClasses.row);
                i.find(".jc-bs3-row").addClass("justify-content-md-center justify-content-sm-center justify-content-xs-center justify-content-lg-center");
                i.find(".jconfirm-box-container").addClass(this.columnClassParsed);
                if (this.containerFluid) {
                    i.find(".jc-bs3-container").addClass(this.bootstrapClasses.containerFluid)
                } else {
                    i.find(".jc-bs3-container").addClass(this.bootstrapClasses.container)
                }
            } else {
                i.find(".jconfirm-box").css("width", this.boxWidth)
            }
            if (this.titleClass) {
                i.find(".jconfirm-title-c").addClass(this.titleClass)
            }
            i.addClass(this.themeParsed);
            var e = "jconfirm-box" + this._id;
            i.find(".jconfirm-box").attr("aria-labelledby", e).attr("tabindex", -1);
            i.find(".jconfirm-content").attr("id", e);
            if (this.bgOpacity !== null) {
                i.find(".jconfirm-bg").css("opacity", this.bgOpacity)
            }
            if (this.rtl) {
                i.addClass("jconfirm-rtl")
            }
            this.$el = i.appendTo(this.container);
            this.$jconfirmBoxContainer = this.$el.find(".jconfirm-box-container");
            this.$jconfirmBox = this.$body = this.$el.find(".jconfirm-box");
            this.$jconfirmBg = this.$el.find(".jconfirm-bg");
            this.$title = this.$el.find(".jconfirm-title");
            this.$titleContainer = this.$el.find(".jconfirm-title-c");
            this.$content = this.$el.find("div.jconfirm-content");
            this.$contentPane = this.$el.find(".jconfirm-content-pane");
            this.$icon = this.$el.find(".jconfirm-icon-c");
            this.$closeIcon = this.$el.find(".jconfirm-closeIcon");
            this.$holder = this.$el.find(".jconfirm-holder");
            this.$btnc = this.$el.find(".jconfirm-buttons");
            this.$scrollPane = this.$el.find(".jconfirm-scrollpane");
            t.setStartingPoint();
            this._contentReady = l.Deferred();
            this._modalReady = l.Deferred();
            this.$holder.css({
                "padding-top": this.offsetTop,
                "padding-bottom": this.offsetBottom
            });
            this.setTitle();
            this.setIcon();
            this._setButtons();
            this._parseContent();
            this.initDraggable();
            if (this.isAjax) {
                this.showLoading(false)
            }
            l.when(this._contentReady, this._modalReady).then(function () {
                if (t.isAjaxLoading) {
                    setTimeout(function () {
                        t.isAjaxLoading = false;
                        t.setContent();
                        t.setTitle();
                        t.setIcon();
                        setTimeout(function () {
                            t.hideLoading(false);
                            t._updateContentMaxHeight()
                        }, 100);
                        if (typeof t.onContentReady === "function") {
                            t.onContentReady()
                        }
                    }, 50)
                } else {
                    t._updateContentMaxHeight();
                    t.setTitle();
                    t.setIcon();
                    if (typeof t.onContentReady === "function") {
                        t.onContentReady()
                    }
                }
                if (t.autoClose) {
                    t._startCountDown()
                }
            });
            this._watchContent();
            if (this.animation === "none") {
                this.animationSpeed = 1;
                this.animationBounce = 1
            }
            this.$body.css(this._getCSS(this.animationSpeed, this.animationBounce));
            this.$contentPane.css(this._getCSS(this.animationSpeed, 1));
            this.$jconfirmBg.css(this._getCSS(this.animationSpeed, 1));
            this.$jconfirmBoxContainer.css(this._getCSS(this.animationSpeed, 1))
        },
        _typePrefix: "jconfirm-type-",
        typeParsed: "",
        _parseType: function (t) {
            this.typeParsed = this._typePrefix + t
        },
        setType: function (t) {
            var i = this.typeParsed;
            this._parseType(t);
            this.$jconfirmBox.removeClass(i).addClass(this.typeParsed)
        },
        themeParsed: "",
        _themePrefix: "jconfirm-",
        setTheme: function (t) {
            var i = this.theme;
            this.theme = t || this.theme;
            this._parseTheme(this.theme);
            if (i) {
                this.$el.removeClass(i)
            }
            this.$el.addClass(this.themeParsed);
            this.theme = t
        },
        _parseTheme: function (e) {
            var n = this;
            e = e.split(",");
            l.each(e, function (t, i) {
                if (i.indexOf(n._themePrefix) === -1) {
                    e[t] = n._themePrefix + l.trim(i)
                }
            });
            this.themeParsed = e.join(" ").toLowerCase()
        },
        backgroundDismissAnimationParsed: "",
        _bgDismissPrefix: "jconfirm-hilight-",
        _parseBgDismissAnimation: function (t) {
            var e = t.split(",");
            var n = this;
            l.each(e, function (t, i) {
                if (i.indexOf(n._bgDismissPrefix) === -1) {
                    e[t] = n._bgDismissPrefix + l.trim(i)
                }
            });
            this.backgroundDismissAnimationParsed = e.join(" ").toLowerCase()
        },
        animationParsed: "",
        closeAnimationParsed: "",
        _animationPrefix: "jconfirm-animation-",
        setAnimation: function (t) {
            this.animation = t || this.animation;
            this._parseAnimation(this.animation, "o")
        },
        _parseAnimation: function (t, i) {
            i = i || "o";
            var e = t.split(",");
            var n = this;
            l.each(e, function (t, i) {
                if (i.indexOf(n._animationPrefix) === -1) {
                    e[t] = n._animationPrefix + l.trim(i)
                }
            });
            var s = e.join(" ").toLowerCase();
            if (i === "o") {
                this.animationParsed = s
            } else {
                this.closeAnimationParsed = s
            }
            return s
        },
        setCloseAnimation: function (t) {
            this.closeAnimation = t || this.closeAnimation;
            this._parseAnimation(this.closeAnimation, "c")
        },
        setAnimationSpeed: function (t) {
            this.animationSpeed = t || this.animationSpeed
        },
        columnClassParsed: "",
        setColumnClass: function (t) {
            if (!this.useBootstrap) {
                console.warn("cannot set columnClass, useBootstrap is set to false");
                return
            }
            this.columnClass = t || this.columnClass;
            this._parseColumnClass(this.columnClass);
            this.$jconfirmBoxContainer.addClass(this.columnClassParsed)
        },
        _updateContentMaxHeight: function () {
            var t = l(d).height() - (this.$jconfirmBox.outerHeight() - this.$contentPane.outerHeight()) - (this.offsetTop + this.offsetBottom);
            this.$contentPane.css({
                "max-height": t + "px"
            })
        },
        setBoxWidth: function (t) {
            if (this.useBootstrap) {
                console.warn("cannot set boxWidth, useBootstrap is set to true");
                return
            }
            this.boxWidth = t;
            this.$jconfirmBox.css("width", t)
        },
        _parseColumnClass: function (t) {
            t = t.toLowerCase();
            var i;
            switch (t) {
                case "xl":
                case "xlarge":
                    i = "col-md-12";
                    break;
                case "l":
                case "large":
                    i = "col-md-8 col-md-offset-2";
                    break;
                case "m":
                case "medium":
                    i = "col-md-6 col-md-offset-3";
                    break;
                case "s":
                case "small":
                    i = "col-md-4 col-md-offset-4";
                    break;
                case "xs":
                case "xsmall":
                    i = "col-md-2 col-md-offset-5";
                    break;
                default:
                    i = t
            }
            this.columnClassParsed = i
        },
        initDraggable: function () {
            var i = this;
            var e = this.$titleContainer;
            this.resetDrag();
            if (this.draggable) {
                e.on("mousedown", function (t) {
                    e.addClass("jconfirm-hand");
                    i.mouseX = t.clientX;
                    i.mouseY = t.clientY;
                    i.isDrag = true
                });
                l(d).on("mousemove." + this._id, function (t) {
                    if (i.isDrag) {
                        i.movingX = t.clientX - i.mouseX + i.initialX;
                        i.movingY = t.clientY - i.mouseY + i.initialY;
                        i.setDrag()
                    }
                });
                l(d).on("mouseup." + this._id, function () {
                    e.removeClass("jconfirm-hand");
                    if (i.isDrag) {
                        i.isDrag = false;
                        i.initialX = i.movingX;
                        i.initialY = i.movingY
                    }
                })
            }
        },
        resetDrag: function () {
            this.isDrag = false;
            this.initialX = 0;
            this.initialY = 0;
            this.movingX = 0;
            this.movingY = 0;
            this.mouseX = 0;
            this.mouseY = 0;
            this.$jconfirmBoxContainer.css("transform", "translate(" + 0 + "px, " + 0 + "px)")
        },
        setDrag: function () {
            if (!this.draggable) {
                return
            }
            this.alignMiddle = false;
            var t = this.$jconfirmBox.outerWidth();
            var i = this.$jconfirmBox.outerHeight();
            var e = l(d).width();
            var n = l(d).height();
            var s = this;
            var o = 1;
            if (s.movingX % o === 0 || s.movingY % o === 0) {
                if (s.dragWindowBorder) {
                    var a = e / 2 - t / 2;
                    var r = n / 2 - i / 2;
                    r -= s.dragWindowGap;
                    a -= s.dragWindowGap;
                    if (a + s.movingX < 0) {
                        s.movingX = -a
                    } else {
                        if (a - s.movingX < 0) {
                            s.movingX = a
                        }
                    }
                    if (r + s.movingY < 0) {
                        s.movingY = -r
                    } else {
                        if (r - s.movingY < 0) {
                            s.movingY = r
                        }
                    }
                }
                s.$jconfirmBoxContainer.css("transform", "translate(" + s.movingX + "px, " + s.movingY + "px)")
            }
        },
        _scrollTop: function () {
            if (typeof pageYOffset !== "undefined") {
                return pageYOffset
            } else {
                var t = document.body;
                var i = document.documentElement;
                i = i.clientHeight ? i : t;
                return i.scrollTop
            }
        },
        _watchContent: function () {
            var n = this;
            if (this._timer) {
                clearInterval(this._timer)
            }
            var s = 0;
            this._timer = setInterval(function () {
                if (n.smoothContent) {
                    var t = n.$content.outerHeight() || 0;
                    if (t !== s) {
                        n.$contentPane.css({
                            height: t
                        }).scrollTop(0);
                        s = t
                    }
                    var i = l(d).height();
                    var e = n.offsetTop + n.offsetBottom + n.$jconfirmBox.height() - n.$contentPane.height() + n.$content.height();
                    if (e < i) {
                        n.$contentPane.addClass("no-scroll")
                    } else {
                        n.$contentPane.removeClass("no-scroll")
                    }
                }
            }, this.watchInterval)
        },
        _overflowClass: "jconfirm-overflow",
        _hilightAnimating: false,
        highlight: function () {
            this.hiLightModal()
        },
        hiLightModal: function () {
            var t = this;
            if (this._hilightAnimating) {
                return
            }
            t.$body.addClass("hilight");
            var i = parseFloat(t.$body.css("animation-duration")) || 2;
            this._hilightAnimating = true;
            setTimeout(function () {
                t._hilightAnimating = false;
                t.$body.removeClass("hilight")
            }, i * 1e3)
        },
        _bindEvents: function () {
            var o = this;
            this.boxClicked = false;
            this.$scrollPane.click(function (t) {
                if (!o.boxClicked) {
                    var i = false;
                    var e = false;
                    var n;
                    if (typeof o.backgroundDismiss == "function") {
                        n = o.backgroundDismiss()
                    } else {
                        n = o.backgroundDismiss
                    }
                    if (typeof n == "string" && typeof o.buttons[n] != "undefined") {
                        i = n;
                        e = false
                    } else {
                        if (typeof n == "undefined" || !!n == true) {
                            e = true
                        } else {
                            e = false
                        }
                    }
                    if (i) {
                        var s = o.buttons[i].action.apply(o);
                        e = typeof s == "undefined" || !!s
                    }
                    if (e) {
                        o.close()
                    } else {
                        o.hiLightModal()
                    }
                }
                o.boxClicked = false
            });
            this.$jconfirmBox.click(function (t) {
                o.boxClicked = true
            });
            var i = false;
            l(d).on("jcKeyDown." + o._id, function (t) {
                if (!i) {
                    i = true
                }
            });
            l(d).on("keyup." + o._id, function (t) {
                if (i) {
                    o.reactOnKey(t);
                    i = false
                }
            });
            l(d).on("resize." + this._id, function () {
                o._updateContentMaxHeight();
                setTimeout(function () {
                    o.resetDrag()
                }, 100)
            })
        },
        _cubic_bezier: "0.36, 0.55, 0.19",
        _getCSS: function (t, i) {
            return {
                "-webkit-transition-duration": t / 1e3 + "s",
                "transition-duration": t / 1e3 + "s",
                "-webkit-transition-timing-function": "cubic-bezier(" + this._cubic_bezier + ", " + i + ")",
                "transition-timing-function": "cubic-bezier(" + this._cubic_bezier + ", " + i + ")"
            }
        },
        _setButtons: function () {
            var o = this;
            var n = 0;
            if (typeof this.buttons !== "object") {
                this.buttons = {}
            }
            l.each(this.buttons, function (e, t) {
                n += 1;
                if (typeof t === "function") {
                    o.buttons[e] = t = {
                        action: t
                    }
                }
                o.buttons[e].text = t.text || e;
                o.buttons[e].btnClass = t.btnClass || "btn-default";
                o.buttons[e].action = t.action || function () {};
                o.buttons[e].keys = t.keys || [];
                o.buttons[e].isHidden = t.isHidden || false;
                o.buttons[e].isDisabled = t.isDisabled || false;
                l.each(o.buttons[e].keys, function (t, i) {
                    o.buttons[e].keys[t] = i.toLowerCase()
                });
                var i = l('<button type="button" class="btn"></button>').html(o.buttons[e].text).addClass(o.buttons[e].btnClass).prop("disabled", o.buttons[e].isDisabled).css("display", o.buttons[e].isHidden ? "none" : "").click(function (t) {
                    t.preventDefault();
                    var i = o.buttons[e].action.apply(o, [o.buttons[e]]);
                    o.onAction.apply(o, [e, o.buttons[e]]);
                    o._stopCountDown();
                    if (typeof i === "undefined" || i) {
                        o.close()
                    }
                });
                o.buttons[e].el = i;
                o.buttons[e].setText = function (t) {
                    i.html(t)
                };
                o.buttons[e].addClass = function (t) {
                    i.addClass(t)
                };
                o.buttons[e].removeClass = function (t) {
                    i.removeClass(t)
                };
                o.buttons[e].disable = function () {
                    o.buttons[e].isDisabled = true;
                    i.prop("disabled", true)
                };
                o.buttons[e].enable = function () {
                    o.buttons[e].isDisabled = false;
                    i.prop("disabled", false)
                };
                o.buttons[e].show = function () {
                    o.buttons[e].isHidden = false;
                    i.css("display", "")
                };
                o.buttons[e].hide = function () {
                    o.buttons[e].isHidden = true;
                    i.css("display", "none")
                };
                o["$_" + e] = o["$$" + e] = i;
                o.$btnc.append(i)
            });
            if (n === 0) {
                this.$btnc.hide()
            }
            if (this.closeIcon === null && n === 0) {
                this.closeIcon = true
            }
            if (this.closeIcon) {
                if (this.closeIconClass) {
                    var t = '<i class="' + this.closeIconClass + '"></i>';
                    this.$closeIcon.html(t)
                }
                this.$closeIcon.click(function (t) {
                    t.preventDefault();
                    var i = false;
                    var e = false;
                    var n;
                    if (typeof o.closeIcon == "function") {
                        n = o.closeIcon()
                    } else {
                        n = o.closeIcon
                    }
                    if (typeof n == "string" && typeof o.buttons[n] != "undefined") {
                        i = n;
                        e = false
                    } else {
                        if (typeof n == "undefined" || !!n == true) {
                            e = true
                        } else {
                            e = false
                        }
                    }
                    if (i) {
                        var s = o.buttons[i].action.apply(o);
                        e = typeof s == "undefined" || !!s
                    }
                    if (e) {
                        o.close()
                    }
                });
                this.$closeIcon.show()
            } else {
                this.$closeIcon.hide()
            }
        },
        setTitle: function (t, i) {
            i = i || false;
            if (typeof t !== "undefined") {
                if (typeof t == "string") {
                    this.title = t
                } else {
                    if (typeof t == "function") {
                        if (typeof t.promise == "function") {
                            console.error("Promise was returned from title function, this is not supported.")
                        }
                        var e = t();
                        if (typeof e == "string") {
                            this.title = e
                        } else {
                            this.title = false
                        }
                    } else {
                        this.title = false
                    }
                }
            }
            if (this.isAjaxLoading && !i) {
                return
            }
            this.$title.html(this.title || "");
            this.updateTitleContainer()
        },
        setIcon: function (t, i) {
            i = i || false;
            if (typeof t !== "undefined") {
                if (typeof t == "string") {
                    this.icon = t
                } else {
                    if (typeof t === "function") {
                        var e = t();
                        if (typeof e == "string") {
                            this.icon = e
                        } else {
                            this.icon = false
                        }
                    } else {
                        this.icon = false
                    }
                }
            }
            if (this.isAjaxLoading && !i) {
                return
            }
            this.$icon.html(this.icon ? '<i class="' + this.icon + '"></i>' : "");
            this.updateTitleContainer()
        },
        updateTitleContainer: function () {
            if (!this.title && !this.icon) {
                this.$titleContainer.hide()
            } else {
                this.$titleContainer.show()
            }
        },
        setContentPrepend: function (t, i) {
            if (!t) {
                return
            }
            this.contentParsed.prepend(t)
        },
        setContentAppend: function (t) {
            if (!t) {
                return
            }
            this.contentParsed.append(t)
        },
        setContent: function (t, i) {
            i = !!i;
            var e = this;
            if (t) {
                this.contentParsed.html("").append(t)
            }
            if (this.isAjaxLoading && !i) {
                return
            }
            this.$content.html("");
            this.$content.append(this.contentParsed);
            setTimeout(function () {
                e.$body.find("input[autofocus]:visible:first").focus()
            }, 100)
        },
        loadingSpinner: false,
        showLoading: function (t) {
            this.loadingSpinner = true;
            this.$jconfirmBox.addClass("loading");
            if (t) {
                this.$btnc.find("button").prop("disabled", true)
            }
        },
        hideLoading: function (t) {
            this.loadingSpinner = false;
            this.$jconfirmBox.removeClass("loading");
            if (t) {
                this.$btnc.find("button").prop("disabled", false)
            }
        },
        ajaxResponse: false,
        contentParsed: "",
        isAjax: false,
        isAjaxLoading: false,
        _parseContent: function () {
            var n = this;
            var t = "&nbsp;";
            if (typeof this.content == "function") {
                var i = this.content.apply(this);
                if (typeof i == "string") {
                    this.content = i
                } else {
                    if (typeof i == "object" && typeof i.always == "function") {
                        this.isAjax = true;
                        this.isAjaxLoading = true;
                        i.always(function (t, i, e) {
                            n.ajaxResponse = {
                                data: t,
                                status: i,
                                xhr: e
                            };
                            n._contentReady.resolve(t, i, e);
                            if (typeof n.contentLoaded == "function") {
                                n.contentLoaded(t, i, e)
                            }
                        });
                        this.content = t
                    } else {
                        this.content = t
                    }
                }
            }
            if (typeof this.content == "string" && this.content.substr(0, 4).toLowerCase() === "url:") {
                this.isAjax = true;
                this.isAjaxLoading = true;
                var e = this.content.substring(4, this.content.length);
                l.get(e).done(function (t) {
                    n.contentParsed.html(t)
                }).always(function (t, i, e) {
                    n.ajaxResponse = {
                        data: t,
                        status: i,
                        xhr: e
                    };
                    n._contentReady.resolve(t, i, e);
                    if (typeof n.contentLoaded == "function") {
                        n.contentLoaded(t, i, e)
                    }
                })
            }
            if (!this.content) {
                this.content = t
            }
            if (!this.isAjax) {
                this.contentParsed.html(this.content);
                this.setContent();
                n._contentReady.resolve()
            }
        },
        _stopCountDown: function () {
            clearInterval(this.autoCloseInterval);
            if (this.$cd) {
                this.$cd.remove()
            }
        },
        _startCountDown: function () {
            var t = this;
            var i = this.autoClose.split("|");
            if (i.length !== 2) {
                console.error("Invalid option for autoClose. example 'close|10000'");
                return false
            }
            var e = i[0];
            var n = parseInt(i[1]);
            if (typeof this.buttons[e] === "undefined") {
                console.error("Invalid button key '" + e + "' for autoClose");
                return false
            }
            var s = Math.ceil(n / 1e3);
            this.$cd = l('<span class="countdown"> (' + s + ")</span>").appendTo(this["$_" + e]);
            this.autoCloseInterval = setInterval(function () {
                t.$cd.html(" (" + (s -= 1) + ") ");
                if (s <= 0) {
                    t["$$" + e].trigger("click");
                    t._stopCountDown()
                }
            }, 1e3)
        },
        _getKey: function (t) {
            switch (t) {
                case 192:
                    return "tilde";
                case 13:
                    return "enter";
                case 16:
                    return "shift";
                case 9:
                    return "tab";
                case 20:
                    return "capslock";
                case 17:
                    return "ctrl";
                case 91:
                    return "win";
                case 18:
                    return "alt";
                case 27:
                    return "esc";
                case 32:
                    return "space"
            }
            var i = String.fromCharCode(t);
            if (/^[A-z0-9]+$/.test(i)) {
                return i.toLowerCase()
            } else {
                return false
            }
        },
        reactOnKey: function (t) {
            var e = this;
            var i = l(".jconfirm");
            if (i.eq(i.length - 1)[0] !== this.$el[0]) {
                return false
            }
            var n = t.which;
            if (this.$content.find(":input").is(":focus") && /13|32/.test(n)) {
                return false
            }
            var s = this._getKey(n);
            if (s === "esc" && this.escapeKey) {
                if (this.escapeKey === true) {
                    this.$scrollPane.trigger("click")
                } else {
                    if (typeof this.escapeKey === "string" || typeof this.escapeKey === "function") {
                        var o;
                        if (typeof this.escapeKey === "function") {
                            o = this.escapeKey()
                        } else {
                            o = this.escapeKey
                        }
                        if (o) {
                            if (typeof this.buttons[o] === "undefined") {
                                console.warn("Invalid escapeKey, no buttons found with key " + o)
                            } else {
                                this["$_" + o].trigger("click")
                            }
                        }
                    }
                }
            }
            l.each(this.buttons, function (t, i) {
                if (i.keys.indexOf(s) !== -1) {
                    e["$_" + t].trigger("click")
                }
            })
        },
        setDialogCenter: function () {
            console.info("setDialogCenter is deprecated, dialogs are centered with CSS3 tables")
        },
        _unwatchContent: function () {
            clearInterval(this._timer)
        },
        close: function () {
            var r = this;
            if (typeof this.onClose === "function") {
                this.onClose()
            }
            this._unwatchContent();
            l(d).unbind("resize." + this._id);
            l(d).unbind("keyup." + this._id);
            l(d).unbind("jcKeyDown." + this._id);
            if (this.draggable) {
                l(d).unbind("mousemove." + this._id);
                l(d).unbind("mouseup." + this._id);
                this.$titleContainer.unbind("mousedown")
            }
            r.$el.removeClass(r.loadedClass);
            l("body").removeClass("jconfirm-no-scroll-" + r._id);
            r.$jconfirmBoxContainer.removeClass("jconfirm-no-transition");
            setTimeout(function () {
                r.$body.addClass(r.closeAnimationParsed);
                r.$jconfirmBg.addClass("jconfirm-bg-h");
                var t = r.closeAnimation === "none" ? 1 : r.animationSpeed;
                setTimeout(function () {
                    r.$el.remove();
                    var t = u.instances;
                    var i = u.instances.length - 1;
                    for (i; i >= 0; i--) {
                        if (u.instances[i]._id === r._id) {
                            u.instances.splice(i, 1)
                        }
                    }
                    if (!u.instances.length) {
                        if (r.scrollToPreviousElement && u.lastFocused && u.lastFocused.length && l.contains(document, u.lastFocused[0])) {
                            var e = u.lastFocused;
                            if (r.scrollToPreviousElementAnimate) {
                                var n = l(d).scrollTop();
                                var s = u.lastFocused.offset().top;
                                var o = l(d).height();
                                if (!(s > n && s < n + o)) {
                                    var a = s - Math.round(o / 3);
                                    l("html, body").animate({
                                        scrollTop: a
                                    }, r.animationSpeed, "swing", function () {
                                        e.focus()
                                    })
                                } else {
                                    e.focus()
                                }
                            } else {
                                e.focus()
                            }
                            u.lastFocused = false
                        }
                    }
                    if (typeof r.onDestroy === "function") {
                        r.onDestroy()
                    }
                }, t * .4)
            }, 50);
            return true
        },
        open: function () {
            if (this.isOpen()) {
                return false
            }
            this._buildHTML();
            this._bindEvents();
            this._open();
            return true
        },
        setStartingPoint: function () {
            var t = false;
            if (this.animateFromElement !== true && this.animateFromElement) {
                t = this.animateFromElement;
                u.lastClicked = false
            } else {
                if (u.lastClicked && this.animateFromElement === true) {
                    t = u.lastClicked;
                    u.lastClicked = false
                } else {
                    return false
                }
            }
            if (!t) {
                return false
            }
            var i = t.offset();
            var e = t.outerHeight() / 2;
            var n = t.outerWidth() / 2;
            e -= this.$jconfirmBox.outerHeight() / 2;
            n -= this.$jconfirmBox.outerWidth() / 2;
            var s = i.top + e;
            s = s - this._scrollTop();
            var o = i.left + n;
            var a = l(d).height() / 2;
            var r = l(d).width() / 2;
            var c = a - this.$jconfirmBox.outerHeight() / 2;
            var f = r - this.$jconfirmBox.outerWidth() / 2;
            s -= c;
            o -= f;
            if (Math.abs(s) > a || Math.abs(o) > r) {
                return false
            }
            this.$jconfirmBoxContainer.css("transform", "translate(" + o + "px, " + s + "px)")
        },
        _open: function () {
            var t = this;
            if (typeof t.onOpenBefore === "function") {
                t.onOpenBefore()
            }
            this.$body.removeClass(this.animationParsed);
            this.$jconfirmBg.removeClass("jconfirm-bg-h");
            this.$body.focus();
            t.$jconfirmBoxContainer.css("transform", "translate(" + 0 + "px, " + 0 + "px)");
            setTimeout(function () {
                t.$body.css(t._getCSS(t.animationSpeed, 1));
                t.$body.css({
                    "transition-property": t.$body.css("transition-property") + ", margin"
                });
                t.$jconfirmBoxContainer.addClass("jconfirm-no-transition");
                t._modalReady.resolve();
                if (typeof t.onOpen === "function") {
                    t.onOpen()
                }
                t.$el.addClass(t.loadedClass)
            }, this.animationSpeed)
        },
        loadedClass: "jconfirm-open",
        isClosed: function () {
            return ! this.$el || this.$el.css("display") === ""
        },
        isOpen: function () {
            return ! this.isClosed()
        },
        toggle: function () {
            if (!this.isOpen()) {
                this.open()
            } else {
                this.close()
            }
        }
    };
    u.instances = [];
    u.lastFocused = false;
    u.pluginDefaults = {
        template: '<div class="jconfirm"><div class="jconfirm-bg jconfirm-bg-h"></div><div class="jconfirm-scrollpane"><div class="jconfirm-row"><div class="jconfirm-cell"><div class="jconfirm-holder"><div class="jc-bs3-container"><div class="jc-bs3-row"><div class="jconfirm-box-container jconfirm-animated"><div class="jconfirm-box" role="dialog" aria-labelledby="labelled" tabindex="-1"><div class="jconfirm-closeIcon">&times;</div><div class="jconfirm-title-c"><span class="jconfirm-icon-c"></span><span class="jconfirm-title"></span></div><div class="jconfirm-content-pane"><div class="jconfirm-content"></div></div><div class="jconfirm-buttons"></div><div class="jconfirm-clear"></div></div></div></div></div></div></div></div></div></div>',
        title: "Hello",
        titleClass: "",
        type: "default",
        typeAnimated: true,
        draggable: true,
        dragWindowGap: 15,
        dragWindowBorder: true,
        animateFromElement: true,
        alignMiddle: true,
        smoothContent: true,
        content: "Are you sure to continue?",
        buttons: {},
        defaultButtons: {
            ok: {
                // action: function () {}
                action: function(){alert('asdf');}
            },
            close: {
                action: function () {}
            }
        },
        contentLoaded: function () {},
        icon: "",
        lazyOpen: false,
        bgOpacity: null,
        theme: "light",
        animation: "scale",
        closeAnimation: "scale",
        animationSpeed: 400,
        animationBounce: 1,
        escapeKey: true,
        rtl: false,
        container: "body",
        containerFluid: false,
        backgroundDismiss: false,
        backgroundDismissAnimation: "shake",
        autoClose: false,
        closeIcon: null,
        closeIconClass: false,
        watchInterval: 100,
        columnClass: "col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1",
        boxWidth: "50%",
        scrollToPreviousElement: true,
        scrollToPreviousElementAnimate: true,
        useBootstrap: true,
        offsetTop: 40,
        offsetBottom: 40,
        bootstrapClasses: {
            container: "container",
            containerFluid: "container-fluid",
            row: "row"
        },
        onContentReady: function () {},
        onOpenBefore: function () {},
        onOpen: function () {},
        onClose: function () {},
        onDestroy: function () {},
        onAction: function () {}
    };
    var n = false;
    l(d).on("keydown", function (t) {
        if (!n) {
            var i = l(t.target);
            var e = false;
            if (i.closest(".jconfirm-box").length) {
                e = true
            }
            if (e) {
                l(d).trigger("jcKeyDown")
            }
            n = true
        }
    });
    l(d).on("keyup", function () {
        n = false
    });
    u.lastClicked = false;
    l(document).on("mousedown", "button, a", function () {
        u.lastClicked = l(this)
    })
})(jQuery, window);