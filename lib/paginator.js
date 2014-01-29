Paginator = function(collection, itemsPerPage, currentPage) {
    var Collection = collection;
    var perpage = itemsPerPage;
    var CurrentPageAlias = 'page';
    if(currentPage) {
        CurrentPageAlias = currentPage;
    }
    
    this._style = 'bootstrap';
    
    this.CurrentPageSessionAlias = function(alias) {
        if(alias) {
            CurrentPageAlias = alias;
            return this;
        } else {
            return CurrentPageAlias;
        }
    };
    
    this.PerPage = function(count) {
        if(count) {
            perpage = count;
            return this;
        } else {
            return perpage;
        }
    };
    
    this.GetCollection = function() {
        return Collection;
    };
};

Paginator.prototype.GetCurrentPageCollectionItems = function(criteria) {
    if(criteria) {
        var page = Session.get(this.CurrentPageSessionAlias());
        //debugger;
        return this.GetCollection().find(criteria, {limit: this.PerPage(), skip: (page - 1) * this.PerPage()});
    }
};

Paginator.prototype.GetCurrentPage = function() {
    return Session.get(this.CurrentPageSessionAlias());
};

Paginator.prototype.TotalPages = function(criteria) {
    var totalPages, remainder;
    var cursorCount = this.GetCollection().find(criteria).count();
    var perPage = this.PerPage();
    remainder = cursorCount / perPage % 1;
    if (remainder !== 0)
      totalPages = cursorCount / perPage - remainder + 1;
    else
      totalPages = cursorCount / perPage;
    return totalPages;
};

Paginator.prototype.DrowPagination = function(route, criteria) {
    var self = this;
    
    route = route.toString();
    return self._createHTML(route, self.GetCurrentPage(), self.TotalPages(criteria));
};

Paginator.prototype._createHTML = function(prependRoute, currentPage, totalPages) {
    var html = '';

    var trailingSlash = /\/$/;
    if (!trailingSlash.test(prependRoute))
        prependRoute += '/';

    var prevPage = parseInt(currentPage) - 1;
    var nextPage = parseInt(currentPage) + 1;
    if (this._style === 'bootstrap')
        return this._bootstrap(prependRoute, currentPage, totalPages, prevPage, nextPage, html);
    else
        return this._oneOfX(prependRoute, currentPage, totalPages, prevPage, nextPage, html);
};

// Style 'one-of-x'
Paginator.prototype._oneOfX = function(prependRoute, currentPage, totalPages, prevPage, nextPage, html) {
    html += '<div class="pagination">';
    if (totalPages !== 1) {
        if (currentPage > 1) {
            html += '<a href="' + prependRoute + prevPage + '">Prev</a> ';
      }
      html += currentPage + ' of ' + totalPages;
      if (currentPage < totalPages) {
            html += ' <a href="' + prependRoute + nextPage + '">Next</a>';
      }
    } else {
      // No buttons
        html += currentPage + ' of ' + totalPages;
    }
    html += '</div>';
    return html;
};

// Style 'bootstrap'
Paginator.prototype._bootstrap = function(prependRoute, currentPage, totalPages, prevPage, nextPage, html) {
    html += '<div class="pagination-cont"><ul class="pagination">';
    if (totalPages !== 1) {
        if (currentPage > 1) {
            html += '<li><a href="' + prependRoute + prevPage + '">«</a></li>';
        }
        for (var i = currentPage ; (i <= totalPages) && (i - currentPage < 4); i++) {
            if (i < 1) continue;
            if (i !== currentPage)
                html += '<li><a href="' + prependRoute + i + '">' + i + '</a></li>';
            else
                html += '<li class="active"><a href="' + prependRoute + i + '">' + i + '</a></li>';
        }
        if (currentPage < totalPages) {
            html += '<li><a href="' + prependRoute + nextPage + '">»</a></li>';
        }
    }
    html += '</ul></div>';
    return html;
};