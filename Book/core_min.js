var Core={};if(document.addEventListener){Core.addEventListener=function(e,t,n){e.addEventListener(t,n,false)};Core.removeEventListener=function(e,t,n){e.removeEventListener(t,n,false)};Core.preventDefault=function(e){e.preventDefault()};Core.stopPropagation=function(e){e.stopPropagation()}}else if(document.attachEvent){Core.addEventListener=function(e,t,n){if(Core._findListener(e,t,n)!=-1)return;var r=function(){var t=window.event;if(Function.prototype.call){n.call(e,t)}else{e._currentListener=n;e._currentListener(t);e._currentListener=null}};e.attachEvent("on"+t,r);var i={target:e,type:t,listener:n,listener2:r};var s=e.document||e;var o=s.parentWindow;var u="l"+Core._listenerCounter++;if(!o._allListeners)o._allListeners={};o._allListeners[u]=i;if(!e._listeners)e._listeners=[];e._listeners[e._listeners.length]=u;if(!o._unloadListenerAdded){o._unloadListenerAdded=true;o.attachEvent("onunload",Core._removeAllListeners)}};Core.removeEventListener=function(e,t,n){var r=Core._findListener(e,t,n);if(r==-1)return;var i=e.document||e;var s=i.parentWindow;var o=e._listeners[r];var u=s._allListeners[o];e.detachEvent("on"+t,u.listener2);e._listeners.splice(r,1);delete s._allListeners[o]};Core.preventDefault=function(e){e.returnValue=false};Core.stopPropagation=function(e){e.cancelBubble=true};Core._findListener=function(e,t,n){var r=e._listeners;if(!r)return-1;var i=e.document||e;var s=i.parentWindow;for(var o=r.length-1;o>=0;o--){var u=r[o];var a=s._allListeners[u];if(a.type==t&&a.listener==n){return o}}return-1};Core._removeAllListeners=function(){var e=this;for(id in e._allListeners){var t=e._allListeners[id];t.target.detachEvent("on"+t.type,t.listener2);delete e._allListeners[id]}};Core._listenerCounter=0}Core.addClass=function(e,t){if(!Core.hasClass(e,t)){if(e.className==""){e.className=t}else{e.className+=" "+t}}};Core.getElementsByClass=function(e){var t=[];if(document.all){t=document.all}else{t=document.getElementsByTagName("*")}var n=[];var r=new RegExp("(^| )"+e+"( |$)");for(var i=0;i<t.length;i++){if(r.test(t[i].className)){n[n.length]=t[i]}}return n};Core.hasClass=function(e,t){var n=new RegExp("(^| )"+t+"( |$)");if(n.test(e.className)){return true}return false};Core.removeClass=function(e,t){var n=new RegExp("(^| )"+t+"( |$)");e.className=e.className.replace(n,"$1");e.className=e.className.replace(/ $/,"")};Core.getComputedStylePx=function(e,t){var n=null;if(typeof e.currentStyle!="undefined"){n=e.currentStyle}else{n=document.defaultView.getComputedStyle(e,null)}return n[t]};Core.getComputedStyle=function(e,t){var n=null;if(typeof e.currentStyle!="undefined"){n=e.currentStyle}else{n=document.defaultView.getComputedStyle(e,null)}return parseInt(n[t])};Core.start=function(e){Core.addEventListener(window,"load",e.init)}