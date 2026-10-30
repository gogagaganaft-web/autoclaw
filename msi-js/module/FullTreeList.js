var treeDataCache = new Map();

function getCacheKey(dbName, itemsQuery) {
    return dbName + '::' + itemsQuery;
}

function mapRows(data) {
    if (!data.rows) return [];
    var columns = data.columns;
    return data.rows.map(function(row) {
        var obj = {};
        columns.forEach(function(col, i) { obj[col] = row[i]; });
        return obj;
    });
}

export class FullTreeList {
    static getCacheKey(dbName, itemsQuery) {
        return getCacheKey(dbName, itemsQuery);
    }

    static getCachedData(dbName, itemsQuery) {
        var data = treeDataCache.get(getCacheKey(dbName, itemsQuery));
        return data && !data.then ? data : null;
    }

    static preload(dbName, itemsQuery, fetchUrl) {
        if (!dbName || !itemsQuery) return;
        var cacheKey = getCacheKey(dbName, itemsQuery);
        if (treeDataCache.has(cacheKey)) return;

        console.log('FullTreeList.preload: ' + dbName + ' — загрузка в фоне...');

        var promise = fetch(fetchUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ dbName: dbName, sql: itemsQuery })
        })
        .then(function(response) { return response.json(); })
        .then(function(data) {
            var mapped = mapRows(data);
            treeDataCache.set(cacheKey, mapped);
            console.log('FullTreeList.preload: загружено ' + mapped.length + ' записей');
            return mapped;
        })
        .catch(function(error) {
            console.error('FullTreeList.preload error:', error);
            treeDataCache.delete(cacheKey);
        });

        treeDataCache.set(cacheKey, promise);
    }

    static preloadAll(toolbar, fetchUrl) {
        if (!toolbar || !fetchUrl) return;
        toolbar.forEach(function(f) {
            if (f.preload === true && f.dbName && f.itemsQuery) {
                FullTreeList.preload(f.dbName, f.itemsQuery, fetchUrl);
            }
        });
    }

    constructor({ container, rootValue, dbName, fetchUrl, dropDownInstance, initialSelectedIds = [], onSelectionChange, itemsQuery }) {
        this.container = container;
        this.rootValue = rootValue;
        this.dbName = dbName;
        this.fetchUrl = fetchUrl;
        this.dropDownInstance = dropDownInstance;
        this.initialSelectedIds = initialSelectedIds;
        this.onSelectionChange = onSelectionChange;
        this.itemsQuery = itemsQuery;
        this.selectedItems = [];
        this.treeListInstance = null;
        this.hasInitialized = false;
        this.init();
    }

    selectRows(ids, recursive) {
        var self = this;
        recursive = recursive !== undefined ? recursive : false;

        if (this.treeListInstance && ids && ids.length > 0) {
            setTimeout(function() {
                try {
                    self.treeListInstance.selectRows(ids, recursive);

                    var selectedRowsData = self.treeListInstance.getSelectedRowsData();
                    self.selectedItems = selectedRowsData.map(function(row) {
                        return { id: row.ID, name: row.NODE };
                    });

                    self.updateDropDown();
                } catch(err) {
                    console.error('Ошибка при выделении строк:', err);
                }
            }, 100);
        }
    }

    updateDropDown() {
        if (this.dropDownInstance) {
            var names = this.selectedItems.map(function(i) { return i.name; }).join(', ');
            var idsArr = this.selectedItems.map(function(i) { return i.id; });
            this.dropDownInstance.option('value', idsArr);
            this.dropDownInstance.option('dataSource', this.selectedItems);
            this.dropDownInstance.option('text', names || '');

            if (this.onSelectionChange) {
                this.onSelectionChange(idsArr, this.selectedItems);
            }
        }
    }

    deselectAll() {
        if (this.treeListInstance) {
            this.treeListInstance.deselectAll();
            this.selectedItems = [];
            this.updateDropDown();
        }
    }

    updateDimensions() {
        if (this.treeListInstance) {
            this.treeListInstance.updateDimensions();
        }
    }

    focusFilterRow() {
        if (!this.treeListInstance) return;
        var $input = $(this.treeListInstance.element()).find('.dx-texteditor-input').first();
        if ($input.length > 0) {
            $input[0].focus();
        }
    }

    getSelectedItems() {
        return this.selectedItems;
    }

    destroy() {
        if (this.treeListInstance) {
            this.treeListInstance.dispose();
        }
        $(this.container).empty();
    }

    _applyData(mappedData, keysToSelect) {
        var self = this;

        this.treeListInstance.option('dataSource', mappedData);

        if (keysToSelect && keysToSelect.length > 0) {
            setTimeout(function() {
                try {
                    self.treeListInstance.selectRows(keysToSelect, false);

                    var selectedRowsData = self.treeListInstance.getSelectedRowsData();
                    self.selectedItems = selectedRowsData.map(function(row) {
                        return { id: row.ID, name: row.NODE };
                    });

                    self.updateDropDown();
                } catch(err) {
                    console.error('FullTreeList: ошибка при выделении начальных строк:', err);
                }
            }, 300);
        }
    }

    init() {
        var self = this;
        var keysToSelect = (this.initialSelectedIds && this.initialSelectedIds.length > 0)
            ? this.initialSelectedIds
            : [];

        console.log('FullTreeList.init - initialSelectedIds:', this.initialSelectedIds);

        this.treeListInstance = $(this.container).dxTreeList({
            dataSource: [],
            rootValue: this.rootValue,
            keyExpr: "ID",
            parentIdExpr: "PARENT",
            hasItemsExpr: "GRP",
            searchPanel: {
                visible: false,
                width: '25vw',
                placeholder: 'Поиск...'
            },
            filterRow: { visible: true },
            filterPanel: { visible: true },
            toolbar: {
                items: [
                    { name: 'searchPanel', location: 'before' }
                ]
            },
            selection: {
                mode: "multiple",
                recursive: true
            },
            columns: [
                {
                    dataField: "NODE",
                    caption: "Фонд"
                }
            ],
            showBorders: true,
            expandedRowKeys: [],
            onContentReady: function(e) {
                if (!self.hasInitialized && keysToSelect && keysToSelect.length > 0) {
                    self.hasInitialized = true;
                    setTimeout(function() {
                        try {
                            self.treeListInstance.selectRows(keysToSelect, false);

                            var selectedRowsData = self.treeListInstance.getSelectedRowsData();
                            self.selectedItems = selectedRowsData.map(function(row) {
                                return { id: row.ID, name: row.NODE };
                            });

                            self.updateDropDown();
                        } catch(err) {
                            console.error('Ошибка при выделении:', err);
                        }
                    }, 200);
                }
            },
            onSelectionChanged: function(e) {
                self.selectedItems = e.selectedRowsData.map(function(row) {
                    return { id: row.ID, name: row.NODE };
                });

                console.log('FullTreeList выделено:', self.selectedItems);
                self.updateDropDown();
            }
        }).dxTreeList("instance");

        // Check session cache
        var cacheKey = getCacheKey(this.dbName, this.itemsQuery);
        var cached = treeDataCache.get(cacheKey);

        if (cached && !cached.then) {
            // Fully loaded data
            console.log('FullTreeList.init: данные из кэша (' + cached.length + ' узлов)');
            this._applyData(cached, keysToSelect);
            return;
        }

        if (cached && cached.then) {
            // Still loading (Promise in cache)
            console.log('FullTreeList.init: ожидание фоновой загрузки...');
            this.treeListInstance.beginCustomLoading('Загрузка дерева адресов...');
            cached.then(function(data) {
                if (data && data.length > 0) {
                    self._applyData(data, keysToSelect);
                }
                self.treeListInstance.endCustomLoading();
            });
            return;
        }

        // Not cached — fetch now
        console.log('FullTreeList.init: загрузка с сервера...');
        this.treeListInstance.beginCustomLoading('Загрузка дерева адресов...');
        this._loadFullData(cacheKey, keysToSelect);
    }

    _loadFullData(cacheKey, keysToSelect) {
        var self = this;
        if (!this.itemsQuery || !this.dbName) {
            console.warn('FullTreeList._loadFullData: itemsQuery or dbName missing');
            if (this.treeListInstance) this.treeListInstance.endCustomLoading();
            return;
        }

        console.log('FullTreeList._loadFullData: executing query');

        fetch(this.fetchUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                dbName: this.dbName,
                sql: this.itemsQuery
            }),
        })
        .then(function(response) { return response.json(); })
        .then(function(data) {
            var mappedData = mapRows(data);

            console.log('FullTreeList._loadFullData: loaded', mappedData.length, 'nodes');

            // Save to cache
            treeDataCache.set(cacheKey, mappedData);

            self._applyData(mappedData, keysToSelect);
            self.treeListInstance.endCustomLoading();
        })
        .catch(function(error) {
            console.error('FullTreeList._loadFullData error:', error);
            if (self.treeListInstance) self.treeListInstance.endCustomLoading();
        });
    }
}
