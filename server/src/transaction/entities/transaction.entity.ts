import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

// транзакции должны знать и о юзере, и о категориях

@Entity()
export class Transaction {
  @PrimaryColumn({ name: 'transaction_id' }) //category_id в базе колонка, в коде - просто айди
  id: number;
  @Column()
  title: string;
  @Column()
  amount: number;
  @Column({ nullable: true }) //значение может быть нал, можем создать транзакцию, какуюто катег использовать а потом удалить
  type: string; // если катег удалится, чтобы транзакция осталась, хоть и нал
  @ManyToOne(() => User, (user) => user.transactions) // тут привязываемся к полю в юзере
  @JoinColumn({ name: 'user_id' }) //теперь в таблице видим айди юзера, к которому транзакция относится
  user: User;
  @ManyToOne(() => Category, (category) => category.transactions) //у многих транзакций может быть одна категория
  @JoinColumn({ name: 'category_id' })
  category: Category;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
