  	/*
	Copyright 20XX Recology™. Licensed under GPL-3.0-only
	See license text at https://www.gnu.org/licenses/gpl-3.0.en.html
	 
	This file is part of Recology Rate Calculator.
	 
	Recology Rate Calculator is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by
	the Free Software Foundation, version 3 of the License.
	 
	Recology Rate Calculator is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
	 
	Recology, Inc., hereby disclaims all copyright interest in the program "Recology Rate Calculator" (which calculates rates) written by various authors.
	signature of Richard Cruz, 1 February 20XX
	Richard Cruz, Systems Architect and Support Manager
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
	*/
var ratesObj = {
	"rateOld" : 		1.01,
	"rateNew" : 		1.01,
	"dwellingOld" : 	1.01,
	"dwellingNew" : 	1.01,
	"bin32Gallon_1" : 	1.01,
	"bin32Gallon_2" : 	1.01,
	"bin32Gallon_3" : 	1.01,
	"bin32Gallon_4" : 	1.01,
	"bin32Gallon_5" : 	1.01,
	"bin32Gallon_6" : 	1.01,
	"bin32Gallon_7" : 	1.01,
	"bin64Gallon_1" : 	1.01,
	"bin64Gallon_2" : 	1.01,
	"bin64Gallon_3" : 	1.01,
	"bin64Gallon_4" : 	1.01,
	"bin64Gallon_5" : 	1.01,
	"bin64Gallon_6" : 	1.01,
	"bin64Gallon_7" : 	1.01,
	"bin96Gallon_1" : 	1.01,
	"bin96Gallon_2" : 	1.01,
	"bin96Gallon_3" : 	1.01,
	"bin96Gallon_4" : 	1.01,
	"bin96Gallon_5" : 	1.01,
	"bin96Gallon_6" : 	1.01,
	"bin96Gallon_7" : 	1.01
};

log4javascript.setEnabled(false);

function capped_rate_help() {
}

function rrc_help() {
}

function bin_type_help() {
}

function bin_size_help() {
}

function distance_help() {
}

function elevation_help() {
}

function key_charges_help() {
}

function heredoc(fn, quote) {
  var result = fn.toString().replace('/*', ' ').replace('*/', ' ').split(/\n/).slice(1, -1).join(' ');
  result = result.replace(/\'/g, "\\'");
  return result;
}

function genWindow(title, text) {

  var window = Ext.create('Ext.window.Window', {
    width: 500,
    height: 270,
    modal: true,
    title: title,
    html: text,
    bodyStyle: 'background: #fff; padding: 10px; font-size: 13px;'
  });

  window.show();
}

function cappedRateHelp() {
  genWindow('Capped Rate', heredoc(capped_rate_help));
}


function popUpFrame() {
    openInNewTab('http://yoursite.com/contact/')
    
}

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

Ext.application({
  name: 'ARC',
  launch: function() {

    var full = false;

    var aStore = $.jStorage;
    aStore.flush();
    var targets = ['current', 'new'];
    for (var i = 0; i < targets.length; i++) {
      aStore.set('s' + targets[i] + 'TotalTrashGallons', 0);
      aStore.set('s' + targets[i] + 'TotalRate', 0);

      aStore.set('s' + targets[i] + 'KeyCount', 0);
      aStore.set('s' + targets[i] + 'DistanceCount', 0);
      aStore.set('s' + targets[i] + 'ElevationCount', 0);

      aStore.set('s' + targets[i] + 'KeyValue', 0);
      aStore.set('s' + targets[i] + 'DistanceValue', 0);
      aStore.set('s' + targets[i] + 'ElevationValuePartial', 0);
    }

    (new Image()).src = "/calculator/img/logo.jpg";
    (new Image()).src = "/calculator/img/logo.jpg";

    Ext.override(Ext.form.ComboBox, {
      forceSelection: true,
      editable: false,
      mode: 'local',
      inputWidth: 120,
      labelWidth: 120
    });
    Ext.override(Ext.form.Number, {
      inputWidth: 80,
      labelWidth: 120
    });
    Ext.override(Ext.form.Field.prototype, {
      initComponent: function() {
        var fl = this.fieldLabel, h = this.helpText;
        if (h && h !== '' && fl) {
          this.fieldLabel = '<img src="/calculator/img/help.png" align="left" style="cursor: pointer; margin-top: 3px; margin-right: 2px;" onclick="genWindow(\'' + fl + '\',\'' + h + '\');" /> ' + fl;
        }
        this.callParent();
      }
    });

    Ext.override(Ext.util.Format, {
      usMoney: function(v) {
        //v = round(v, 2);
        return Ext.util.Format.currency(v, '$', 2);
      }
    });


    if (full) {
      Ext.util.CSS.updateRule('.premium', 'display', 'table-row');
    }
    function xhidden() {
      if (full === false) {
        return true;
      } else {
        return false;
      }
    }

    function fadeIn(item) {
      var targets = ['current', 'new'];
      for (var i = 0; i < targets.length; i++) {
        var p = Ext.get(targets[i] + item).parent().parent();
        p.setOpacity(0.01);
        p.fadeIn({opacity: 1, duration: 500});
      }
    }

    function resetOptions() {
      numberApartmentUnits.setValue(6);
      containerType.setValue('');

      distance.setValue(0);
      elevation.setValue(0);

      timesPerWeekRecyclingTrash.setValue(1);
      timesPerWeekComposting.setValue(1);

      chkKeyChargesRecyclingTrash.setValue(0);
      chkKeyChargesComposting.setValue(0);
      comboKeyRecyclingTrash.setValue(0);
      comboKeyComposting.setValue(0);
    }

    function changeBin() {
      var cT = containerType.getValue();
      var cS = containerSize.getDisplayValue();
      var yTest = [];

      if (cS === 'Bin 20 Gallon') {
        binImage.setSrc('/calculator/img/no_image_available.gif');
      }

      else if (cT === 'Recycling' && cS === '32-Gallon Bin') {
        binImage.setSrc('/calculator/img/item.gif');
      }
      else if (cT === 'Recycling' && cS === '64-Gallon Bin') {
        binImage.setSrc('/calculator/img/item.gif');
      }
      else if (cT === 'Recycling' && cS === '96-Gallon Bin') {
        binImage.setSrc('/calculator/img/item.gif');
      }

      else if (cT === 'Composting' && cS === '32-Gallon Bin') {
        binImage.setSrc('/calculator/img/item.gif');
      }
      else if (cT === 'Composting' && cS === '64-Gallon Bin') {
        binImage.setSrc('/calculator/img/item.gif');
      }
      else if (cT === 'Composting' && cS === '96-Gallon Bin') {
        binImage.setSrc('/calculator/img/item.gif');
      }

      else if (cT === 'Trash' && cS === '32-Gallon Bin') {
        binImage.setSrc('/calculator/img/item.gif');
      }
      else if (cT === 'Trash' && cS === '64-Gallon Bin') {
        binImage.setSrc('/calculator/img/item.gif');
      }
      else if (cT === 'Trash' && cS === '96-Gallon Bin') {
        binImage.setSrc('/calculator/img/item.gif');
      }

      else if (cS.match(/([1-7]\.[05]) (Cubic Yard)/)) {
        yTest = cS.match(/([1-7]\.[05]) (Cubic Yard)/);
        binImage.setSrc('/calculator/img/item.gif');
      }
      else if (cS.match(/Compactor/)) {
        binImage.setSrc('/calculator/img/item.gif');
      }

      else {
        binImage.setSrc('/calculator/img/item.gif');
      }
    }
    var chkCopyToNew = Ext.create('Ext.form.field.Checkbox', {
/*      fieldLabel: 'New Services',*/
      fieldLabel: 'Rate Year 20XX Estimate',
      checked: true,
/*      labelWidth: 80,*/
      labelWidth: 95,
      margins: '0 0 0 20',
      listeners: {
        change: function() {
          containerType.setValue('');
        }
      }
    });

    var panelCopyTo = Ext.create('Ext.panel.Panel', {
      title: "I want to see...",
      layout: 'hbox',
      width: '100%',
      border: false,
      style: 'border-bottom: 1px solid #99BCE8;',
      items: [
        chkCopyToNew
      ]
    });

    var numberApartmentUnits = Ext.create('Ext.form.Number', {
      //helpText: heredoc(arc_help),
      fieldLabel: 'Apartment Dwelling Units',
      minValue: 6,
      maxValue: 200,
      value: 6,
      inputWidth: 80,
      labelWidth: 148,
      margins: '10 5 5 10',
      listeners: {
        change: function(o, v) {
        	updateData();
          //fadeIn('ServiceUnits');
        }
      }
    });

    var fieldMinimumRequired = Ext.create('Ext.form.FieldSet', {
      hidden: true,
      title: 'Minimum Required in Gallons',
      margins: '5 5 5 9',
      width: 234,
      layout: 'hbox',
      defaults: {
        border: false,
        padding: 0,
        height: 25,
        xtype: 'displayfield',
        labelSeparator: ''
      },
      items: [
        {
          fieldLabel: '<span style="font-weight: bold; font-size: 11px; color: #007FD4;">Recycling:&nbsp;<span id="minRecyclingGallons">32</span></span>',
          width: 95
        },
        {
          fieldLabel: '<span style="font-weight: bold; font-size: 11px; color: #09B300;">Composting:&nbsp;<span id="minCompostingGallons">32</span></span>',
          labelWidth: 110,
          width: 110
        }
      ]
    });

    var fieldCurrentGallons = Ext.create('Ext.form.FieldSet', {
      title: 'Selected Service in Gallons',
      //margins: '0 5 5 9',
      padding: '5 5 0 5',
      width: 285,
      layout: 'hbox',
      defaults: {
        border: false,
        padding: 0,
        height: 25,
        xtype: 'displayfield',
        labelSeparator: ''
      },
      items: [
        {
          fieldLabel: '<span style="font-weight: bold; font-size: 10px; color: #000;"><span id="currentTrashGallons"><span style="color: #DD3700;">Trash:&nbsp;0</span> <img style="padding: 0; margin: 0 0 0 -2px;" src="/calculator/img/blank.png" /> </span></span>',
          width: 78,
          margin: '0 0 0 4'
        },
        {
          fieldLabel: '<span style="font-weight: bold; font-size: 10px; color: #007FD4;"><span id="currentRecyclingGallons"><span style="color: #DD3700;">Recycling:&nbsp;0</span> <img style="padding: 0; margin: 0 0 0 -2px;" src="/calculator/img/blank.png" /> </span></span>',
          width: 92
        },
        {
          fieldLabel: '<span style="font-weight: bold; font-size: 10px; color: #09B300;"><span id="currentCompostingGallons"><span style="color: #DD3700;">Composting:&nbsp;0</span> <img style="padding: 0; margin: 0 0 0 -2px;" src="/calculator/img/blank.png" /> </span></span>',
          width: 110
        }
      ]
    });

    var containerType = Ext.create('Ext.form.ComboBox', {
      helpText: heredoc(bin_type_help, true),
      store: ['&nbsp;', 'Trash', 'Recycling', 'Composting'],
      mode: 'local',
      forceSelection: true,
      fieldLabel: 'Bin Type',
      emptyText: 'Choose a Bin',
      labelAlign: 'top',
      inputWidth: 120,
      listeners: {
        change: function(o, v) {
          if (empty(v)) {
            containerSize.disable(true);
            containerCount.disable(true);

            timesPerWeekTrash.enable(true);
            timesPerWeekRecycling.enable(true);
            timesPerWeekComposting.enable(true);

            chkKeyChargesRecyclingTrash.setValue(false);
            chkKeyChargesComposting.setValue(false);

            comboKeyRecyclingTrash.setValue(0);
            comboKeyComposting.setValue(0);

            chkKeyChargesRecyclingTrash.disable(true);
            chkKeyChargesComposting.disable(true);
          }
          else {
            containerSize.enable(true);
            containerCount.enable(true);
	    
            if (v === 'Composting') {
              timesPerWeekComposting.enable(true);
              timesPerWeekRecycling.disable(true);
              timesPerWeekTrash.disable(true);

              chkKeyChargesRecyclingTrash.setValue(false);
              comboKeyRecyclingTrash.setValue(0);

              chkKeyChargesRecyclingTrash.disable(true);
              chkKeyChargesComposting.enable(true);
            }
            else if (v === 'Recycling') {
              timesPerWeekTrash.disable(true);
              timesPerWeekRecycling.enable(true);
              timesPerWeekComposting.disable(true);

              chkKeyChargesRecyclingTrash.setValue(false);
              comboKeyRecyclingTrash.setValue(0);

              chkKeyChargesRecyclingTrash.disable(true);
              chkKeyChargesComposting.enable(true);
            }
            else {
              timesPerWeekTrash.enable(true);
              timesPerWeekRecycling.disable(true);
              timesPerWeekComposting.disable(true);

              chkKeyChargesComposting.setValue(false);
              comboKeyComposting.setValue(0);

              chkKeyChargesRecyclingTrash.enable(true);
              chkKeyChargesComposting.disable(true);
            }


          }
          changeBin();
          toggleBinType();
        },
        select: function(comp, record, index) {
          if (comp.getValue() === "" || comp.getValue() === "&nbsp;")
            comp.setValue(null);
        }
      }
    });

    function containerSizeData() {
      var cYd = 201.974026;
      var data = [
        {name: '32-Gallon Bin', value: 32},
        {name: '64-Gallon Bin', value: 64},
        {name: '96-Gallon Bin', value: 96}
      ];
      if (full === true) {
        data = [
          {name: '32-Gallon2 Bin', value: 32},
          {name: '64-Gallon Bin', value: 64},
          {name: '96-Gallon Bin', value: 96},
          {name: '1.0 Cubic Yard', value: cYd * 1},
          {name: '1.5 Cubic Yard', value: cYd * 1.5},
          {name: '2.0 Cubic Yard', value: cYd * 2},
          {name: '2.5 Cubic Yard', value: cYd * 2.5}
        ];
      }

      return data;
    }

    var containerSize = Ext.create('Ext.form.ComboBox', {
      helpText: heredoc(bin_size_help),
      disabled: true,
      store: {
        fields: ['name', 'value', 'special'],
        data: containerSizeData()
      },
      displayField: 'name',
      valueField: 'value',
      queryMode: 'local',
      value: 32,
      forceSelection: true,
      fieldLabel: 'Bin Size',
      labelAlign: 'top',
      inputWidth: 120,
      listeners: {
        change: changeBin
      }
    });

    var containerCount = Ext.create('Ext.form.Number', {
      //helpText: heredoc(bin_type_help),
      fieldLabel: 'Bin Count',
      disabled: true,
      labelAlign: 'top',
      minValue: 1,
      maxValue: 40,
      value: 1,
      inputWidth: 120
    });

    var binImage = Ext.create('Ext.Img', {
      src: '/calculator/img/item.gif',
      padding: 5
    });

    var panelBinSelection = Ext.create('Ext.panel.Panel', {
      title: "Bin Selection",
      width: '100%',
      layout: 'hbox',
      items: [
        {
          layout: 'vbox',
          border: false,
          items: [
            containerType,
            containerSize,
            containerCount
          ]
        },
        binImage
      ]
    });

    var timesPerWeekTrash = Ext.create('Ext.form.Number', {
      fieldLabel: 'Trash',
      minValue: 1,
      maxValue: 7,
      labelWidth: 148,
      value: 1,
      margins: '10 0 0 5',
      padding: 0,
      listeners: {
        change: function() {
          //fadeIn('ServiceTimesWeekTotal');
        }
      }
    });
    var timesPerWeekRecycling = Ext.create('Ext.form.Number', {
      fieldLabel: 'Recycling',
      minValue: 1,
      maxValue: 7,
      labelWidth: 148,
      value: 1,
      margins: '10 0 0 5',
      padding: 0,
      listeners: {
        change: function() {
          //fadeIn('ServiceTimesWeekTotal');
        }
      }
    });
    var timesPerWeekComposting = Ext.create('Ext.form.Number', {
      fieldLabel: 'Composting',
      minValue: 1,
      maxValue: 7,
      labelWidth: 148,
      value: 1,
      margins: '10 0 0 5',
      padding: 0,
      listeners: {
        change: function() {
          //fadeIn('ServiceTimesWeekTotal');
        }
      }
    });

    var panelFrequency = Ext.create('Ext.panel.Panel', {
      title: "Times per Week",
      width: '100%',
      items: [
        timesPerWeekTrash,
        timesPerWeekRecycling,
        timesPerWeekComposting
      ]
    });

    var chkKeyChargesRecyclingTrash = Ext.create('Ext.form.field.Checkbox', {
      fieldLabel: 'Recycling and Trash',
      disabled: true,
      margin: '18 10 0 0',
      labelWidth: 125,
      listeners: {
        change: function(o, v) {
          if (v === true) {
            comboKeyRecyclingTrash.enable(true);
          }
          else {
            comboKeyRecyclingTrash.disable(true);
          }
        }
      }
    });
    var chkKeyChargesComposting = Ext.create('Ext.form.field.Checkbox', {
      fieldLabel: 'Composting',
      disabled: true,
      margin: '18 10 0 0',
      labelWidth: 125,
      listeners: {
        change: function(o, v) {
          if (v === true) {
            comboKeyComposting.enable(true);
          }
          else {
            comboKeyComposting.disable(true);
          }
        }
      }
    });
    var comboKeyRecyclingTrash = Ext.create('Ext.form.ComboBox', {
      disabled: true,
      store: {
        fields: ['name', 'value'],
        data: [
          {name: 'none', value: 0},
          {name: '1 key', value: 1},
          {name: '2 keys', value: 2},
          {name: '3 keys', value: 3},
          {name: '4 keys', value: 4}
        ]
      },
      mode: 'local',
      displayField: 'name',
      valueField: 'value',
      value: 0,
      forceSelection: true,
      fieldLabel: 'Num of Keys',
      labelAlign: 'top',
      inputWidth: 80
    });
    var comboKeyComposting = Ext.create('Ext.form.ComboBox', {
      disabled: true,
      editable: false,
      store: {
        fields: ['name', 'value'],
        data: [
          {name: 'none', value: 0},
          {name: '1 key', value: 1},
          {name: '2 keys', value: 2},
          {name: '3 keys', value: 3},
          {name: '4 keys', value: 4}
        ]
      },
      mode: 'local',
      displayField: 'name',
      valueField: 'value',
      value: 0,
      forceSelection: true,
      fieldLabel: 'Num of Keys',
      labelAlign: 'top',
      inputWidth: 80
    });

    var panelKey = Ext.create('Ext.panel.Panel', {
      hidden: xhidden(),
      title: "Key Charges",
      width: '100%',
      layout: 'vbox',
      defaults: {
        border: false
      },
      items: [
        {
          layout: 'hbox',
          items: [
            chkKeyChargesRecyclingTrash,
            comboKeyRecyclingTrash
          ]
        },
        {
          layout: 'hbox',
          items: [
            chkKeyChargesComposting,
            comboKeyComposting
          ]
        }
      ]
    });

    var distance = Ext.create('Ext.form.Checkbox', {
      helpText: heredoc(distance_help),
      comment: 'over 100 feet from curb.',
      fieldLabel: 'Distance',
      width: 200,
      labelWidth: 80,
      margins: '5 0 0 5',
      padding: 0,
      labelAlign: 'left'
    });
    var elevation = Ext.create('Ext.form.ComboBox', {
      helpText: heredoc(elevation_help),
      store: {
        fields: ['name', 'value'],
        data: [
          {name: 'Less than 4 feet (0)', value: 0},
          {name: '4 - 12 feet (1)', value: 1},
          {name: '13 - 21 feet (2)', value: 2},
          {name: '22 - 30 feet (3)', value: 3},
          {name: '31 - 39 feet (4)', value: 4},
          {name: '40 - 48 feet (5)', value: 5}
        ]
      },
      mode: 'local',
      displayField: 'name',
      valueField: 'value',
      value: 0,
      forceSelection: true,
      fieldLabel: 'Elevation',
      inputWidth: 148,
      labelWidth: 80,
      listeners: {
        change: function() {
        }
      }
    });

    var panelLocationDetails = Ext.create('Ext.panel.Panel', {
      hidden: xhidden(),
      title: "Location Details",
      width: '100%',
      items: [
        distance,
        {
          html: '<div style="font-size: 10px;">over 100 feet from curb.</div>',
          border: false,
          margin: '-8 0 10 5'
        },
        elevation,
        {
          html: '<span style="font-size: 10px;">feet from street level.</span>',
          border: false,
          margin: '-4 0 10 5'
        }
      ]
    });

    var buttons = {
      layout: {
        type: 'vbox',
        align: 'center',
        padding: '10 0 5 0'
      },
      width: '100%',
      border: false,
      items: {
        layout: 'hbox',
        border: false,
        defaults: {
          padding: 5,
          margins: '0 10 15 5'
        },
        items: [
          {
            xtype: 'button',
            text: 'Add Service to Calculation',
            scale: 'large',
            border: 1,
            handler: function() {
				if (addToTop() === false) {
					updateData();
				}
            }
          },
          {
            xtype: 'button',
            text: 'Reset All',
            scale: 'large',
            border: 1,
            //margins: '0 0 20 0',
            handler: function() {
              window.location.href = window.location.href;
            }
          }
        ]
      }
    };

    var storeCurrentService = Ext.create('Ext.data.Store', {
      fields: [
        'container_type', 'container_size', 'container_count',
        'container_size_value'
      ],
      listeners: {
        datachanged: function(i, o) {
          updateData('current');
        }
      }
    });
    /* 20XXREMOVAL
    var gridCurrentService = Ext.create('Ext.grid.Panel', {
      title: 'Rate Year 20XX (July 1, 2016 - June 30, 20XX)',
      store: storeCurrentService,
      disableSelection: true,
      height: 182,
      width: '100%',
      flex: 1,
      defaults: {
        flex: 1
      },
      dockedItems: [{
          dock: 'top',
          xtype: 'toolbar',
          height: 28,
          items: [{
              iconCls: 'copy_to_new_services',
              xtype: 'button',
              text: 'Copy to Rate Year 20XX',
              handler: function() {
                var source = storeCurrentService;
                var target = storeNewService;
                Ext.each(source.getRange(), function(record) {
                  var newRecordData = Ext.clone(record.copy().data);
                  var model = new source.model(newRecordData, newRecordData.id);

                  target.add(model);
                });
              }
            },
            {
              xtype: 'button',
              text: 'Remove All',
              iconCls: 'delete_all',
              handler: function() {
                storeCurrentService.removeAll();
                resetOptions();
                updateData('current');
              }
            }]
        }],
      columns: [
        {text: 'Bin Type', dataIndex: 'container_type', hideable: false, flex: 1},
        {text: 'Bin Size', dataIndex: 'container_size', hideable: false, flex: 1},
        {text: 'Bin Count', dataIndex: 'container_count', hideable: false, flex: 1},
        {xtype: 'actioncolumn', text: 'Remove', menuDisabled: true, sortable: false, hideable: false, flex: 1,
          items: [{
              iconCls: 'remove',
              handler: function(grid, rowIndex, colindex) {
                grid.getStore().removeAt(rowIndex);
              }
            }]}
      ]
    });*/

    var storeNewService = Ext.create('Ext.data.Store', {
      fields: [
        'container_type', 'container_size', 'container_count',
        'container_size_value'
      ],
      listeners: {
        datachanged: function(i, o) {
          updateData('new');
        }
      }
    });
    var gridNewService = Ext.create('Ext.grid.Panel', {
/*      title: 'New Weekly Services',*/
      title: 'Rate Year 20XX (July 1, 20XX - June 30, 20XX)',
      store: storeNewService,
      disableSelection: true,
      height: 182,
      flex: 1,
      defaults: {
        flex: 1
      },
      dockedItems: [{
          dock: 'top',
          xtype: 'toolbar',
          height: 28,
          items: [
            {
              xtype: 'button',
              text: 'Remove All',
              iconCls: 'delete_all',
              handler: function() {
                storeNewService.removeAll();
                resetOptions();
                updateData('new');
              }
            },
            {
              layout: 'hbox',
              xtype: 'container',
              defaults: {xtype: 'displayfield', labelSeparator: '', flex: 1, padding: 0, style: 'margin: -1px -2px 0 0;'},
              padding: 0,
              bodyPadding: 0,
              items: [
                {
                  fieldLabel: '<span style="font-weight: bold; font-size: 10px; color: #000;"><span id="currentTrashGallons2"><span style="color: #DD3700;">Trash:&nbsp;0</span> <img style="padding: 0; margin: 0 0 0 -2px;" src="/calculator/img/blank.png" /> </span></span>',
                  labelWidth: 80
                },
                {
                  fieldLabel: '<span style="font-weight: bold; font-size: 10px; color: #007FD4;"><span id="currentRecyclingGallons2"><span style="color: #DD3700;">Recycling:&nbsp;0</span> <img style="padding: 0; margin: 0 0 0 -2px;" src="/calculator/img/blank.png" /> </span></span>',
                  labelWidth: 95
                },
                {
                  fieldLabel: '<span style="font-weight: bold; font-size: 10px; color: #09B300;"><span id="currentCompostingGallons2"><span style="color: #DD3700;">Composting:&nbsp;0</span> <img style="padding: 0; margin: 0 0 0 -2px;" src="/calculator/img/blank.png" /> </span></span>',
                  labelWidth: 106
                }
              ]
            }
          ]
        }],
      columns: [
        {text: 'Bin Type', dataIndex: 'container_type', hideable: false, flex: 1},
        {text: 'Bin Size', dataIndex: 'container_size', hideable: false, flex: 1},
        {text: 'Bin Count', dataIndex: 'container_count', hideable: false, flex: 1},
        {xtype: 'actioncolumn', text: 'Remove', menuDisabled: true, sortable: false, hideable: false, flex: 1,
          items: [{
              iconCls: 'remove',
              handler: function(grid, rowIndex, colindex) {
                grid.getStore().removeAt(rowIndex);
              }
            }]}
      ]
    });

    var sCurrentTotalRate = Ext.create('Ext.form.field.Hidden', {
      value: 0
    });

    var sCurrentTrashRecycleKeyCount = Ext.create('Ext.form.field.Hidden', {
      value: 0
    });
    var sCurrentCompostKeyCount = Ext.create('Ext.form.field.Hidden', {
      value: 0
    });
    var sCurrentDistanceCount = Ext.create('Ext.form.field.Hidden', {
      value: 0
    });
    var sCurrentElevationCount = Ext.create('Ext.form.field.Hidden', {
      value: 0
    });

    var sCurrentTotalGallons = Ext.create('Ext.form.field.Hidden', {
      value: 0
    });
    var sNewTotalRate = Ext.create('Ext.form.field.Hidden', {
      value: 0
    });
    var sNewAdditionalPremiumServices = Ext.create('Ext.form.field.Hidden', {
      value: 0
    });
    var sNewTotalGallons = Ext.create('Ext.form.field.Hidden', {
      value: 0
    });
    
    var textCapDiscountOne = Ext.create('Ext.form.Text',{
        fieldLabel: 'ACAP 1:',
        inputWidth: 80,
        labelWidth: 148,
        value: 0,
        disabled: true,	//v.2015, field now disabled, jc
        listeners: {
        	change: {
        		fn: function() {
        			if(textCapDiscountOne.value > 0) {
        				textCapDiscountTwo.enable();
        			} else {
        				textCapDiscountTwo.setValue(0);
        				textCapDiscountTwo.disable();
        				
        				if(textCapDiscountOne.value == '' || textCapDiscountOne.value == null || isNaN(textCapDiscountOne.value)){
            				textCapDiscountOne.setValue(0);
            				textCapDiscountOne.focus(true, true);
        				}
        				
        				if(textCapDiscountOne.value < 0){
        					alert("cap numbers must be positive.");
            				textCapDiscountOne.setValue(0);
            				textCapDiscountOne.focus(true, true);
        				}
        			}
        			updateData();
        		}
        	},
        	focus: {
        		fn: function() {
    				textCapDiscountOne.focus(true, true);
        		}
        	}
        }
      });
    var textCapDiscountTwo = Ext.create('Ext.form.Text',{
        fieldLabel: 'ACAP 2:',
        inputWidth: 80,
        labelWidth: 148,
        value: 0,
        disabled: true,	//v.2015, changed from true to false, jc
        listeners: {
        	change: {
        		fn: function() {
    				if(textCapDiscountTwo.value == '' || textCapDiscountTwo.value == null || isNaN(textCapDiscountTwo.value)){
        				textCapDiscountTwo.setValue(0);
        				textCapDiscountTwo.focus(true, true);
    				} else if(textCapDiscountTwo.value < 0){
    					alert("cap numbers must be positive.");
        				textCapDiscountTwo.setValue(0);
        				textCapDiscountTwo.focus(true, true);
    				} else {
    					updateData();
    				}
        		}
        	},
        	focus: {
        		fn: function() {
    				textCapDiscountTwo.focus(true, true);
        		}
        	}
        }
     });
    var panelCapDiscount = Ext.create('Ext.panel.Panel', {
    	title: 'Cap Discounts',
    	items: [textCapDiscountTwo]
    });

    function tableServicesEstimate(sType) {
      var result = heredoc(function() {/*
       <table class="rTable">

       <tr>
       <th>Base Charge @ $<span id="{{current}}ServiceUnitsBase">5</span> per Dwelling Unit</th>
       <td colspan="3"><span id="{{current}}ServiceUnits">1</span></td>
       <td><span id="{{current}}ServiceUnitsFeeTotal">{{unitsFee}}</span></td>
       </tr>
       <tr>
       <td colspan="5" style="background: #fff;">&nbsp;</td>
       </tr>

       <tr>
       <td style="background: #fff;">&nbsp;</td>
       <th>Trash</th>
       <th>Recycling</th>
       <th>Composting</th>
       <th style="width: 70px;">Total</th>
       </tr>

       <tr>
       <th>Gallons</th>
       <td><span id="{{current}}ServiceGallons_Trash">0</span></td>
       <td><span id="{{current}}ServiceGallons_Recycling">0</span</td>
       <td><span id="{{current}}ServiceGallons_Composting">0</span></td>
       <td><span id="{{current}}ServiceGallonsTotal">0</span></td>
       </tr>

       <tr>
       <th>Times per Week</th>
       <td><span id="{{current}}ServiceTimesWeek_Trash">0</span></td>
       <td><span id="{{current}}ServiceTimesWeek_Recycling">0</span></td>
       <td><span id="{{current}}ServiceTimesWeek_Composting">0</span></td>
       <td style="background: #fff;"><span id="{{current}}ServiceTimesWeekTotal">&nbsp;</span></td>
       </tr>

       <tr>
       <th>Gallons x Times per Week</th>
       <td><span id="{{current}}ServiceGallonsTimesWeek_Trash">0</span></td>
       <td><span id="{{current}}ServiceGallonsTimesWeek_Recycling">0</span></td>
       <td><span id="{{current}}ServiceGallonsTimesWeek_Composting">0</span></td>
       <td><span id="{{current}}ServiceGallonsTimesWeekTotal">&nbsp;</span></td>
       </tr>

       <tr>
       <!--th>Current Rate</th-->
       <th>Rate Year 20XX</th>
       <td><span id="{{current}}ServiceRate_Trash">0</span></td>
       <td><span id="{{current}}ServiceRate_Recycling">0</span></td>
       <td><span id="{{current}}ServiceRate_Composting">0</span></td>
       <td><span id="{{current}}ServiceRateTotal">0</span></td>
       </tr>

       <tr>
       <td colspan="5" style="background: #fff;">&nbsp;</td>
       </tr>

       <tr>
       <th colspan="4">Recycling Percentage:</th>
       <td><span id="{{current}}RecyclingPercentageTotal">0</span></td>
       </tr>

       <tr>
       <th colspan="4">Recycling Discount Percentage:</th>
       <td><span id="{{current}}RecyclingDiscountPercentageTotal">0</span></td>
       </tr>

       <tr>
       <td colspan="5" style="background: #fff;">&nbsp;</td>
       </tr>

       <tr>
       <th>Recycling Discount:</th>
       <td><span id="{{current}}RecyclingDiscount_Trash">0</span></td>
       <td><span id="{{current}}RecyclingDiscount_Recycling">0</span></td>
       <td><span id="{{current}}RecyclingDiscount_Composting">0</span></td>
       <td><span id="{{current}}RecyclingDiscountTotal">0</span></td>
       </tr>

       <tr>
       <th>Rate after Recycling Discount:</th>
       <td><span id="{{current}}ServiceRateWithRecyclingDiscount_Trash">0</span></td>
       <td><span id="{{current}}ServiceRateWithRecyclingDiscount_Recycling">0</span></td>
       <td><span id="{{current}}ServiceRateWithRecyclingDiscount_Composting">0</span></td>
       <td><span id="{{current}}ServiceRateWithRecyclingDiscountTotal">0</span></td>
       </tr>

       <tr class="premium">
       <td colspan="5" style="background: #fff;">&nbsp;</td>
       </tr>

       <tr class="premium">
       <th>Distance Charge:</th>
       <td colspan="3"><span id="{{current}}DistanceChargeDescripton">0</span></td>
       <td><span id="{{current}}DistanceChargeTotal">0</span></td>
       </tr>

       <tr class="premium">
       <th>Elevation Charge:</th>
       <td colspan="3"><span id="{{current}}ElevationChargeDescription">0</span></td>
       <td><span id="{{current}}ElevationChargeTotal">0</span></td>
       </tr>

       <tr class="premium">
       <td colspan="5" style="background: #fff;">&nbsp;</td>
       </tr>

       <tr class="premium">
       <th>Key Charge for Trash and Recycling:</th>
       <td colspan="3"><span id="{{current}}KeyChargeRecyclingTrashDescription">0</span></td>
       <td><span id="{{current}}KeyChargeRecyclingTrashTotal">0</span></td>
       </tr>

       <tr class="premium">
       <th>Key Charge for Composting:</th>
       <td colspan="3"><span id="{{current}}KeyChargeCompostingDescription">0</span></td>
       <td><span id="{{current}}KeyChargeCompostingTotal">0</span></td>
       </tr>

       <tr style="display: none;">
       <td colspan="5" style="background: #fff;">&nbsp;</td>
       </tr>
       <tr style="display: none;">
       <th colspan="4">Total Rate:</th>
       <td><span id="{{current}}RateTotal">0</span></td>
       </tr>

       [[n
       <tr style="display:none;">
       <td colspan="5" style="background: #fff;">&nbsp;</td>
       </tr>
       <tr style="display:none;">
       <th colspan="4">Cap Discount:</th>
       <td style="display:none;"><span id="{{current}}CappedDiscountTotal">0</span></td>
       </tr>
       <tr style="display:none;">
       <th colspan="4"><img src="/calculator/img/help.png" align="left" style="padding: 0; margin: -2px 3px 0 0; cursor: pointer;" onclick="cappedRateHelp();" /> New Capped Rate:</th>
       <td><span id="{{current}}CappedRateTotal">0</span></td>
       </tr>
       n]]
       [[o
       <tr style="display:none;">
       <td colspan="5" style="background: #fff;">&nbsp;</td>
       </tr>
       <tr style="display:none;">
       <th colspan="4" style="display:none;">Cap Discount:</th>
       <td><span id="{{current}}CappedDiscountTotal">0</span></td>
       </tr>
       <tr style="display:none;">
       <th colspan="4"><img src="/calculator/img/help.png" align="left" style="padding: 0; margin: -2px 3px 0 0; cursor: pointer;" onclick="cappedRateHelp();" /> Rate Year 2015 Capped Rate:</th>
       <td><span id="{{current}}CappedRateTotal">0</span></td>
       </tr>
       o]]
       <tr>
       <td colspan="5" style="background: #fff;">&nbsp;</td>
       </tr>

       <tr style="height: 40px;">
       <th colspan="4">
       Rate Year 20XX Monthly Charges:
       </th>
       <td><b><span id="{{current}}ChargedAmount">0</span></b></td>
       </tr>

       </table>
       */
      });

      if (sType === 'current') {
        result = result.replace(/\[\[n[\w\s\n\=\"\@\$\%\.\,\/\:\#\;\{\}\&\<\>\-\(\)]+n\]\]/g, ''); //result = result.replace(/\[\[n[\s\S]+n\]\]/g, '');
        result = result.replace(/\[\[o/, '');
        result = result.replace(/o\]\]/, '');

        result = result.replace(/{{current}}/g, 'current');
        result = result.replace(/{{unitsFee}}/g, '$0.00');
//        result = result.replace(/Estimated Monthly Charge for year ending 06\/30\/2015/, 'Estimated Monthly Charge');
        result = result.replace(/Rate Year 20XX Monthly Charges/, 'Rate Year 20XX Monthly Charge');
        result = result.replace(/\@ \$5 per Dwelling Unit/, '');
      } else {
        result = result.replace(/\[\[o[\w\s\n\=\"\@\$\%\.\,\/\:\#\;\{\}\&\<\>\-\(\)]+o\]\]/g, ''); //result = result.replace(/\[\[o[\s\S]+o\]\]/g, '');
        result = result.replace(/\[\[n/, '');
        result = result.replace(/n\]\]/, '');

        result = result.replace(/{{current}}/g, 'new');
        result = result.replace(/{{unitsFee}}/g, '$5.00');
//        result = result.replace('Current Rate', 'New Rate');
        result = result.replace('Rate Year 20XX', 'Rate Year 20XX');
      }

      return result;
    }

    function toggleBinType() {
      var store = containerSize.getStore();
      store.clearFilter(true);
      store.reload();
      if (parseInt(numberApartmentUnits.getValue()) !== parseInt(1) || containerType.getValue() !== 'Trash') {
        //containerSize.setValue(32);
        store.filter({filterFn: function(item) {
            return item.get("value") > 20;
          }});
      }
//      if (containerType.getValue() === 'Composting') {
//        if (containerSize.getValue() > 64) {
//          containerSize.setValue(64);
//        }
//        store.filter({filterFn: function(item) {
//            return item.get("value") <= 64;
//          }});
//        containerCount.setValue(1);
//      }
    }

    function updateData(target) {

      var redColor = '#FF5959';

      var oldValues = [];

      oldValues['32-Gallon Bin 1'] = ratesObj.bin32Gallon_1;
      oldValues['32-Gallon Bin 2'] = ratesObj.bin32Gallon_2;
      oldValues['32-Gallon Bin 3'] = ratesObj.bin32Gallon_3;
      oldValues['32-Gallon Bin 4'] = ratesObj.bin32Gallon_4;
      oldValues['32-Gallon Bin 5'] = ratesObj.bin32Gallon_5;
      oldValues['32-Gallon Bin 6'] = ratesObj.bin32Gallon_6;
      oldValues['32-Gallon Bin 7'] = ratesObj.bin32Gallon_7;
      oldValues['64-Gallon Bin 1'] = ratesObj.bin64Gallon_1;
      oldValues['64-Gallon Bin 2'] = ratesObj.bin64Gallon_2;
      oldValues['64-Gallon Bin 3'] = ratesObj.bin64Gallon_3;
      oldValues['64-Gallon Bin 4'] = ratesObj.bin64Gallon_4;
      oldValues['64-Gallon Bin 5'] = ratesObj.bin64Gallon_5;
      oldValues['64-Gallon Bin 6'] = ratesObj.bin64Gallon_6;
      oldValues['64-Gallon Bin 7'] = ratesObj.bin64Gallon_7;
      oldValues['96-Gallon Bin 1'] = ratesObj.bin96Gallon_1;
      oldValues['96-Gallon Bin 2'] = ratesObj.bin96Gallon_2;
      oldValues['96-Gallon Bin 3'] = ratesObj.bin96Gallon_3;
      oldValues['96-Gallon Bin 4'] = ratesObj.bin96Gallon_4;
      oldValues['96-Gallon Bin 5'] = ratesObj.bin96Gallon_5;
      oldValues['96-Gallon Bin 6'] = ratesObj.bin96Gallon_6;
      oldValues['96-Gallon Bin 7'] = ratesObj.bin96Gallon_7;


      var dataOld = [];

      var timesPerWeek = [];
      timesPerWeek['Recycling'] = timesPerWeekRecycling.getValue();
      timesPerWeek['Trash'] = timesPerWeekTrash.getValue();
      timesPerWeek['Composting'] = timesPerWeekComposting.getValue();

      var totalRate = [];
      totalRate['current'] = [0];
      totalRate['new'] = [0];



      //var targets = ['current', 'new'];
      var targets = [];

      if (isset(target) && in_array(target, ['current', 'new'])) {
        array_push(targets, target);
      }
      else {
	/* 20XXREMOVAL  
        if (chkCopyToCurrent.getValue()) {
          array_push(targets, 'current');
        }*/
        if (chkCopyToNew.getValue()) {
          array_push(targets, 'new');
        }
      }

      for (var i = 0; i < targets.length; i++) {

        var source;
        var data = [];
        var data_keys = ['Trash', 'Recycling', 'Composting'];

        if (targets[i] === 'current') {
          source = storeCurrentService;
        } else {
          source = storeNewService;
        }

        //Number of Units
        var apartmentUnitsCost = 0;
        if (targets[i] === 'new') {
        	//apartmentUnitsCost = parseInt(numberApartmentUnits.getValue()) * 5;
        	apartmentUnitsCost = parseInt(numberApartmentUnits.getValue()) * ratesObj.dwellingNew;
        } else if (targets[i] === 'current') {
            //apartmentUnitsCost = parseInt(numberApartmentUnits.getValue()) * 5;
            apartmentUnitsCost = parseInt(numberApartmentUnits.getValue()) * ratesObj.dwellingOld;
        }

        document.getElementById(targets[i] + 'ServiceUnits').innerHTML = numberApartmentUnits.getValue();
        document.getElementById(targets[i] + 'ServiceUnitsFeeTotal').innerHTML = Ext.util.Format.usMoney(apartmentUnitsCost);
        array_push(totalRate[targets[i]], apartmentUnitsCost);

        //Recycling, Composting, Trash
        var records = source.getRange();

        for (var m = 0; m < records.length; m++) {
          if (!is_array(data[records[m].data.container_type])) {
            data[records[m].data.container_type] = [];
          }
          if (!in_array(records[m].data.container_type, data_keys)) {
            array_push(data_keys, records[m].data.container_type);
          }
          array_push(data[records[m].data.container_type], records[m].data.container_size_value * records[m].data.container_count);

          if (!is_array(dataOld[records[m].data.container_type])) {
            dataOld[records[m].data.container_type] = [];
          }

          if (records[m].data.container_type === 'Trash') {
            if (isset(oldValues[records[m].data.container_size + ' ' + timesPerWeek[records[m].data.container_type]])) {
              array_push(dataOld[records[m].data.container_type], oldValues[records[m].data.container_size + ' ' + timesPerWeek[records[m].data.container_type]] * records[m].data.container_count);
            } else {
              array_push(dataOld[records[m].data.container_type], (records[m].data.container_size_value / 32) * record.data.container_count * 1.01 * 1.01 * timesPerWeek[records[m].data.container_type]);
            }
          } else {
            array_push(dataOld[records[m].data.container_type], 0);
          }
        }

        var serviceGallons = [];
        var serviceGallonsTimesWeek = [];
        var serviceRate = [];

        for (var j = 0; j < data_keys.length; j++) {
          var fee = 0;
          if (targets[i] === 'current') {
            //switch (data_keys[j]) {
            //  case 'Trash':
            //    fee = 27.91;
            //    break;
            //  case 'Recycling':
            //    fee = 0;
            //    break;
            //  case 'Composting':
            //    fee = 0;
            //    break;
            //}
        	  fee = ratesObj.rateOld;
          } else {
              //fee = 25.08; //New Trash Value (f 25.51)
              fee = ratesObj.rateNew;
          }

          var t0 = array_sum(data[data_keys[j]]);
          if (!t0) {
            t0 = 0;
          }

          serviceGallons[data_keys[j]] = t0;

          var t2 = 0;

          if (t0 > 0) {
            t2 = round((t0 / 32) * fee * timesPerWeek[data_keys[j]], 3);

            if (timesPerWeek[data_keys[j]] === 4 && t0 > 0) {
                t2 = (t0 / 32) * fee * 1.01;
            }
            else if (timesPerWeek[data_keys[j]] === 6 && t0 > 0) {
                t2 = (t0 / 32) * fee * 1.01;
            }
            else if (timesPerWeek[data_keys[j]] === 7 && t0 > 0) {
                t2 = (t0 / 32) * fee * 1.01;
            }
          }

          if (targets[i] === 'current' && data_keys[j] === 'Trash') {
            t2 = array_sum(dataOld[data_keys[j]]);
          }// else if (targets[i] === 'current') {	//removed for new rate calc
            //t2 = 0;								//removed for new rate calc
          //}										//removed for new rate calc

          serviceRate[data_keys[j]] = round(t2, 2); //rounding issue
          serviceGallonsTimesWeek[data_keys[j]] = t0 * timesPerWeek[data_keys[j]];

          document.getElementById(targets[i] + 'ServiceGallons_' + data_keys[j]).innerHTML = Ext.util.Format.numberRenderer(',')(serviceGallons[data_keys[j]]);

          document.getElementById(targets[i] + 'ServiceTimesWeek_' + data_keys[j]).innerHTML = timesPerWeek[data_keys[j]];
          document.getElementById(targets[i] + 'ServiceGallonsTimesWeek_' + data_keys[j]).innerHTML = Ext.util.Format.numberRenderer(',')(serviceGallonsTimesWeek[data_keys[j]]);

          document.getElementById(targets[i] + 'ServiceRate_' + data_keys[j]).innerHTML = Ext.util.Format.usMoney(serviceRate[data_keys[j]]);


        } //data_keys loop


        //totals
        document.getElementById(targets[i] + 'ServiceGallonsTotal').innerHTML = Ext.util.Format.numberRenderer(',')(array_sum(serviceGallons));
        document.getElementById(targets[i] + 'ServiceGallonsTimesWeekTotal').innerHTML = Ext.util.Format.numberRenderer(',')(array_sum(serviceGallonsTimesWeek));
        document.getElementById(targets[i] + 'ServiceRateTotal').innerHTML = Ext.util.Format.usMoney(array_sum(serviceRate));

        aStore.set('s' + targets[i] + 'TotalTrashGallons', round(serviceGallonsTimesWeek['Trash']));

        if (targets[i] === 'new') {
          var v = parseInt(numberApartmentUnits.getValue());
          var mRG = v * 16;
          if (mRG < 96) {
            mRG = 96;
          }

          var mCG = v * 4;
          if (mCG < 32) {
            mCG = 32;
          }

          var mTG = v * 16;
          if (mTG < 32) {
            mTG = 32;
          }

          document.getElementById('minRecyclingGallons').innerHTML = mRG;
          document.getElementById('minCompostingGallons').innerHTML = mCG;

          var cRG = 0;
          var cCG = 0;
          var cTG = 0;

          var cRGc = false;
          var cCGc = false;
          var cTGc = false;

          cRG = round(serviceGallonsTimesWeek['Recycling']);
          if (cRG < mRG) {
            document.getElementById('currentRecyclingGallons').innerHTML = '<span style="color: #DD3700;">Recycling:&nbsp;' + cRG + '</span>' + '<img style="padding: 0; margin: 0 0 0 -2px;" src="/calculator/img/blank.png" />';
            document.getElementById('currentRecyclingGallons2').innerHTML = '<span style="color: #DD3700;">Recycling:&nbsp;' + cRG + '</span>' + '<img style="padding: 0; margin: 0 0 0 -2px;" src="/calculator/img/blank.png" />';
          }
          else {
            document.getElementById('currentRecyclingGallons').innerHTML = 'Recycling:&nbsp;' + cRG + '<img style="padding: 0; margin: 0 0 0 -2px;" src="/calculator/img/bullet_tick.png" />';
            document.getElementById('currentRecyclingGallons2').innerHTML = 'Recycling:&nbsp;' + cRG + '<img style="padding: 0; margin: 0 0 0 -2px;" src="/calculator/img/bullet_tick.png" />';
            cRGc = true;
          }

          cCG = round(serviceGallonsTimesWeek['Composting']);
          if (cCG < mCG) {
            document.getElementById('currentCompostingGallons').innerHTML = '<span style="color: #DD3700;">Composting:&nbsp;' + cCG + '</span>' + '<img style="padding: 0; margin: 0 0 0 -2px;" src="/calculator/img/blank.png" />';
            document.getElementById('currentCompostingGallons2').innerHTML = '<span style="color: #DD3700;">Composting:&nbsp;' + cCG + '</span>' + '<img style="padding: 0; margin: 0 0 0 -2px;" src="/calculator/img/blank.png" />';
          }
          else {
            document.getElementById('currentCompostingGallons').innerHTML = 'Composting:&nbsp;' + cCG + '<img style="padding: 0; margin: 0 0 0 -2px;" src="/calculator/img/bullet_tick.png" />';
            document.getElementById('currentCompostingGallons2').innerHTML = 'Composting:&nbsp;' + cCG + '<img style="padding: 0; margin: 0 0 0 -2px;" src="/calculator/img/bullet_tick.png" />';
            cCGc = true;
          }

          cTG = round(serviceGallonsTimesWeek['Trash']);
          if (cTG < mTG) {
            document.getElementById('currentTrashGallons').innerHTML = '<span style="color: #DD3700;">Trash:&nbsp;' + cTG + '</span>' + '<img style="padding: 0; margin: 0 0 0 -2px;" src="/calculator/img/blank.png" />';
            document.getElementById('currentTrashGallons2').innerHTML = '<span style="color: #DD3700;">Trash:&nbsp;' + cTG + '</span>' + '<img style="padding: 0; margin: 0 0 0 -2px;" src="/calculator/img/blank.png" />';
          }
          else {
            document.getElementById('currentTrashGallons').innerHTML = 'Trash:&nbsp;' + cTG + '<img style="padding: 0; margin: 0 0 0 -2px;" src="/calculator/img/bullet_tick.png" />';
            document.getElementById('currentTrashGallons2').innerHTML = 'Trash:&nbsp;' + cTG + '<img style="padding: 0; margin: 0 0 0 -2px;" src="/calculator/img/bullet_tick.png" />';
            cTGc = true;
          }

          if (cRGc && cCGc && cTGc) {
            document.getElementById('blinkingText').innerHTML = '&nbsp;';
          }
          else {
            document.getElementById('blinkingText').innerHTML = 'Minimum Requirements Have Not Been Met';
          }
        }

        var recyclingDiscountPercentage = 0;
	
        if (serviceGallonsTimesWeek['Recycling'] + serviceGallonsTimesWeek['Composting'] > 0) {
	  
	  // for 20XX the discount percentage is 25 below instead of 10
	  if (targets[i] === 'current') {
	    recyclingDiscountPercentage = round((serviceGallonsTimesWeek['Recycling'] + serviceGallonsTimesWeek['Composting']) / array_sum(serviceGallonsTimesWeek) * 100) - 10;
	  } else {
	    recyclingDiscountPercentage = round((serviceGallonsTimesWeek['Recycling'] + serviceGallonsTimesWeek['Composting']) / array_sum(serviceGallonsTimesWeek) * 100) - 25;
	  }
          if (recyclingDiscountPercentage < 0) {
            recyclingDiscountPercentage = 0;
          }
          if (recyclingDiscountPercentage > 50) {
            recyclingDiscountPercentage = 50;
          }
          //if (targets[i] === 'current') {
          //  recyclingDiscountPercentage = 0;
          //}
          document.getElementById(targets[i] + 'RecyclingPercentageTotal').innerHTML = round((serviceGallonsTimesWeek['Recycling'] + serviceGallonsTimesWeek['Composting']) / array_sum(serviceGallonsTimesWeek) * 100) + '%';
          document.getElementById(targets[i] + 'RecyclingDiscountPercentageTotal').innerHTML = recyclingDiscountPercentage + '%';
        }
        else {
          document.getElementById(targets[i] + 'RecyclingPercentageTotal').innerHTML = '0%';
          document.getElementById(targets[i] + 'RecyclingDiscountPercentageTotal').innerHTML = '0%';
        }

        //rounding issue
        var recyclingDiscountTotalArray = [];
        var serviceRateWithRecyclingDiscountTotalArray = [];
        for (var k = 0; k < data_keys.length; k++) {
          array_push(recyclingDiscountTotalArray, round(serviceRate[data_keys[k]] * (recyclingDiscountPercentage / 100), 2));
          document.getElementById(targets[i] + 'RecyclingDiscount_' + data_keys[k]).innerHTML = '<span style="color: ' + redColor + ';">' + Ext.util.Format.usMoney(recyclingDiscountTotalArray[k]) + '</span>';

          array_push(serviceRateWithRecyclingDiscountTotalArray, round(serviceRate[data_keys[k]] - (serviceRate[data_keys[k]] * (recyclingDiscountPercentage / 100)), 2));
          document.getElementById(targets[i] + 'ServiceRateWithRecyclingDiscount_' + data_keys[k]).innerHTML = Ext.util.Format.usMoney(serviceRateWithRecyclingDiscountTotalArray[k]);
        }

        var recyclingDiscountTotal = array_sum(recyclingDiscountTotalArray);
        var serviceRateWithRecyclingDiscountTotal = (array_sum(serviceRateWithRecyclingDiscountTotalArray));

        document.getElementById(targets[i] + 'RecyclingDiscountTotal').innerHTML = '<span style="color: ' + redColor + ';">' + Ext.util.Format.usMoney(recyclingDiscountTotal) + '</span>';
        document.getElementById(targets[i] + 'ServiceRateWithRecyclingDiscountTotal').innerHTML = Ext.util.Format.usMoney(serviceRateWithRecyclingDiscountTotal);
        array_push(totalRate[targets[i]], serviceRateWithRecyclingDiscountTotal);

        var distanceChargeTotal = 0;
        var distanceChargeDescription = 0;
        aStore.set('s' + targets[i] + 'DistanceCount', 0);
        if (distance.getValue()) {
          distanceChargeTotal = array_sum(serviceRate) * 0.25;
          distanceChargeDescription = '25% of ' + Ext.util.Format.usMoney(array_sum(serviceRate));
          aStore.set('s' + targets[i] + 'DistanceCount', 1);
        }
        distanceChargeTotal = round(distanceChargeTotal, 2); //rounding issue

        document.getElementById(targets[i] + 'DistanceChargeDescripton').innerHTML = distanceChargeDescription;
        document.getElementById(targets[i] + 'DistanceChargeTotal').innerHTML = Ext.util.Format.usMoney(distanceChargeTotal);
        //array_push(totalRate[targets[i]], distanceChargeTotal);
        aStore.set('s' + targets[i] + 'DistanceValue', distanceChargeTotal);

        var elevationChargeTotal = 0;
        var elevationChargeDescription = 0;
        if (elevation.getValue() > 0) {
          elevationChargeTotal = array_sum(serviceRate) * 0.25 * elevation.getValue();
          elevationChargeDescription = (0.5 * elevation.getValue() * 100) + '% of ' + Ext.util.Format.usMoney(array_sum(serviceRate));
        }
        elevationChargeTotal = round(elevationChargeTotal, 2); //rounding issue

        document.getElementById(targets[i] + 'ElevationChargeDescription').innerHTML = elevationChargeDescription;
        document.getElementById(targets[i] + 'ElevationChargeTotal').innerHTML = Ext.util.Format.usMoney(elevationChargeTotal);
        //array_push(totalRate[targets[i]], elevationChargeTotal);
        aStore.set('s' + targets[i] + 'ElevationCount', parseInt(elevation.getValue()));
        aStore.set('s' + targets[i] + 'ElevationValuePartial', array_sum(serviceRate) * 0.5);

        var keyRecyclingTrashValue = 0;
        var keyCompostingValue = 0;

        if (targets[i] === 'current') {
          keyRecyclingTrashValue = comboKeyRecyclingTrash.getValue() * 1.01 * timesPerWeek['Recycling'];
          keyCompostingValue = comboKeyComposting.getValue() * 1.01 * timesPerWeek['Composting'];
        }
        else {
          keyRecyclingTrashValue = comboKeyRecyclingTrash.getValue() * 1.01 * timesPerWeek['Recycling']; //weekly key use (f 13.43)
          keyCompostingValue = comboKeyComposting.getValue() * 1.01 * timesPerWeek['Composting'];
        }
        keyRecyclingTrashValue = round(keyRecyclingTrashValue, 3);
        keyCompostingValue = round(keyCompostingValue, 3);

        var keyChargeRecyclingTrashDescription = 0;
        var keyChargeCompostingDescription = 0;
        var keyCountRecyclingTrash = 0;
        var keyCountCompost = 0;

        if (chkKeyChargesRecyclingTrash.getValue() && comboKeyRecyclingTrash.getValue()) {
          keyChargeRecyclingTrashDescription = comboKeyRecyclingTrash.getValue() + ' key(s) x ' + timesPerWeek['Recycling'] + ' times/week';
          keyCountRecyclingTrash = parseInt(comboKeyRecyclingTrash.getValue() * timesPerWeek['Recycling']);
        }
        else {
          keyRecyclingTrashValue = 0;
        }

        if (chkKeyChargesComposting.getValue() && comboKeyComposting.getValue()) {
          keyChargeCompostingDescription = comboKeyComposting.getValue() + ' key(s) x ' + timesPerWeek['Composting'] + ' times/week';
          keyCountCompost = parseInt(comboKeyComposting.getValue() * timesPerWeek['Composting']);
        }
        else {
          keyCompostingValue = 0;
        }
        //array_push(totalRate[targets[i]], keyRecyclingTrashValue);
        //array_push(totalRate[targets[i]], keyCompostingValue);
        aStore.set('s' + targets[i] + 'KeyCount', keyCountRecyclingTrash + keyCountCompost);

        document.getElementById(targets[i] + 'KeyChargeRecyclingTrashDescription').innerHTML = keyChargeRecyclingTrashDescription;
        document.getElementById(targets[i] + 'KeyChargeCompostingDescription').innerHTML = keyChargeCompostingDescription;

        document.getElementById(targets[i] + 'KeyChargeRecyclingTrashTotal').innerHTML = Ext.util.Format.usMoney(keyRecyclingTrashValue);
        document.getElementById(targets[i] + 'KeyChargeCompostingTotal').innerHTML = Ext.util.Format.usMoney(keyCompostingValue);

        document.getElementById(targets[i] + 'RateTotal').innerHTML = Ext.util.Format.usMoney(array_sum(totalRate[targets[i]]));

        aStore.set('s' + targets[i] + 'TotalGallons', parseInt(array_sum(serviceGallonsTimesWeek)));
        aStore.set('s' + targets[i] + 'TotalRate', parseFloat(array_sum(totalRate[targets[i]])));

        aStore.set('s' + targets[i] + 'KeyValue', keyRecyclingTrashValue + keyCompostingValue);

	      //Dwelling Base Charge Labels
	      if(targets[i] === 'new') {
	    	  document.getElementById(targets[i] + 'ServiceUnitsBase').innerHTML = ratesObj.dwellingNew;
	      } else if(targets[i] === 'current') {
	    	  document.getElementById(targets[i] + 'ServiceUnitsBase').innerHTML = ratesObj.dwellingOld;
	      }
      } /******************/ //targets loop

      var newCappedDiscountTotal = 0;
      var newCappedRateTotal = 0;

      var totalRateCurrent = 0;
      totalRateCurrent = aStore.get('scurrentTotalRate') + aStore.get('scurrentKeyValue') + aStore.get('scurrentDistanceValue') + (aStore.get('scurrentElevationValuePartial') * aStore.get('scurrentElevationCount'));

      var totalRateNew = 0;
      totalRateNew = aStore.get('snewTotalRate');

      var currentTotalTrashGallons = aStore.get('scurrentTotalTrashGallons');
      var newTotalTrashGallons = aStore.get('snewTotalTrashGallons');

      //Key Adjustments
      var numPastKeys = aStore.get('snewKeyCount');
      var numPresentKeys = aStore.get('snewKeyCount') - aStore.get('scurrentKeyCount');
//6-8-15      var singleKeyValue = 13.25;
      var singleKeyValue = 6.74;///////////////////could be wrong, may be 13.55
      var newPresentKeyValue = 0;
      var newPastKeyValue = 0;
      if (aStore.get('snewKeyCount') > aStore.get('scurrentKeyCount')) {
        numPastKeys = numPastKeys - numPresentKeys;
        newPresentKeyValue = numPresentKeys * singleKeyValue;
      }
      newPastKeyValue = numPastKeys * singleKeyValue;
      //Key Adjustments

      //Distance Adjustments
      var newPresentDistanceValue = 0;
      var newPastDistanceValue = 0;
      if (aStore.get('snewDistanceCount') > aStore.get('scurrentDistanceCount')) {
        newPresentDistanceValue = aStore.get('snewDistanceValue');
      }
      else {
        newPastDistanceValue = aStore.get('snewDistanceValue');
      }
      //Distance Adjustments

      //Elevation Adjustments
      var newPastElevationCount = aStore.get('snewElevationCount');
      var newPresentElevationCount = aStore.get('snewElevationCount') - aStore.get('scurrentElevationCount');
      var newPresentElevationValue = 0;
      var newPastElevationValue = 0;
      if (aStore.get('snewElevationCount') > aStore.get('scurrentElevationCount')) {
        newPastElevationCount = newPastElevationCount - newPresentElevationCount;
        newPresentElevationValue = aStore.get('snewElevationValuePartial') * newPresentElevationCount;
      }
      newPastElevationValue = newPastElevationCount * aStore.get('snewElevationValuePartial');
      //Elevation Adjustments

      //before capped rate calculation
      totalRateNew = totalRateNew + newPastKeyValue + newPastDistanceValue + newPastElevationValue;

      var acap1 = parseFloat(textCapDiscountOne.getValue());
      var acap2 = parseFloat(textCapDiscountTwo.getValue());
      var acap = null;
      var newTotalRateCurrent = 0;
      var newTotalRateNew = 0;
      var acapNew = 0;
      var nTotalTrash = aStore.get('snewTotalTrashGallons');
      var cTotalTrash = aStore.get('scurrentTotalTrashGallons');

      if(acap1 != null) {
      	acap = acap1;        	
      }

      if(acap2 != null) {
      	acap += acap2;
      }

      if(acap != null) {
      	newTotalRateCurrent = totalRateCurrent - acap;

      	newTotalRateNew = (newTotalRateCurrent/1.5) * 1.5;

      	acapNew = totalRateNew - newTotalRateNew;

acapNew = 0;
newTotalRateNew = totalRateNew;

      	if(newTotalRateNew > 0 && acapNew > 0 && newTotalRateNew < totalRateNew && nTotalTrash == cTotalTrash) {
        	document.getElementById('newCappedDiscountTotal').innerHTML = '<span style="color: ' + redColor + ';">' + Ext.util.Format.usMoney(acapNew) + '</span>';
        	document.getElementById('newCappedRateTotal').innerHTML = Ext.util.Format.usMoney(newTotalRateNew);
      		document.getElementById('newChargedAmount').innerHTML = Ext.util.Format.usMoney(newTotalRateNew);
		} else {
	    	document.getElementById('newCappedDiscountTotal').innerHTML = '<span style="color: ' + redColor + ';">' + Ext.util.Format.usMoney(0) + '</span>';
	    	document.getElementById('newCappedRateTotal').innerHTML = Ext.util.Format.usMoney(0);
	  		document.getElementById('newChargedAmount').innerHTML = Ext.util.Format.usMoney(totalRateNew);
		}
      } else {
    	document.getElementById('currentCappedDiscountTotal').innerHTML = '<span style="color: ' + redColor + ';">' + Ext.util.Format.usMoney(0) + '</span>';
    	//document.getElementById('currentCappedRateTotal').innerHTML = Ext.util.Format.usMoney(0);
    	document.getElementById('currentCappedRateTotal').innerHTML = Ext.util.Format.usMoney(totalRateCurrent);
  		document.getElementById('currentChargedAmount').innerHTML = Ext.util.Format.usMoney(totalRateCurrent);

    	document.getElementById('newCappedDiscountTotal').innerHTML = '<span style="color: ' + redColor + ';">' + Ext.util.Format.usMoney(0) + '</span>';
    	document.getElementById('newCappedRateTotal').innerHTML = Ext.util.Format.usMoney(0);
  		document.getElementById('newChargedAmount').innerHTML = Ext.util.Format.usMoney(totalRateNew);
      }








    }

    function addToTop() {

      var targets = [];
      var source;

      if (containerType.getValue()) {
        if (chkCopyToNew.getValue()) {
          array_push(targets, 'new');
        }

        for (var i = 0; i < targets.length; i++) {

          if (targets[i] === 'current') {
            source = storeCurrentService;
          }
          else {
            source = storeNewService;
          }

          source.add({
            container_type: containerType.getValue(),
            container_size: containerSize.getDisplayValue(),
            container_size_value: containerSize.getValue(),
            container_count: containerCount.getValue()
          });
        }
        return true;
      }
      return false;
    }

    var mainPanel = Ext.create('Ext.panel.Panel', {
      layout: {
        type: 'border',
        padding: 5
      },
      renderTo: 'mContainer',
      minWidth: 1100,
      width: '100%',
      height: 1200,
      items: [
        {
          region: 'west',
          layout: {
            type: 'vbox',
            align: 'center'
          },
          width: 310,
          defaults: {
            bodyPadding: '5 5 5 10',
            width: '100%'
          },
          items: [
            panelCopyTo,
            numberApartmentUnits,
            fieldMinimumRequired,
            fieldCurrentGallons,
            {
              html: '<center><span id="blinkingText" style="font-size: 11px; color: #DD3700;">Minimum Requirements Have Not Been Met</span></center>',
              border: false,
              margins: '-10 0 10 -6'
            },
            panelCapDiscount,
            panelBinSelection,
            panelFrequency,
            panelLocationDetails,
            panelKey,
            buttons
          ]
        },
        {
          region: 'center',
          layout: 'vbox',
          items: [
            {
              title: 'Bin Selection',
              titleAlign: 'center',
              width: '100%',
              layout: 'hbox',
              margins: '0 0 13 0',
              dockedItems: [{
                  dock: 'top',
                  xtype: 'toolbar',
                  hidden: (!xhidden()),
                  items: [
                    {
                      text: '<b>Contact Us</b>',
                      iconCls: 'email',
                      handler: function() {
                        popUpFrame();
                      }
                    },
                    {
                      xtype: 'displayfield',
                      labelSeparator: '',
                      fieldLabel: '&laquo; Customers with bin size over 96 gallons or premium services such as key, distance, elevation, etc., please contact us.',
                      labelWidth: '600'
                    }
                  ]
                }],
              items: [
                gridNewService
              ]
            },
            {
              layout: 'hbox',
              width: '100%',
              border: false,
              defaults: {
                flex: 1,
                height: 1000,
                margin: '10 0 0 0'
              },
              items: [
                {
                  title: 'Rate Year 20XX Estimate',
                  html: tableServicesEstimate('new')
                }
              ]
            }
          ]
        },
        {
          region: 'north',
          layout: 'hbox',
          height: 100,
          defaults: {
            height: 100,
            border: false
          },
          items: [
            {
              layout: {type: 'vbox', align: 'left'},
              items: [
                {
                  html: '<div id="arc_logo"></div>',
                  border: false
                }
              ],
              flex: 2
            },
            {
              layout: {type: 'vbox', align: 'right'},
              items: [
                {
                  html: '<div id="r_logo"></div>',
                  border: false
                }
              ],
              flex: 1
            }
          ]
        },
        {
          region: 'south',
          height: 20,
          defaults: {
            border: false
          },
          items: [
            {
              html: '&copy; 2018 Recology™ | Recology Rate Calculator is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, version 3 of the License.',
              padding: '2 5 2 5'
            },
            sCurrentTotalRate,
            sCurrentTrashRecycleKeyCount,
            sCurrentCompostKeyCount,
            sCurrentDistanceCount,
            sCurrentElevationCount,
            sCurrentTotalGallons,
            sNewTotalRate,
            sNewAdditionalPremiumServices,
            sNewTotalGallons
          ]
        }
      ],
      listeners: {
        afterrender: function() {
          var totalsDom = Ext.query('span[id$=Total]');
          for (var i = 0; i < totalsDom.length; i++) {
            Ext.get(totalsDom[i].parentNode).addCls('rTotal');
          }
          Ext.get('newChargedAmount').parent().parent().addCls('rTotal');

          toggleBinType();
          updateData();
        }
      }
    });

    function getWindowSize() {
      var width = 1100;
      if (Ext.isIE) {
        width = round(Ext.getBody().getViewSize().width);
      }
      else {
        width = round(Ext.getBody().getViewSize().width) - 16;
      }

      var height = 1100;
      if (Ext.getBody().getViewSize().height > height) {
        height = round(Ext.getBody().getViewSize().height);
      }
      return [width, height];
    }

    Ext.EventManager.onWindowResize(function() {
      var wSize = getWindowSize();
      mainPanel.setSize(wSize[0], wSize[1]);
    });

    Ext.EventManager.onDocumentReady(function() {
      var wSize = getWindowSize();
      mainPanel.setSize(wSize[0], wSize[1]);
    });

    numberApartmentUnits.on('change', function() {
      //fadeIn('ServiceUnits');
    });
  }
});