import { Component } from "@angular/core";


@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
  clicked: boolean = false;

  handleClick() {
    this.clicked = !this.clicked;
  }
}
