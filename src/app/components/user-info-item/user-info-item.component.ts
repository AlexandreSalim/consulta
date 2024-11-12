import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-info-item',
  templateUrl: './user-info-item.component.html',
  styleUrl: './user-info-item.component.scss'
})
export class UserInfoItemComponent {

  @Input({ required: true })  title: string | undefined | null = '';

  @Input({ required: true })  text: string | undefined | null = '';

}