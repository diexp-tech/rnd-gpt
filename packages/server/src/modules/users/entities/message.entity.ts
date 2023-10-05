import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { MessageRole } from "../enums";

import { UserEntity } from "./user.entity";

@Entity({ name: "messages" })
export class MessageEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "user_id" })
  userId: string;

  @Column({ enum: MessageRole })
  role: MessageRole;

  @Column()
  text: string;

  @Column({ nullable: true, name: "finish_reason" })
  finishReason?: string;

  @Column({ nullable: true, type: "jsonb" })
  meta?: Record<string, any>;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.messages)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
  })
  user: UserEntity;
}
