import { Transaction } from 'src/transaction/entities/transaction.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

//свяжем юзера с категориями
@Entity()
export class Category {
  @PrimaryGeneratedColumn({ name: 'category_id' }) //category_id в базе колонка, в коде - просто айди
  id: number;
  @Column()
  title: string;
  @ManyToOne(() => User, (user) => user.categories) // тут привязываемся к полю в юзере
  @JoinColumn({ name: 'user_id' }) //теперь в таблице видим айди юзера, к которому категория относится
  user: User;
  @OneToMany(() => Transaction, (transaction) => transaction.category) //зеркально в транзакциях подписались на категорию и поле транзакшнс
  transactions: Transaction[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}

// у юзера будет связь с категориями по типу один (юзер) ко многим (категориям)
// у категорий будет наоборот связь много к одному
