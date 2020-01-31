import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoemadbService } from '../core/poemadbservice.service';
import { IPoema } from '../core/interface';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  id: string;
  public poema: IPoema;
  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private poemadbService: PoemadbService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.poemadbService.getItem(this.id).then(
      (data: IPoema) => this.poema = data
    );
  }

  editRecord(poema) {
    this.router.navigate(['edit', poema.id])
  }
  async removeRecord(id) {
    const toast = await this.toastController.create({
      header: 'Elimiar película',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'delete',
          text: 'ACEPTAR',
          handler: () => {
            this.poemadbService.remove(id);
            this.router.navigate(['home']);
          }
        }, {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
}