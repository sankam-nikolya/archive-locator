/*
 *  jQuery fullscreen popup - v0.0.1
 *  Simple fullscreen popup plugin
 *  https://github.com/nurislamov/jquery-fullscreen-popup
 *
 *  Made by Timur Nurislamov
 *  Under MIT License
 */
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  (function($) {
    var FSP, defaults, pluginName;
    pluginName = "fullScreenPopup";
    defaults = {
      bgColor: "#fff",
      inlineStyles: true,
      lockDocumentScroll: true,
      mainWrapperClass: "fsp-wrapper",
      contentWrapperClass: "fsp-content",
      closePopupClass: "fsp-close",
      animationSpeed: 200
    };
    FSP = (function() {
      function FSP(element, options) {
        this.element = element;
        this.closePopup = __bind(this.closePopup, this);
        this.init = __bind(this.init, this);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.element = $(this.element);
        this.body = $("body");
        this.element.on("click", this.init);
      }

      FSP.prototype.init = function(event) {
        event.preventDefault();
        this.getTarget();
        this.getTargetSizes();
        this.createWrappers();
        this.wrapTarget();
        if (this.options.lockDocumentScroll) {
          this.lockDocumentScroll();
        }
        this.render();
        return this.bindEvents();
      };

      FSP.prototype.getTarget = function() {
        this.target = $(this.element.attr("href") || this.element.data("popup"));
        return this.targetParent = this.target.parent();
      };

      FSP.prototype.getTargetSizes = function() {
        return this.targetSizes = {
          width: this.target.width(),
          height: this.target.height()
        };
      };

      FSP.prototype.wrapTarget = function() {
        this.target = this.detachFromDom(this.target);
        return this.target.appendTo(this.contentWrapper);
      };

      FSP.prototype.render = function() {
					
					// Custom by Arief Grando
					$('#pencarian').find('input, select').each(function(){

						if($(this).attr('id')==$("#carifil").val()){
							var el = $("#carifil").val();
							$("#popup2").html("");
							$.ajax({
								type: "POST",
								url: "http://10.16.107.77/arsip/user/proses/findarsip/",
								data: "kriteria="+$('#'+el).attr('name')+"&"+"data="+$('#'+el).val(),
								async: true,
								success: function(result4) 
								{
									var htm="";
									$.each(jQuery.parseJSON(result4), function() {

										htm+= "<div class='large-12 columns'>";
										  htm+= "<div class='row collapse'>";
											htm+= "<label>Nomor Surat</label>";
											htm+= "<div class='small-12 columns'>";
											  htm+= this.no_surat;
											htm+= "</div>";
										  htm+= "</div>";
										htm+= "</div>";

										htm+= "<div class='large-12 columns'>";
										  htm+= "<div class='row collapse'>";
											htm+= "<label>Tanggal Surat</label>";
											htm+= "<div class='small-12 columns'>";
											  htm+= this.tgl_surat;
											htm+= "</div>";
										  htm+= "</div>";
										htm+= "</div>";

										htm+= "<div class='large-12 columns'>";
										  htm+= "<div class='row collapse'>";
											htm+= "<label>Perihal Surat</label>";
											htm+= "<div class='small-12 columns'>";
											  htm+= this.perihal_surat;
											htm+= "</div>";
										  htm+= "</div>";
										htm+= "</div>";

										htm+= "<div class='large-12 columns'>";
										  htm+= "<div class='row collapse'>";
											htm+= "<label>Lokasi Surat</label>";
											htm+= "<div class='small-12 columns'>";
											  htm+= "Lemari nomor : "+this.no_lemari+", Odner nomor : "+this.no_odner;
											htm+= "</div>";
										  htm+= "</div>";
										htm+= "</div>";

										htm+= "<div class='large-12 columns'>";
										  htm+= "<div class='row collapse'>";
											htm+= "<label>Perihal Surat</label>";
											htm+= "<div class='small-12 columns'>";
											  htm+= this.keterangan_lokasi;
											htm+= "</div>";
										  htm+= "</div>";
										htm+= "</div>";

										htm+= "<div class='large-12 columns'>";
										  htm+= "<div class='row collapse'>";
											htm+= "<label>Perihal Surat</label>";
											htm+= "<div class='small-12 columns'>";
											  htm+= this.keterangan;
											htm+= "</div>";
										  htm+= "</div>";
										htm+= "</div>";

										htm+= "<div class='large-12 columns'>";
										  htm+= "<div class='row collapse'>";
											htm+= "<label>&nbsp</label>";
											htm+= "<div class='small-12 columns'>";
											  htm+= "&nbsp;";
											htm+= "</div>";
										  htm+= "</div>";
										htm+= "</div>";
										/*
										htm+="<div class='large-12 columns'>";
											htm+="<div class='row collapse'>";
												htm+="Nomor Surat : "+this.no_surat;
											htm+="</div>";
										htm+="</div>";

										htm+="<div class='large-12 columns'>";
											htm+="<div class='row collapse'>";
												htm+="Tanggal Surat : "+this.tgl_surat;
											htm+="</div>";
										htm+="</div>";

										htm+="<div class='large-12 columns'>";
											htm+="<div class='row collapse'>";
												htm+="Perihal Surat : "+this.perihal_surat;
											htm+="</div>";
										htm+="</div>";

										htm+="<div class='large-12 columns'>";
											htm+="<div class='row collapse'>";
												htm+="Lokasi Surat : <br>Lemari nomor : "+this.no_lemari+", Odner nomor : "+this.no_odner;
											htm+="</div>";
										htm+="</div>";

										htm+="<div class='large-12 columns'>";
											htm+="<div class='row collapse'>";
												htm+="Deskripsi Lokasi : "+this.keterangan_lokasi;
											htm+="</div>";
										htm+="</div>";

										htm+="<div class='large-12 columns'>";
											htm+="<div class='row collapse'>";
												htm+="Keterangan Surat : "+this.keterangan;
											htm+="</div>";
										htm+="</div>";

										htm+="<div class='large-12 columns'>";
											htm+="<div class='row collapse'>";
												htm+="&nbsp;&nbsp;&nbsp;";
											htm+="</div>";
										htm+="</div>";


										//htm+="<td>"+this.tgl_surat+"</td>";
										//htm+="<td>"+this.perihal_surat+"</td>";
										//htm+="<td>Lemari nomor : "+this.no_lemari+", Odner nomor : "+this.no_odner+"</td>";
										//htm+="<td>"+this.keterangan_lokasi+"</td>";
										//htm+="<td>"+this.keterangan+"</td>";
										//htm+="</tr>";
										*/
									});
									//htm+="</div>";
									//htm+="</table>";
									$("#popup2").html(htm);
									console.log(result4);
								}
							});

						}
					});

        this.target.show();
        this.attachToDom(this.mainWrapper, "body");
        this.popupCentered();
        return this.mainWrapper.fadeIn(this.options.animationSpeed);
      };

      FSP.prototype.detachFromDom = function(element) {
        return element.detach();
      };

      FSP.prototype.attachToDom = function(element, target) {
        return element.appendTo(target);
      };

      FSP.prototype.bindEvents = function() {
        return this.close.on("click", this.closePopup);
      };

      FSP.prototype.createWrappers = function() {
        this.mainWrapper = $("<div/>", {
          "class": "" + this.options.mainWrapperClass,
          "style": this.options.inlineStyles ? "background: " + this.options.bgColor + "; position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 9999; overflow-y: auto; overflow-x: hidden; display: none" : void 0
        });
        this.contentWrapper = $("<div/>", {
          "class": "" + this.options.contentWrapperClass,
          "style": "width: " + this.targetSizes.width + "px; height: " + this.targetSizes.height + "px;  position: absolute; top: 50%; left: 50%; margin-left: -" + (this.targetSizes.width / 2) + "px; margin-top: -" + (this.targetSizes.height / 2) + "px"
        }).appendTo(this.mainWrapper);
        return this.close = $("<a/>", {
          href: "#",
          html: "&times;",
          "class": "" + this.options.closePopupClass,
          "style": this.options.inlineStyles ? "position: absolute; right: 2em; top: 2em;" : void 0
        }).appendTo(this.mainWrapper);
      };

      FSP.prototype.popupCentered = function() {};

      FSP.prototype.closePopup = function(event) {
        var self;
        event.preventDefault();
        self = this;
        return this.mainWrapper.fadeOut(this.options.animationSpeed, function() {
          if (self.options.lockDocumentScroll) {
            self.unlockDocumentScroll();
          }
          self.target = self.detachFromDom(self.target);
          self.target.hide();
          self.attachToDom(self.target, self.targetParent);
          return self.deleteWrappers();
        });
      };

      FSP.prototype.deleteWrappers = function() {
        return this.mainWrapper.remove();
      };

      FSP.prototype.lockDocumentScroll = function() {
        return this.body.css({
          "overflow": "hidden"
        });
      };

      FSP.prototype.unlockDocumentScroll = function() {
        return this.body.css({
          "overflow": "visible"
        });
      };

      return FSP;

    })();
    return $.fn[pluginName] = function(options) {
      return this.each(function() {
        if (!$.data(this, "plugin_" + pluginName)) {
          return $.data(this, "plugin_" + pluginName, new FSP(this, options));
        }
      });
    };
  })(jQuery);

}).call(this);