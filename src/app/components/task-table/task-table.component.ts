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

  colOrder: number[];
  colWidths: number[];

  headers: string[];
  data: string[][];

  dragging: number;
  dragFromIndex: number;
  dragRights: number[];
  dragCursor: string;

  fakeHeader: string;
  fakeData: string[];
  fakeWidth: number;

  resizing: number;
  resizeFrom: number;
  resizeWidth: number;
  resizeCursor: string;

  constructor() { }

  ngOnInit() {
    const COLS = 10;
    const ROWS = 5;

    // Set column order
    this.colOrder = JSON.parse(localStorage.getItem("colOrder"));
    if(!this.colOrder) {
      this.colOrder = [];
      for(let i=0; i<COLS; i++) this.colOrder[i] = i;
    }

    console.log(this.colOrder);

    // Populate headers
    this.headers = [];
    for(let i of this.colOrder) {
      this.headers[i] = "Header " + i;
    }

    // Populate Data
    this.data = [];
    for(let i=0; i<ROWS; i++){
      this.data[i] = [];
      for(let j of this.colOrder){
        this.data[i][j] = "Data " + i + "." + j;
      }
    }

    // Set header widths
    this.colWidths = JSON.parse(localStorage.getItem("colWidths"));
    if(this.colWidths) this.updateTableWidth();
    else {
      this.colWidths = [];
      setTimeout(() => {
        for(let i of this.colOrder) {
          let header = document.getElementById("th-" + i);
          let widthPx = this.getStyle(header, "width");
          let widthStr = widthPx.substr(0, widthPx.length-2);
          let width = parseInt(widthStr);
          this.colWidths.push(width);
        }
      }, 100);
    }

    console.log(this.colWidths);

    this.headers[2] = "Header 2 is a lot bigger";
    this.data[2][3] = "Data cell with humongously words"

    this.dragging = -1;
    this.resizing = -1;

  }

  startDragging(i: number, event) {
    this.dragging = i;
    this.dragRights = [];
    for(let i=0; i<this.colOrder.length; i++) {
      let col = this.colOrder[i];
      if(col == this.dragging) this.dragFromIndex = i;
      let header = document.getElementById("th-" + col);
      this.dragRights.push(header.getBoundingClientRect().right);
    }
    this.dragCursor = this.getStyle(document.body, "cursor")
    document.body.style.cursor = "ew-resize";

    this.fakeHeader = this.headers[this.dragging];
    this.fakeData = [];
    for(let row=0; row<this.data.length; row++) {
      this.fakeData[row] = this.data[row][this.dragging];
    }
    this.fakeWidth = this.colWidths[this.dragging];

    let fkCol = document.getElementById("fk-col");
    fkCol.style.display = "block";
    fkCol.style.left = (event.clientX+pageXOffset-this.fakeWidth/2.0) + "px";
    fkCol.style.top = (event.clientY+pageYOffset-10) + "px";
    event.preventDefault();
  }

  startResizing(i: number, event) {
    this.resizing = i;
    this.resizeFrom = event.x;
    this.resizeWidth = this.colWidths[i];
    this.resizeCursor = this.getStyle(document.body, "cursor");
    document.body.style.cursor = "col-resize";
    event.stopPropagation();
    event.preventDefault();
  }

  onHostMouseMove(event) {
    if(this.dragging != -1) this.onColumnDrag(event);
    else if(this.resizing != -1) this.onColumnResize(event);
  }

  onColumnDrag(event) {
    let fkCol = document.getElementById("fk-col");
    fkCol.style.left = (event.clientX+pageXOffset-this.fakeWidth/2.0) + "px";
    fkCol.style.top = (event.clientY+pageYOffset-10) + "px";

    let dragToIndex = -1;
    for(let i=0; i<this.dragRights.length; i++){
      let right = this.dragRights[i];
      if(event.x < right) {
        dragToIndex = i;
        break;
      }
    }
    if(this.dragFromIndex == -1 || dragToIndex == -1 || 
      this.dragFromIndex == dragToIndex) return;
    this.colOrder[this.dragFromIndex] = this.colOrder[dragToIndex];
    this.colOrder[dragToIndex] = this.dragging;
    this.dragFromIndex = dragToIndex;
  }

  onColumnResize(event) {
    // Calculate minimum width
    // Minimum width necessary to 
    // fit biggest word on column
    let bigWord = this.getBiggestWord(this.headers[this.resizing]);
    for(let row=0; row<this.data.length; row++) {
      let word = this.getBiggestWord(this.data[row][this.resizing]);
      if(word.length > bigWord.length) bigWord = word;
    }

    let header = document.getElementById("th-" + this.resizing);
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    let fSize = this.getStyle(header, "font-size");
    let fFam = this.getStyle(header, "font-family").split(",")[0];
    ctx.font = fSize + " " + "Helvetica Neue";
    let minWidth = ctx.measureText(bigWord).width + 40; // 20px padding + 20px ellipsis

    let newWidth = this.resizeWidth+event.x-this.resizeFrom;
    if(newWidth < minWidth) return;
    this.colWidths[this.resizing] = newWidth;

    this.updateTableWidth();

    // Ajust size of draggers
    let height = this.getStyle(header, "height");
    for(let i of this.colOrder) {
      let dragger = document.getElementById("res-" + i);
      dragger.style.height = height;
    }
  }

  onHostMouseUp() {
    if(this.resizing != -1) {
      this.resizing = -1;
      document.body.style.cursor = this.resizeCursor;
      localStorage.setItem("colWidths", JSON.stringify(this.colWidths));
    }

    if(this.dragging != -1) {
      this.dragging = -1;
      this.dragFromIndex = -1;
      document.body.style.cursor = this.dragCursor;

      let fkCol = document.getElementById("fk-col");
      fkCol.style.display = "none";
      localStorage.setItem("colOrder", JSON.stringify(this.colOrder));
    }
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
    width += (borderSpacingN)*(this.headers.length+1);
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
