(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{BAre:function(e,t,r){"use strict";r.d(t,"a",function(){return n});var i=r("26FU"),o=r("CcnG"),n=function(){function e(){this.choosedFilms=JSON.parse(localStorage.getItem("choosedFilmArray"))||[],this.ids=JSON.parse(localStorage.getItem("choosedIdArray"))||[],this.SelectedFilms$=new i.a(this.choosedFilms),this.SelectedIDs$=new i.a(this.ids)}return e.prototype.getSelectedIds=function(){return this.SelectedIDs$},e.prototype.getSelectedFilms=function(){return this.SelectedFilms$},e.prototype.selectHandler=function(e){var t=JSON.parse(localStorage.getItem("loadedChildren"))||[],r=JSON.parse(localStorage.getItem("choosedIdArray"))||[],i=JSON.parse(localStorage.getItem("choosedFilmArray"))||[],o=e.target.attributes.id.value,n=t.find(function(e){return e.imdbID===o});r.includes(o)?(this.SelectedFilms$.next(this.SelectedFilms$.value.filter(function(e){return e.imdbID!==o})),i=i.filter(function(e){return e.imdbID!==o})):(this.SelectedFilms$.next(this.SelectedFilms$.value.concat([n])),i.push(n)),r.includes(o)?(this.SelectedIDs$.next(this.SelectedIDs$.value.filter(function(e){return e!==o})),r=r.filter(function(e){return e!==o})):(this.SelectedIDs$.next(this.SelectedIDs$.value.concat([o])),r.push(o)),localStorage.setItem("choosedIdArray",JSON.stringify(r)),localStorage.setItem("choosedFilmArray",JSON.stringify(i))},e.prototype.deleteHandler=function(e){if(confirm("Do you realy wand delete this film from choosed ?")){var t=JSON.parse(localStorage.getItem("choosedIdArray"))||[],r=JSON.parse(localStorage.getItem("choosedFilmArray"))||[],i=e.target.attributes.id.value;this.SelectedIDs$.next(this.SelectedIDs$.value.filter(function(e){return e!==i})),t=t.filter(function(e){return e!==i}),this.SelectedFilms$.next(this.SelectedFilms$.value.filter(function(e){return e.imdbID!==i})),r=r.filter(function(e){return e.imdbID!==i}),localStorage.setItem("choosedFilmArray",JSON.stringify(r)),localStorage.setItem("choosedIdArray",JSON.stringify(t))}},e.ngInjectableDef=o.T({factory:function(){return new e},token:e,providedIn:"root"}),e}()},EFwT:function(e,t,r){"use strict";r.d(t,"a",function(){return s});var i=r("imvL"),o=r("CcnG"),n=r("ZYCi"),s=function(){function e(e,t){this.authService=e,this.router=t}return e.prototype.canActivate=function(e,t){return this.authService.isLoggedIn&&(window.alert("You are not allowed to access this URL!"),this.router.navigate(["dashboard"])),!0},e.ngInjectableDef=o.T({factory:function(){return new e(o.X(i.a),o.X(n.k))},token:e,providedIn:"root"}),e}()}}]);