export class FondTreeList {
    constructor({ container, rootValue, dbName, fetchUrl, dropDownInstance, initialSelectedIds = [], onSelectionChange }) {
        this.container = container;
        this.rootValue = rootValue;
        this.dbName = dbName;
        this.fetchUrl = fetchUrl;
        this.dropDownInstance = dropDownInstance;
        this.initialSelectedIds = initialSelectedIds;
        this.onSelectionChange = onSelectionChange;
        this.selectedItems = [];
        this.treeListInstance = null;
        this.hasInitialized = false;
        this.init();
    }
    
    generateSql(ids) {
        var finalIds = (Array.isArray(ids) && ids.length > 0) ? ids.join(',') : this.rootValue;
        var sql = sysrequest[0].query.replace('{finalIds}', finalIds);
        console.log('📊 FondTreeList.generateSql: IDs=' + finalIds + ' → SQL сгенерирован (длина ' + sql.length + ' символов)');
        return sql;
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
    
    getAllParents(id, callback, parents) {
        var self = this;
        var parentsList = parents || [];
        
        if (id === this.rootValue) {
            if (callback) callback(parentsList);
            return;
        }
        
        var sql = "SELECT PARENT FROM (" + sysrequest[0].query.replace('{finalIds}', id) + ") t WHERE ID = " + id;
        
        fetch(this.fetchUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                dbName: this.dbName,
                sql: sql
            }),
        })
        .then(function(response) { return response.json(); })
        .then(function(data) {
            if (data.rows && data.rows.length > 0) {
                var parentId = data.rows[0][0];
                if (parentId && parentId !== self.rootValue) {
                    parentsList.push(parentId);
                    self.getAllParents(parentId, callback, parentsList);
                } else {
                    if (callback) callback(parentsList);
                }
            } else {
                if (callback) callback(parentsList);
            }
        })
        .catch(function(error) {
            console.error('Ошибка получения родителя:', error);
            if (callback) callback(parentsList);
        });
    }
    
    init() {
        var self = this;
        var keysToSelect = (this.initialSelectedIds && this.initialSelectedIds.length > 0) 
            ? this.initialSelectedIds 
            : [];
        
        console.log('FondTreeList.init - initialSelectedIds:', this.initialSelectedIds);
        
        this.treeListInstance = $(this.container).dxTreeList({
            dataSource: {
                load: function(options) {
                    var parentIds = options.parentIds || [self.rootValue];
                    var finalIds = parentIds.join(',');
                    var sql = sysrequest[0].query.replace('{finalIds}', finalIds);
                    
                    return fetch(self.fetchUrl, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            dbName: self.dbName,
                            sql: sql
                        }),
                    })
                    .then(function(response) { return response.json(); })
                    .then(function(data) {
                        if (!data.rows) return [];
                        var columns = data.columns;
                        var rows = data.rows;
                        return rows.map(function(row) {
                            var obj = {};
                            columns.forEach(function(col, i) { obj[col] = row[i]; });
                            return obj;
                        });
                    });
                }
            },
            rootValue: this.rootValue,
            keyExpr: "ID",
            parentIdExpr: "PARENT",
            hasItemsExpr: "GRP",
            remoteOperations: {
                filtering: true,
                sorting: false,
                paging: false
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
                console.log('FondTreeList.onContentReady, hasInitialized:', self.hasInitialized);
                
                if (!self.hasInitialized && keysToSelect && keysToSelect.length > 0) {
                    self.hasInitialized = true;
                    
                    var parentIds = [];
                    var pending = keysToSelect.length;
                    
                    keysToSelect.forEach(function(selectedId) {
                        self.getAllParents(selectedId, function(parents) {
                            parents.forEach(function(p) {
                                if (parentIds.indexOf(p) === -1 && p !== self.rootValue) {
                                    parentIds.push(p);
                                }
                            });
                            pending--;
                            if (pending === 0) {
                                if (parentIds.length > 0) {
                                    var finalIds = parentIds.join(',');
                                    var sql = sysrequest[0].query.replace('{finalIds}', finalIds);
                                    
                                    fetch(self.fetchUrl, {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({
                                            dbName: self.dbName,
                                            sql: sql
                                        }),
                                    })
                                    .then(function(response) { return response.json(); })
                                    .then(function() {
                                        self.treeListInstance.option('expandedRowKeys', parentIds);
                                        
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
                                    });
                                } else {
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
                            }
                        });
                    });
                }
            },
            onSelectionChanged: function(e) {
                self.selectedItems = e.selectedRowsData.map(function(row) {
                    return { id: row.ID, name: row.NODE };
                });
                
                console.log('FondTreeList выделено:', self.selectedItems);
                self.updateDropDown();
            }
        }).dxTreeList("instance");
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
}