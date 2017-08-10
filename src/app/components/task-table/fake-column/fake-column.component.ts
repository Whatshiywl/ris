import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tt-fake-column',
  templateUrl: './fake-column.component.html',
  styleUrls: ['./../task-table.component.css']
})
export class FakeColumnComponent implements OnInit {
  @Input() header="header";
  @Input() data = ["hey", "ho", "ye"];
  @Input() width = 200;

  constructor() { }

  ngOnInit() {
  }

}
