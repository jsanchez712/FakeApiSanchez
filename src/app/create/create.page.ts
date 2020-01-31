import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PoemadbService } from '../core/poemadbservice.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IPoema } from '../core/interface';
@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  poema: IPoema;
  poemaForm: FormGroup;
  constructor(
    private router: Router,
    private poemadbService: PoemadbService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.poemaForm = new FormGroup({
      autor: new FormControl(''),
      genre: new FormControl(''),
      date: new FormControl(''),
      poema: new FormControl(''),
    });
  }
  async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Guardar película',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.savePoema();
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
  savePoema() {
    this.poema = this.poemaForm.value;
    let nextKey = this.poema.autor.trim();
    this.poema.id = nextKey;
    this.poemadbService.setItem(nextKey, this.poema);
    console.warn(this.poemaForm.value);
  }
}