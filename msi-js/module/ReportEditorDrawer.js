const ICON_OPTIONS = ['chart', 'smalliconslayout', 'hierarchy', 'map', 'chevronup', 'fields', 'file'];

export class ReportEditorDrawer {
  constructor(report, options = {}) {
    this.report = report;
    this.options = options;
    this.formInstance = null;
  }

  buildForm($container) {
    const self = this;
    const r = this.report;

    const items = [
      { dataField: 'id', editorType: 'dxNumberBox', label: { text: 'ID' }, editorOptions: { disabled: true } },
      { dataField: 'text', editorType: 'dxTextBox', label: { text: 'Название' } },
      {
        dataField: 'icon',
        editorType: 'dxSelectBox',
        label: { text: 'Иконка' },
        editorOptions: { dataSource: ICON_OPTIONS }
      },
      {
        dataField: 'processing',
        editorType: 'dxSelectBox',
        label: { text: 'Обработка' },
        editorOptions: { dataSource: ['client', 'server'] }
      },
      {
        dataField: 'views',
        editorType: 'dxTagBox',
        label: { text: 'Режимы' },
        editorOptions: { dataSource: ['grid', 'pivot', 'dashboard', 'map'], searchEnabled: true }
      },
      {
        dataField: 'rowPageSize',
        editorType: 'dxNumberBox',
        label: { text: 'Строк на странице' },
        editorOptions: { min: 10, max: 10000 }
      }
    ];

    const $form = $('<div>').dxForm({
      colCount: 2,
      labelLocation: 'top',
      items: items,
      formData: r
    });
    $container.append($form);

    const $queryLabel = $('<div>').css({ marginTop: '12px', fontWeight: 600, fontSize: '13px' }).text('SQL Запрос');
    $container.append($queryLabel);

    const $queryArea = $('<div>').dxTextArea({
      value: r.query || '',
      height: 150,
      onValueChanged: function(e) {
        r.query = e.value;
      }
    });
    $container.append($queryArea);

    const $saveBtn = $('<div>', { style: 'text-align:center;margin-top:12px;margin-bottom:8px' });
    const $saveBtnInner = $('<div>').dxButton({
      text: 'Сохранить на сервер',
      icon: 'save',
      type: 'success',
      stylingMode: 'contained',
      onClick: function() {
        self.saveToServer();
      }
    });
    $saveBtn.append($saveBtnInner);
    $container.append($saveBtn);

    this.formInstance = $form.dxForm('instance');
    return $container;
  }

  saveToServer() {
    const saveUrl = this.options.saveFileUrl || 'http://localhost:7501/api/save-file';
    const content = 'const reports = ' + JSON.stringify(reports, null, 2) + ';';

    DevExpress.ui.notify('Сохранение на сервер...', 'info', 2000);
    $.ajax({
      url: saveUrl,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ path: (window.FRONTEND_DATA_DIR ? window.FRONTEND_DATA_DIR + '/' : '') + 'rpt.js', content: content }),
      success: function() {
        DevExpress.ui.notify('rpt.js сохранён на сервере', 'success', 3000);
      },
      error: function(xhr) {
        DevExpress.ui.notify('Ошибка: ' + (xhr.responseJSON ? xhr.responseJSON.error : xhr.statusText), 'error', 5000);
      }
    });
  }
}
