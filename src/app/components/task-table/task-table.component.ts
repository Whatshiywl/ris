import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ris-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css'],
  host: {
    '(document:mousemove)': 'onHostMouseMove($event)',
    '(document:mouseup)': 'onHostMouseUp()'
  }
})
export class TaskTableComponent implements OnInit {

  rows: number[];
  cols: number[];

  colWidths: number[];

  headers: string[];
  data: string[][];

  resizing: number;
  resizeFrom: number;
  resizeWidth: number;
  resizeCursor: string;

  // colWidth: number;

  constructor() { }

  ngOnInit() {
    this.headers = [];
    this.data = [];
    this.rows = [];
    this.cols = [];
    this.colWidths = [];
    for(let i=0; i<5; i++){
      this.data[i] = [];
      this.rows.push(i);
      for(let j=0; j<10; j++){
        if(i==0){
          this.headers[j] = "Header " + j;
          this.cols.push(j);
          setTimeout(() => {
            // Set heder widths
            let header = document.getElementById("th-" + j);
            let widthPx = this.getStyle(header, "width");
            let widthStr = widthPx.substr(0, widthPx.length-2);
            let width = parseInt(widthStr);
            this.colWidths.push(width);

            // let right = header.getBoundingClientRect().right;
            // console.log(right);
            // let resizer = document.getElementById("res-" + j);
            // resizer.style.left = (right-3) + "px";
          }, 100, j);
        }
        this.data[i][j] = "Data " + i + "." + j;
      }
    }

    this.headers[2] = "Header 2 is a lot bigger";
    this.data[2][3] = "Data cell with humongously words"

    this.resizing = -1;
  }

  startResizing(i: number, event) {
    this.resizing = i;
    this.resizeFrom = event.x;
    this.resizeWidth = this.colWidths[i];
    this.resizeCursor = this.getStyle(document.body, "cursor");
    document.body.style.cursor = "col-resize";
    event.preventDefault();
  }

  onHostMouseMove(event) {
    if(this.resizing==-1) return;

    // Calculate minimum width
    // Minimum width necessary to 
    // fit biggest word on column
    let bigWord = this.headers[this.resizing];
    for(let row=0; row<this.rows.length; row++) {
      let word = this.getBiggestWord(this.data[row][this.resizing]);
      if(word.length > bigWord.length) bigWord = word;
    }

    let header = document.getElementById("th-" + this.resizing);
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    let fSize = this.getStyle(header, "font-size");
    let fFam = this.getStyle(header, "font-family").split(",")[0];
    ctx.font = fSize + " " + "Helvetica Neue";
    let minWidth = ctx.measureText(bigWord).width + 20; // 20px padding

    let newWidth = this.resizeWidth+event.x-this.resizeFrom;
    if(newWidth < minWidth) return;
    this.colWidths[this.resizing] = newWidth;

    this.updateTableWidth();

    // Ajust size of draggers
    let height = this.getStyle(header, "height");
    for(let i=0; i<this.cols.length; i++) {
      let dragger = document.getElementById("res-" + i);
      dragger.style.height = height;
    }
  }

  onHostMouseUp() {
    this.resizing = -1;
    document.body.style.cursor = this.resizeCursor;
  }

  updateTableWidth() {
    let width = 0;
    for(let colW of this.colWidths) {
      width += colW;
    }
    let table = document.getElementById("table");
    let borderSpacingStr = this.getStyle(table, "borderSpacing"); // "5px 5px"
    let borderSpacingH = borderSpacingStr.split(" ")[0]; // "5px"
    let borderSpacing = borderSpacingH.substr(0, borderSpacingStr.length-2); // "5"
    let borderSpacingN = parseInt(borderSpacing); // 5
    width += (borderSpacingN)*(this.cols.length+1);
    table.style.width = width + "px";
    return width;
  }

  getBiggestWord(line: string): string {
    let word = "";
    line.split(" ").forEach((w) => {
      if(w.length > word.length) word = w;
    });
    return word;
  }

  getStyle(el, styleProp): string {
    var value, defaultView = el.ownerDocument.defaultView;
    // W3C standard way:
    if (defaultView && defaultView.getComputedStyle) {
      // sanitize property name to css notation (hypen separated words eg. font-Size)
      styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
      return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
    } else if (el.currentStyle) { // IE
      // sanitize property name to camelCase
      styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) {
        return letter.toUpperCase();
      });
      value = el.currentStyle[styleProp];
      // convert other units to pixels on IE
      if (/^\d+(em|pt|%|ex)?$/i.test(value)) { 
        return (function(value) {
          var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
          el.runtimeStyle.left = el.currentStyle.left;
          el.style.left = value || 0;
          value = el.style.pixelLeft + "px";
          el.style.left = oldLeft;
          el.runtimeStyle.left = oldRsLeft;
          return value;
        })(value);
      }
      return value;
    }
  }

}
