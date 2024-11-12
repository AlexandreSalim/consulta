import { Component, Input } from '@angular/core';
import { IUser } from '../../interfaces/user/user.interface';

@Component({
  selector: 'app-contato-informations',
  templateUrl: './contato-informations.component.html',
  styleUrl: './contato-informations.component.scss'
})
export class ContatoInformationsComponent {

  @Input({ required: true }) user: IUser | undefined = {} as IUser;
}
