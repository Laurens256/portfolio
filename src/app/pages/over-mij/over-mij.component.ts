import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-over-mij',
  templateUrl: './over-mij.component.html',
  styleUrls: ['./over-mij.component.css']
})
export class OverMijComponent implements OnInit {

  constructor(
    private titleService: Title,
    ) {
      this.titleService.setTitle("Laurens Duin | Over Mij");
    }

  ngOnInit(): void {
  }

}
