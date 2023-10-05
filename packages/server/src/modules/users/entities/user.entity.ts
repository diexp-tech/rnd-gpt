import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { MessageEntity } from "./message.entity";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  fingerprint: string;

  @OneToMany(() => MessageEntity, (message) => message.user)
  messages: MessageEntity[];
}
