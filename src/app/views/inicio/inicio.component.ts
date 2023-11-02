import { Component, OnInit, HostListener} from '@angular/core';;


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  isLargeScreen = true;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkWindowSize();
  }

  ngOnInit(): void {
    this.checkWindowSize();
  }

  checkWindowSize(): void {
    this.isLargeScreen = window.innerWidth >= 1200;
  }
}

