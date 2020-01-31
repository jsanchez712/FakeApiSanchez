import { Component, OnInit } from '@angular/core';
import { IPoema } from '../core/interface';
import { PoemadbService } from '../core/poemadbservice.service';
import { Router } from '@angular/router';
import { DetailsPage } from '../details/details.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html'
})
export class HomePage implements OnInit {
  public poemas: IPoema[];
  poemasinit: IPoema[] = [
    {
      id: '1',
      autor: 'Mario Benedetti',
      genre: 'Drama',
      date: '1972',
      poema: "Todavía tengo casi todos mis dientes casi todos mis cabellos y poquísimas canas puedo hacer y deshacer el amor trepar una escalera de dos en dos y correr cuarenta metros detrás del ómnibus o sea que no debería sentirme viejo pero el grave problema es que antes no me fijaba en estos detalles."
    },
    {
      id: '2',
      autor: 'Gloria Fuertes',
      genre: '',
      date: '2003',
      poema: "En las noches claras, resuelvo el problema de la soledad del ser. Invito a la luna y con mi sombra somos tres."
    }
 ]
constructor(private poemadbService: PoemadbService, private route:
  Router) { }
ngOnInit(): void {
  // If the database is empty set initial values
  this.inicialization();
}
ionViewDidEnter(){
  // Remove elements if it already has values
  if (this.poemas !== undefined) {
    this.poemas.splice(0);
  }
  this.retrieveValues();
}
inicialization() {
  if (this.poemadbService.empty()) {
    this.poemasinit.forEach(poema => {
      this.poemadbService.setItem(poema.id, poema);
    });
  }
}
retrieveValues(){
  // Retrieve values
  this.poemadbService.getAll().then(
    (data) => this.poemas = data
  );
}
poemaTapped(poema) {
  this.route.navigate(['details', poema.id]);
}
}